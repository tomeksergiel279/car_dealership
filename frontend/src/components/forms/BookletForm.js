import React, { Component } from 'react';
import BookletService from '../services/BookletService';
import { Button } from 'react-bootstrap';
import '../styles/FormStyle.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
toast.configure()

class BookletForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            serviceInspection: '',
            repair: '',
            repairDate: '',
            repairProducent: ''
        }

        this.changeRepairHandler = this.changeRepairHandler.bind(this);
        this.changeServiceInspectionHandler = this.changeServiceInspectionHandler.bind(this);
        this.changeRepairDateHandler = this.changeRepairDateHandler.bind(this);
        this.changeRepairProducentHandler = this.changeRepairProducentHandler.bind(this);
        this.updateBooklet = this.updateBooklet.bind(this);
    }

    componentDidMount(){
        BookletService.getBookletById(this.state.id).then( (res) =>{
            let booklet = res.data;
            this.setState({
                serviceInspection: booklet.serviceInspection,
                repair: booklet.repair,
                repairDate: booklet.repairDate,
                repairProducent: booklet.repairProducent

            });
        });
    }  

    updateBooklet = (e) => {
        e.preventDefault();
        let booklet = {serviceInspection: this.state.serviceInspection, repair: this.state.repair, repairDate: this.state.repairDate, repairProducent: this.state.repairProducent};

        console.log("booklet => "+ JSON.stringify(booklet));

        BookletService.updateBooklet(booklet,this.state.id, "tomek10XD@interia.pl ").then( res => {
            if(res.status === 200) 
            {
                toast.success('Książka serwisowa zmodyfikowana') 
            }
            else {
                toast.error("Książka serwisowa nie zmodyfikowana")
            }
            this.props.history.push(`/booklet/${this.state.id}`);
        }).catch(err => toast.error("Błąd"));
    }
    
    changeServiceInspectionHandler = (event) => {
        this.setState({serviceInspection: event.target.value});
    }

    changeRepairHandler = (event) => {
        this.setState({repair: event.target.value});
    }

    changeRepairDateHandler = (event) => {
        this.setState({repairDate: event.target.value});
    }

    changeRepairProducentHandler = (event) => {
        this.setState({repairProducent: event.target.value});
    }

    cancel(){
        this.props.history.push(`/booklet/${this.state.id}`)
    }
    
    render() {
        return (
            <div className='forms'>
                <form>
                    <h2 className="text-center">Zmodyfikuj Książkę serwisową</h2><br />
                    <div className = "form-group">
                        <label> Data przeglądu </label>
                        <input name="serviceInspection" 
                            className="form-control" 
                            value={this.state.serviceInspection} 
                            onChange={this.changeServiceInspectionHandler}
                            required 
                        />
                    </div>                        
                    <div className = "form-group">
                        <label> Naprawy </label>
                        <input name="repair" 
                            className="form-control" 
                            value={this.state.repair} 
                            onChange={this.changeRepairHandler}
                            required 
                        />
                    </div>
                    <div className = "form-group">
                        <label> Data naprawy </label>
                        <input name="repairDate" 
                            className="form-control" 
                            value={this.state.repairDate} 
                            onChange={this.changeRepairDateHandler}
                            required 
                        />
                    </div>
                    <div className = "form-group">
                        <label> Producent części </label>
                        <input name="repairProducent" 
                            className="form-control" 
                            value={this.state.repairProducent} 
                            onChange={this.changeRepairProducentHandler}
                            required 
                        />
                    </div><br />
                    <Button size="md"
                        variant="secondary" 
                        type="submit" 
                        onClick={this.updateBooklet} >
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
export default BookletForm;