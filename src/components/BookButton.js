import React, { Component } from 'react';
import travelService from '../lib/travel-service';

class BookButton extends Component {

  state = {
    isBooked: false
  }

  handleClick =() => {
    travelService.bookTrip(this.props.id) 
      .then(() => {
        this.setState({
          isBooked: true
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <button className="button" onClick={this.handleClick}>
        {this.state.isBooked ? 'Booked' : 'Book'}
      </button>
    );
  }
}

export default BookButton;