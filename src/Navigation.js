import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/home">
                    Home
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/stock">
                    Stock
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/employee">
                    Employee
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/contractor">
                    Contractor
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/menu">
                    Menu
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/orders">
                    Orders
                </NavLink>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}