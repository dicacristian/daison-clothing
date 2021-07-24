import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDnYSbCDmJKvsrGiOZ0MmY_54uys3awqbg",
  authDomain: "e-commerce-project-01.firebaseapp.com",
  databaseURL:
    "https://e-commerce-project-01-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "e-commerce-project-01",
  storageBucket: "e-commerce-project-01.appspot.com",
  messagingSenderId: "594044682977",
  appId: "1:594044682977:web:7ba9274ee713bd8193eda0",
  measurementId: "G-DXC5F4E41P",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
