import React, { Component } from 'react';
import BookletService from '../services/BookletService';
import { Button } from 'react-bootstrap';
import '../Form.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


toast.configure()


class BookletForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            serviceInspection: '',
            lastRepair: ''
        }

        this.changeLastRepairHandler = this.changeLastRepairHandler.bind(this);
        this.changeServiceInspectionHandler = this.changeServiceInspectionHandler.bind(this);
        this.updateBooklet = this.updateBooklet.bind(this);
    }


    componentDidMount(){
        BookletService.getBookletById(this.state.id).then( (res) =>{
            let booklet = res.data;
            this.setState({
                serviceInspection: booklet.serviceInspection,
                lastRepair: booklet.lastRepair          
            });
        });
    }  

    updateBooklet = (e) => {
        e.preventDefault();
        let booklet = {serviceInspection: this.state.serviceInspection, lastRepair: this.state.lastRepair};

        console.log("booklet => "+ JSON.stringify(booklet));

        BookletService.updateBooklet(booklet,this.state.id).then( res => {
            if(res.status === 200) { toast.success('Książka serwisowa zmodyfikowana') }
            else { toast.error("Książka serwisowa nie zmodyfikowana") }
            this.props.history.push(`/booklet/${this.state.id}`);
        }).catch(err => toast.error("Błąd"));
    }
    

    changeServiceInspectionHandler = (event) => {
        this.setState({serviceInspection: event.target.value});
    }

    changeLastRepairHandler = (event) => {
        this.setState({lastRepair: event.target.value});
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
                                            <input name="serviceInspection" className="form-control" 
                                                value={this.state.serviceInspection} onChange={this.changeServiceInspectionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Ostatnia naprawa </label>
                                            <input name="lastName" className="form-control" 
                                                value={this.state.lastRepair} onChange={this.changeLastRepairHandler}/>
                                            
                                        </div><br />
                                        <Button onClick={this.updateBooklet} size="md" variant="secondary" type="submit">Zapisz</Button>  
                                        <Button style={{marginLeft: "10px"}} size="md" variant="danger" type="submit" onClick={this.cancel.bind(this)}>Anuluj</Button>                          
                            </form>
                </div>  
        );
    }
}

export default BookletForm;