importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyAFA2QPl3-RjjVRcPWJv6Pe2Ht1igv-unY",
    authDomain: "harshchatapp-b38cb.firebaseapp.com",
    projectId: "harshchatapp-b38cb",
    storageBucket: "harshchatapp-b38cb.firebasestorage.app",
    messagingSenderId: "251352935777",
    appId: "1:251352935777:web:d830b5aff673d958042920",
    measurementId: "G-HK28KWMYDE"
  };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log(
  //   "[firebase-messaging-sw.js] Received background message ",
  //   payload
  // );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});



