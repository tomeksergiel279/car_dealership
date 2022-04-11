import axios from 'axios';

const CAR_API_BASE_URL = "https://car-dealership-pk.herokuapp.com/car";

class CarService {

    getCars(){
        return axios.get(CAR_API_BASE_URL);
    }

    createCar(car){
        return axios.post(CAR_API_BASE_URL, car);
    }

    GetCarById(carId){
        return axios.get(CAR_API_BASE_URL + '/' + carId);
    }

    updateCar(car, carId){
        return axios.put(CAR_API_BASE_URL + '/' + carId, car);
    }

    deleteCar(carId){
        return axios.delete(CAR_API_BASE_URL + '/' + carId);
    }
}
export default new CarService()
