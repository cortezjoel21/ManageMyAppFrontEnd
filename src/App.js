import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import Login from './component/login/login';
import Home from './component/home/home';
import Userdetails from './component/users/userdetails';
class App extends Component {

    constructor() {
        super();
        localStorage.setItem("username", "bill");
        localStorage.setItem("username", "abc123");
        return fetch(`curl -u bill:abc123 http://localhost:8080/dashboard/getUsers'`, {
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'username': 'bill',
                'password': 'abc123'
            },
            method: "POST",
            body: JSON.stringify({ username, password }),
        }).then((a) => localStorage.auth = JSON.stringify(a))
        
    }
    
    render() {
     
        return (
            < Router >
                <div className="App">
                    <Route path="/" exact strict render={
                        () => {
                            return (<Login></Login>)
                        }
                    }>
                    </Route>

                    <Route path="/home/" exact strict render={
                        () => {
                            return (<Home></Home>)
                        }
                    }>
                    </Route>
                    <Route path="/userdetails/" render={
                        () => {
                            return (<Userdetails></Userdetails>)
                        }
                    }>
                    </Route>
                </div>
            </Router >
        )
    }
}
export default App;
