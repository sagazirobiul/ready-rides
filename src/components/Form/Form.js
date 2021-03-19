import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { UserContext } from '../../App';
import SignUp from '../SignUp/SignUp';
import LogIn from '../LogIn/LogIn';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Form.css'


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
const Form = () => {
    const [user, setUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const ghProvider = new firebase.auth.GithubAuthProvider();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const handleSignIn = (provider) => {
        firebase.auth().signInWithPopup(provider).then((result) => {
            var {displayName, email} = result.user;
            const userInfo = {
                name: displayName,
                email: email,
                error: '',
                success: true
            }
            setUser(userInfo)
            history.replace(from);
        }).catch( error => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo)
        });
    }
    return (
        <div className='form'>
            {user.name}
            {newUser ? <SignUp/> : <LogIn/>}
            {newUser ?
            <p>Already have an account? <Link to='/login' onClick={() => setNewUser(false)}>Login</Link></p> : 
            <p>Don't have an account? <Link to='/login' onClick={() => setNewUser(true)}>Create an account</Link></p> 
            }
            <button onClick={() => handleSignIn(googleProvider)}>Continue with google</button>
            <br/>
            <button onClick={() => handleSignIn(fbProvider)}>Continue with facebook</button>
            <br/>
            <button onClick={() => handleSignIn(ghProvider)}>Continue with github</button>
            <p>{user.error}</p>
            {user.success && <p> Your account has been {newUser ? 'created' : 'logged in'} successfully </p>}
        </div>
    );
};

export default Form;