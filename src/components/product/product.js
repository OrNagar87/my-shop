import React, { Component } from "react";
import "./product.css";

class Product extends Component {
  state = {
    quantity: this.props.quantity,
    updateCart: this.props.updateCart,
  };

  AddToCart = () => {
    this.state.quantity
      ? this.setState(({ quantity }) => ({ quantity: quantity - 1 }))
      : this.setState(({ quantity }) => ({ quantity: "Out of stock" }));
  };
  AddtoCount = () => {
    if (this.state.quantity && this.state.quantity !== "Out of stock") {
      this.state.updateCart();
    }
  };

  render() {
    return (
      <div className="product">
        <h1>product</h1>

        <img src={this.props.src} alt="" />
        <h2>{this.props.title}</h2>

        <div>
          Quantity:
          {this.state.quantity}
        </div>

        <button
          onClick={() => {
            this.AddToCart();
            this.AddtoCount();
          }}
        >
          Add to cart
        </button>
      </div>
    );
  }
}
export default Product;
