import React, { Component } from 'react'
import app from "../firebase";

export default class Welcome extends Component {
    componentDidMount(){
        let auth = app.auth();
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        

        user = auth.currentUser;

        if (user != null) {
          var email_id = user.email;
          console.log(typeof(user.email));

          
         var first_name= email_id.split('.')[0];
         var last_name= email_id.split('.')[1];
          document.getElementById("greet").innerHTML =
            `<div class="jumbotron mx-4 my-4">
            <h1 class="display-4">Hello,${first_name} ${last_name}</h1>
            <p class="lead">Welcome to BHUkart, now you don't need to roam around hostels for something you need eagerly.</p>
            <hr class="my-4">
            <p>Either you wanna sell something, or buy anything; BHUkart is there for you.</p>
            <a class="btn btn-secondary btn-lg" href="#" role="button">Happy shopping :)</a>
          </div><hr class='my-3'/>`;
          
        }
      } else {
        // No user is signed in.

       
      }
    });
    }
    render() {
        return (
            <>
            <div id='greet' className="card">
                
            </div>
            
            </>
        )
    }
}
