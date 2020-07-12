import React, { Component } from "react";
import "./cart.css";

class Cart extends Component {
  state = {};

  render() {
    return (
      <div className="cart">
        Cart Count:
        {this.props.counter}
      </div>
    );
  }
}
export default Cart;
