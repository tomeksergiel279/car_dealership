import axios from 'axios';

const CAR_API_BASE_URL = "http://localhost:8008/car";

class CarService {

    getCars(){
        return axios.get(CAR_API_BASE_URL);
    }
  
}

export default new CarService()