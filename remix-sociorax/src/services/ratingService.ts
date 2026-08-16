import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db, ensureAnonymousAuth, auth } from '../firebase';

export interface UserRating {
  id: string; // userId
  appId: string;
  appName: string;
  userId: string;
  userName: string;
  rating: number; // 1 to 5
  review: string; // max 500 chars
  createdAt: number;
  updatedAt: number;
  date: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    isAnonymous?: boolean | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
    },
    operationType,
    path,
  };
  console.error('Firestore Error Details:', errInfo);
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Subscribe to real-time ratings for a given app from Firestore.
 */
export function subscribeAppRatings(
  appId: string,
  onUpdate: (ratings: UserRating[]) => void,
  onError?: (err: Error) => void
): () => void {
  const collectionPath = `apps/${appId}/ratings`;
  try {
    const ratingsRef = collection(db, 'apps', appId, 'ratings');
    const q = query(ratingsRef);

    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const ratings: UserRating[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          ratings.push({
            id: docSnap.id,
            appId: data.appId || appId,
            appName: data.appName || '',
            userId: data.userId || docSnap.id,
            userName: data.userName || 'Anonymous',
            rating: typeof data.rating === 'number' ? data.rating : 5,
            review: data.review || '',
            createdAt: data.createdAt || 0,
            updatedAt: data.updatedAt || data.createdAt || 0,
            date: data.date || '',
          });
        });

        // Sort client-side by newest update
        ratings.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
        onUpdate(ratings);
      },
      (error) => {
        // If it's a transient offline/unavailable connection error, Firestore operates in local offline mode
        const isOffline =
          error?.code === 'unavailable' ||
          error?.message?.toLowerCase().includes('offline') ||
          error?.message?.toLowerCase().includes('could not reach cloud firestore');

        if (!isOffline) {
          console.warn(`Firestore rating sync notice (${collectionPath}):`, error.message);
          if (onError) onError(error);
        }
      }
    );

    return unsubscribe;
  } catch (error) {
    console.warn(`Firestore subscription notice for ${appId}:`, error);
    if (onError && error instanceof Error) onError(error);
    return () => {};
  }
}

/**
 * Fetch existing rating submitted by the current anonymous user for a specific app.
 */
export async function getCurrentUserRatingForApp(appId: string): Promise<UserRating | null> {
  try {
    const user = await ensureAnonymousAuth();
    const path = `apps/${appId}/ratings/${user.uid}`;
    const docRef = doc(db, 'apps', appId, 'ratings', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        appId: data.appId || appId,
        appName: data.appName || '',
        userId: data.userId || user.uid,
        userName: data.userName || 'Anonymous',
        rating: data.rating || 5,
        review: data.review || '',
        createdAt: data.createdAt || 0,
        updatedAt: data.updatedAt || 0,
        date: data.date || '',
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching current user rating:', error);
    return null;
  }
}

/**
 * Submit or update a user rating and experience review in Firestore.
 */
export async function submitOrUpdateUserRating(params: {
  appId: string;
  appName: string;
  rating: number;
  review?: string;
  userName?: string;
}): Promise<UserRating> {
  const { appId, appName, rating, review = '', userName = '' } = params;

  if (rating < 1 || rating > 5) {
    throw new Error('Please select a rating between 1 and 5 stars.');
  }

  const trimmedReview = review.trim();
  if (trimmedReview.length > 500) {
    throw new Error('Review text cannot exceed 500 characters.');
  }

  // Ensure user is signed in anonymously
  const user = await ensureAnonymousAuth();
  const userId = user.uid;
  const path = `apps/${appId}/ratings/${userId}`;

  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const now = Date.now();

  try {
    const docRef = doc(db, 'apps', appId, 'ratings', userId);
    const docSnap = await getDoc(docRef);

    const existingData = docSnap.exists() ? docSnap.data() : null;
    const createdAt = existingData?.createdAt || now;

    const payload: Omit<UserRating, 'id'> = {
      appId,
      appName,
      userId,
      userName: userName.trim() || 'Anonymous User',
      rating,
      review: trimmedReview,
      createdAt,
      updatedAt: now,
      date: formattedDate,
    };

    await setDoc(docRef, payload, { merge: true });

    return {
      id: userId,
      ...payload,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Calculate average rating and total ratings count.
 */
export function calculateRatingStats(ratings: UserRating[]) {
  const totalRatings = ratings.length;

  if (totalRatings === 0) {
    return {
      averageRating: 'No rating yet',
      totalRatings: 0,
      displayReviewsCount: 'No reviews yet',
      hasRatings: false,
    };
  }

  const sum = ratings.reduce((acc, r) => acc + (r.rating || 0), 0);
  const avg = (sum / totalRatings).toFixed(1);

  return {
    averageRating: avg,
    totalRatings,
    displayReviewsCount: `${totalRatings} ${totalRatings === 1 ? 'review' : 'reviews'}`,
    hasRatings: true,
  };
}
