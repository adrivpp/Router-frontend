import React, { Component } from 'react';
import { withTravel } from '../providers/TravelsProvider';
import { withRouter } from 'react-router-dom';

class TravelCard extends Component {

  handleClikc =(id) => {
    this.props.history.push(`/travels/${id}`)
  }

  render() {    
    const { _id, imageUrl, startPoint, endPoint, name } = this.props.travel
    return (
      <div onClick={() => this.handleClikc(_id)} className="card-container">
        <img src={imageUrl} alt={name}></img>        
        <div className="card-info">         
          <h3>{name}</h3>
          <div className="directions">
            <i className="fas fa-map-marker-alt" id="marker"></i>
            <p>{startPoint} -</p>
            <p>{endPoint}</p>         
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTravel(TravelCard));