import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ?? Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const card = document.getElementById("productCard");

async function loadProduct() {
  if (!productId) {
    card.innerHTML = "? Product ID missing in URL";
    return;
  }

  try {
    const ref = doc(db, "products", productId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      card.innerHTML = "? Product not found";
      return;
    }

    const p = snap.data();

    card.innerHTML = `
      <img src="${p.image}">
      <div class="title">${p.name}</div>
      <div class="price">?${p.price}</div>
      <div class="desc">${p.description}</div>
      <div class="stock">Stock: ${p.stock}</div>
    `;
  } catch (error) {
    card.innerHTML = "?? Error loading product";
    console.error(error);
  }
}

loadProduct();
