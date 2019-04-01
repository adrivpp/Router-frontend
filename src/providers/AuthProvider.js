import React, { Component } from 'react'
import authService from '../lib/auth-service';
import Loader from '../components/Loader';

export const AuthContext = React.createContext(
  // authStore // default value
);

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
    .catch(error => console.log(error))
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
      .catch( error => console.log(error))
  }

  loginUser = (body) => {
    return authService.login(body)
      .then((user) => {
        this.setUser(user);
      })
      .catch(error => console.log(error))
  }

  signupUser = (body) => {
    return authService.signup(body)
      .then((user) => {
        this.setUser(user);
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          status: 'hasError'
        })
        return error         
     })
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
      .catch((error) => {
        console.log(error)
        this.setState({ 
          isLogged: false,
          user: {},
          status: 'hasError'
        });
      })
  }

  render() {
    const { isLogged, user, status } = this.state;
    const { children } = this.props;
    switch (status) {
      case 'loading':
        return <Loader/>
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
