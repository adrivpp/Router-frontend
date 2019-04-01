import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import { withAuth } from '../providers/AuthProvider'

class BookButton extends Component {

  handleClick =() => {
    travelService.bookTrip(this.props.travel._id) 
      .then(() => {      
        
      })
      .catch(err => console.log(err))
  }

  checkUser =(element) => {    
    const { user } = this.props
    return element === user._id     
  }

  renderButton =() => {    
    const { request, attendees } = this.props.travel     
    if (request.some(this.checkUser)) {
      return <p>travel booked</p>
    } else if (attendees.some(this.checkUser)) {
      return <p>Attending to this travel</p>
    } else {
      return <button className="button" onClick={this.handleClick}>Book travel</button>
    }
    
  }
  
  render() {        
    return (
      this.renderButton()
    );
  }
}

export default withAuth(BookButton);