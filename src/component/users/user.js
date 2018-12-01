import React, { Component } from 'react';
import { FormGroup, Table, Button, Modal, NavLink, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

class Users extends Component {

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
        }
    }

    componentWillMount() {
        this._getUsers();
    }

    _getUsers() {
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

    render() {
        this.deleteUser = this.deleteUser.bind(this);
        this.users = this.state.users.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.accessType}</td>
                    <td>
                        <Button color="primary" size="sm" className="mr-2" onClick={this.openUpdateUserModel.bind(this, user.id, user.accessType, user.accessTypeNo)}>
                            Update
                        </Button>
                        <Button color="danger" size="sm"
                            onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) {this.deleteUser(user.id)}; }}
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
                        <ModalHeader>Registration</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <InputGroup>
                                    <Input readOnly style={{ width: "100%" }} id="id" placeholder="id" value={this.state.updatedUser.id}
                                        onChange={(e) => {
                                            let { updatedUser } = this.state;
                                            updatedUser.id = e.target.value;
                                            this.setState({ updatedUser });
                                        }}
                                    />
                                    <Input style={{ width: "100%" }} id="accessType" placeholder="Access Type" value={this.state.updatedUser.accessType}
                                        onChange={(e) => {
                                            let { updatedUser } = this.state;
                                            updatedUser.accessType = e.target.value;
                                            this.setState({ updatedUser });
                                        }}
                                    />
                                    <Input style={{ width: "100%" }} id="accessTypeNo" placeholder="Access Type No." value={this.state.updatedUser.accessTypeNo}
                                        onChange={(e) => {
                                            let { updatedUser } = this.state;
                                            updatedUser.accessTypeNo = e.target.value;
                                            this.setState({ updatedUser });
                                        }} />
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