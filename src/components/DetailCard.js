import React, { Component } from 'react';
import BookButton from './BookButton';
import NotOwner from './NotOwner';

class DetailCard extends Component {   

  render() {    
    const { _id, name, seats, startPoint, endPoint } = this.props.travel;
    return (
      <div>           
        <h2>{name}</h2>
        <p>{seats}</p>
        <p>{startPoint}</p>
        <p>{endPoint}</p>
        <ul>
          {this.props.renderList()}
        </ul>     
        <NotOwner travel={this.props.travel}>
          <BookButton id={_id}/>
        </NotOwner>
      </div>
    );
  }
}

export default DetailCard;