import React, { Component } from 'react';

import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);
    }


    state = {
        loggedIn: false,
        users: [
            { username: "John", email: "email1", password: "password1", id: 1 },
            { username: "Jill", email: "email2", password: "password2", id: 2 },
            { username: "Pete", email: "email2", password: "password3", id: 3 },
        ],
    }



    render() {
        const usernameList = this.state.users.map((user) => {
            return (
                <td key={user.id}>{user.username}</td>
            )
        })
        const emailList = this.state.users.map((user) => {
            return (
                <td key={user.id}>{user.email}</td>
            )
        })

        return (
            <table>
                <tbody>
                    <tr>
                        {usernameList}
                    </tr>
                    <tr>
                        {emailList}
                    </tr>
                </tbody>
            </table>

        )
    }

}

export default Home;