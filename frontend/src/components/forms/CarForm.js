import React, { Component } from 'react';
import CarService from '../services/CarService';
import { Button } from 'react-bootstrap';
import '../styles/FormStyle.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import BookletService from '../services/BookletService';

toast.configure()

class CarForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            color: '',
            img: '',
            mark: '',
            model: '',
            price: '',
            productionYear: '',
            vin: '',
            available: '',
            type: '',
            reservation: '',
            booklet: []
        }

        this.changeColorHandler = this.changeColorHandler.bind(this);
        this.changeImgHandler = this.changeImgHandler.bind(this);
        this.changeMarkHandler = this.changeMarkHandler.bind(this);
        this.changeModelHandler = this.changeModelHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeProductionYearHandler = this.changeProductionYearHandler.bind(this);
        this.changeVinHandler = this.changeVinHandler.bind(this);
        this.changeAvailableHandler = this.changeAvailableHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeReservationHandler = this.changeReservationHandler.bind(this);
        this.saveOrUpdateCar = this.saveOrUpdateCar.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }
        else{
            CarService.GetCarById(this.state.id).then( (res) =>{
                let car = res.data;
                this.setState({
                    color: car.color,
                    img: car.img,
                    mark: car.mark,
                    model: car.model,
                    price: car.price,
                    productionYear: car.productionYear,
                    vin: car.vin,
                    available: car.available,
                    type: car.type,
                    reservation: car.reservation
                });
            })
        }        
    }

    saveOrUpdateCar = (e) => {
        e.preventDefault();
        let car = {mark: this.state.mark, model: this.state.model, color: this.state.color,
            img: this.state.img, price: this.state.price, productionYear: this.state.productionYear, vin: this.state.vin, 
            available: this.state.available, type: this.state.type, reservation: this.state.reservation};
        console.log('car => ' + JSON.stringify(car));

        let booklet = { serviceInspection:"2000-01-01", repair:"brak",  repairDate:"brak",  repairProducent:"brak"}
        console.log('booklet => ' + JSON.stringify(booklet));

        if(this.state.id === '_add'){
            CarService.createCar(car)
            .then(res =>{
                if(res.status === 200) { 
                    toast.success('Samochód dodany');
                    BookletService.createBooklet(booklet,this.state.vin); 
                }
                else { toast.error("Samochód nie dodany") }
                this.props.history.push('/cars');
            })
            .catch(err => toast.error("Niepoprawne dane"));
        }
        else{
            CarService.updateCar(car, this.state.id)
            .then( res => {
                if(res.status === 200) {
                    toast.success('Samochód zmodyfikowany');
                }
                this.props.history.push('/cars');
            })
            .catch(err => toast.error("Niepoprawne dane"));
        }
    }

    changeColorHandler = (event) => {
        this.setState({color: event.target.value});
    }

    changeImgHandler = (event) => {
        this.setState({img: event.target.value});
    }

    changeMarkHandler = (event) => {
        this.setState({mark: event.target.value});
    }

    changeModelHandler = (event) => {
        this.setState({model: event.target.value});
    }

    changePriceHandler = (event) => {
        this.setState({price: event.target.value});
    }

    changeProductionYearHandler = (event) => {
        this.setState({productionYear: event.target.value});
    }

    changeVinHandler = (event) => {
        this.setState({vin: event.target.value});
    }

    changeAvailableHandler = (event) => {
        this.setState({available: event.target.value});
    }

    changeTypeHandler = (event) => {
        this.setState({type: event.target.value});
    }

    changeReservationHandler = (event) => {
        this.setState({reservation: event.target.value});
    }

    cancel(){
        this.props.history.push('/cars');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h2 className='text-center display-5 mb-3'>Dodaj Samochód</h2>
        }
        else{
            return <h2 className='text-center display-5 mb-3'>Zmodyfikuj Samochód</h2>
        }
    }

    render() {
        return (
            <div className='forms'>
                <form>
                    {this.getTitle()}
                    <div className = "form-group">
                        <label> Marka </label>
                        <input name="mark" 
                            className="form-control" 
                            value={this.state.mark} 
                            onChange={this.changeMarkHandler}
                            required 
                        />
                    </div>
                    <div className = "form-group">
                        <label> Model </label>
                        <input name="model" 
                            className="form-control" 
                            value={this.state.model} 
                            onChange={this.changeModelHandler}
                            required 
                        />
                    </div>
                    <div className = "form-group">
                        <label> Kolor </label>
                        <input name="color" 
                            className="form-control" 
                            value={this.state.color} 
                            onChange={this.changeColorHandler}
                            required 
                        />
                    </div>
                    <div className = "form-group">
                        <label> Zdjęcie </label>
                        <input name="img" 
                            className="form-control" 
                            value={this.state.img} 
                            onChange={this.changeImgHandler}
                            required 
                        />
                    </div>
                    <div className = "form-group">
                        <label> Cena </label>
                        <input name="price" 
                            className="form-control" 
                            value={this.state.price} 
                            onChange={this.changePriceHandler}
                            required 
                        />
                    </div>
                    <div className = "form-group">
                        <label> Rok produkcji </label>
                        <input name="productionYear" 
                            className="form-control" 
                            value={this.state.productionYear} 
                            onChange={this.changeProductionYearHandler}
                            required 
                        />
                    </div>
                    <div className = "form-group">
                        <label> VIN </label>
                        <input name="vin" 
                            className="form-control" 
                            value={this.state.vin} 
                            onChange={this.changeVinHandler}
                            required 
                        />
                    </div>
                    <div className = "form-group">
                        <label> Dostępność </label>
                        <input name="available" 
                            className="form-control" 
                            value={this.state.available} 
                            onChange={this.changeAvailableHandler}
                            required 
                        />
                    </div>
                    <div className = "form-group">
                        <label> Rezerwacja </label>
                        <input name="reservation" 
                            className="form-control" 
                            value={this.state.reservation} 
                            onChange={this.changeReservationHandler}
                            required 
                        />
                    </div>
                    <div className = "form-group">
                        <label> Rodzaj </label>
                        <input name="type" 
                            className="form-control" 
                            value={this.state.type} 
                            onChange={this.changeTypeHandler}
                            required 
                        />
                    </div><br />
                    <Button size="md" 
                        variant="secondary" 
                        type="submit" 
                        onClick={this.saveOrUpdateCar}>
                        Zapisz
                    </Button>  
                    <Button style={{marginLeft: "10px"}} 
                        size="md" 
                        variant="danger" 
                        type="submit" 
                        onClick={this.cancel.bind(this)}>
                        Anuluj
                    </Button>                          
                </form>
            </div>  
        );
    }
}
export default CarForm;
