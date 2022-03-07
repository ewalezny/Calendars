import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCzdUrG0K8ujvsFl2jwSyOj1Pus0HwnZRs",
    authDomain: "calendars-3ab51.firebaseapp.com",
    projectId: "calendars-3ab51",
    storageBucket: "calendars-3ab51.appspot.com",
    messagingSenderId: "890787498203",
    appId: "1:890787498203:web:f16ec51fbffdcfed92a4fe",
    measurementId: "G-L4HKYEK1XQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default analytics;
