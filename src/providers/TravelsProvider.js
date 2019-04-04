    
import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import { withRouter } from 'react-router-dom';
import Loader from '../components/Loader';
export const TravelContext = React.createContext();

const { Provider, Consumer }  = TravelContext;

export const withTravel = (Comp) => {
  return class WithTravel extends Component {
    render() {
      return (
        <Consumer>
          { travelStore => 
             <Comp 
              value={travelStore}
              {...this.props} /> 
          }
        </Consumer>
      )
    }    
  }
}

class TravelProvider extends Component {

  state = {
    travels:  [],
    status: '',
    search: '',       
    activities: []    
  }  

  findAll =() => {    
    travelService.findAll()
    .then((travels) => {
      this.setState({
        travels: travels.sort(() => -1),
        status: 'loaded', 
        hasClick: false,        
      })
    })
    .catch(() => {      
      this.setState({
        status: 'hasError'
      })
    })
  }
  
  handleSearch =(e) => {
    this.setState({
      search: e.target.value
    })
  }

  handleActivities =(activity) => {    
    const filter = this.state.travels.filter((travel) => {
      return travel.activities.indexOf(activity) !== -1
      })
    this.setState({
      travels: filter
    })
  }

  renderCard =(Comp) => {
    let filtered;
    this.state.search !== '' ? filtered = this.state.travels.filter((travel) => {           
      return travel.startPoint.toLowerCase().includes(this.state.search.toLowerCase())
    }) : filtered = this.state.travels;
    return filtered.map((travel, index) => {
      return <Comp key={`id-${index}`} travel={travel} />
    })
  }

  render() {     
    const { travels, status,  search, hasClick, singleTravel } = this.state
    switch (status) {      
      case 'loading':
        return <Loader/>
      case 'hasError': 
        return <p>error</p>        
      default:
        return (
          <Provider value={
            { travels,
              status,  
              search,               
              hasClick, 
              singleTravel,
              renderCard: this.renderCard,               
              filterActivity: this.handleActivities,               
              onSearch: this.handleSearch, 
              getAll: this.findAll,                             
            }} >
            {this.props.children}
          </Provider>
        );
    }
  }
}

export default withRouter(TravelProvider)