import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import SignUp from '../SignUp/SignUp';
import LogIn from '../LogIn/LogIn';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Form.css'
import { initializeFirebaseApp, handleSignIn } from './loginManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons'


const Form = () => {
    initializeFirebaseApp()
    const [user, setUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const ghProvider = new firebase.auth.GithubAuthProvider();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const signIn = (provider) => {
        handleSignIn(user, provider)
        .then(res => {
            setUser(res);
            history.replace(from);
        })
    }
    return (
        <div className='formCard col-md-4 pb-3'>
            {newUser ? <SignUp/> : <LogIn/>}
            {newUser ?
            <p>Already have an account? <Link to='/login' onClick={() => setNewUser(false)}>Login</Link></p> : 
            <p>Don't have an account? <Link to='/login' onClick={() => setNewUser(true)}>Create an account</Link></p> 
            }
            <p className="or">or</p>
            <button className='googleBtn' onClick={() => signIn(googleProvider)}><FontAwesomeIcon icon={faGoogle} /> Continue with google</button>
            <br/>
            <button className='facebookBtn' onClick={() => signIn(fbProvider)}><FontAwesomeIcon icon={faFacebook} /> Continue with facebook</button>
            <br/>
            <button className='githubBtn' onClick={() => signIn(ghProvider)}><FontAwesomeIcon icon={faGithub} /> Continue with github</button>
            <p className="mt-3 text-danger">{user.error}</p>
        </div>
    );
};

export default Form;