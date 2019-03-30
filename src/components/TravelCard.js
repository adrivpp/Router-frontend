import React, { Component } from 'react';

class TravelCard extends Component {
  render() {    
    const { _id, imageUrl, startPoint, endPoint, name } = this.props.travel
    return (
      <div onClick={() => this.props.onDetails(_id)} className="card-container">
        <img src={imageUrl} alt={name}></img>        
        <div className="card-info">         
          <h3>{name}</h3>
          <p>{startPoint}</p>
          <p>{endPoint}</p>         
        </div>
      </div>
    );
  }
}

export default TravelCard;