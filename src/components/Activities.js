import React, { Component } from 'react';

class Activities extends Component {

  state = {
    colors: []
  }

  getRandomColor =() => {
    return "hsl(" + parseInt(256 * Math.random()) + "," +
      "50%,"+
      "70%,1)"
  }

  randomColors =() => {
    let colors = []
    for(let i = 0; i < 100; i++ ) {
      colors.push(this.getRandomColor())
    }
    this.setState({
      colors,
    })
  }

  componentDidMount() {
    this.randomColors()
  }

  renderList =() => {   
    return this.props.travels.map((travel) => (
      travel.activities.length ?
        travel.activities.map((act, index) => (
          <p onClick={()=>this.props.onActivity(act)} key={`id-${index}`} style={{backgroundColor: this.state.colors[index]}}>{act}</p>
        )) : null      
    ))
  }

  render() {
    return (
      <div className="activities-filter">
        <p className="all-tag" onClick={this.props.onGetAll}>All</p>
        {this.renderList()}
      </div>
    );
  }
}

export default Activities;