import React, { Component } from 'react';
import 'firebase/auth';
import fire from '../../config/firebaseConfig';
import './Login.css';



class Register extends Component {

    state = {
        email: '',
        password: '',
        displayName: '',
        firebaseErrors: ''
    }


    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = e => {
        e.preventDefault();
        fire.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                var theCurrentUser = fire.auth().currentUser
                theCurrentUser.updateProfile({
                    displayName: this.state.displayName
                })
            })
            .catch((error) => {
                this.setState({
                    firebaseErrors: error.message
                })
            })
    }



    render() {

        let errorNotification = this.state.firebaseErrors ?
            (<div className="Error">{this.state.firebaseErrors}</div>) : null
        return (
            <div>
                {errorNotification}
                <form>
                    <input type="text"
                        className="regField"
                        placeholder="Your Name"
                        onChange={this.handleChange}
                        value={this.state.displayName}
                        name="displayName" />

                    <input type="email"
                        className="regField"
                        placeholder="Email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        name="email" />

                    <input type="password"
                        className="regField"
                        placeholder="Password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        name="password" />

                    <input type="submit"
                        className="submitBtn"
                        onClick={this.register}
                        value="Register" />
                </form>
            </div>
        )
    }
}

export default Register;
