import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCLkRYbe4wjDHiAjRlIsdVBiqXK1_cXSVU",
    authDomain: "log-in-and-sign-up-page-9b9b3.firebaseapp.com",
    projectId: "log-in-and-sign-up-page-9b9b3",
    storageBucket: "log-in-and-sign-up-page-9b9b3.appspot.com",
    messagingSenderId: "243518604076",
    appId: "1:243518604076:web:5cf05bc9140339c8b26289"
};
const app = initializeApp(firebaseConfig);
export const database = getAuth(app);