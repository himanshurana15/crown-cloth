/* eslint-disable no-undef */
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,  
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
// import { EmailAuthProvider } from "firebase/auth/web-extension";

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch,query, getDocs } from "firebase/firestore";


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

  const GoogleProvider = new GoogleAuthProvider();

  GoogleProvider.setCustomParameters({
    prompt: "select_account",
  });

  export const auth = getAuth();        
  export const signInWithGooglePopup = () =>
     signInWithPopup(auth, GoogleProvider);
  export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, GoogleProvider);
  

  export const db = getFirestore(); 


  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');

  } ;


  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db , 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoryMap;
  }

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    
    const userSnapshot  = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error){
            console.log('error creating the user' , error.message); 
        }
    }
    return userDocRef;
  };


  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  };



  export const signOutUser = async () => await signOut(auth);
   


  export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback); 