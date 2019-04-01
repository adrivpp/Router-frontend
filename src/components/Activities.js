import React, { Component } from 'react';

class Activities extends Component {

  getRandomColor =() => {
    return "hsl(" + parseInt(256 * Math.random()) + "," +
      "40%,"+
      "70%,1)"
  }

  renderList =() => {   
    return this.props.travels.map((travel) => {
      if (travel.activities.length) {
        return travel.activities.map((act, index) => {
          return <p onClick={()=>this.props.onActivity(act)} key={`id-${index}`} style={{backgroundColor: this.getRandomColor()}}>{act}</p>
        })
      }

    })
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