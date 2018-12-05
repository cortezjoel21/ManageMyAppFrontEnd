import React, { Component } from 'react';
import Users from '../users/users';
import { BrowserRouter as Router } from 'react-router-dom';
import Userdetails from '../users/userdetails';
import Route from 'react-router-dom/Route';

class Home extends Component {

    constructor() {
        super();
    }

    render() {
        let username = "bill";
        let password = "abc123";
       
        return (
            < Router >
                <div className="Home">
                    <Route path="/home/" exact strict render={
                        () => {
                            return (<Users />)
                        }
                    }>
                    </Route>
                   
                </div>
            </ Router>
        )
    }

}

export default Home;