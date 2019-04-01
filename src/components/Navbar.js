import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import Badge from './Badge';
import NotificationsCard from './NotificationsCard';
import ShowDetails from './ShowDetails';

class Navbar extends Component { 

  state = {
    hasClick: false
  }

  handleClick =() => {    
    this.setState({
      hasClick: !this.state.hasClick
    })
  }
 
  componentDidMount() {
    this.props.update()    
  }

  render() {        
    
    const { user, logout, isLogged } = this.props
    return (    
      <section className="nav-bar-section">  
        <nav className="nav-bar">        
          {isLogged ? <i className="far fa-bell" onClick={this.handleClick}>
          <Badge>{user.notifications.length}</Badge></i> : null}          
          <Link to='/travels'><i className="fas fa-search"></i></Link>
          <Link to='/travels/new'><i className="fas fa-plus-circle"></i></Link>
          <Link to='/profile'><i className="far fa-user"></i></Link>
          {isLogged ? <i onClick={logout} className="fas fa-sign-out-alt"></i> : null}
        </nav>
        <ShowDetails hasClick={this.state.hasClick}>
          <div className="notifications">
            <NotificationsCard/>
          </div>
        </ShowDetails>
     </section>
    )
  }
}

export default withAuth(Navbar);