import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import TravelCard from '../components/TravelCard';
import TravelDetails from './TravelDetails';
// import axios from 'axios'

class TravelList extends Component {

  state = {
    travels:  [],
    status: 'loadind',
    search: '',
    // image: 'https://picsum.photos/458/354'
  }
  
  // api =() => {
  //   axios.get('https://api.unsplash.com/search/photos/?page=1&per_page=10&query=mountain&client_id=ceb8ab68601c5e11d0d7147805364b17b5fcbb184ff205e7c463edbcd9be55bf')
  //   .then((response)=> {      
  //     console.log(response.data)
  //     this.setState({
  //       image: response.data.results[1].urls.small
  //     })
  //   })
  // }
  
  componentDidMount() {    
    travelService.findAll()
    .then((travels) => {
      this.setState({
        travels,
        status: 'loaded', 
        hasClick: false,
        id: ''       
      })
    })
    .catch((err) => {
      console.log(err);
      this.setState({
        status: 'hasError'
      })
    })
  }
  
  handleSearch =(e) => {
    this.setState({
      search: e.target.value
    })
  }

  handleClose =() => {
    this.setState({
      hasClick: false
    })
    this.props.history.push('/travels/')
  }
  
  handleClick =(id) => {
    travelService.findOne(id)
    .then(() => {
      this.props.history.push(`/travels/${id}`)    
      this.setState({
        hasClick: true,
        id
      })  
    })
  }

  renderDetails =() => {
    return this.state.hasClick && <TravelDetails id={this.state.id} onClose={this.handleClose}/>
  }
  
  renderCard =() => {
    let filtered;
    this.state.search !== '' ? filtered = this.state.travels.filter((travel) => {           
      return travel.startPoint.toLowerCase().includes(this.state.search.toLowerCase())
    }) : filtered = this.state.travels;
    return filtered.map((travel, index) => {
      return <TravelCard key={`id-${index}`} travel={travel} onDetails={this.handleClick}/>
    })
  }

  render() {        
    switch (this.state.status) {      
      case 'loaded':
        return (
          <>          
            <div className="search-bar">
              <input onChange={this.handleSearch} type="text" name="search" value={this.state.search} placeholder="Search by starting point"/>
            </div>
            <section className="list-container">
              {this.renderCard()}
            </section>
            {this.renderDetails()}
          </>
        )
      case 'hasError': 
        return (
          <p>error</p>
        )
      default:
      return <p>loadind</p>
    }
  }
}

export default TravelList;