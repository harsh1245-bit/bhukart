import React, { Component } from 'react'

import app from '../firebase';

export default class Buy extends Component {
    static propTypes = {
        "email": "string"
    }
    constructor(props){
        super(props);
        this.state={
            
            phone:"",
            room:"",
            name:"",
            hostel:""
        }
    }
    componentDidMount(){
        
        let db= app.firestore();
        var docRef=db.collection("users").doc(this.props.email);
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


    render() {
        return (
            <div>
               Phone: {this.state.phone} <br />
               Hostel : {this.state.hostel} <br />
               Room : {this.state.room}
            </div>
        )
    }
}
