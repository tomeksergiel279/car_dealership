import axios from 'axios';

const CAR_API_BASE_URL = "http://localhost:8008/car";

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

    reserveCar(car, carId, email){
        return axios.put(CAR_API_BASE_URL + '/reserve/' + carId, car, {
            headers: {
                'email': email
            }
        })
    }

    messageCar(car, carId, email){
        return axios.put(CAR_API_BASE_URL + '/message/' + carId, car, {
            headers: {
                'email': email
            }
        })
    }

    deleteCar(carId){
        return axios.delete(CAR_API_BASE_URL + '/' + carId);
    }
}
export default new CarService()
