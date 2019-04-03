import React, { Component } from 'react';
import colors from '../constants/colors';

class Activities extends Component {

  
  renderList =() => {   
    return this.props.travels.map((travel) => (
      travel.activities.length ?
        travel.activities.map((act, index) => (
          <p onClick={()=>this.props.onActivity(act)} key={`id-${index}`} style={{backgroundColor: colors[index]}}>{act}</p>
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