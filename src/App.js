import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CloudChatHome from './Components/CloudChatHome';
import { auth } from './features/Login/firebase';
import Login from './features/Login/Login';
import { selectUser, login, logout } from './features/userSlice';





function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // login user
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      }
      else {
        // logout user
        dispatch(logout())
      }
    })
  })


  return (
    <div className="app">
      {
        user ?
          <CloudChatHome /> : <Login />
      }
    </div>
  );
}

export default App;
