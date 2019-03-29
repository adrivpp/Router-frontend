import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import TravelCard from '../components/TravelCard';
import TravelDetails from './TravelDetails';

class TravelList extends Component {

  state = {
    travels:  [],
    status: 'loadind',
    search: '',
    hasClick: false,
    id: ''   
  }  

  componentDidMount() {    
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
  
  handleSearch =(e) => {
    this.setState({
      search: e.target.value
    })
  }

  handleClose =() => {
    this.setState({
      hasClick: false
    })
    this.props.history.push('/travels/')
  }
  
  handleClick =(id) => {
    travelService.findOne(id)
    .then(() => {      
      this.setState({
        hasClick: true,
        id
      })  
    })
  }

  renderDetails =() => {
    return this.state.hasClick && <TravelDetails id={this.state.id} onClose={this.handleClose}/>
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
            <div className="search-bar">
              <input onChange={this.handleSearch} type="text" name="search" value={this.state.search} placeholder="Search by starting point"/>
            </div>
            <section className="list-container">
              {this.renderCard()}
            </section>
            {this.renderDetails()}
          </>
        )
      case 'hasError': 
        return (
          <p>error</p>
        )
      default:
      return <p>loadind</p>
    }
  }
}

export default TravelList;