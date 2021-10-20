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
          document.getElementById("greet").innerHTML =
            `<div class="jumbotron mx-4 my-4">
            <h1 class="display-4">Hello,${email_id},${first_name}</h1>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr class="my-4">
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
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
