// products.js
import { auth } from "./firebase.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { getFirestore, collection, getDocs, query, orderBy } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore();

// Auth check
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadProducts();
  }
});

// Load products from Firestore
async function loadProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  try {
    const q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      productList.innerHTML = "<p>No products available</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const product = doc.data();

      productList.innerHTML += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>?${product.price}</p>
          <button onclick="addToCart('${doc.id}')">
            Add to Cart
          </button>
        </div>
      `;
    });

  } catch (error) {
    alert(error.message);
  }
}

// Add to cart (placeholder)
window.addToCart = function (productId) {
  alert("Product added to cart: " + productId);
};

// Navigation
window.goHome = function () {
  window.location.href = "index.html";
};
