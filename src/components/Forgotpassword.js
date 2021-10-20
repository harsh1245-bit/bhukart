import React, { Component } from 'react'
import Nav from './Nav';
import app from '../firebase';
import {
   
    Link
  } from "react-router-dom";

export default class Forgotpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
    }
    reset=async()=>{
        await app.auth().sendPasswordResetEmail(this.state.email)
        .then(() => {
            alert("Password email sent");
            this.setState({email:""})
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });


    }
    render() {
        return (
            <div>
                <Nav />
                <div className="container card my-3" style={{width: "30rem"}}>
                    <h2 className="text-center my-2">Forgot password?</h2>
                    <hr />
                    <h6>Enter your email</h6>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">
                            @Email:
                        </span>

                        <input
                            type="email"
                            class="form-control"
                            placeholder="Username"
                            value={this.state.email}
                            onChange={e=>{this.setState({email:e.target.value})}}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </div>
                    <div
                        id="email_alert"
                        class="alert alert-warning"
                        role="alert"
                        style={{ display: "none" }}
                    >
                        Please login with your <strong>Institute ID</strong>.
                    </div>
                    
                    <button className="btn btn-dark " onClick={this.reset}>Submit</button>
                    <Link className="btn btn-dark my-3" to='/' role='button'>Log-in</Link>
                    
                    
                </div>

            </div>
        )
    }
}
