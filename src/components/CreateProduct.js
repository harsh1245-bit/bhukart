

import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import app from "../firebase";

import { storage } from "../firebaseApp";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import React, { useState } from "react";
import NavLog from "./NavLog";





export default function CreateProduct(props) {
  const [file, setfile] = useState(null);
  const [user, setuser] = useState("")
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [hostel,sethostel] = useState("");
  const [room,setroom] = useState("");
  const [phone,setphone] = useState("");

  let auth = app.auth();
  auth.onAuthStateChanged(function(user1){
    if(user1){
      var user1 = auth.currentUser;
      setuser(user1.email);
      let db1=app.firestore();
      var docRef=db1.collection("users").doc(user);
      docRef.get().then((doc) => {
        if (doc.exists) {
            
            sethostel(doc.data().hostel);
            setroom(doc.data().room);
            setphone(doc.data().phone);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
      
    }
  })
  
  
      
  
  



  const handleUpload = () => {
    {/*const uploadTask =*/} storage.ref(`images/${file.name}`).put(file).then(function(snapshot) {

            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            document.getElementById("progress").innerHTML=progress + '% done';
            console.log('Upload is ' + progress + '% done');

        }).then(function() {
            // Upload completed successfully, now we can get the download URL
            storage
          .ref("images")
          .child(file.name)
          .getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                setUrl(downloadURL);
                addData(downloadURL);
                alert('Data added successfully');

            });
        });
    
    {/*uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });

          addData(url);
          alert('Data added successfully');

      }
    );*/}
  };

  
  const db = getFirestore();
  function fileSelectHandler(event) {
    setfile(event.target.files[0]);
    console.log(event.target.files[0]);
  }
  function uploadFile() {
    const storage = getStorage();
    let bucketName = "images";
    let files = setfile;
   const storageRef = ref(storage,`${bucketName}/${files.name}`);
    uploadBytes(storageRef, files).then((snapshot) => {
      console.log('Uploaded a blob or file!',snapshot.downloadURL);
    });
  }

  async function addData(url) {
    let name = document.getElementById("name");
    let price = document.getElementById("price");
    let address = document.getElementById("address");
    let description = document.getElementById("description");
    let email = document.getElementById("email_");

    try {
      {/*addDoc(collection(db, "marketplace")*/}
      
      const docRef = await setDoc(doc(db, "marketplace", name.value+email.value), {
        name: name.value,
        price: price.value,
        uid: email.value,
        description: description.value,
        address: address.value,
        imgUrl:url
      });
      alert(
        "Your product has been added, refresh to view the marketplace. Thanks:)"
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function readData() {
    const querySnapshot = await getDocs(collection(db, "marketplace"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().name}`);
      console.log(`${doc.id} => ${doc.data().price}`);
    });
  }
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
            value={user}
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
          />
        </div>
        <div className=" form-group my-3">
          <label for="price">Product Cost</label>
          <input
            type="email"
            className="form-control"
            id="price"
            placeholder="Price"
          />
        </div>

        <div className=" form-group my-3">
          <label for="description">Product Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
          ></textarea>
        </div>
        <div className=" form-group my-3">
          <label for="address">Phone no.</label>
          <input
            type="email"
            className="form-control"
            id="address"
            placeholder="Where to find you?"
            value={phone}
          />
        </div>
        <div className=" form-group my-3">
          <label for="address">Hostel</label>
          <input
            type="email"
            className="form-control"
            id="address"
            placeholder="Where to find you?"
            value={hostel}
          />
        </div>
        <div className=" form-group my-3">
          <label for="address">Room no.</label>
          <input
            type="email"
            className="form-control"
            id="address"
            placeholder="Where to find you?"
            value={room}
          />
        </div>
        <div className=" form-group my-3">
          <label for="image">Upload a picture</label>
          <input
            type="file"
            className="form-control"
            onChange={fileSelectHandler}
            id="image"
            placeholder="How does your product look like?"
          /> <div id="progress"></div>
        </div>
        <button className="btn btn-dark my-2" onClick={addData}>
          Add product
        </button>
        <button className="btn btn-dark my-2" onClick={handleUpload }>
          File upload
        </button>
      </div>
    </div>
  </>);
}
