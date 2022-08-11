import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddConModal} from './AddConModal';
import {EditConModal} from './EditConModal';

export class Contractor extends Component{

    constructor(props){
        super(props);
        this.state={cons:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'contractor')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cons:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteCon(Id){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'contractor/'+Id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {cons, Id,ContractorName,PhoneNumber}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>ContractorId</th>
                        <th>ContractorName</th>
                        <th>PhoneNumber</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cons.map(con=>
                            <tr key={con.Id}>
                                <td>{con.Id}</td>
                                <td>{con.ContractorName}</td>
                                <td>{con.PhoneNumber}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            Id:con.Id,ContractorName:con.ContractorName,PhoneNumber:con.PhoneNumber})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteCon(con.Id)}>
                                                Delete
                                            </Button>

                                            <EditConModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            Id={Id}
                                            ContractorName={ContractorName}
                                            PhoneNumber={PhoneNumber}/>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Contractor</Button>
                    
                    <AddConModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}