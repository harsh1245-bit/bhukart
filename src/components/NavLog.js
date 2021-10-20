import React, { Component } from 'react'
import app from "../firebase";
import {
   
    Link
  } from "react-router-dom";

export default class NavLog extends Component {
    signOut = () => {
        let auth = app.auth();
        auth
          .signOut()
          .then((e) => {
            alert("Signed out successfully");
          })
          .catch((e) => {
            console.log(e);
          });
      };
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">BHUKart</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/marketplace">Market place</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/yourproduct">Your products</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/addproduct">Add Product</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Others
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Your orders</a>
                            <a class="dropdown-item" href="#">Items sold</a>
                            </div>
                            
                        </li>
                        
                        
                        </ul>
                        <div className="d-flex">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile" >Your Profile</Link>
                                </li>
                            
                            <li
                            className="nav-item"
                            id="logout"
                            onClick={this.signOut}
                            to='/'
                            >
                            <Link className="nav-link" to="/" onClick={this.signOut} >Log out</Link>
                            </li>
                            </ul>
                        </div>
                        
                    </div>
                    </nav>
                
            </div>
        )
    }
}
