import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBisgSDe3ynPyemGLGxAC7jZDPz_2bSMz4",
  authDomain: "serratec-chat.firebaseapp.com",
  databaseURL: "https://serratec-chat.firebaseio.com",
  projectId: "serratec-chat",
  storageBucket: "serratec-chat.appspot.com",
  messagingSenderId: "979631611323",
  appId: "1:979631611323:web:463a990ea881ebf1c7789e",
  measurementId: "G-2DTTCG1P8H"
};

firebase.initializeApp(firebaseConfig);