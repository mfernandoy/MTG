import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

import { getFirestore, getDoc, doc, onSnapshot, deleteDoc, updateDoc, query, collection, where, addDoc, getDocs} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBZKnDxAtAOcaSnYtXdUEQ2xX4hdW2laJs",
  authDomain: "mtg-prueba.firebaseapp.com",
  projectId: "mtg-prueba",
  storageBucket: "mtg-prueba.appspot.com",
  messagingSenderId: "264705959398",
  appId: "1:264705959398:web:54fd11bf2c6215884b2227"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const obtener = (id) => {
  return getDoc(doc(db, 'cartas', id))
}

export const info = (data) => {
  onSnapshot(collection(db, 'cartas'), data)
}

export const eliminar = (id) => {
  deleteDoc(doc(db, 'cartas', id))
}

export const actualizar = (id, data) => {
  updateDoc(doc(db, 'cartas', id), data)
}
export const anadir = async (cartas) => {
  const tip = query(collection(db, 'cartas'), where("serie", "==", cartas.serie));

  const querySnapshot = await getDocs(tip);

  if (querySnapshot.empty) {
    await addDoc(collection(db, 'cartas'), cartas);
    return true;
  } else {
    return false;
  }
}