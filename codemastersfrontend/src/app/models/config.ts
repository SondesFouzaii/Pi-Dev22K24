import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDoy-PCI0yrsxIoZEHbP5eOsrPJzFF0Qj4",
    authDomain: "angular-poker-25c4a.firebaseapp.com",
    projectId: "angular-poker-25c4a",
    storageBucket: "angular-poker-25c4a.appspot.com",
    messagingSenderId: "950340906698",
    appId: "1:950340906698:web:fd4f4010d29a2495c5ce33",
    measurementId: "G-NBPTCTSSQ9"
};
const cometChat = {
    APP_ID: '2551553d062c5160',
    AUTH_KEY: '5e9c1460d636fb1d76e7a6178c3aa3d442beabbd',
    APP_REGION: 'eu',
    apiKey: '5e9c1460d636fb1d76e7a6178c3aa3d442beabbd',
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { firebaseConfig, cometChat }




//   // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDoy-PCI0yrsxIoZEHbP5eOsrPJzFF0Qj4",
//   authDomain: "angular-poker-25c4a.firebaseapp.com",
//   projectId: "angular-poker-25c4a",
//   storageBucket: "angular-poker-25c4a.appspot.com",
//   messagingSenderId: "950340906698",
//   appId: "1:950340906698:web:fd4f4010d29a2495c5ce33",
//   measurementId: "G-NBPTCTSSQ9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export class GeminiAPI {
    question!: string;
    reponse!: string;
    iduser!: number;
    date!: Date;
    
  }

  export class Callsomeone {
    ansered!:boolean;
    idappelant!: number;
    idappeler!: number;
    message!:string;
    date!: Date;
    
  }