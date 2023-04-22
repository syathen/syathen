import React, { createContext, useState, useEffect } from 'react';
import { auth } from 'utils/firebase-init';
export const AuthContext = createContext({ userPresent: false, user: null });
export default function FirebaseAuthContext(props) {
  let [state, changeState] = useState({
    userDataPresent: false,

    user: null,
    listener: null,
  });

  useEffect(() => {
    if (state.listener == null) {
      changeState({
        ...state,
        listener: auth.onAuthStateChanged(user => {
          if (user)
            changeState(oldState => ({
              ...oldState,
              userDataPresent: true,
              user: user,
            }));
          else
            changeState(oldState => ({
              ...oldState,
              userDataPresent: true,
              user: null,
            }));
        }),
      });
    }
    return () => {
      if (state.listener) state.listener();
    };
  }, []);

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
}
