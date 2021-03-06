import axios from 'axios';

const BOOKLET_API_BASE_URL = "http://localhost:8008/servicebooklet";

class BookletService {

    getBooklet(){
        return axios.get(BOOKLET_API_BASE_URL);
    }

    createBooklet(booklet,vin){
        return axios.post(BOOKLET_API_BASE_URL, booklet,{
            headers: {
                'vin': vin
            }
        })
    }

    getBookletById(bookletId){
        return axios.get(BOOKLET_API_BASE_URL + '/' + bookletId);
    }

    updateBooklet(booklet, bookletId, email){
        return axios.put(BOOKLET_API_BASE_URL + '/' + bookletId, booklet, {
            headers: {
                'email': email
            }
        })
    }  
}
export default new BookletService()
