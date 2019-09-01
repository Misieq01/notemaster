import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import firebase from "../../config/config";
import db from "../../config/database";

import ApplicationCore from "../ApplicationCore";
import AuthenticationPanel from "../AuthenticationPanel/AuthenticationPanel";
import LoadingScreen from "../../Components/LoadingScreen";

const App = props => {
  const [isUser, setIsUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const AuthListener = () => {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              props.LoadData(doc.data());
            } else {
              console.log("No such a document");
            }
          });
        console.log("chujddd");
        setIsUser(user);
      } else {
        setIsUser(null);
      }
      setTimeout(() => setIsLoading(false), 1000);
    });
  };


  useEffect(AuthListener, []);
    /*useEffect(() => {
    return () => {
      console.log('kurwa');
      db.collection('users').doc(firebase.auth().currentUser.uid).update({
        'noteData.id' : props.data.id,
        'noteData.labels' : props.data.labels,
        'noteData.notes' : props.data.notes

      })
    };
  }, [props.data.id,props.data.labels,props.data.notes])*/


  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>{isUser ? <ApplicationCore /> : <AuthenticationPanel />}</div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    LoadData: data => dispatch({ type: "LOAD_DATA", data: data })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
