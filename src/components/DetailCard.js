import React, { Component } from 'react';
import BookButton from './BookButton';
import NotOwner from './NotOwner';
import { withTravel } from '../providers/TravelsProvider';
import Owner from './Owner';
import ActivitiesForm from './ActivitiesForm';

class DetailCard extends Component {  
   

  renderList =() => {    
    const { activities } = this.props.travel;        
    if (activities.length > 0) {      
      return activities.map((activity, index) => {         
        return <li key={`id-${index}`}>{activity}</li>
      })
    }    
  } 

  render() {            
    const { seats, startPoint, endPoint, imageUrl, name } = this.props.travel;
    const { travel, findSingle, handleAdd } = this.props
    return (
      <>
      <div className="info-card">               
        <img src={imageUrl} alt={name}/>      
        <div className="info">
          <h2>{name}</h2>   
          <p>Seats availables: {seats}</p>
          <p>Desde: {startPoint}</p>
          <p>Hasta: {endPoint}</p>
        </div>
      </div>  
      <div className="travel-activities-list"> 
        <Owner id={travel.owner}>
          <ActivitiesForm id={travel._id} onAdd={handleAdd}/>
        </Owner>   
          <ul>
            {this.renderList()}
          </ul>     
        <NotOwner travel={travel}>
          <BookButton travel={travel} update={findSingle}/>
        </NotOwner>
      </div>
      </>
    );
  }
}

export default withTravel(DetailCard);