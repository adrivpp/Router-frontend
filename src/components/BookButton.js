import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import { withAuth } from '../providers/AuthProvider';
import { withTravel } from '../providers/TravelsProvider';

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
        this.setState({
          isLoading: false
        })
        this.props.value.updateTravel(_id)
      })
      .catch(err => console.log(err))
  }

  renderButton =() => {    
    const { notifications, attendees } = this.props.travel;     
    const { user } = this.props; 
    const { isLoading } = this.state   
    const booked = notifications.some((notification) => {
      return notification.request === user._id
    })
    if (booked && !isLoading) {
      return <button>Booked</button>
    }
    const attending = attendees.some((attendee) => {
      return attendee === user._id
    })
    if (attending) {
      return <button >Attending</button>
    }
    return <button className="button" onClick={this.handleClick}>{isLoading ? 'Loading' : 'book'}</button>
  }
    
  
  
  render() {            
    return (
      this.renderButton()
    );
  }
}

export default withTravel(withAuth(BookButton));