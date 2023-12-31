import { getApp, getApps, initializeApp } from 'firebase/app';
import * as firestore from 'firebase/firestore';
 
// Configuração do app firebase web
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}
 
// Inicializando firebase
const app = !getApps().length ? initializeApp( firebaseConfig ) : getApp()
const dataBase = firestore.getFirestore(app);
 
export { dataBase, firestore }