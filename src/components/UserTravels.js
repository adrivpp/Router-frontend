import React, { Component } from 'react';
import { withTravel } from '../providers/TravelsProvider';

class UserTravels extends Component {
  render() {
    const { travel } = this.props;
    return (     
      <div className="travels-scroll" onClick={()=>this.props.value.handleDetails(travel._id)}>
        <img src={travel.imageUrl} alt={travel.name}/>
        <h3>{travel.name}</h3>
      </div>      
    );
  }
}

export default withTravel(UserTravels);