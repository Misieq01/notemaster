import app from "./config";
import firebase from "firebase";

const db = firebase.firestore(app);

export default db;
