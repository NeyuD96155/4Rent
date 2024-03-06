import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAnGebAVW4-o_HAPKtle6DWCX_94LBKPJY",
    authDomain: "rent-ff5e0.firebaseapp.com",
    projectId: "rent-ff5e0",
    storageBucket: "rent-ff5e0.appspot.com",
    messagingSenderId: "73061352561",
    appId: "1:73061352561:web:79589fe75b6d5e4062c7d0",
    measurementId: "G-QT3L21E03V",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
