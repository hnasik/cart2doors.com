// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDK5UBQlDWzg4pyLyclkmLA_aPzV3DrQKw",
  authDomain: "cart2doors-420f9.firebaseapp.com",
  projectId: "cart2doors-420f9",
  storageBucket: "cart2doors-420f9.firebasestorage.app",
  messagingSenderId: "647885662102",
  appId: "1:647885662102:web:bd8d561ffcbbbadb39dfb7",
  measurementId: "G-LYMDT53D96"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
