import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination'
import Form from './components/Form/Form';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import BookingReview from './components/BookingReview/BookingReview';


export const UserContext = createContext();
function App() {
  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
    error:'',
    success: false
  })
  const [booking, setBooking] = useState({
    form: '',
    to: '',
    date: '',
    name: '',
    image: '',
    passenger:'',
    price: ''
  });
  const [bookingInfo, setBookingInfo] = useState([])
  return (
    <div className='App'>
      <UserContext.Provider value={[user, setUser, booking, setBooking, bookingInfo, setBookingInfo]}>
        <Router>
          <Header/>
          <div className='userHighlight'>
            <p>{user.success && user.email} <FontAwesomeIcon icon={faUser}/></p> 
          </div>
          <Switch>
              <PrivateRoute path="/destination/:name">
                <Destination />
              </PrivateRoute>
              <PrivateRoute path="/destination">
                <Destination />
              </PrivateRoute>
              <PrivateRoute path="/review">
                <BookingReview/>
              </PrivateRoute>
              <Route path="/login">
                <Form/>
              </Route>
              <Route path="/">
                <Home/>
              </Route>
            </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
