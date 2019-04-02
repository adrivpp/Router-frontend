import React, { Component } from 'react';
import BookButton from './BookButton';
import NotOwner from './NotOwner';

class DetailCard extends Component {   

  renderList =() => {    
    const { activities } = this.props.travel;        
    if (activities.length > 0) {      
      return activities.map((activity, index) => {         
        return <li key={`id-${index}`}>{activity}</li>
      })
    }    
  } 

  render() {        
    
    const { name, seats, startPoint, endPoint } = this.props.travel;
    const { travel } = this.props
    return (
      <div>           
        <h2>{name}</h2>
        <p>{seats}</p>
        <p>{startPoint}</p>
        <p>{endPoint}</p>
        <ul>
          {this.renderList()}
        </ul>     
        <NotOwner travel={this.props.travel}>
          <BookButton travel={travel} />
        </NotOwner>
      </div>
    );
  }
}

export default DetailCard;