import React, { Component } from 'react';


class DetailCard extends Component {  

  render() {    
    const { name, seats, startPoint, endPoint } = this.props.travel;
    return (
      <div>           
        <h2>{name}</h2>
        <p>{seats}</p>
        <p>{startPoint}</p>
        <p>{endPoint}</p>
        <ul>
          {this.props.renderList()}
        </ul>        
      </div>
    );
  }
}

export default (DetailCard);