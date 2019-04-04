import React, { Component } from 'react';
import TravelCard from '../components/TravelCard';
import Navbar from '../components/Navbar';
import Activities from '../components/Activities';
import { withTravel } from '../providers/TravelsProvider';


class TravelList extends Component { 
  
  handleSearch =(e) => {
    this.props.value.onSearch(e)
  }

  componentDidMount() {
    this.props.value.getAll()
  }  

  render() {          
    const { renderCard, search, filterActivity, travels, getAll } = this.props.value
    return(
      <>
        <section className="travels-cotainer">
          <div className="search-bar">
            <input onChange={this.handleSearch} type="text" name="search" value={search} placeholder="Search by starting point"/>
          </div>
          <Activities travels={travels} onActivity={filterActivity} onGetAll={getAll} />
          <section className="list-container">
            {renderCard(TravelCard)}
          </section>
        </section>        
        <Navbar /> 
      </>
    )
  }  
}

export default withTravel(TravelList);