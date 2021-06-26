import firebase from 'firebase/app'
import 'firebase/firestore'

const configuracion = {
    apiKey: "AIzaSyD8k5zNjXeQM1QrjCuFOmooDO2nQE7KYUY",
    authDomain: "pruebadesarrollador-b023c.firebaseapp.com",
    projectId: "pruebadesarrollador-b023c",
    databaseURL: "https://pruebadesarrollador-b023c.firebaseio.com",
    storageBucket: "pruebadesarrollador-b023c.appspot.com",
    messagingSenderId: "692908126876",
    appId: "1:692908126876:web:d6f23f5844a8ce111eb359",
    measurementId: "G-VY4PD7QNG7"
};
// Initialize Firebase
const fireba = firebase.initializeApp(configuracion);
const conexionBaseDatos = fireba.firestore();

export { conexionBaseDatos}