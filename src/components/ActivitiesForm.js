import React, { Component } from 'react';

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
    this.props.onAdd(this.state)
    this.setState({
      activity: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} type="text" name="activity" value={this.state.activity}/>
        <button type="submit">add</button>
      </form>
    );
  }
}

export default ActivitiesForm;