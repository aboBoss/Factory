import React, {useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";


function Register(props){

    const history = useHistory();
    const navigateTo = () => history.push('/');

    const [name,SetName]=useState('');
    const [password,SetPassword]=useState('');
    const [phoneNo,SetPhoneNo]=useState('');

    const handleNameChange = (value) =>{
        SetName(value);

    }
    const handlePasswordChange = (value) =>{
        SetPassword(value);
    }
    const handlePhoneNoChange = (value) =>{
        SetPhoneNo(value);
    }

    const handleSignUp = () =>{
        const data ={
            Name : name,
            Password : password,
            PhoneNo : phoneNo,
            IsActive : 1       
        };
        
        if(data.Name === '' || data.Password === ''|| data.PhoneNo === '' ){
            alert('null')
            return;
        }
  
        const url = 'http://localhost:49902/api/UserMangement/Registration';
        axios.post(url,data).then((result) =>{
            alert(result.data)

        }).catch((error)=>{
            alert(error)

        })
        history.push('/')



    }






    return(
       
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" id="txtName" onChange={(e)=> handleNameChange(e.target.value)}/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="txtPassword" onChange={(e)=> handlePasswordChange(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter Phone Number" id="txtPhoneNo" onChange={(e)=> handlePhoneNoChange(e.target.value)}/>
        </Form.Group>
     
        <Button onClick={() => handleSignUp()} variant="primary" type="submit">
          Sign Up
        </Button>

        <br></br>
        <br></br>

        <Button onClick={navigateTo} variant="primary" type="submit">
          Login
        </Button>

      </Form>

          
    )
}

export default Register