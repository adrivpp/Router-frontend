import axios from 'axios';

class UserService {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true 
    })
  }

  findOne(id) {
    return this.user.get(`/users/${id}`)
      .then(({ data }) => data);      
  }

  calificate(id) {
    return this.user.post(`/users/${id}`)
    .then(({ data }) => data);  
  }
  
}
  
const userService = new UserService();

export default userService;