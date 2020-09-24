import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Header from "./Header/Header";
import Product from "./Product/Product";
import Cart from "./Cart/Cart";
import UpdateButton from "./UpdateButton";
import { Slider } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import createPersistedState from "use-persisted-state";
import { Input } from "antd";
import { Drawer, Button } from "antd";

import socketIOClient from "socket.io-client";

const { Search } = Input;

const useCounterState = createPersistedState("productonCart");
const useCounterState1 = createPersistedState("counter");

const App = (props) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  let [counter, setCounter] = useCounterState1(0);
  let [price, setPrice] = useState(0);

  const [productonCart, setproductonCart] = useCounterState([]);

  const [data, setData] = useState([]);
  const [first_quantity, setFirst_quantity] = useState([]);
  const [max, setmax] = useState();
  const [min, setmin] = useState();
  const [quant, setQuant] = useState();
  const updateCart = (value) => {
    let index;

    setCounter((counter = counter + 1));
    for (var i = 0; i < data.length; i += 1) {
      if (data[i]._id === value) {
        index = i;
      }
    }
    console.log(index);
    setPrice((price = price + data[index].price));
    if (!productonCart.includes(data[index])) {
      data[index].quantity = 1;
      setproductonCart([...productonCart, data[index]]);
    } else {
      let q = (productonCart.find((p) => p._id === value).quantity += 1);
      setQuant(q);

      setproductonCart([...productonCart]);
    }
    axios
      .post("http://127.0.0.1:8000/cart", {
        title: data[index]._id,
        quantity: quant,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const removeCount = (value) => {
    if (counter > 0) {
      // console.log(value);
      setCounter((counter = counter - 1));

      productonCart.find((p) => p._id === value).quantity -= 1;
      let p = productonCart.find((p) => p._id === value).price;
      setproductonCart([...productonCart]);
      setPrice((price = price - p));
    }
  };

  async function removeCart(_id) {
    let product1 = productonCart.find((product) => product._id);
    console.log([_id]);
    setproductonCart(productonCart.filter((product) => product._id !== _id));
    await axios
      .delete("http://127.0.0.1:8000/cart/" + product1._id)
      .then((res) => console.log("product remove from cart"))
      .catch((err) => console.log(err));

    setCounter((counter = counter - product1.quantity));
    setPrice((price = price - product1.price * product1.quantity));
  }

  // let range = [min, max];
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/").then(function (response) {
      setData(response.data);
      setFirst_quantity(response.data.quantity);

      const prices = response.data.map((product) => {
        return product.price;
      });
      setmax(Math.max(...prices));
      setmin(Math.min(...prices));
    });
  }, []);

  useEffect(() => {
    const socket = socketIOClient("http://localhost:8000");
    socket.on("newQuantity", (newquant) => {
      setNewQuant(newquant);
      console.log(newquant);

      console.log(newquant.index);
      // setData(data[newquant.index].quantity === newQuant.new_quant);
      setTimeout(() => setNewQuant({}), 3000);
    });
  }, []);
  const [newQuant, setNewQuant] = useState([]);
  const [value, setValue] = useState([0, max]);
  let onChange = (value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <h1>מקצועות הטיפוס בישראל</h1>
      <Header />
      <div className="body">
        <div style={{ float: "left" }}>
          <UpdateButton />
        </div>
        <Search
          className="search_table"
          placeholder="חפש מוצר"
          enterButton="חיפוש מוצר"
          size="large"
          maxLength="10"
          onSearch={(value) => {
            axios
              .get("http://127.0.0.1:8000/products/?search=" + value)
              .then(function (response) {
                setData(response.data);
              });
          }}
        />
        <Slider
          range
          max={max}
          min={min}
          defaultValue={[{ min }, 130]}
          onChange={onChange}
          tooltipVisible
          className="Theslider"
        />
        <div>
          {[newQuant.name]}
          {"   "}
          {"  "}
          {[newQuant.new_quant]}
        </div>

        <div className="counter_back">{counter}</div>
        <div>{price}</div>
        <img
          className="cart_pic"
          onClick={showDrawer}
          src="https://img.icons8.com/plasticine/100/000000/favorite-cart.png"
          alt=""
        />

        <Drawer
          title="מוצרים בעגלה"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <Cart
            counter={counter}
            price={price}
            productOnCart={productonCart}
            removeCart={removeCart}
          />
        </Drawer>

        {data
          .filter(
            (product) => product.price >= value[0] && product.price <= value[1]
          )
          .map((product, productIndex) => (
            <Product
              updateCart={updateCart}
              removeCount={removeCount}
              removeCart={removeCart}
              key={product._id}
              _id={product._id}
              title={product.title}
              src={product.image}
              price={product.price}
              quantity={product.quantity}
              button="list"
            />
          ))}
      </div>
    </div>
  );
};

export default App;
