// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAWkwiHYA4npbfwnw9gAlSrl3HJa9HSnuQ",
  authDomain: "diogenes-firebase.firebaseapp.com",
  projectId: "diogenes-firebase",
  storageBucket: "diogenes-firebase.appspot.com",
  messagingSenderId: "745562076603",
  appId: "1:745562076603:web:99e3d2d81fa5b97122c09e",
  measurementId: "G-93JE6317LV",
  databaseURL: "https://diogenes-firebase-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);