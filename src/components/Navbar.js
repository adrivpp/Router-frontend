import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import Badge from './Badge';

class Navbar extends Component { 

  state = {
    hasClick: false,         
  }

  handleClick =() => {    
    this.setState({
      hasClick: !this.state.hasClick
    })
  }     

  render() {                   
    const { logout, isLogged, user } = this.props;        
      return (    
        <section className="nav-bar-section">  
          <nav className="nav-bar">       
            {
            isLogged ?             
            <Link to={`/${user._id}/notifications`}><i className="far fa-bell" onClick={this.handleClick}>
            <Badge /></i></Link> :  null                 
            } 
            <Link to='/travels'><i className="fas fa-search"></i></Link>
            <Link to='/travels/new'><i className="fas fa-plus-circle"></i></Link>
            <Link to='/profile'><i className="far fa-user"></i></Link>
            { isLogged ? <i onClick={logout} className="fas fa-sign-out-alt"></i> : null }
          </nav>          
      </section>
      )                    
    }
  } 

export default withAuth(Navbar);