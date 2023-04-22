import React, { useContext } from 'react';
import { AuthContext } from './firebaseAuthContext';
import { Route, Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
  const authValue: any = useContext(AuthContext);
  if (authValue.userDataPresent) {
    if (authValue.user == null) {
      return <Navigate to={props.redirectTo}></Navigate>;
    } else {
      return <Route path={props.path}>{props.children}</Route>;
    }
  } else {
    return null;
  }
}
