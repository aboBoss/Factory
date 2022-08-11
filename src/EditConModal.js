import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditConModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'contractor',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:event.target.Id.value,
                ContractorName:event.target.ContractorName.value,
                PhoneNumber:event.target.PhoneNumber.value
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
                            Edit Contractor
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="Id">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type="text" name="Id" required
                                        disabled
                                        defaultValue={this.props.Id} 
                                        placeholder="Id"/>
                                    </Form.Group>

                                    <Form.Group controlId="ContractorName">
                                        <Form.Label>ContractorName</Form.Label>
                                        <Form.Control type="text" name="ContractorName" required 
                                        defaultValue={this.props.ContractorName}
                                        placeholder="ContractorName"/>
                                    </Form.Group>

                                    <Form.Group controlId="PhoneNumber">
                                        <Form.Label>PhoneNumber</Form.Label>
                                        <Form.Control type="text" name="PhoneNumber" required 
                                        defaultValue={this.props.PhoneNumber}
                                        placeholder="PhoneNumber"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Contractor
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