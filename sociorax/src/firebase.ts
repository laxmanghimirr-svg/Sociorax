import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  Firestore,
} from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged, User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC26uLvID81MhwpSTI0pnHTexYElxzwCuM",
  authDomain: "sociorax-8cc8a.firebaseapp.com",
  projectId: "sociorax-8cc8a",
  storageBucket: "sociorax-8cc8a.firebasestorage.app",
  messagingSenderId: "786689957480",
  appId: "1:786689957480:web:925c88fb889302b2fc65dd",
  measurementId: "G-KWZBSC8MPS"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firestore Database with persistent offline cache & multi-tab manager
export const db: Firestore = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

// Initialize Firebase Authentication
export const auth = getAuth(app);

/**
 * Ensures the user is signed in anonymously with Firebase.
 * Returns the authenticated User instance.
 */
export async function ensureAnonymousAuth(): Promise<User> {
  if (auth.currentUser) {
    return auth.currentUser;
  }

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        try {
          const userCred = await signInAnonymously(auth);
          resolve(userCred.user);
        } catch (error) {
          console.error("Firebase Anonymous Authentication failed:", error);
          reject(error);
        }
      }
    });
  });
}
