import React, { useState, useEffect, useMemo } from "react";

import firebase from "../../FireBase/config";
import db from "../../FireBase/database";

import AuthenticationPanel from "../AuthenticationPanel/AuthenticationPanel";
import AppCore from "../AppCore/AppCore";
import LoadingScreen from "../../Components/LoadingScreen";

import * as action from "../../Store/Actions/ActionType";
import { connect } from "react-redux";

const App = ({
  notes,
  labels,
  dataChange,
  LoadServerData,
  LoadLabels,
  LoadNotes,
  DataIsSaved
}) => {
  const currentUser = firebase.auth().currentUser;
  const [isLoading, setLoading] = useState(true);

  // AuthListener checks if user is signIN
  const AuthListener = () => {
    // Listening to user change
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              //Load Data to server_data reducer
              LoadServerData(doc.data());
              //Load Data to notes and labels reducers
              LoadLabels(doc.get("labels"));
              LoadNotes(doc.get("notes"));
              setLoading(false);
            } else {
              console.log("No user data");
            }
          });
      }
    });
  };
  useEffect(AuthListener, []);
  useMemo(() => {
    if (currentUser !== null && dataChange === true) {
      console.log("fired");
      db.collection("users")
        .doc(currentUser.uid)
        .update({ notes: notes, labels: labels });
      DataIsSaved();
    }
  }, [notes, labels, dataChange, currentUser, DataIsSaved]);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>{currentUser ? <AppCore /> : <AuthenticationPanel />}</div>
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
      dispatch({ type: action.LOAD_LABELS_FROM_SERVER, data: data }),
    DataIsSaved: () => dispatch({ type: action.DATA_IS_SAVED })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
