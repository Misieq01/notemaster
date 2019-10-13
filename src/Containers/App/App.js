import React, { useState, useEffect, useMemo } from "react";

import AuthenticationPanel from "../AuthenticationPanel/AuthenticationPanel";
import AppCore from "../AppCore/AppCore";
import LoadingScreen from "../../Components/LoadingScreen";

import auth from "../../Server/auth";
import db from "../../Server/database";

import * as action from "../../Store/Actions/ActionType";
import { connect } from "react-redux";

const App = ({
  dataChange,
  notes,
  labels,
  LoadLabels,
  LoadNotes,
  SaveData
}) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // AuthListener checks if user is signIN
  const AuthListener = () => {
    // Listening to user change
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              //Load Data to notes and labels reducers
              LoadLabels(doc.get("labels"));
              LoadNotes(doc.get("notes"));
              setLoading(false);
              setUser(true);
            } else {
              console.log("No user data");
            }
          });
      } else {
        setLoading(false);
        setUser(false);
      }
    });
  };
  useEffect(AuthListener, []);
  useMemo(() => {
    if (auth.currentUser !== null && dataChange === true) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .update({ notes: notes, labels: labels });
      SaveData();
    }
  }, [notes, labels, dataChange, SaveData]);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>{!user ? <AuthenticationPanel /> : <AppCore />}</div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.notes.notes,
    labels: state.labels.labels,
    dataChange: state.editing.dataChange
  };
};

const mapDispatchToProps = dispatch => {
  return {
    LoadNotes: data => dispatch({ type: action.LOAD_NOTES, data: data }),
    LoadLabels: data => dispatch({ type: action.LOAD_LABELS, data: data }),
    SaveData: () => {
      dispatch({ type: action.DATA_CHANGE, change: false });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
