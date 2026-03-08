import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADXuZ1J2q5EnbH0PQCVw5rMXBpEJaD0PA",
  authDomain: "hr-catalyst.firebaseapp.com",
  projectId: "hr-catalyst",
  storageBucket: "hr-catalyst.firebasestorage.app",
  messagingSenderId: "701659757902",
  appId: "1:701659757902:web:fef8cebc0a883e8d89b21f",
  measurementId: "G-T5REEMCZCX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const initFB = async () => {
  return {
    auth,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    RecaptchaVerifier,
    signInWithPhoneNumber
  };
};

export { auth, googleProvider };

