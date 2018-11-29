import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';

import Login from './component/login/login';
import Home from './component/home/home';
class App extends Component {

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

                    <Route path="/home" exact strict render={
                        () => {
                            return (<Home></Home>)
                        }
                    }>
                    </Route>
                </div>
            </Router >
        )
    }
}
export default App;
