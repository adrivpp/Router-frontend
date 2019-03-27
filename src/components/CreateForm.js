import React, { Component } from 'react';

class CreateForm extends Component {
  state = {
    name: '',
    description: '',
    category: '',
    date: '',    
    startPoint: '', 
    endPoint: ''    
  }

  handleChange =(e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit =(e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)    
    this.setState({
      name: '',
      category: '',      
      date: '',    
      startPoint: '', 
      endPoint: '' 
    })
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name}/>
          <select onChange={this.handleChange} name="category">
            <option value="">--Please choose an option--</option>
            <option value="Mountain">Mountain</option>
            <option value="Beach">Beach</option>
            <option value="Extreme">Extreme</option>
            <option value="Snow">Snow</option>
            <option value="City">City</option>            
          </select>
          <input onChange={this.handleChange} type="date" name="date" value={this.state.date}/>
          <input onChange={this.handleChange} type="text" name="startPoint" value={this.state.startPoint}/>
          <input onChange={this.handleChange} type="text" name="endPoint" value={this.state.endPoint}/>
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}

export default CreateForm;