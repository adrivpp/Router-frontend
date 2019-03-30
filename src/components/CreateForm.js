import React, { Component } from 'react';
import categoryOptions from '../constants/category-options'
import axios from 'axios';
const applicationId = "ceb8ab68601c5e11d0d7147805364b17b5fcbb184ff205e7c463edbcd9be55bf"
// secret: "bfd9def89b416ed676024a44a8fa7ea5d271cc1cf360d58f9f473d3401416992"

class CreateForm extends Component {
  state = {
    name: '',    
    category: '',
    date: '',    
    seats: 1, 
    startPoint: '', 
    endPoint: '',  
    imageUrl: ''   
  }

  //todo: handle errors
  
  getRandomPicture =()=> {    
    if(this.state.endPoint !== '')
    axios.get(`https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${this.state.endPoint}&client_id=${applicationId}`)
    .then((response) => {
      if(response.data.results.length > 0) {
        this.setState({
        imageUrl: response.data.results[Math.floor(Math.random()*response.data.results.length)].urls.regular
        })
      }
    })    

  }

  handleChange =(e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value      
    })
    this.getRandomPicture()
  }

  handleSubmit =(e) => {
    e.preventDefault()    
    this.props.onSubmit(this.state)    
    this.setState({
      name: '',
      category: '',  
      seats: 1,    
      date: '',    
      startPoint: '', 
      endPoint: ''
    })
  }

  handleOptions =() => {
    return categoryOptions.map((option, index) => {
      return <option key={`id-${index}`} value={option}>{option}</option>
    })
  }

  render() {        
    return (           
      <section className="create">      
        <div className="overlay">          
          <form onSubmit={this.handleSubmit} className="create-form">
            <input className="input" onChange={this.handleChange} type="text" name="name" value={this.state.name} placeholder="Name"/>
            <select className="input select"  onChange={this.handleChange} name="category">
              {this.handleOptions()}            
            </select>
            <input className="input" onChange={this.handleChange} type="date" name="date" value={this.state.date}/>
            <input className="input" onChange={this.handleChange} type="number" name="seats" defaultValue="{this.state.seats}" placeholder="Available seats"/>
            <input className="input" onChange={this.handleChange} type="text" name="startPoint" value={this.state.startPoint} placeholder="Start point"/>
            <input className="input" onChange={this.handleChange} type="text" name="endPoint" value={this.state.endPoint} placeholder="End point"/>
            <button className="button create-button" type="submit">Create</button>
          </form>
        </div>
      </section>
    );
  }
}

export default CreateForm;