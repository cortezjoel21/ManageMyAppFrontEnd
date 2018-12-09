import React, { Component } from 'react';
import './login.css';

import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Registration from '../registration/registration';
import axios from 'axios';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: "",
                logIn: false
            },
            username: "",
            password: ""
        }
    }



    login() {
        let headers = {};
        axios.post('http://localhost:8080/login', this.state.user).then((response) => {
            console.log("response.headers: ", response.headers);
            this.setState({
                user: response.data,
            })
            localStorage.setItem("token", this.state.user.auth) //Persist
            console.log("localStorage: ", localStorage.getItem("token"));
        }).catch(error => {
            console.log("ERROR: ", error);
        });
    }

    render() {
        if (this.state.user.logIn) {
            return <Redirect to='/home/' />;
        }

        return (
            <div className="container" >
                <div className="outer-screen">
                    <div className="inner-screen">
                        <div className="form">
                            <input type="text" placeholder="Username" value={this.state.user.username}
                                onChange={(e) => {
                                    let { user } = this.state;
                                    user.username = e.target.value;
                                    this.setState({ user });
                                }}
                            />
                            <input type="text" placeholder="Password" value={this.state.user.password}
                                onChange={(e) => {
                                    let { user } = this.state;
                                    user.password = e.target.value;
                                    this.setState({ user });
                                }}
                            />
                            <input type="submit" value="Login" onClick={() => { this.login() }} />
                            <Registration></Registration>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Login;