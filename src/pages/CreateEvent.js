import React, { Component } from 'react';
import CreateForm from '../components/CreateForm';
import travelService from '../lib/travel-service';

class CreateEvent extends Component {

  handleSubmit =(travelData) => {        
    travelService.create(travelData)
    .then(() => {
      return this.props.history.push('/profile');  
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
     <CreateForm onSubmit={this.handleSubmit}/>
    );
  }
}

export default CreateEvent;