import React, { Component } from 'react';
import './login.css';

import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
class Login extends Component {


    constructor(props) {
        super(props);
        this.loginHandle = this.loginHandle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    state = {
        loggedIn: false,
        users: [
            { username: "John", password: "password1", id: 1 },
            { username: "Jill", password: "password2", id: 2 },
            { username: "Pete", password: "password3", id: 3 },
        ],
    }

    loginHandle(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="outer-screen">
                        <div className="inner-screen">
                            <div className="form">
                                <input type="text" placeholder="Username" />
                                <input type="text" placeholder="Password" />
                                <Link className="link" to="/home" >
                                    <input type="submit" value="Login"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default Login;