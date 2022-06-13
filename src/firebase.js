import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBElcnuQpxS2EWEXlJ9pZEQYUZN2eYojMk",
	authDomain: "travlocally-34376.firebaseapp.com",
	projectId: "travlocally-34376",
	storageBucket: "travlocally-34376.appspot.com",
	messagingSenderId: "345830976258",
	appId: "1:345830976258:web:55edf9430cfee44b3d701b",
	measurementId: "G-BX2C6T3723",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { onSnapshot, doc };
