import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddMenModal} from './AddMenModal';
import {EditMenModal} from './EditMenModal';

export class Menu extends Component{

    constructor(props){
        super(props);
        this.state={mens:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'menu')
        .then(response=>response.json())
        .then(data=>{
            this.setState({mens:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteMen(ProductId){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'menu/'+ProductId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {mens, ProductId,ProductName}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>ProductId</th>
                        <th>ProductName</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mens.map(men=>
                            <tr key={men.ProductId}>
                                <td>{men.ProductId}</td>
                                <td>{men.ProductName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            ProductId:men.ProductId,ProductName:men.ProductName})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteMen(men.ProductId)}>
                                                Delete
                                            </Button>

                                            <EditMenModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            ProductId={ProductId}
                                            ProductName={ProductName}/>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Product</Button>

                    <AddMenModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}