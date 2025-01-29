// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging,getToken,onMessage} from "firebase/messaging"
import {GoogleAuthProvider,getAuth,signInWithPopup} from "firebase/auth"
import {toast } from 'react-toastify';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFA2QPl3-RjjVRcPWJv6Pe2Ht1igv-unY",
  authDomain: "harshchatapp-b38cb.firebaseapp.com",
  projectId: "harshchatapp-b38cb",
  storageBucket: "harshchatapp-b38cb.firebasestorage.app",
  messagingSenderId: "251352935777",
  appId: "1:251352935777:web:d830b5aff673d958042920",
  measurementId: "G-HK28KWMYDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const message=getMessaging(app);

onMessage(message, (payload) => {
    console.log('Notification received in foreground:', payload);

    // Access the notification data
    const { title, body, icon } = payload.notification; // Standard notification fields
    // const { userId, messageId, extraInfo } = payload.data; // Custom data fields

    // Display the notification within your app (using custom logic, such as an alert)
    // alert(`${title}: ${body}`);
    toast.success(`${title}: ${body}`);

    // You can also use the custom data (e.g., userId or messageId) for other actions
    // console.log('User ID:', userId);
    // console.log('Message ID:', messageId);
  });

export const getFcmToken = async () => {
    try {
      // Request notification permission from the user
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        
        // Now that permission is granted, you can get the FCM token
        const token = await getToken(message, {
          vapidKey: 'BDgycFlIQgMY5M97wkgJ60muZL3oTeLBAF1Gih8CvGtA7QjCJcmDSWWEL1xRxjvNitA1UUmxvOBdWGR8LUniSN8',
        });

        if (token) {
          console.log('FCM Token:', token);
          return token; // You can save or use the token for sending notifications
        }
      } else {
        console.log('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };
  