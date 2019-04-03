import React, { Component } from 'react';
import DetailCard from '../components/DetailCard';
import ActivitiesForm from '../components/ActivitiesForm';
import Owner from '../components/Owner';
import travelService from '../lib/travel-service';
import { Loader } from 'semantic-ui-react';

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
      return <p>error</p>       
      default:
      return (          
        <div className="travel-info">          
          
          <DetailCard travel={travel} findSingle={this.findSingle} handleAdd={this.handleAdd}/>              
        </div>   
      )            
    }
  }
}

export default TravelDetails;