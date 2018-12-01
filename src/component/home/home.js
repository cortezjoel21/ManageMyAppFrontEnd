import React, { Component } from 'react';
import { FormGroup, Table, Button, Modal, NavLink, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import Users from '../users/user';

class Home extends Component {

    constructor() {
        super();
    }

    render() {

        return (
            <Users />
        )
    }

}

export default Home;