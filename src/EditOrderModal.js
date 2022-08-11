import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditOrderModal extends Component{
    constructor(props){
        super(props);
        this.state={cons:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'contractor')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cons:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Orders',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                OrderId:event.target.OrderId.value,
                ClientName:event.target.ClientName.value,
                Products:event.target.Products.value,
                Weight:event.target.Weight.value,
                Price:event.target.Price.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Order
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="OrderId">
                                        <Form.Label>OrderId</Form.Label>
                                        <Form.Control type="text" name="OrderId" required
                                        disabled
                                        defaultValue={this.props.OrderId} 
                                        placeholder="OrderId"/>
                                    </Form.Group>

                            
                                    <Form.Group controlId="ClientName">
                                        <Form.Label>ClientName</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.ClientName}>
                                        {this.state.cons.map(con=>
                                            <option key={con.Id}>{con.ContractorName}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="Products">
                                        <Form.Label>Products</Form.Label>
                                        <Form.Control type="text" name="Products" required
                                        defaultValue={this.props.Products} 
                                        placeholder="Products"/>
                                    </Form.Group>

                                    <Form.Group controlId="Weight">
                                        <Form.Label>Weight</Form.Label>
                                        <Form.Control type="text" name="Weight" required 
                                        defaultValue={this.props.Weight}
                                        placeholder="Weight"/>
                                    </Form.Group>

                                    <Form.Group controlId="Price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" name="Price" required 
                                        defaultValue={this.props.Price}
                                        placeholder="Price"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Order
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}