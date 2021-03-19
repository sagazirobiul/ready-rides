import React, { useContext } from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import {NavLink} from "react-router-dom";
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
    const [user, setUser] = useContext(UserContext);
    const handleLogOut = () => {
        firebase.auth().signOut().then(() => {
            const userInfo = {
                name: '',
                email: '',
                error: '',
                success: false
            }
            setUser(userInfo)
          }).catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo)
          });
    }
    const menuStyle = {
        color: '#00D2D3',
        borderBottom: '3px solid #00D2D3'
    }
    return (
        <Navbar bg="dark" expand="lg" className="nav-bar">
            <Container>
                <div className="brandName">
                    <NavLink active to="/">Ready Rides</NavLink>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto navBarMenu" >
                        <NavLink activeStyle={menuStyle} exact to='/'>Home</NavLink>
                        <NavLink activeStyle={menuStyle} to='/destination'>Destination</NavLink>
                        <NavLink to='/login'>
                        {user.success ? <button onClick={handleLogOut}>Log Out</button>: 
                        <button>Login</button>}
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;