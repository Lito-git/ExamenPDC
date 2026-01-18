import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyBhFhEA_H3XZxaIpBftZP92zq8ZyoXprbU",

    authDomain: "tienda-react-2b2a8.firebaseapp.com",

    projectId: "tienda-react-2b2a8",

    storageBucket: "tienda-react-2b2a8.firebasestorage.app",

    messagingSenderId: "434665056450",

    appId: "1:434665056450:web:9de9e601f73525e436f35b"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);