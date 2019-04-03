import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import { withAuth } from '../providers/AuthProvider';
import { withTravel } from '../providers/TravelsProvider';
import camper from '../images/camper.png';

class BookButton extends Component {

  state = {
    isLoading: false,
  }

  handleClick =() => {

    this.setState({
      isLoading: true
    })
    const { _id } = this.props.travel
    travelService.bookTrip(_id) 
      .then(() => {              
        this.props.update(_id)
      })
      setTimeout(() => {
        this.setState({isLoading: false})
      }, 3000)
  }

  renderButton =() => {    
    const { notifications, attendees, seats } = this.props.travel;     
    const { user } = this.props; 
    const { isLoading } = this.state   
    const booked = notifications.some((notification) => {
      return notification.request === user._id
    })
    if (isLoading) {
      return (
        <div className="button-container">
          <img src={camper} className="spinner" alt="spinner"/> 
        </div>
      )        
    }
    if (booked && !isLoading) {
      return (
        <div className="button-container">
          <button className="button green-button">Booked</button>
        </div>
      )     
    }
    const attending = attendees.some((attendee) => {
      return attendee === user._id
    })
    if (attending) {
      return (
      <div className="button-container">
        <button className="button green-button">Attending</button>
      </div>
      )
    }
    if (seats > 0) {
      return (
      <div className="button-container">
        <button className="button" onClick={this.handleClick}>Book</button>
      </div>
      )
    } else {
      return (
      <div className="button-container">
        <button className="button red-button">Full</button>
      </div>
      )
    }
  }      
  
  render() {            
    return (
      this.renderButton()
    );
  }
}

export default withTravel(withAuth(BookButton));