import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import { withRouter } from 'react-router-dom';
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
    hasClick: false,
    singleTravel: {},    
  }  

  findAll =() => {
    travelService.findAll()
    .then((travels) => {
      this.setState({
        travels: travels,
        status: 'loaded', 
        hasClick: false,        
      })
    })
    .catch((err) => {
      console.log(err);
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

  handleClose =() => {
    this.setState({
      hasClick: false
    })    
    this.props.history.push('/travels')
  } 

  handleAdd =(activity, id) => {            
    travelService.addActivities(id, activity)
    .then((travel) => {                
      this.setState({
        singleTravel: travel
      })
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

  handleClick =(id) => {       
    travelService.findOne(id) 
      .then((travel) => {
        this.props.history.push(`/travels/${id}`)
        this.setState({
          hasClick: true,
          singleTravel: travel
        })
      })
      .catch(err => console.log(err))
  }
  
  renderCard =(Comp) => {
    let filtered;
    this.state.search !== '' ? filtered = this.state.travels.filter((travel) => {           
      return travel.startPoint.toLowerCase().includes(this.state.search.toLowerCase())
    }) : filtered = this.state.travels;
    return filtered.map((travel, index) => {
      return <Comp key={`id-${index}`} travel={travel} onDetails={this.handleClick}/>
    })
  }

  render() {     
    const { travels, status,  search, hasClick, singleTravel } = this.state
    switch (status) {      
      case 'loading':
        return <p>loading...</p>
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
              findOne: this.handleClick, 
              filterActivity: this.handleActivities, 
              close: this.handleClose, 
              onSearch: this.handleSearch, 
              getAll: this.findAll,
              addActivities: this.handleAdd
            }} >
            {this.props.children}
          </Provider>
        );
    }
  }
}

export default withRouter(TravelProvider)