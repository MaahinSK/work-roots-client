// Use compat version for better Next.js compatibility
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD2X6NJ1-zOk3WENlqPsXRQQ5VJ3IUNcMU",
  authDomain: "ejp-workroots.firebaseapp.com",
  projectId: "ejp-workroots",
  storageBucket: "ejp-workroots.firebasestorage.app",
  messagingSenderId: "151175727156",
  appId: "1:151175727156:web:425eea80bf9bd1bc9da261"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;