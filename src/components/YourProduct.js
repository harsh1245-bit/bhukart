import React, { Component } from 'react'
import app from "../firebase";
import NavLog from './NavLog';

export default class YourProduct extends Component {
    constructor(props){
        super(props);
        this.state={
            productList:[],
            productIDs:[],
            user:"",
            title:"",
            description:"",
            price:"",
            id:""
        }
    }
    editProduct=(i)=>{
        let index= i.target.id;
        
        document.getElementsByClassName(-(index))[0].style.display='block';
        document.getElementsByClassName((index))[0].style.display='none';
        this.setState({
            title:this.state.productList[index-1].name,
            description:this.state.productList[index-1].description,
            price:this.state.productList[index-1].price,
            id:this.state.productIDs[index-1]
        })
        
    }
    saveProduct=(i)=>{
        let index= i.target.id;
        const db=app.firestore();
        
        console.log(this.state.id);
        
        db.collection("marketplace").doc(this.state.id).update({
            name: this.state.title, description:this.state.description,price:this.state.price
          });
        document.getElementsByClassName(-(index))[0].style.display='block';
        document.getElementsByClassName((index))[0].style.display='none';
        this.componentDidMount();
    }
    deleteProduct=(i)=>{
        const db=app.firestore();
        db.collection("marketplace").doc(this.state.id).delete();
        this.componentDidMount();
    }
    handleChange(e,field) {
        this.setState({ [field] : e.target.value });
     }
    componentDidMount(){
        let auth = app.auth();
        
        auth.onAuthStateChanged((signer)=>{
            if(signer){
                this.setState({user:auth.currentUser.email})
            }
        })
        
        let products = [];
        let productID=[];
        
        const db=app.firestore();
        db.collection("marketplace")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((item) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(item.id, " => ", item.data());
                
                
                
                console.log(item.data().uid,this.state.user)
                if(item.data().uid===this.state.user){
                    productID.push(item.id);
                    products.push(item.data());
                    document.getElementById('hide').style.display="none";
                    
                }
                console.log(products);
            });
            this.setState({
                productList:products,
                productIDs:productID
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
    
    render() {
        return (
            <div>
                <NavLog/>
                <div className='row'id="list">
                    
                    <h1 className="my-4 mx-4" id="hide">Sorry, You haven't uploaded any products yet.</h1>
                    
                {this.state.productList.map((element,index)=>{
                return <div><div className={index+1}>
                <div className="col md-3" key={element.url}>
                    <div className="col md-4 mx-2 my-2" >
            
                    <div className="card" style={{width: "18rem"}}>
                    <img src={element.imgUrl} className="card-img-top" alt="Harsh"/>
                    <div className="card-body">
                        <h5 className="card-title">{element.name}</h5>
                        <p className="card-text">{element.description}</p>
                        <button href="/" className="btn btn-dark my-1 ">{element.price}</button>
                        <button href="/" className="btn btn-dark my-1 mx-2" id={index+1} onClick={this.editProduct}>Edit</button>
                        <p className="card-text"><small className="text-muted">Address: {element.address}</small></p>
                    </div>
                    </div>
                </div>
                
                </div>
                </div>


                <div className={-(index+1)} style={{display:'none'}}>
                <div className="col md-3" key={element.url}>
                    <div className="col md-4 mx-2 my-2" >
            
                    <div className="card" style={{width: "18rem"}}>
                    <img src={element.imgUrl} className="card-img-top" alt="Harsh"/>
                    <div className="card-body">
                        <input className="card-title" onChange={(e) => this.setState({title:e.target.value})} value={this.state.title}/>
                        <textarea className="card-text" onChange={(e) => this.setState({description:e.target.value})} value={this.state.description}></textarea>
                        <button href="/" className="btn btn-dark my-1 "><input type="text" onChange={(e) => this.setState({price:e.target.value})} value={this.state.price}/></button>
                        <button href="/" className="btn btn-dark my-1 " id={-(index+1)} onClick={this.saveProduct}>Save</button>
                        <button href="/" className="btn btn-dark my-1 mx-2" id={-(index+1)} onClick={this.deleteProduct}>Delete</button>
                        
                    </div>
                    </div>
                </div>
                
                </div>
                </div>

                </div>
                })}
                    
                    </div>
            </div>
        )
    }
}
