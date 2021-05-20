import React, { Component } from 'react';
import './Login.css';
import fire from '../../config/firebaseConfig';


class Login extends Component {

    state = {
        email: '',
        password: '',
        firebaseErrors: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = e => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
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


                <div>
                    {errorNotification}
                    <form>
                        <input type="email"
                            className="regField"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            name="email" />

                        <input type="password"
                            className="regField"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            name="password" />

                        <input type="submit"
                            className="submitBtn"
                            onClick={this.login}
                            value="Login" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;
