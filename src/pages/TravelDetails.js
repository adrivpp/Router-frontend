import React, { Component } from 'react';
import DetailCard from '../components/DetailCard';
import ActivitiesForm from '../components/ActivitiesForm';
import Owner from '../components/Owner';
import { withTravel } from '../providers/TravelsProvider';

class TravelDetails extends Component {
  
  handleAdd =(activity) => {  
    const { _id } = this.props.value.singleTravel       
    this.props.value.addActivities(activity, _id)
  }
  
  // renderList =() => {
  //   const { activities } = this.props.value.singleTravel  ;        
  //   if (activities.length > 0) {      
  //     return activities.map((activity, index) => {         
  //       return <li key={`id-${index}`}>{activity}</li>
  //     })
  //   }    
  // } 

  render() {           
    const { close, singleTravel } = this.props.value
    return (          
      <div className="travel-info">
        <i onClick={close} className="fas fa-times"></i>
        <Owner travel={singleTravel}>
          <ActivitiesForm onAdd={this.handleAdd} />
        </Owner>
        <DetailCard 
        // renderList={this.renderList} 
        travel={singleTravel} 
        handleAdd={()=>this.handleAdd()}                        
        />              
      </div>   
    )      
  }
}

export default withTravel(TravelDetails);