import React, { Component } from 'react';
import travelService from '../lib/travel-service';

class TravelDetails extends Component {

  state = {
    travel: {},
    status: 'loading'
  }

  componentDidMount() {    
    const { id } = this.props.match.params    
    travelService.findOne(id)
      .then((travel) => {
        this.setState({
          travel,
          status: 'loaded'
        })            
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          status: 'hasError'
        })
      })
  }

  render() {
    return (
      <div>
        <h2>{this.state.travel.name}</h2>
      </div>
    );
  }
}

export default TravelDetails;