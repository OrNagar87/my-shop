import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Header from "./components/header/header";
import Product from "./components/product/product";
import Cart from "./components/cart/cart";

class App extends Component {
  state = {
    counter: 0,
  };
  updateCart = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
    console.log(this.state.counter);
  };
  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <Header />
        <div className="body">
          <h2>Products</h2>
          <Cart counter={this.state.counter} />
          <Product
            updateCart={this.updateCart}
            id="p1"
            title="books"
            quantity={12}
            src="https://i0.wp.com/www.radioactive.fm/wp-content/uploads/2018/12/bookstack.png?resize=360%2C240&ssl=1"
          />
          <Product
            updateCart={this.updateCart}
            id="p2"
            title="games"
            quantity={29}
            src="https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg"
          />
          <Product
            updateCart={this.updateCart}
            id="p3"
            title="colors"
            quantity={0}
            src="https://neilpatel.com/wp-content/uploads/2017/08/colors.jpg"
          />
          <Product
            updateCart={this.updateCart}
            id="p4"
            title="kitchen"
            quantity={22}
            src="https://aranisrael.co.il/wp-content/uploads/2020/03/kitchen.jpg"
          />
          <Product
            updateCart={this.updateCart}
            id="p5"
            title="food"
            quantity={4}
            src="https://www.arcgis.com/sharing/rest/content/items/8f762395cd204552bb958ecb1b54339d/resources/1588745514029.jpeg?w=2932"
          />
          <Product
            updateCart={this.updateCart}
            id="p6"
            title="jewelry"
            quantity={7}
            src="https://www.srugim.co.il/i/wp-content/uploads/2020/01/shutterstock_739292332__w645h390q80.jpg"
          />
        </div>
      </div>
    );
  }
}

export default App;
