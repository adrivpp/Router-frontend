import React, { Component } from 'react';
import travelService from '../lib/travel-service';

class BookButton extends Component {

  handleClick =() => {
    travelService.bookTrip(this.props.id) 
      .then((response) => {
        console.log(response)
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <button onClick={this.handleClick}>Book travel</button>
    );
  }
}

export default BookButton;