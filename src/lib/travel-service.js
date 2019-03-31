import axios from 'axios';

class TravelService {
  constructor() {
    this.travel = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true 
    })
  }

  findAll() {
    return this.travel.get('/travels')
      .then(({ data }) => data);      
  }

  findOwned() {
    return this.travel.get('/travels/owned')
      .then(({ data }) => data); 
  }

  findNotifications(arrayIds) {
    return this.travel.post('/travels/notifications', arrayIds)
      .then(({ data }) => data); 
  }

  findTravelsBooked() {
    return this.travel.get('/travels/booked')
      .then(({ data }) => data); 
  }

  create(travel) {   
    return this.travel.post('/travels', travel)
      .then(({ data }) => data);      
  }

  findOne(id) {
    return this.travel.get(`/travels/${id}/details`) 
      .then(({data}) => data);
  }

  addActivities(id, activity) {
    return this.travel.put(`/travels/${id}/activities`, activity)
      .then(({data}) => data)
  }

  findByCategory(category) {
    return this.travel.get(`/travels/${category}`)
      .then(({data}) => data);
  }

  bookTrip(id) {
    return this.travel.put(`/travels/${id}/book`)
      .then(({data}) => data)
  }

  denyRequest(id, invitedId) {
    return this.travel.put(`/travels/${id}/deny`, {invitedId})
      .then(({data}) => data)
  }

  agreeRequest(id, invitedId) {
    return this.travel.put(`/travels/${id}/agree`, { invitedId })
      .then(({data}) => data)
  }
  

  unbookTrip(id) {
    return this.travel.put(`/travels/${id}/unbook`)
      .then(({data}) => data)
  }

  delete(id) {
    return this.travel.delete(`/travels/${id}`)
      .then(({data}) => data)
  }
}

const travelService = new TravelService();

export default travelService;