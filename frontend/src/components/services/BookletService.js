import axios from 'axios';

const BOOKLET_API_BASE_URL = "http://localhost:8008/servicebooklet";

class BookletService {

    getBooklet(){
        return axios.get(BOOKLET_API_BASE_URL);
    }

    getBookletById(bookletId){
        return axios.get(BOOKLET_API_BASE_URL + '/' + bookletId);
    }
  
}

export default new BookletService()