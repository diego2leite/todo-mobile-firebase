import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react';

import firebase from 'firebase';
import 'firebase/auth';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState({});

  const onAuthStateChanged = useCallback((userState) => {
      // console.log("firebase user", userState);
      setData({
        user: userState
      })
  },[]);

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return () => unsubscriber(); // unsubscribe on unmount
  }, [onAuthStateChanged]);

  const signUp = useCallback(async ({ email, password }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        console.log('firebase user created');
      })
      .catch(error => {
        console.log('firebase signUp error', error);
      })
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        console.log('firebase signed in');
      }).catch(error => {
        console.log('firebase signIn error', error);
      })
  }, []);

  const signOut = useCallback(async () => {
    firebase 
      .auth()
      .signOut()
      .then(resp => {
        console.log("signed out");
      })
      .catch(error => {
        console.log('firebase signOut error', error);
      })
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };