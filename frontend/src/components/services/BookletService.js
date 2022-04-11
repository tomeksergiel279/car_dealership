import axios from 'axios';

const BOOKLET_API_BASE_URL = "https://car-dealership-pk.herokuapp.com/servicebooklet";

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

    updateBooklet(booklet, bookletId){
        return axios.put(BOOKLET_API_BASE_URL + '/' + bookletId, booklet);
    }  
}
export default new BookletService()
