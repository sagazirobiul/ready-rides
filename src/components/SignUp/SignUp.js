import React, { useContext } from 'react';
import "firebase/auth";
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleSignUpWithEmail, onBlurHandler } from '../Form/loginManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const SignUp = () => {
    const [user, setUser] = useContext(UserContext);
    const { register , handleSubmit, errors } = useForm();
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const handleOnBlur = (event) => {
        setUser(onBlurHandler(user, event))
    }
    const onSubmit = () => {
        handleSignUpWithEmail(user)
        .then(res => {
            setUser(res)
            history.replace(from);
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <h2><span className='highlight'><FontAwesomeIcon icon={faUser} /></span> Sign Up Now</h2>
            <input name="name" onBlur={handleOnBlur} ref={register({ required: true })} placeholder='Your name' />
            {errors.name && <span className='text-warning'>Name is required!</span>}
            <br/>
            <input name="email" onBlur={handleOnBlur} ref={register({ required: true })} placeholder='Your email'/>
            {errors.email && <span className='text-warning'>Email is required!</span>}
            <br/>
            <input type='password' name="password" onBlur={handleOnBlur} ref={register({ required: true })} placeholder='password'/>
            {errors.password && <span className='text-warning'>Password is required!</span>}
            <br/>
            <input type="submit" value='Create an account' className='submitBtn'/>
            </form>
        </div>
    );
};

export default SignUp;