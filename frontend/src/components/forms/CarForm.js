import React, { Component } from 'react';
import CarService from '../services/CarService';
import BookletService from '../services/BookletService';
import { Button } from 'react-bootstrap';
import '../Form.css';

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
            available: ''
        }

        this.changeColorHandler = this.changeColorHandler.bind(this);
        this.changeImgHandler = this.changeImgHandler.bind(this);
        this.changeMarkHandler = this.changeMarkHandler.bind(this);
        this.changeModelHandler = this.changeModelHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeProductionYearHandler = this.changeProductionYearHandler.bind(this);
        this.changeVinHandler = this.changeVinHandler.bind(this);
        this.changeAvailableHandler = this.changeAvailableHandler.bind(this);
        this.saveOrUpdateCar = this.saveOrUpdateCar.bind(this);
    }

    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
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
                    available: car.available
                });
            });
        }        
    }

    saveOrUpdateCar = (e) => {
        e.preventDefault();
        let car = {mark: this.state.mark, model: this.state.model, color: this.state.color,
            img: this.state.img, price: this.state.price, productionYear: this.state.productionYear, vin: this.state.vin, available: this.state.available};
        console.log('car => ' + JSON.stringify(car));

        let booklet = { serviceInspection:"2000-01-01", lastRepair:"brak" }
        console.log('booklet => ' + JSON.stringify(booklet));

        if(this.state.id === '_add'){
            CarService.createCar(car);
            
            BookletService.createBooklet(booklet,this.state.vin).then(res =>{
                this.props.history.push('/cars');
            });
        }else{
            CarService.updateCar(car, this.state.id).then( res => {
                this.props.history.push('/cars');
            });
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

    cancel(){
        this.props.history.push('/cars');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h2 className="text-center">Dodaj Samochód</h2>
        }else{
            return <h2 className="text-center">Zmodyfikuj Samochód</h2>
        }
    }

    render() {
        return (
            <div>
                <div className='forms'>
                            <form>
                                {this.getTitle()}
                                <div className = "form-group">
                                            <label> Marka </label>
                                            <input name="mark" className="form-control" 
                                                value={this.state.mark} onChange={this.changeMarkHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Model </label>
                                            <input name="model" className="form-control" 
                                                value={this.state.model} onChange={this.changeModelHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Kolor </label>
                                            <input name="color" className="form-control" 
                                                value={this.state.color} onChange={this.changeColorHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Zdjęcie </label>
                                            <input name="img" className="form-control" 
                                                value={this.state.img} onChange={this.changeImgHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Cena </label>
                                            <input name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Rok produkcji </label>
                                            <input name="productionYear" className="form-control" 
                                                value={this.state.productionYear} onChange={this.changeProductionYearHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> VIN </label>
                                            <input name="vin" className="form-control" 
                                                value={this.state.vin} onChange={this.changeVinHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Dostępność </label>
                                            <input name="available" className="form-control" 
                                                value={this.state.available} onChange={this.changeAvailableHandler}/>
                                        </div><br />
                                        <Button size="md" variant="secondary" type="submit" onClick={this.saveOrUpdateCar}>Zapisz</Button>  
                                        <Button style={{marginLeft: "10px"}} size="md" variant="danger" type="submit" onClick={this.cancel.bind(this)}>Anuluj</Button>                          
                                </form>
                            </div>  
            </div>
        );
    }
}

export default CarForm;