import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Header from "./Header/Header";
import Product from "./Product/Product";
import Cart from "./Cart/Cart";
import { Slider } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import createPersistedState from "use-persisted-state";
import { Input } from "antd";

const { Search } = Input;

const useCounterState = createPersistedState("productonCart");
const useCounterState1 = createPersistedState("counter");

const App = (props) => {
  let [counter, setCounter] = useCounterState1(0);

  const [productonCart, setproductonCart] = useCounterState([]);

  const [data, setData] = useState([]);
  const [first_quantity, setFirst_quantity] = useState([]);
  const [max, setmax] = useState();
  const [min, setmin] = useState();

  const updateCart = (value) => {
    let index;
    setCounter((counter = counter + 1));
    for (var i = 0; i < data.length; i += 1) {
      if (data[i].id === value) {
        index = i;
      }
    }
    console.log(index);
    if (!productonCart.includes(data[index])) {
      data[index].quantity = 1;
      setproductonCart([...productonCart, data[index]]);
    } else {
      productonCart.find((p) => p.id === value).quantity += 1;
      setproductonCart([...productonCart]);
    }
  };
  const removeCount = (value) => {
    if (counter > 0) {
      console.log(value);
      setCounter((counter = counter - 1));
      productonCart.find((p) => p.id === value).quantity -= 1;
      setproductonCart([...productonCart]);
    }
  };

  function removeCart(id) {
    let product = productonCart.find((product) => product.id);
    console.log([data.id].quantity);
    setproductonCart(productonCart.filter((product) => product.id !== id));
    setCounter(counter - product.quantity);
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

  const [value, setValue] = useState([0, 100]);
  let onChange = (value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <h1>מקצועות הטיפוס בישראל</h1>
      <Header />
      <div className="body">
        <Link to={"/update_products/"}>
          <div className="button_update">
            <button>Update Products</button>
          </div>
        </Link>
        <h2 className="h2">חנות המוצרים שלנו</h2>
        <Search
          className="search_table"
          placeholder="חפש מוצר"
          enterButton="Search"
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
          defaultValue={[0, 100]}
          max={max}
          min={min}
          onChange={onChange}
          tooltipVisible
        />
        <Cart
          counter={counter}
          productOnCart={productonCart}
          removeCart={removeCart}
        />

        {data
          .filter(
            (product) => product.price >= value[0] && product.price <= value[1]
          )
          .map((product, productIndex) => (
            <Product
              updateCart={updateCart}
              removeCount={removeCount}
              removeCart={removeCart}
              key={product.id}
              id={product.id}
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
