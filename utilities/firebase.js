
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
 const storage = getStorage(app);

 export default storage