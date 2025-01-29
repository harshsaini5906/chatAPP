import admin from "firebase-admin";
import serviceAccount from "../harshchatapp-b38cb-firebase-adminsdk-gdom5-7606d70dde.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendPushNotification = async (token, messages) => {
  //message is an object
  console.log("token===>>", token, messages);
  const payload = {
    notification: {
      title: messages.title,
      body: messages.body,
    },
  };

  const messageToSend = {
    token: token,
    notification: payload.notification,
  };

  //send the message to specific device
  const response = await admin.messaging().send(messageToSend);

  console.log("message send successfully", response);
};
