import React, { Component } from 'react'

import app from "../firebase";
import NavLog from './NavLog';



export default class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            phone:"",
            hostel:"",
            room:"",
            password:""
        }
    }
    save=async(i)=>{
        if(this.state.phone.length<10){
            document.getElementById('phone_alert').style.display='block';
            setTimeout(function(){ document.getElementById('phone_alert').style.display='none'; }, 5000);
          }
        
        else{
            const db=app.firestore();
        
        
        
        await db.collection("users").doc(this.state.email).update({
            name: this.state.name, phone:this.state.phone,hostel:this.state.hostel,room:this.state.room
          });
          alert("Profile Updated");
        
        this.componentDidMount();
        }
    }
    componentDidMount(){
        let auth = app.auth();
        let db=app.firestore();
        auth.onAuthStateChanged( (user)=> {
            if (user) {
              // User is signed in.
      
              
              user = auth.currentUser;
      
              this.setState({email:user.email})
                var docRef=db.collection("users").doc(this.state.email);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        this.setState({
                            hostel:doc.data().hostel,
                            room:doc.data().room,
                            phone:doc.data().phone,
                            name:doc.data().name
                        })
                        
            
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            } else {
              // No user is signed in.
      
              
              
              
            }
          });

    }
    signup =()=>{
        console.log(this.state);
        if(!this.state.email.includes('itbhu.ac.in')){
            document.getElementById('email_alert').style.display='block';
            setTimeout(function(){ document.getElementById('email_alert').style.display='none'; }, 5000);
          }
          else if(this.state.phone.length<10){
            document.getElementById('phone_alert').style.display='block';
            setTimeout(function(){ document.getElementById('phone_alert').style.display='none'; }, 5000);
          }
        else if(this.state.password.length<8){
            document.getElementById('password_alert').style.display='block';
            setTimeout(function(){ document.getElementById('password_alert').style.display='none'; }, 5000);
          }
          else{
              const db= app.firestore();
              let auth = app.auth();
              db.collection("users").doc(this.state.email).set({
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                hostel: this.state.hostel,
                room: this.state.room
                
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

            auth
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((e) => {
            console.log("working1");
            
          })
          .catch((e) => {
            console.log(e);
          });

          }
    }

    render() {
        return (
            <>
            <div id="signup_div">
                <NavLog/>
                <div className="container my-4 card" >
                    <h1 className=" my-1">Edit Profile</h1>
                    <hr />
                    <div >
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input type="text" className="form-control" onChange={(e) => this.setState({name:e.target.value})} placeholder="Username" aria-label="Username" value={this.state.name} aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Email" value={this.state.email} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className ="input-group-append">
                    <span className ="input-group-text" id="basic-addon2">example@itbhu.ac.in</span>
                    </div>
                </div>
                

                <label for="basic-url">Your whatsapp number</label>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">+91</span>
                    </div>
                    <input type="text" onChange={(e) => this.setState({phone:e.target.value})} value={this.state.phone} className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                </div>
                <div
                    id="phone_alert"
                    class="alert alert-warning"
                    role="alert"
                    style={{ display: "none" }}
                >
                    Please enter a valid phone number.
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Hostel</span>
                    </div>
                    <input type="text" onChange={(e) => this.setState({hostel:e.target.value})} className="form-control" value={this.state.hostel} aria-label="Amount (to the nearest dollar)"/>
                    
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Room No.</span>
                    </div>
                    <input type="text" onChange={(e) => this.setState({room:e.target.value})} value={this.state.room} className="form-control" aria-label="Amount (to the nearest dollar)"/>
                    
                </div>
                
                <button className="btn btn-dark mb-3" onClick={this.save}>Save</button>

                
                </div>
                </div>

            </div>
            
            </>
        )
    }
}
