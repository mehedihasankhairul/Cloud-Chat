import React from 'react';
import './Login.css';
import logo from '../../Images/logo.jpg';
import { Button } from '@material-ui/core';
import {auth, provider} from './firebase';




function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch(error => alert(error.message))
    }

    return (
        <div className="login">

            <div className="login_logo">
            <img src={logo} alt="" />
            <h1>Cloud Chat</h1>
            </div>
            
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
