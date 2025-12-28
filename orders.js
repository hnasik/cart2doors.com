import { auth, db } from "./firebase.js";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const ordersList = document.getElementById("ordersList");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    ordersList.innerHTML = "? Please login to view your orders";
    return;
  }
  loadOrders(user.uid);
});

async function loadOrders(uid) {
  ordersList.innerHTML = "";

  const q = query(
    collection(db, "orders"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    ordersList.innerHTML = "?? No orders found";
    return;
  }

  snapshot.forEach((docSnap) => {
    const order = docSnap.data();

    let itemsHtml = "";
    order.items.forEach(item => {
      itemsHtml += `
        <div class="order-item">
          ${item.name} × ${item.quantity}
        </div>
      `;
    });

    const date = order.createdAt?.toDate().toLocaleString() || "";

    ordersList.innerHTML += `
      <div class="order-card">
        <div class="order-header">
          <span>Order ID: ${docSnap.id}</span>
          <span>?${order.total}</span>
        </div>

        <div class="order-items">
          ${itemsHtml}
        </div>

        <div class="order-status ${order.status}">
          Status: ${order.status}
        </div>

        <div class="order-date">
          ${date}
        </div>
      </div>
    `;
  });
}
