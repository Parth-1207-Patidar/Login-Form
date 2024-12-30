import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBMr9LH-Gtf10pazU6IQvPENSCTqGDf3Mg",
    authDomain: "myfirstproject-80698.firebaseapp.com",
    projectId: "myfirstproject-80698",
    storageBucket: "myfirstproject-80698.firebasestorage.app",
    messagingSenderId: "375596073067",
    appId: "1:375596073067:web:979f1ef08179fa4e6af12e",
    measurementId: "G-FJV7DLPY9G",
    databaseURL: "https://myfirstproject-80698-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);