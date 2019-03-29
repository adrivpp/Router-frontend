import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import DetailCard from '../components/DetailCard';
import ActivitiesForm from '../components/ActivitiesForm';
import Owner from '../components/Owner';

export const DetailContext = React.createContext();

const { Provider, Consumer }  = DetailContext;

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
              {...this.props} />
          }}
        </Consumer>
      )
    }    
  }
}

export default class DetailsProvider extends Component {

  state = {
    travel: {},
    status: 'loading'
  }

  componentDidMount() {      
    const { id } = this.props    
    travelService.findOne(id)
      .then((travel) => {
        this.setState({
          travel,
          status: 'loaded'
        })            
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          status: 'hasError'
        })
      })
  }

  handleClick = () => {
    this.props.history.push('/profile')
  }

  
  handleAdd =(activity) => {    
    const { id } = this.props     
    travelService.addActivities(id, activity)
    .then((travel) => {                
      this.setState({
        travel
      })
    })
  }
  
  renderList =() => {
    const { activities } = this.state.travel;        
    if (activities.length > 0) {      
      return activities.map((activity, index) => {         
        return <li key={`id-${index}`}>{activity}</li>
      })
    }    
  } 

  render() {    
    switch (this.state.status) {      
      case 'loaded':
        return (          
          <div className="travel-info">
            <i onClick={this.props.onClose} className="fas fa-times"></i>
            <Owner travel={this.state.travel}>
              <ActivitiesForm onAdd={this.handleAdd} />
            </Owner>
            <DetailCard 
            renderList={this.renderList} 
            travel={this.state.travel} 
            handleAdd={()=>this.handleAdd()}                        
            />              
          </div>   

        )
      case 'hasError': 
        return (
          <p>error</p>
        )
        default:
      return <p>loading...</p>
    }
  }
}

export default TravelDetails;