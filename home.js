// home.js
import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut }
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy
}
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const db = getFirestore();

/* ================= AUTH CHECK ================= */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    loadBanners();
    loadCategories();
  }
});

/* ================= LOAD BANNERS ================= */
async function loadBanners() {
  const bannerSlider = document.getElementById("bannerSlider");
  bannerSlider.innerHTML = "";

  const q = query(
    collection(db, "banners"),
    where("active", "==", true),
    orderBy("order", "asc")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const banner = doc.data();
    bannerSlider.innerHTML += `
      <div class="banner">
        <img src="${banner.image}" alt="${banner.title}">
      </div>
    `;
  });
}

/* ================= LOAD CATEGORIES ================= */
async function loadCategories() {
  const categoryList = document.getElementById("categoryList");
  categoryList.innerHTML = "";

  const q = query(
    collection(db, "categories"),
    where("active", "==", true),
    orderBy("order", "asc")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const cat = doc.data();
    categoryList.innerHTML += `
      <div class="category-card" onclick="openCategory('${cat.name}')">
        <img src="${cat.image}">
        <p>${cat.name}</p>
      </div>
    `;
  });
}

/* ================= LOGOUT ================= */
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

/* ================= CATEGORY CLICK ================= */
window.openCategory = function (categoryName) {
  window.location.href = `products.html?category=${categoryName}`;
};
