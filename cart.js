import { auth, db } from "./firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const cartList = document.getElementById("cartList");
const totalAmount = document.getElementById("totalAmount");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    cartList.innerHTML = "? Please login to view cart";
    return;
  }
  loadCart(user.uid);
});

async function loadCart(uid) {
  cartList.innerHTML = "";
  let total = 0;

  const cartRef = collection(db, "carts", uid, "items");
  const snapshot = await getDocs(cartRef);

  if (snapshot.empty) {
    cartList.innerHTML = "?? Your cart is empty";
    totalAmount.innerText = "Total: ?0";
    return;
  }

  snapshot.forEach((docSnap) => {
    const item = docSnap.data();
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartList.innerHTML += `
      <div class="item">
        <img src="${item.image}">
        <div class="info">
          <div class="name">${item.name}</div>
          <div class="price">?${item.price}</div>
          <div class="qty">Qty: ${item.quantity}</div>
        </div>
        <button class="remove" onclick="removeItem('${docSnap.id}')">X</button>
      </div>
    `;
  });

  totalAmount.innerText = `Total: ?${total}`;
}

// Remove item
window.removeItem = async function (itemId) {
  const user = auth.currentUser;
  if (!user) return;

  await deleteDoc(doc(db, "carts", user.uid, "items", itemId));
  loadCart(user.uid);
};
