import React, { Component } from 'react';
import BookButton from './BookButton';
import NotOwner from './NotOwner';
import { withTravel } from '../providers/TravelsProvider';
import Owner from './Owner';
import ActivitiesForm from './ActivitiesForm';
import travelService from '../lib/travel-service';
import { withRouter } from 'react-router-dom';

class DetailCard extends Component {  
   
  handleClick = (id) => {
    travelService.delete(id)
    .then({})
    this.props.history.push('/travels')
  }

  renderList =() => {    
    const { activities } = this.props.travel;        
    if (activities.length > 0) {      
      return activities.map((activity, index) => {         
        return <li key={`id-${index}`}>{activity}</li>
      })
    }    
  } 

  render() {            
    const { seats, startPoint, endPoint, imageUrl, name, date } = this.props.travel;
    const { travel, findSingle, handleAdd } = this.props
    return (
      <>
      <div className="info-card">               
        <img src={imageUrl} alt={name}/>      
        <div className="info">
          <h2>{name}</h2>   
          <p><span className="bold">Available seats:</span> {seats}</p>
          <p><span className="bold">Desde:</span> {startPoint}</p>
          <p><span className="bold">Hasta:</span> {endPoint}</p>          
        </div>
      </div>  
      <div className="travel-act">      
        <Owner id={travel.owner}>
          <ActivitiesForm id={travel._id} onAdd={handleAdd}/>
            {/* <div className="container-button">
              <button onClick={this.handleClick(travel._id)} >Delete</button>
            </div> */}
        </Owner>   
          
          
        <div className="travel-activities-list"> 
          <ul>
            {this.renderList()}
          </ul>             
          <NotOwner travel={travel}>
            <BookButton travel={travel} update={findSingle}/>
          </NotOwner>
        </div>
      </div>
      </>
    );
  }
}

export default withTravel(withRouter(DetailCard));