import React, { Component } from 'react';
import { FormGroup, Table, Button, Modal, NavLink, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

class Registration extends Component {


    state = {
        loggedIn: false,
        registerModal: false,
        newUser: {
            id: '',
            username: '',
            password: '',
            email: '',
            accessType: '',
            accessTypeNo: ''
        }
    }

    toogleRegisterModal() {
        this.setState({
            registerModal: true,
        })
        //this.state.registerModal = true;
    }

    saveUser() {
        axios.post('http://localhost:8080/dashboard/addUser', this.state.newUser).then((response) => {
            let { users } = this.state;
            this.setState({
                users, registerModal: false, newUser: {
                    id: '',
                    username: '',
                    password: '',
                    email: '',
                    accessType: '',
                    accessTypeNo: ''
                }
            });
        });
    }

    render() {
 
        return (
            <div>
                <NavLink style={{ color: 'lightblue', textDecoration: 'underline' }} onClick={this.toogleRegisterModal.bind(this)} color="primary" size="sm" className="mr-2">Register</NavLink>
                <Modal isOpen={this.state.registerModal} >
                    <ModalHeader>Registration</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <InputGroup>
                                <Input style={{width:"100%"}} id="id" placeholder="id" value={this.state.newUser.id}
                                onChange={(e) => {
                                    let { newUser } = this.state;
                                    newUser.id = e.target.value;
                                    this.setState({ newUser });
                                }}
                                /> 
                                <Input style={{width:"100%"}} id="username" placeholder="Username" value={this.state.newUser.username}
                                    onChange={(e) => {
                                        let { newUser } = this.state;
                                        newUser.username = e.target.value;
                                        this.setState({ newUser });
                                    }}
                                /> 
                                <Input style={{width:"100%"}} id="password" placeholder="Password" value={this.state.newUser.password}
                                    onChange={(e) => {
                                        let { newUser } = this.state;
                                        newUser.password = e.target.value;
                                        this.setState({ newUser });
                                    }}
                                /> 
                                <Input style={{width:"100%"}} id="email" placeholder="Email Address" value={this.state.newUser.email}
                                    onChange={(e) => {
                                        let { newUser } = this.state;
                                        newUser.email = e.target.value;
                                        this.setState({ newUser });
                                    }}
                                /> 
                                <Input style={{width:"100%"}} id="accessType" placeholder="Access Type" value={this.state.newUser.accessType}
                                    onChange={(e) => {
                                        let { newUser } = this.state;
                                        newUser.accessType = e.target.value;
                                        this.setState({ newUser });
                                    }}
                                />
                                <Input style={{width:"100%"}} id="accessTypeNo" placeholder="Access Type No." value={this.state.newUser.accessTypeNo}
                                    onChange={(e) => {
                                        let { newUser } = this.state;
                                        newUser.accessTypeNo = e.target.value;
                                        this.setState({ newUser });
                                    }} />
                            </InputGroup>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.saveUser.bind(this)}>Save</Button>
                        <Button >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export default Registration;