import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import pointer from '../images/pointer.png'

class Home extends Component {
  render() {
    return (
      <section className="home-container">
        <div className="banner">
          <div className="brand">
            <h1>Router</h1><img src={pointer} alt="pointer"/>
            <p>Adventure awaits</p>        
          </div>
          <div>
            <Link className="button" to='/signup'>Signup</Link>
            <Link className="button login" to='/login'>Login</Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;