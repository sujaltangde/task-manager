import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHhYRmYR5VkHls1bpmzpp2BGcrlCvN6_Q",
  authDomain: "task-manager-6ffdd.firebaseapp.com",
  projectId: "task-manager-6ffdd",
  storageBucket: "task-manager-6ffdd.appspot.com",
  messagingSenderId: "747891491369",
  appId: "1:747891491369:web:feef3460f11741928fd238"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();



export const signInSignUpWithGoogle = async () => {
  try {

    const result = await signInWithPopup(auth, googleProvider);

    const token = await result.user.getIdToken();

    return token;


  } catch (error) {
    console.error("Google Sign In Error:", error.message);
    return null;
  }
}




