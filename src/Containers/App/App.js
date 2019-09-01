import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import firebase from "../../config/config";
import db from "../../config/database";

import ApplicationCore from "../ApplicationCore";
import AuthenticationPanel from "../AuthenticationPanel/AuthenticationPanel";
import LoadingScreen from "../../Components/LoadingScreen";

const App = props => {
  console.log(props.data);
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
              console.log("fuckup");
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
      setTimeout(() => setIsLoading(false), 500);
    });
  };

  useEffect(AuthListener, []);

  useEffect(() => {
    return () => {
      if (!(props.data.notes.length === 0 && props.data.labels.length === 0)) {
        console.log("kurwa");
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            "noteData.id": props.data.id + 1,
            "noteData.labels": props.data.labels,
            "noteData.notes": props.data.notes
          });
      } else {
        return;
      }
    };
  }, [props.data.id, props.data.labels, props.data.notes]);

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
