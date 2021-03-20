import React, { useContext } from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import { UserContext } from '../../App';
import './Header.css'
import { handleLogOut } from '../Form/loginManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const [user, setUser] = useContext(UserContext);
    const logOut = () => {
        handleLogOut(user)
        .then(res => setUser(res))
    }
    const menuStyle = {
        color: '#0984e3',
        borderBottom: '3px solid #0984e3'
    }
    return (
        <Navbar bg="dark" expand="lg" className="nav-bar">
            <Container>
                <div className="brandName">
                    <NavLink active to="/"><span className='highlight'><FontAwesomeIcon icon={faFire} /></span> Ready <span className='highlight'>Rides</span></NavLink>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto navBarMenu" >
                        <NavLink activeStyle={menuStyle} exact to='/'>Home</NavLink>
                        <NavLink activeStyle={menuStyle} to='/destination'>Destination</NavLink>
                        <NavLink to='/login'>
                        {user.success ? <button className='navBtn' onClick={logOut}>Log Out</button>: 
                        <button className='navBtn'>Login</button>}
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;