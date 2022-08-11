import React, {useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";


function Login(props){

    const history = useHistory();
    const navigateTo = () => history.push('/register');
    const [name,SetName]=useState('');
    const [password,SetPassword]=useState('');


    const handleNameChange = (value) =>{
        SetName(value);

    }
    const handlePasswordChange = (value) =>{
        SetPassword(value);
    }

    const handleLogin = () =>{
        const data ={
            Name : name,
            Password : password,     
        };
        if(data.Name === '' || data.Password === ''|| data.PhoneNo === '' ){
            alert('null')
            return;
        }
     
        const url = 'http://localhost:49902/api/UserMangement/Login';
        axios.post(url,data).then((result) =>{
            alert(result.data)
        }).catch((error)=>{
            alert(error)
            
        })
        history.push('/home');     
    }

    return(
     
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" onChange={(e)=> handleNameChange(e.target.value)}/>
          <Form.Text className="text-muted" id="txtName">
          </Form.Text>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="txtPassword" onChange={(e)=> handlePasswordChange(e.target.value)}/>
        </Form.Group>
     
        <Button onClick={() => handleLogin()} variant="primary" type="submit">
          Login
        </Button>

        <br></br>
        <br></br>

        <Button  onClick={navigateTo} variant="primary" type="submit">
          To Register
        </Button>
      </Form>
    )
}

export default Login