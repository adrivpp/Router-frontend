import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Signup extends Component {

  state = {
    username: "",
    password: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.props.signup({ username, password })
      .then(() => {
        this.setState({
            username: "",
            password: "",
        });
      })
      .catch((error) => {
        console.log(error)              
     })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <section className="auth">
        <div className="overlay">
          <h2>Sign up</h2>
          <form onSubmit={this.handleFormSubmit}>
            <div className="user">              
              <div className="user-input">          
                <i className="far fa-user input-user"></i>          
                <input type="text" name="username" required={true} value={username} onChange={this.handleChange} placeholder="username"/>
              </div>
            </div>
            <div className="user">              
              <div className="user-input">
                <i className="fas fa-lock"></i>
                <input type="password" name="password" required={true} value={password} onChange={this.handleChange} placeholder="password"/>
              </div>
              <p>Already have account? 
                <Link to={"/login"}>  Login</Link>
              </p>
            </div>
            <button className="button"  type="submit" value="Login">Signup</button>
          </form>
        </div>
      </section>     
    )
  }
}

export default withAuth(Signup);