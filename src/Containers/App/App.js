import React, { useState, useEffect } from "react";

import firebase from "../../config/config";

import AuthenticationPanel from "../AuthenticationPanel/AuthenticationPanel";
import AppCore from "../AppCore/AppCore";
import LoadingScreen from "../../Components/LoadingScreen";

import * as action from "../../Store/Actions/ActionType";
import { connect } from "react-redux";
import db from "../../config/database";

const App = props => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  // AuthListener checks if user is signIN
  const AuthListener = () => {
    // Listening to user change
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              //Load Data to server_data reducer
              props.LoadServerData(doc.data());
              //Load Data to notes and labels reducers
              props.LoadLabels(doc.get("labels"));
              props.LoadNotes(doc.get("notes"));
              setLoading(false);
            } else {
              console.log("No user data");
            }
          });
      } else {
        setUser(null);
        setTimeout(() => setLoading(false), 500);
      }
    });
  };
  useEffect(AuthListener, []);
  useEffect(() => {
    if (!isLoading && firebase.auth().currentUser !== null) {
      console.log("fired");
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({ notes: props.notes, labels: props.labels });
    }
  }, [props.notes, props.labels, props.dataChange, isLoading]);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>{user ? <AppCore /> : <AuthenticationPanel />}</div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.notes.notes,
    labels: state.labels.labels,
    dataChange: state.servData.dataChange
  };
};

const mapDispatchToProps = dispatch => {
  return {
    LoadServerData: data =>
      dispatch({ type: action.LOAD_SERVER_DATA, data: data }),
    LoadNotes: data =>
      dispatch({ type: action.LOAD_NOTES_FROM_SERVER, data: data }),
    LoadLabels: data =>
      dispatch({ type: action.LOAD_LABELS_FROM_SERVER, data: data })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
