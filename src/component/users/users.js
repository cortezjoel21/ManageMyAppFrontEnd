import React, { Component } from 'react';
import { FormGroup, Table, Button, Modal, NavLink, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Label, Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import { BrowserRouter as Redirect } from 'react-router-dom';
class Users extends Component {

    constructor() {
        super();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
        console.log("localStorage: ", localStorage.getItem("token"));
    }

    state = {
        users: [],
        updateUserModal: false,
        updatedUser: {
            id: null,
            accessType: '',
            accessTypeNo: ''
        },
        deletedUser: {
            id: null,
        },
        renderPage: ''
    }

    componentWillMount() {
        this._getUsers();
    }

    _getUsers() {
        console.log("token: ", localStorage.getItem("token"));
        axios.get('http://localhost:8080/dashboard/getUsers').then((response) => {
            this.setState({
                updateUserModal: false,
                users: response.data
            })
        });
    }

    openUpdateUserModel(id, accessType, accessTypeNo) {
        this.setState({
            updateUserModal: true, updatedUser: {
                id: id,
                accessType: accessType,
                accessTypeNo: accessTypeNo
            }
        })
    }

    updateUser() {
        axios.post('http://localhost:8080/dashboard/updateUser', this.state.updatedUser).then((response) => {
            this._getUsers();
        });
    }

    deleteUser(id) {
        console.log("id", id);
        let { deletedUser } = this.state;
        deletedUser.id = id;
        this.setState({ deletedUser });
        axios.post('http://localhost:8080/dashboard/deleteUser', this.state.deletedUser).then((response) => {
            this._getUsers();
        });
    }

    userDetailsPage() {
        this.setState({ renderPage: '/home/userdetails/' });
    }

    render() {
        if ( this.state.renderPage != '') {
            console.log("renderPage:",  this.state.renderPage);
            return <Redirect to={ this.state.renderPage} />;
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.users = this.state.users.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.accessType}</td>
                    <td>
                        <Button color="primary" size="sm" className="mr-2" onClick={this.userDetailsPage.bind(this)}>
                            User Details
                    </Button>
                        <Button color="primary" size="sm" className="mr-2" onClick={this.openUpdateUserModel.bind(this, user.id, user.accessType, user.accessTypeNo)}>
                            Update
                        </Button>
                        <Button color="danger" size="sm"
                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) { this.deleteUser(user.id) }; }}
                        >Delete</Button>
                    </td>
                </tr>
            )
        })

        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Access Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.users}

                    <Modal isOpen={this.state.updateUserModal} >
                        <ModalHeader>Update User</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <InputGroup>
                                    <Container>
                                        <Row>
                                            <Col style={{ margin: "auto" }}><Label>User Id:</Label></Col>
                                            <Col style={{ margin: "auto", padding: "0px 0px 0px 12px" }}><Label id="id" placeholder="id">{this.state.updatedUser.id}</Label></Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ margin: "auto" }}>
                                                Access Type:
                                            </Col>
                                            <Col>
                                                <Input style={{ width: "100%", margin: "0px" }} id="accessType" placeholder="Access Type" value={this.state.updatedUser.accessType}
                                                    onChange={(e) => {
                                                        let { updatedUser } = this.state;
                                                        updatedUser.accessType = e.target.value;
                                                        this.setState({ updatedUser });
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col style={{ margin: "auto" }}>
                                                Access Type No.:
                                            </Col>
                                            <Col>
                                                <Input style={{ width: "100%", margin: "0px" }} id="accessTypeNo" placeholder="Access Type No." value={this.state.updatedUser.accessTypeNo}
                                                    onChange={(e) => {
                                                        let { updatedUser } = this.state;
                                                        updatedUser.accessTypeNo = e.target.value;
                                                        this.setState({ updatedUser });
                                                    }} />
                                            </Col>
                                        </Row>
                                    </Container>
                                </InputGroup>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.updateUser.bind(this)}>Update</Button>
                            <Button >Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </tbody>
            </Table>
        )
    };
}

export default Users;