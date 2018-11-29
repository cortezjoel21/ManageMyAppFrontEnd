import React, { Component } from 'react';
import { FormGroup, Table, Button, Modal, NavLink, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            updatedUSer: {
                id: null,
                accessType: '',
                accessTypeNo: ''
            },
            updateUserModal: false
        }
    }

    componentWillMount() {
        axios.get('http://localhost:8080/dashboard/getUsers').then((response) => {
            this.setState({
                users: response.data
            })
        });
    }

    openUpdateUserModel(id, accessType, accessTypeNo) {
        this.setState({
             updateUserModal: true, updatedUSer: {
                id: id,
                accessType: accessType,
                accessTypeNo: accessTypeNo
            }
        });
    }
    updateUser() {
        console.log("===updateUser");
        axios.post('http://localhost:8080/dashboard/updateUser', this.state.updatedUSer).then((response) => {
            this.setState({
                updateUserModal: false,
            });
        });
    }



    render() {

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
                        <Button color="danger" size="sm">Delete</Button>
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
                                    <Input readOnly  style={{ width: "100%" }} id="id" placeholder="id" value={this.state.updatedUSer.id}
                                        onChange={(e) => {
                                            let { updatedUSer } = this.state;
                                            updatedUSer.id = e.target.value;
                                            this.setState({ updatedUSer });
                                        }}
                                    />
                                    <Input style={{ width: "100%" }} id="accessType" placeholder="Access Type" value={this.state.updatedUSer.accessType}
                                        onChange={(e) => {
                                            let { updatedUSer } = this.state;
                                            updatedUSer.accessType = e.target.value;
                                            this.setState({ updatedUSer });
                                        }}
                                    />
                                    <Input style={{ width: "100%" }} id="accessTypeNo" placeholder="Access Type No." value={this.state.updatedUSer.accessTypeNo}
                                        onChange={(e) => {
                                            let { updatedUSer } = this.state;
                                            updatedUSer.accessTypeNo = e.target.value;
                                            this.setState({ updatedUSer });
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

export default Home;