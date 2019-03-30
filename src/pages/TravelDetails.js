import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import DetailCard from '../components/DetailCard';
import ActivitiesForm from '../components/ActivitiesForm';
import Owner from '../components/Owner';

class TravelDetails extends Component {

  state = {
    travel: this.props.travel    
  }
  
  handleAdd =(activity) => {        
    const { _id } = this.props.travel       
    travelService.addActivities(_id, activity)
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
  }
}

export default TravelDetails;