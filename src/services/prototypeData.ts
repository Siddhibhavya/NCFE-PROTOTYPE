import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { collection, doc, getFirestore, increment, serverTimestamp, setDoc } from 'firebase/firestore';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const prototypeDataEnabled = import.meta.env.VITE_PROTOTYPE_DATA_ENABLED === 'true'
  && Object.values(config).every(Boolean);

function database() {
  if (!prototypeDataEnabled) throw new Error('Prototype data collection is not configured.');
  const app = getApps().length ? getApp() : initializeApp(config);
  return getFirestore(app);
}

let authPromise: Promise<void> | undefined;
async function authenticate() {
  const app = getApps().length ? getApp() : initializeApp(config);
  const auth = getAuth(app);
  await auth.authStateReady();
  if (auth.currentUser) return;
  authPromise ??= signInAnonymously(auth).then(() => undefined).catch(error => {
    authPromise = undefined;
    throw error;
  });
  await authPromise;
}

const feedbackCategories = new Set([
  'In general', 'Onboarding', 'Home', 'Learn', 'FL initiatives', 'FinDisha', 'Help centre',
]);

export async function recordPageView() {
  if (!prototypeDataEnabled) return;
  await authenticate();
  const day = new Date().toISOString().slice(0, 10);
  await setDoc(doc(database(), 'prototypeTraffic', day), {
    count: increment(1),
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function savePrototypeFeedback(feedback: { rating: number; category: string; comment: string }) {
  if (!prototypeDataEnabled) throw new Error('Feedback storage is not configured.');
  if (!Number.isInteger(feedback.rating) || feedback.rating < 1 || feedback.rating > 5
    || !feedbackCategories.has(feedback.category) || feedback.comment.length > 2000) {
    throw new Error('Feedback is invalid.');
  }
  await authenticate();
  await setDoc(doc(collection(database(), 'prototypeFeedback')), {
    rating: feedback.rating,
    category: feedback.category,
    comment: feedback.comment,
    submittedAt: serverTimestamp(),
  });
}
