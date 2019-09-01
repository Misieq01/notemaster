import app from './config';
import firebase from 'firebase'

let db = firebase.firestore(app)

export default db;