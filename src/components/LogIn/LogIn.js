import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const LogIn = () => {
    const [user, setUser] = useContext(UserContext);
    const { register , handleSubmit, errors } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const handleOnBlur = (event) => {
        const {name, value} = event.target;
        const newUserInfo = {...user};
        newUserInfo[name] = value;
        setUser(newUserInfo);
    }
    const onSubmit = (data) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          const {displayName, email} = userCredential.user;
          const userInfo = {
            name: displayName,
            email: email,
            error: '',
            success: true
            }
          setUser(userInfo)
          history.replace(from);
          console.log('suncess login');
        })
        .catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo)
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="email" onBlur={handleOnBlur} ref={register({ required: true })} placeholder='Your email'/>
                {errors.email && <span>Email is required</span>}
                <br/>
                <input type='password' name="password" onBlur={handleOnBlur} ref={register({ required: true })} placeholder='password'/>
                {errors.password && <span>Password is required</span>}
                <br/>
                <input type="submit" value='Login'/>
            </form>
        </div>
    );
};

export default LogIn;