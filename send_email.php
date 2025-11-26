<?php
// send_email.php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get form values safely
    $name    = htmlspecialchars(trim($_POST["name"] ?? ""));
    $email   = htmlspecialchars(trim($_POST["email"] ?? ""));
    $message = htmlspecialchars(trim($_POST["message"] ?? ""));

    // Your email
    $to = "cart2doors@gmail.com";

    // Email subject
    $subject = "New contact form message from " . $name;

    // Email body
    $body  = "You have received a new message from your website contact form.\n\n";
    $body .= "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n\n";
    $body .= "Message:\n" . $message . "\n";

    // Headers
    // Important: some servers require "From" to be from your domain (e.g. no-reply@yourdomain.com)
    $headers  = "From: no-reply@yourdomain.com\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    // Try to send email
    $mailSent = mail($to, $subject, $body, $headers);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Message Status</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #0f172a;
      color: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .box {
      background: #111827;
      padding: 24px 22px;
      border-radius: 14px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      border: 1px solid #4b5563;
    }
    h1 {
      font-size: 1.4rem;
      margin-bottom: 10px;
    }
    p {
      font-size: 0.9rem;
      color: #9ca3af;
      margin-bottom: 18px;
    }
    a {
      display: inline-block;
      padding: 10px 18px;
      border-radius: 999px;
      background: linear-gradient(120deg, #3b82f6, #a855f7);
      color: #fff;
      text-decoration: none;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="box">
    <?php if (!empty($mailSent) && $mailSent): ?>
      <h1>? Message Sent</h1>
      <p>Thank you for contacting us. We will get back to you soon.</p>
    <?php else: ?>
      <h1>?? Message Failed</h1>
      <p>Sorry, there was a problem sending your message.<br>Please try again later.</p>
    <?php endif; ?>
    <a href="index.html">Back to Home</a>
  </div>
</body>
</html>
