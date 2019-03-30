import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import TravelCard from '../components/TravelCard';
import TravelDetails from './TravelDetails';
import ShowDetails from '../components/ShowDetails';
import Navbar from '../components/Navbar';
import Activities from '../components/Activities';

class TravelList extends Component {

  state = {
    travels:  [],
    status: 'loadind',
    search: '',
    hasClick: false,
    singleTravel: {}    
  }  

  findAll =() => {
    travelService.findAll()
    .then((travels) => {
      this.setState({
        travels,
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

  componentDidMount() {       
    this.findAll()
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
  
  renderCard =() => {
    let filtered;
    this.state.search !== '' ? filtered = this.state.travels.filter((travel) => {           
      return travel.startPoint.toLowerCase().includes(this.state.search.toLowerCase())
    }) : filtered = this.state.travels;
    return filtered.map((travel, index) => {
      return <TravelCard key={`id-${index}`} travel={travel} onDetails={this.handleClick}/>
    })
  }

  render() {        
    switch (this.state.status) {      
      case 'loaded':
        return (
          <>
          <section className="travels-cotainer">                      
            <div className="search-bar">
              <input onChange={this.handleSearch} type="text" name="search" value={this.state.search} placeholder="Search by starting point"/>
            </div>            
            <Activities travels={this.state.travels} onActivity={this.handleActivities} onGetAll={this.findAll}/>
            <section className="list-container">
              {this.renderCard()}
            </section>
          </section>
            <ShowDetails hasClick={this.state.hasClick}>
              <TravelDetails travel={this.state.singleTravel} onClose={this.handleClose}/>
            </ShowDetails>
            <Navbar />            
          </>
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

export default TravelList;