import React, { Component } from 'react';


class TravelCard extends Component {
  render() {
    const { _id, imageUrl, startPoint, endPoint, name, owner } = this.props.travel
    return (
      <div onClick={() => this.props.onDetails(_id)} className="card-container">
        <div className="card-image">
          <img src={imageUrl} alt={name}></img>
        </div>
        <div className="card-info">
          <div>
            <p>{startPoint}</p>
            <p>{endPoint}</p>
          </div>
          <h2>{name}</h2>
        </div>
      </div>
    );
  }
}

export default TravelCard;