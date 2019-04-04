import React, { Component } from 'react'
import authService from '../lib/auth-service';
import Loader from '../components/Loader';
import Error from '../components/Error';

export const AuthContext = React.createContext();

const { Provider, Consumer }  = AuthContext;

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <Consumer>
          {(authStore) => {
            return <Comp 
              isLogged={authStore.isLogged}
              user={authStore.user}
              logout={authStore.logout}
              login={authStore.login}
              signup={authStore.signup}
              update={authStore.update}
              {...this.props} />
          }}
        </Consumer>
      )
    }    
  }
}

export default class AuthProvider extends Component {
  state = {
    isLogged: false,
    user: {},
    status: 'loading',        
  }

  updateUser = () => {
    const { username } = this.state.user;
    return authService.update(username)
    .then((user) => {      
      this.setState({
        user,
      })
    })
    .catch((error) => {
      this.setState({
        status: 'hasError'
      })
    })
  }

  setUser = (user) => {
    this.setState({
      isLogged: true,
      user,
    })
  }

  logoutUser = () => {
    return authService.logout()
      .then(() => {
        this.setState({ 
          isLogged: false,
          user: {},
        });
      })
      .catch(err => err.response.data)
  }

  loginUser = (body) => {
    return authService.login(body)
      .then((user) => {
        this.setUser(user);       
      })
      .catch((err) => err.response.data) 
  }

  signupUser = (body) => {
    return authService.signup(body)
      .then((user) => {
        this.setUser(user);
      })
      .catch((err) => err.response.data)
  }

  componentDidMount() {
    authService.me()
      .then((user) => {
        this.setState({
          isLogged: true,
          user,
          status: 'loaded'
        })
      })
      .catch(() => {        
        this.setState({ 
          isLogged: false,
          user: {},   
          status: 'loaded'       
        });
      })
  }

  render() {
    const { isLogged, user, status } = this.state;
    const { children } = this.props;
    switch (status) {
      case 'loading':
        return <Loader/>  
      case 'hasError':  
      return <Error/>  
      default:
        return (
          <Provider value={
            { isLogged,
              user,              
              logout: this.logoutUser, 
              login: this.loginUser,
              signup: this.signupUser,
              update: this.updateUser,
            }}>
            {children}
          </Provider>    
        );
    }
  }
}
