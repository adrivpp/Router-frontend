import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import ErrorMessages from '../components/ErrorMessages';

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: {}
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
      .then((err) => {       
        this.setState({
          error: err
        })
      })
      
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <section className="auth">
        <div className="overlay">
          <h2>Login</h2>
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
              {error.message ? <ErrorMessages error={error}/> : null }
              <p>Dont have an account? 
                <Link to={"/signup"}>  Sign up</Link>
              </p>
            </div>
            <button className="button"  type="submit" value="Login">Login</button>
          </form>
        </div>
      </section>
    )
  }
}

export default withAuth(Login);
