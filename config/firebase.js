import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // apiKey: "AIzaSyAB8WLXo-fsZehYBhl6GBxaoszMKIQgnAo",
    // authDomain: "mhsscoe-acm.firebaseapp.com",
    // projectId: "mhsscoe-acm",
    storageBucket: "mhsscoe-acm.appspot.com",
    // messagingSenderId: "633375791064",
    // appId: "1:633375791064:web:c3a5bc849abb2d291244ad",
    // measurementId: "G-K7CLH8TSTG"
  };

const app = initializeApp(firebaseConfig);

export default getStorage(app);
