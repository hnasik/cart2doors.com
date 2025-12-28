// forgot-password.js
import { auth } from "./firebase.js";
import { sendPasswordResetEmail } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

window.resetPassword = function () {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Please enter your email");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset link sent ??\nCheck your email inbox");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};
