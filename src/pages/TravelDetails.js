import React, { Component } from 'react';
import travelService from '../lib/travel-service';
import DetailCard from '../components/DetailCard';
import ActivitiesForm from '../components/ActivitiesForm';
import { withAuth } from '../providers/AuthProvider';

class TravelDetails extends Component {

  state = {
    travel: {},
    status: 'loading'
  }

  componentDidMount() {      
    const { id } = this.props    
    travelService.findOne(id)
      .then((travel) => {
        this.setState({
          travel,
          status: 'loaded'
        })            
      })
      .catch((err) => {
        console.log(err)
        this.setState({
          status: 'hasError'
        })
      })
  }

  handleClick = () => {
    this.props.history.push('/profile')
  }

  
  handleAdd =(activity) => {    
    const { id } = this.props     
    travelService.addActivities(id, activity)
    .then((travel) => {                
      this.setState({
        travel
      })
    })
  }
  
  renderList =() => {
    const { activities } = this.state.travel;        
    if (activities.length > 0) {      
      return activities.map((activity, index) => {         
        return <li key={`id-${index}`}>{activity}</li>
      })
    }    
  }

  renderForm =() => {
    const { user } = this.props     
    return (
      user._id === this.state.travel.owner && <ActivitiesForm onAdd={this.handleAdd} />  
    )
  }

  render() {    
    switch (this.state.status) {      
      case 'loaded':
        return (          
          <div className="travel-info">
            <i onClick={this.props.onClose} className="fas fa-times"></i>
            {this.renderForm()}
            <DetailCard 
            renderList={this.renderList} 
            travel={this.state.travel} 
            handleAdd={()=>this.handleAdd()}            
            />              
          </div>                
        )
      case 'hasError': 
        return (
          <p>error</p>
        )
        default:
      return <p>loading...</p>
    }
  }
}

export default withAuth(TravelDetails);