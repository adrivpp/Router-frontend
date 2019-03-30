import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component { 
  render() {
    // const { isLogged, user, logout } = this.props;
    // const { username } = user;
    // if (isLogged) {      
    //   return <div>
    //     <p>username: { username }</p>
    //     <p onClick={logout}>Logout</p>
    //   </div>
    // } else {
    //   return <div>
    //     <Link to='/login'>Login</Link>
    //     <Link to='/signup'>Signup</Link>
    //   </div>
    // }  

    return (
      <>       
        <nav className="nav-bar">
          <Link to='/'><i className="fas fa-home"></i></Link>
          <Link to='/travels'><i className="fas fa-search"></i></Link>
          <Link to='/travels/new'><i className="fas fa-plus-circle"></i></Link>
          <Link to='/profile'><i className="far fa-user"></i></Link>
          <i className="far fa-envelope-open"></i>
        </nav>
      </>
    )
  }
}

export default withAuth(Navbar);