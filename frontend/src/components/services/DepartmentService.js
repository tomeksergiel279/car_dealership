import axios from 'axios';

const DEPARTMENT_API_BASE_URL = "http://localhost:8008/department";

class DepartmentService {

    getDepartments(){
        return axios.get(DEPARTMENT_API_BASE_URL);
    }
  
}

export default new DepartmentService()