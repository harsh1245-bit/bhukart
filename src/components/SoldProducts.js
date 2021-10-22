
import React, { Component } from 'react'
import app from "../firebase";
import Buy from './Buy';
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
    info=()=>{
        alert("working");
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
            <div className="container">
            <table class="table table-borderless table-dark">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Buyer's Data</th>
                    </tr>
                </thead>
                <tbody>
                    
                        
                {this.state.loading?<><div className="container"><h1 className="text-center">Loading...</h1></div></>:<>
                <h1 className="text-center" id="hide">Oops, you have not sold any poducts.</h1>
                {this.state.productList.map((element,index)=>{
            return <tr> <th scope="row">{index+1}</th>
            <td>{element.name}</td>
            <td>{element.price}</td>
            <td>Email: {element.bought}<Buy email={element.bought}/></td>
            
            </tr>
            })}</>}
                   
                    
                </tbody>
                </table>
                </div>
            <div className='row'id="list">
                
               
               
                
            
                
                </div>
        </div>
        )
    }
}
