import React, { Component } from 'react';
import { Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './providers/AuthProvider';
import TravelProvider from './providers/TravelsProvider';
import Home from './pages/Home';
import { Route } from 'react-router-dom';
import CreateEvent from './pages/CreateEvent';
import TravelList from './pages/TravelList';
import './App.css'
// import TravelDetails from './pages/TravelDetails';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">         
          <Switch>
            <Route exact path="/" component={Home}/>            
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />            
            <PrivateRoute exact path="/travels/new" component={CreateEvent}/>    
            <TravelProvider>      
              <PrivateRoute path="/profile" component={Profile} />              
              <Route path="/travels" component={TravelList}/>   
              {/* <Route exact path="/travels/:id" component={TravelDetails}/> */}
            </TravelProvider>                      
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
