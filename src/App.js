import React, { useState, useEffect } from "react";
import "./App.css";
import Discription from "./components/Discription/discription";
import Home from "./components/home";
import Update from "./components/Updateproduct/update";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/discription/:idParam">
          <Discription />
        </Route>
        <Route path="/update_products/">
          <Update />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
