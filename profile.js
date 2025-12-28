import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const profileBox = document.getElementById("profileBox");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html"; // redirect if not logged in
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    profileBox.innerHTML = `
      <p><strong>Email:</strong> ${user.email}</p>
      <p>No extra profile data found</p>
    `;
    return;
  }

  const data = snap.data();

  profileBox.innerHTML = `
    <p><strong>Name:</strong> ${data.name || "N/A"}</p>
    <p><strong>Email:</strong> ${data.email || user.email}</p>
    <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
  `;
});

// Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
