import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import firebase from '../../config/config'
import db from '../../config/database'

import ApplicationCore from '../ApplicationCore'
import AuthenticationPanel from '../AuthenticationPanel/AuthenticationPanel'
import LoadingScreen from '../../Components/LoadingScreen'

const App = props => {
  const [isUser, setIsUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  console.log('Notes: ',props.notes)
  console.log('Labels: ',props.labels)
  console.log('ID: ',props.id)

  // AuthListener checks if user is signIN, if it is then loads user data from firestore to redux
  const AuthListener = () => {
    // Listening to user change
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //Get his data
        db.collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              // Load data to redux state
              props.LoadData(doc.data())
            } else {
              console.log('No such a document')
            }
          })
        // Change display from AuthenticationPanel to ApplicationCore
        setIsUser(user)
      } else {
        // If there is no user then change display to AuthenticationPanel
        setIsUser(null)
      }
      // Loading data takes time so I displaying LoadingScreen over time
      // There is line of code which close LoadingScreen
      setTimeout(() => setIsLoading(false), 500)
    })
  }

  // Fire AuthListener when page is loaded
  useEffect(AuthListener, [])

  //This updating firestore data every each note editing or label changing
  useEffect(() => {
    return () => {
      // This IF is important because its prevent to load blank data on page loading to firestore
      if (!isLoading) {
        db.collection('users')
          .doc(firebase.auth().currentUser.uid)
          .update({
            'noteData.id': props.id + 1,
            'noteData.labels': props.labels,
            'noteData.notes': props.notes,
          })
      } else {
        return
      }
    }
  }, [
    props.id,
    props.labels,
    props.notes,
    props.editMode,
    isLoading,
  ])

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>{isUser ? <ApplicationCore /> : <AuthenticationPanel />}</div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    id: state.id,
    labels: state.labels,
    notes: state.notes,
    editMode: state.editMode,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    LoadData: data => dispatch({ type: 'LOAD_DATA', data: data }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
