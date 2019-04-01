import React, { Component } from 'react';
import DetailCard from '../components/DetailCard';
import ActivitiesForm from '../components/ActivitiesForm';
import Owner from '../components/Owner';
import { withTravel } from '../providers/TravelsProvider';

class TravelDetails extends Component {
  
  render() {          
    const { close, singleTravel } = this.props.value    
    return (          
      <div className="travel-info">
        <i onClick={close} className="fas fa-times"></i>
        <Owner id={singleTravel.owner}>
          <ActivitiesForm id={singleTravel._id}/>
        </Owner>
        <DetailCard          
        travel={singleTravel}                        
        />              
      </div>   
    )      
  }
}

export default withTravel(TravelDetails);