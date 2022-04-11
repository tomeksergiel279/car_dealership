import axios from 'axios';

const DEPARTMENT_API_BASE_URL = "https://car-dealership-pk.herokuapp.com/department";

class DepartmentService {

    getDepartments(){
        return axios.get(DEPARTMENT_API_BASE_URL);
    }
}
export default new DepartmentService()
