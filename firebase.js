// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlO_OlWnPBNth1dcamrOJIvJVnyPbsCTE",
  authDomain: "formulario-c4a02.firebaseapp.com",
  projectId: "formulario-c4a02",
  storageBucket: "formulario-c4a02.appspot.com",
  messagingSenderId: "679722861567",
  appId: "1:679722861567:web:8345010a4dddc776e85dca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export const anadir = async (form) => {
  const q = query(collection(db, 'formulario'), where("email", "==", form.email));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    await addDoc(collection(db, 'formulario'), form);
    return true;
  } else {
    return false;
  }
}

export const info = (data) => {
  onSnapshot(collection(db, 'formulario'), data)
}

export const eliminar = (id) => {
  deleteDoc(doc(db, 'formulario', id))
}

export const obtener = (id) => {
  return getDoc(doc(db, 'formulario', id))
}

export const actualizar = (id, data) => {
  updateDoc(doc(db, 'formulario', id), data)
}