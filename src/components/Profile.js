import React, { Component } from 'react'
import app from '../firebase';
import NavLog from './NavLog';
import {
   
    Link
  } from "react-router-dom";

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            phone:"",
            room:"",
            name:"",
            hostel:""
        }
    }
    componentDidMount(){
        let auth =app.auth();
        let db= app.firestore();
        auth.onAuthStateChanged((user)=>{
            if(user){
                user=auth.currentUser;
                this.setState({email:user.email});
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

            }
        })

    }
    render() {
        return (
            <div className="card">
                <NavLog/>
                <div className="jumbotron mx-4 my-4" id="profile">
                <h1 className="display-4">Email: {this.state.email}</h1>
                <p className="lead">Name: {this.state.name} || Phone: {this.state.phone}</p>
                <hr className="my-4"/>
                <p>Hostel: {this.state.hostel} || Room no.: {this.state.room}</p>
                <Link className="btn btn-dark btn-sm" to="/editprofile" role="button">Edit Profile</Link>
                </div>
                <hr className='my-3'/>
                
            </div>
        )
    }
}
