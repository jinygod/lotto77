import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxLEm_fBj8eih7ANohu81r7ZzJJn5JFlM",
  authDomain: "lotto77-bd9d9.firebaseapp.com",
  projectId: "lotto77-bd9d9",
  storageBucket: "lotto77-bd9d9.appspot.com",
  messagingSenderId: "81790508552",
  appId: "1:81790508552:web:14dfe0cfc35d6fd5a5bbbd",
  measurementId: "G-4CK1V52Z51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 필요한 Firebase 모듈들을 초기화합니다
const auth = getAuth(app);
const db = getFirestore(app);

// 초기화된 모듈들을 export 합니다
export { auth, db, analytics };
