import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCzdUrG0K8ujvsFl2jwSyOj1Pus0HwnZRs",
    authDomain: "calendars-3ab51.firebaseapp.com",
    projectId: "calendars-3ab51",
    storageBucket: "calendars-3ab51.appspot.com",
    messagingSenderId: "890787498203",
    appId: "1:890787498203:web:f16ec51fbffdcfed92a4fe",
    measurementId: "G-L4HKYEK1XQ"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch(err) {
        console.error(err);
        alert(err.message);
    }
}

const logout = () => {
    signOut(auth);
}

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout
}
