import React, {Component} from 'react';
import "./product.css";

// function Product(){
//     return(
//     <div className="product">product
//        <img src="" alt=""/>
//        <h1>Title</h1>

//        <div>Quantity:</div>
  

//     <button>Add to cart</button>
    
    
//     </div>
   
//     );
// }


  class Product extends Component{
    state={
      quantity:this.props.quantity
    };
    AddToCart = () => {
      this.setState(({quantity }) => ({ quantity: quantity - 1 }))
    };
    render(){
    return(
      <div className="product">
        <h1>product</h1>
      
      <img src={this.props.src} alt=""/>
       <h2>
         {this.props.title}
       </h2>

       <div>Quantity:
         {this.state.quantity}
       </div>
  

    <button onClick={this.AddToCart}>Add to cart</button>
      
      </div>
      );
    }

  } 
   export default Product;
