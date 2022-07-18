import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
const {
	initializeAppCheck,
	ReCaptchaV3Provider,
} = require("firebase/app-check");

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

const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider("6Leiev8gAAAAADJSXMVVFcsbhvHbFxyvL4u2O7IZ"),

	// Optional argument. If true, the SDK automatically refreshes App Check
	// tokens as needed.
	isTokenAutoRefreshEnabled: true,
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { onSnapshot, doc };
