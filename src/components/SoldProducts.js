
import React, { Component } from 'react'
import app from "../firebase";
import NavLog from './NavLog';

export default class SoldProducts extends Component {
    constructor(props){
        super(props);
        this.state={
            productList:[],
            user:"",
            productID:[],
            id:"",
            loading: true
        }
    }
    
    componentDidMount(){
        let auth = app.auth();
        
        auth.onAuthStateChanged((signer)=>{
            if(signer){
                this.setState({user:auth.currentUser.email})
            }
        })
        
        let products = [];
        let productIDs=[];
        
        const db=app.firestore();
        db.collection("marketplace")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((item) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(item.id, " => ", item.data());
                
                
                console.log(item.data().uid,this.state.user)
                if(item.data().uid===this.state.user && item.data().buy){
                    products.push(item.data());
                    productIDs.push(item.id);
                    
                    
                }
                console.log(products);
            });
            this.setState({
                productList:products,
                productID:productIDs,
                loading:false
            })
            if(products.length>0){
                document.getElementById('hide').style.display="none";

            }

        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
    
    render() {
        return (
            <div>
            <NavLog/>
            <h3 className="my-3 mx-4">Sold products</h3>
            <hr />
            <div className='row'id="list">
                
               
                {this.state.loading?<><div className="container"><h1 className="text-center">Loading...</h1></div></>:<>
                <h1 className="text-center" id="hide">Oops, you have not sold any poducts.</h1>
                {this.state.productList.map((element,index)=>{
            return <div className="col md-3" key={element.url}>
                <div className="col md-4 mx-2 my-2" >
        
                <div className="card" style={{width: "18rem"}}>
                <img src={element.imgUrl} className="card-img-top" alt="Harsh"/>
                <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <p className="card-text">{element.description}</p>
                    <button href="/" className="btn btn-dark my-1 ">{element.price}</button>
                    <button href="/" className="btn btn-dark my-1 mx-2" id={index} onClick={this.buyProduct}>{element.phone}</button>
                    <p className="card-text"><small className="text-muted">Hostel: {element.hostel}</small></p>
                    <p className="card-text"><small className="text-muted">Room No.: {element.room}</small></p>
                </div>
                </div>
            </div>
            
            </div>
            
            })}</>}
                
            
                
                </div>
        </div>
        )
    }
}
