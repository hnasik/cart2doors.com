import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const coinCount = document.getElementById("coinCount");
const withdrawBtn = document.getElementById("withdrawBtn");
const info = document.getElementById("info");

let currentCoins = 0;

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    info.innerText = "Please login";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) return;

  currentCoins = snap.data().superCoins || 0;
  coinCount.innerText = currentCoins;

  if (currentCoins >= 100) {
    withdrawBtn.style.display = "block";
  }
});

// Withdraw Request
window.withdrawCoins = async function () {
  const user = auth.currentUser;
  if (!user) return;

  if (currentCoins < 100) {
    alert("Minimum 100 coins required");
    return;
  }

  // Create withdraw request
  await addDoc(collection(db, "withdraw_requests"), {
    userId: user.uid,
    coins: 100,
    status: "pending",
    createdAt: serverTimestamp()
  });

  // Deduct coins
  await updateDoc(doc(db, "users", user.uid), {
    superCoins: currentCoins - 100
  });

  alert("? Withdraw request sent to admin");
  location.reload();
};
