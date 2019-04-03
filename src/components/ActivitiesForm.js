import React, { Component } from 'react';
import { withTravel } from '../providers/TravelsProvider';


class ActivitiesForm extends Component {
  state = {
    activity: ''
  }

  handleChange =(e) => {
    this.setState({
      activity: e.target.value
    })
  }

  handleSubmit =(e) => {
    e.preventDefault();    
    this.props.onAdd(this.props.id, this.state)
    this.setState({
      activity: ''
    })
  }

  render() {
    return (
      <form className="activities-form" onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} required={true} type="text" name="activity" value={this.state.activity} placeholder="Add activities to your travel"/>
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default withTravel(ActivitiesForm);