import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';
// import { EmailAuthProvider } from "firebase/auth/web-extension";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCA8tIIGhAVj5EhfuqPYJDJ6TWEYLC7l9Q",
    authDomain: "cwrn-clothing-him.firebaseapp.com",
    projectId: "cwrn-clothing-him",
    storageBucket: "cwrn-clothing-him.firebasestorage.app",
    messagingSenderId: "137355180525",
    appId: "1:137355180525:web:f475e8057bd96c20478fe4"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  });

  export const auth = getAuth();        
  export const signInWithGooglePopup = () =>
     signInWithPopup(auth, provider);
//   export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore(); 


  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef);

    const userSnapshot  = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if(!userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error){
            console.log('error creating the user' , error.message);
            
        }
    }
    return userDocRef;
  };