import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddStockModal} from './AddStockModal';
import {EditStockModal} from './EditStockModal';

export class Stock extends Component{

    constructor(props){
        super(props);
        this.state={stks:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Stocks')
        .then(response=>response.json())
        .then(data=>{
            this.setState({stks:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteStock(Id){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Stocks/'+Id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {stks,Id, Diameter,Sum}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Diameter</th>
                        <th>Sum</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stks.map(stk=>
                            <tr key={stk.Id}>
                                <td>{stk.Id}</td>
                                <td>{stk.Diameter}</td>
                                <td>{stk.Sum}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            Id:stk.Id,Diameter:stk.Diameter,Sum:stk.Sum})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteStock(stk.Id)}>
                                                Delete
                                            </Button>

                                            <EditStockModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            Id={Id}
                                            Diameter={Diameter}
                                            Sum={Sum}/>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Stock</Button>

                    <AddStockModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}