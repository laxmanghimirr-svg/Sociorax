import {
  UserRating,
  subscribeAppRatings,
  submitOrUpdateUserRating,
  calculateRatingStats,
} from '../services/ratingService';
import { AppItem } from '../types/app';

export type AppReview = UserRating;

/**
 * Subscribe to real-time reviews/ratings for a specific app from Firestore.
 */
export function subscribeReviewsForApp(
  appId: string,
  onUpdate: (reviews: AppReview[]) => void,
  onError?: (error: Error) => void
): () => void {
  return subscribeAppRatings(appId, onUpdate, onError);
}

/**
 * Add or update a review for an app in Firestore.
 */
export async function addReviewForAppToFirestore(
  appId: string,
  reviewData: { userName: string; rating: number; comment: string },
  appName: string = 'Sociorax App'
): Promise<AppReview> {
  return submitOrUpdateUserRating({
    appId,
    appName,
    rating: reviewData.rating,
    review: reviewData.comment,
    userName: reviewData.userName,
  });
}

// Backward compatibility helpers
export function getReviewsForApp(_appId: string): AppReview[] {
  return [];
}

export async function addReviewForApp(
  appId: string,
  reviewData: { userName: string; rating: number; comment: string }
): Promise<AppReview> {
  return addReviewForAppToFirestore(appId, reviewData);
}

export function getAppStats(app: AppItem, liveRatings: AppReview[] = []) {
  const isComingSoon = app.isComingSoon || app.downloadSize === 'Coming Soon';

  if (isComingSoon) {
    return {
      displayRating: '',
      displayReviewsCount: '',
      totalReviews: 0,
      reviews: [],
      isComingSoon: true,
      displaySize: 'Coming Soon',
    };
  }

  const stats = calculateRatingStats(liveRatings, app.rating);
  return {
    displayRating: stats.averageRating,
    displayReviewsCount: stats.displayReviewsCount,
    totalReviews: stats.totalRatings,
    reviews: liveRatings,
    isComingSoon: false,
    displaySize: app.downloadSize,
  };
}
