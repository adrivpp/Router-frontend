import React, { Component } from 'react';
import CreateForm from '../components/CreateForm';
import travelService from '../lib/travel-service';

class CreateEvent extends Component {

  handleSubmit = async (travelData) => {        
    await travelService.create(travelData)    
    return this.props.history.push('/profile');         
  }

  render() {
    return (
     <CreateForm onSubmit={this.handleSubmit}/>
    );
  }
}

export default CreateEvent;