import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddOrderModal} from './AddOrderModal';
import {EditOrderModal} from './EditOrderModal';

export class Order extends Component{

    constructor(props){
        super(props);
        this.state={ords:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Orders')
        .then(response=>response.json())
        .then(data=>{
            this.setState({ords:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteOrd(Id){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Orders/'+Id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {ords, OrderId,ClientName,Products,Weight,Price}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>OrderId</th>
                        <th>ClientName</th>
                        <th>Products</th>
                        <th>Weight</th>
                        <th>Price</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ords.map(ord=>
                            <tr key={ord.OrderId}>
                                <td>{ord.OrderId}</td>
                                <td>{ord.ClientName}</td>
                                <td>{ord.Products}</td>
                                <td>{ord.Weight}</td>
                                <td>{ord.Price}</td>
                                <td>

                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            OrderId:ord.OrderId,ClientName:ord.ClientName,Products:ord.Products,Weight:ord.Weight,Price:ord.Price})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteOrd(ord.OrderId)}>
                                                Delete
                                            </Button>

                                            <EditOrderModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            OrderId={OrderId}
                                            ClientName={ClientName}
                                            Products={Products}
                                            Weight={Weight}
                                            Price={Price}/>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Order</Button>

                    <AddOrderModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}