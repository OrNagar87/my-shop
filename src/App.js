import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from "./components/header/header";
import Product from "./components/product/product";

function App() {
  return (
    <div className="App">
            App
         <Header/>
         <Product id="p1" title="books"quantity={12} src="https://i0.wp.com/www.radioactive.fm/wp-content/uploads/2018/12/bookstack.png?resize=360%2C240&ssl=1"/>
         <Product id="p2" title="games" quantity={29} src="https://img.etimg.com/thumb/width-640,height-480,imgsize-131196,resizemode-1,msid-76314521/a-winner-how-ludo-became-the-king-of-games-during-the-pandemic.jpg"/>
         <Product id="p2" title="colors" quantity={0}/>
         <Product id="p2" title="kitchen" quantity={22}/>
         <Product id="p2" title="food" quantity={4}/>
         <Product id="p2" title="stuff" quantity={7}/>
       
    
    </div>
  );
}

export default App;
