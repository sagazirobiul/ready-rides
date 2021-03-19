import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination'
import LogIn from './components/LogIn/LogIn'
import Form from './components/Form/Form';
import Booking from './components/Booking/Booking';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();
function App() {
  const [user, setUser] = useState({
    name:'',
    email:'',
    password:'',
    error:'',
    success: false
  })
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Header/>
        <h2>{user.email}</h2>
        <Switch>
            <PrivateRoute path="/destination/:name">
              <Destination />
            </PrivateRoute>
            <PrivateRoute path="/destination">
              <Destination />
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
  );
}

export default App;
