import app from "./config";
import firebase from "firebase";

const auth = firebase.auth(app);

export default auth;
