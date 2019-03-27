import axios from 'axios';

class TravelService {
  constructor() {
    this.travel = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  create(travel) {   
    return this.travel.post('/travels', travel)
      .then(({ data }) => data);      
  }

  findOne(id) {
    return this.travel.get(`/travels/${id}/details`) 
      .then(({data}) => data);
  }

  findByCategory(category) {
    return this.travel.get(`/travels/${category}`)
      .then(({data}) => data);
  }

  bookTrip(id) {
    return this.travel.put(`/travels/${id}/book`)
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