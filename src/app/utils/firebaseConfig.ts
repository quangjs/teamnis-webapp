// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCFgZFACsZXCqdbQ50jWxj7Wsh3gH8unfI',
  authDomain: 'teamnis-95982.firebaseapp.com',
  projectId: 'teamnis-95982',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
