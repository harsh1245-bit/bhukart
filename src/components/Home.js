import React, { Component } from 'react'
import Login from './Login'
import Nav from './Nav'
import app from "../firebase";
import NavLog from './NavLog';
import Welcome from './Welcome';


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      user:false
    }
  }

    componentDidMount(){
        let auth = app.auth();
        auth.onAuthStateChanged( (user)=> {
            if (user) {
              // User is signed in.
      
              document.getElementById("loggedin").style.display = "block";
              document.getElementById("loggedout").style.display = "none";
      
              user = auth.currentUser;
      
              if (user != null) {
                
                console.log(typeof(user.email));
                this.setState({user:true})
              
      
                
               
              }
            } else {
              // No user is signed in.
      
              document.getElementById("loggedin").style.display = "none";
              document.getElementById("loggedout").style.display = "block";
              this.setState({user:false})
              
            }
          });

    }
    render() {
        return (
            <div>
              {!this.state.user?<Nav/>:<NavLog/>}
                <div id="loggedout">
                    
                    <Login/>
                </div>
                <div id="loggedin">
                    
                    <Welcome/>

                </div>
                
            </div>
        )
    }
}
