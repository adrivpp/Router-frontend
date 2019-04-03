import React, { Component } from 'react';
import { withTravel } from '../providers/TravelsProvider';
import { withRouter } from 'react-router-dom';
class UserTravels extends Component {

  handleClick =(id) => {
    this.props.history.push(`/travels/${id}`)
  }

  render() {
    const { travel } = this.props;
    return (     
      <div className="travels-scroll" onClick={()=>this.handleClick(travel._id)}>
        <img src={travel.imageUrl} alt={travel.name}/>
        <h3>{travel.name}</h3>
      </div>      
    );
  }
}

export default withRouter(withTravel(UserTravels));