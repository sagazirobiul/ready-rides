import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


const SignUp = () => {
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
    const onSubmit = () => {
        console.log('its fine');
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            var {displayName, email} = userCredential.user;
            const userInfo = {
                name: displayName,
                email: email,
                error: '',
                success: true
            }
            setUser(userInfo)
            history.replace(from);
            console.log('successfully create');
        })
        .catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo)
            console.log('why show error', error.message);
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input name="name" onBlur={handleOnBlur} ref={register({ required: true })} placeholder='Your name' />
            {errors.name && <span>Name is required</span>}
            <br/>
            <input name="email" onBlur={handleOnBlur} ref={register({ required: true })} placeholder='Your email'/>
            {errors.email && <span>Email is required</span>}
            <br/>
            <input type='password' name="password" onBlur={handleOnBlur} ref={register({ required: true })} placeholder='password'/>
            {errors.password && <span>Password is required</span>}
            <br/>
            <input type="submit" value='Create an account'/>
            </form>
        </div>
    );
};

export default SignUp;