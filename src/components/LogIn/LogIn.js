import React, { useContext } from 'react';
import "firebase/auth";
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleSignInWithEmail, onBlurHandler } from '../Form/loginManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


const LogIn = () => {
    const [user, setUser] = useContext(UserContext);
    const { register , handleSubmit, errors } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const handleOnBlur = (event) => {
        setUser(onBlurHandler(user, event))
    }
    const onSubmit = () => {
        handleSignInWithEmail(user)
        .then(res => {
            setUser(res)
            history.replace(from);
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2><span className='highlight'><FontAwesomeIcon icon={faUser} /></span> User Login</h2>
                <input name="email" onBlur={handleOnBlur} ref={register({ required: true })} placeholder='Your email'/>
                {errors.email && <span className='text-warning'>Email is required!</span>}
                <br/>
                <input type='password' name="password" onBlur={handleOnBlur} ref={register({ required: true })} placeholder='password'/>
                {errors.password && <span className='text-warning'>Password is required!</span>}
                <br/>
                <input type="submit" value='Login' className='submitBtn mt-4'/>
            </form>
        </div>
    );
};

export default LogIn;