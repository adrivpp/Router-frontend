import React, { Component } from 'react';
import DetailCard from '../components/DetailCard';
import travelService from '../lib/travel-service';
import { Loader } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import Error from '../components/Error';

class TravelDetails extends Component {

  state = {
    travel: {},
    status: 'loading'
  }

  findSingle =() => {
    travelService.findOne(this.props.match.params.id) 
    .then((travel) => {
      this.setState({
        travel,
        status: 'loaded'
      })
    })    
  }

  handleAdd =(id, activity) => {         
    travelService.addActivities(id, activity)
    .then((travel) => {     
      this.setState({
        travel,
      })         
    })
  }

  componentDidMount() {
    this.findSingle()
  }
  
  render() {              
    const { travel, status } = this.state 
    switch (status) {
      case 'loading':
      return <Loader/>
      case 'hasError':
      return <Error/>       
      default:
      return (       
        <>   
          <div className="travel-info">            
            <DetailCard travel={travel} findSingle={this.findSingle} handleAdd={this.handleAdd}/>              
          </div>   
        <Navbar/>
        </>
      )            
    }
  }
}

export default TravelDetails;