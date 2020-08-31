import React, { useState } from "react";
import "./cart.css";

import OnCart from "./OnCart";

const Cart = (props) => {
  return (
    <div className="cart">
      <img
        src="https://img.icons8.com/plasticine/100/000000/favorite-cart.png"
        alt=""
      />
      Cart Count:
      {props.counter}
      <div className="onCart">
        {props.productOnCart.map((product) => (
          <OnCart
            title={product.title}
            src={product.image}
            price={product.price}
            key={product.id}
            quantity={product.quantity}
            onRemove={() => {
              props.removeCart(product.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
