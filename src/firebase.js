import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBzSc-BSzXx4ADiSllS357tQLrz6bzbE9w',
  authDomain: 'whatsapp-clone-56efc.firebaseapp.com',
  projectId: 'whatsapp-clone-56efc',
  storageBucket: 'whatsapp-clone-56efc.appspot.com',
  messagingSenderId: '608029036602',
  appId: '1:608029036602:web:534ffdd8ef83fe65e52503',
  measurementId: 'G-6CBJNZYJ1N',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
