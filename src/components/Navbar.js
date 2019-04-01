import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import Badge from './Badge';
// import NotificationsCard from './NotificationsCard';

class Navbar extends Component { 
 
  componentDidMount() {
    this.props.update()    
  }

  render() {        
    const { user, logout, isLogged } = this.props
    return (    
      <>  
        <nav className="nav-bar">        
          {isLogged ? <i className="far fa-bell"><Badge>{user.notifications.length}</Badge></i> : null}          
          <Link to='/travels'><i className="fas fa-search"></i></Link>
          <Link to='/travels/new'><i className="fas fa-plus-circle"></i></Link>
          <Link to='/profile'><i className="far fa-user"></i></Link>
          {isLogged ? <i onClick={logout} className="fas fa-sign-out-alt"></i> : null}
        </nav>
      {/* <NotificationsCard/> */}
     </>
    )
  }
}

export default withAuth(Navbar);