import React, { Component } from "react";
import app from "../firebase";
import {
   
  Link
} from "react-router-dom";

export default class Login extends Component {

    signup = () => {
        console.log("working");
        let auth = app.auth();
        
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        if(email.includes('itbhu.ac.in') && password.length>=8){
          console.log("working");
          console.log(email, password);
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((e, user) => {
            console.log("working1");
            console.log(e.user.email.length);
          })
          .catch((e) => {
            console.log(e);
          });
        }
        else{
          if(!email.includes('itbhu.ac.in')){
            document.getElementById('email_alert').style.display='block';
            setTimeout(function(){ document.getElementById('email_alert').style.display='none'; }, 5000);
          }
          if(password.length<8){
            document.getElementById('password_alert').style.display='block';
            setTimeout(function(){ document.getElementById('password_alert').style.display='none'; }, 5000);
          }
        }
        
      };
      signin = () => {
        console.log("working");
        let auth = app.auth();
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        console.log(email, password);
        auth
          .signInWithEmailAndPassword(email.value, password.value)
          .then((e, user) => {
            window.alert("Signed in successfully.");
            console.log(e.user.email);
          })
          .catch((e) => {
            window.alert(e);
          });
      };
  render() {
    return (
      <div>
        
        <div id="login_div" className="container my-3">
          <h2 className="my-3">Log In to shop your needs</h2>
          <hr />
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              @Email:
            </span>

            <input
              type="email"
              class="form-control"
              placeholder="Username"
              id="email"
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
          <label for="password" class="form-label">
            Password:
          </label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon3">
              Keep hiding it
            </span>
            <input
              type="password"
              class="form-control"
              id="password"
              aria-describedby="basic-addon3"
            />
          </div>
          <div
            id="password_alert"
            class="alert alert-warning"
            role="alert"
            style={{ display: "none" }}
          >
            Password must be of <strong>8 characters</strong>.
          </div>
          <button className="btn btn-dark" onClick={this.signin}>
            Sign In
          </button>{" "}
          <p className="mx-3" style={{ display: "inline-block" }}>
            <strong>Don't have an Account?</strong> <Link to='/signup'>Sign up</Link>
          </p>
          
          
          <Link to='/forget' className="text-right">Forgot Password?</Link>
        </div>
      </div>
    );
  }
}
