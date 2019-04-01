import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import pointer from '../images/pointer.png';

class Home extends Component {
  render() {
    return (
      <section className="home-container">
        <div className="overlay">
          <div className="brand">
            <h1 className="brand">Router</h1><img className='pointer' src={pointer} alt="pointer"/>
            <p className="tagline">Adventure awaits</p>        
          </div>
          <div>
            <Link className="button" to='/signup'>Sign up</Link>
            <Link id="login" className="button" to='/login'>Login</Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;