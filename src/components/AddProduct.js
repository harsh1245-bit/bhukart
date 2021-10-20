import React, { Component } from 'react'
import app from "../firebase";
import NavLog from"./NavLog";
import { getFirestore } from "firebase/firestore";

import { doc, setDoc } from "firebase/firestore"; 
import { storage } from "../firebaseApp";



export default class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state={
            product:"",
            description:"",
            price:"",
            file:"",
            room:"",
            hostel:"",
            imgUrl:"",
            email:"",
            phone:"",
            
        }
    }
   
   handleUpload(){

   }
    

   handleUpload = () => {
    
     storage.ref(`images/{this.state.file.name}`).put(this.state.file).then(function(snapshot) {

            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            document.getElementById("progress").innerHTML=progress + '% done';
            console.log('Upload is ' + progress + '% done');

        }).then(()=> {
            // Upload completed successfully, now we can get the download URL
            storage
          .ref("images")
          .child(this.state.file.name)
          .getDownloadURL().then((downloadURL)=> {
                console.log('File available at', downloadURL);
                this.setState({imgUrl:downloadURL});
                this.addData();
                alert('Data added successfully');

            });
        });
    
    
  };
  addData=()=> {
   
    try {
      
      const db = getFirestore();
      
      const docRef =  setDoc(doc(db, "marketplace", this.state.product+this.state.email), {
        name: this.state.product,
        price: this.state.price,
        uid: this.state.email,
        description: this.state.description,
        hostel:this.state.hostel,
        room:this.state.room,
        phone:this.state.phone,
        imgUrl:this.state.imgUrl
      });
      alert(
        "Your product has been added, refresh to view the marketplace. Thanks:)"
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
   fileSelectHandler=(event)=>{
       this.setState({
           file:event.target.files[0]
       })

    console.log(event.target.files[0]);
  }
    componentDidMount(){
        let auth = app.auth();

        auth.onAuthStateChanged((user1)=>{
            if(user1){
               user1 = auth.currentUser;
              this.setState({email:user1.email});
              let db1=app.firestore();
              var docRef=db1.collection("users").doc(this.state.email);
              docRef.get().then((doc) => {
                if (doc.exists) {
                    this.setState({
                        hostel:doc.data().hostel,
                        room:doc.data().room,
                        phone:doc.data().phone
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
            <>
      <NavLog/>
    <div className="card container my-3">
        
      <div className="card-body">
        <h3 class="card-title">Add your product</h3>
        <hr />
        <div className=" form-group my-3">
          <label for="email_">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email_"
            value={this.state.email}
            placeholder="name@example.com"
          />
        </div>
        <div className=" form-group my-3">
          <label for="name">Product Name</label>
          <input
            type="email"
            className="form-control"
            id="name"
            placeholder="Name"
            onChange={(e) => this.setState({product:e.target.value})}
            value= {this.state.product}
          />
        </div>
        <div className=" form-group my-3">
          <label for="price">Product Cost</label>
          <input
            type="email"
            className="form-control"
            id="price"
            value={this.state.price}
            onChange={(e) => this.setState({price:e.target.value})}
            placeholder="Price"
          />
        </div>

        <div className=" form-group my-3">
          <label for="description">Product Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={this.state.description}
            onChange={(e) => this.setState({description:e.target.value})}
          ></textarea>
        </div>
        <div className=" form-group my-3">
          <label for="address">Phone no.</label>
          <input
            type="email"
            className="form-control"
            id="address"
            
            placeholder="Where to find you?"
            value={this.state.phone}
          />
        </div>
        <div className=" form-group my-3">
          <label for="address">Hostel</label>
          <input
            type="email"
            className="form-control"
            id="address"
            placeholder="Where to find you?"
            value={this.state.hostel}
          />
        </div>
        <div className=" form-group my-3">
          <label for="address">Room no.</label>
          <input
            type="email"
            className="form-control"
            id="address"
            placeholder="Where to find you?"
            value={this.state.room}
          />
        </div>
        <div className=" form-group my-3">
          <label for="image">Upload a picture</label>
          <input
            type="file"
            className="form-control"
            onChange={this.fileSelectHandler}
            id="image"
            placeholder="How does your product look like?"
          /> <div id="progress"></div>
        </div>
        <button className="btn btn-dark my-2" onClick={this.addData}>
          Add product
        </button>
        <button className="btn btn-dark my-2" onClick={this.handleUpload}>
          File upload
        </button>
      </div>
    </div>
  </>
        )
    }
}
