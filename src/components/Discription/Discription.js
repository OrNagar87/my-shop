import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./discription.css";

const Discription = () => {
  const { idParam } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/").then(function (response) {
      setProduct(response.data.find((product) => product.id === +idParam));
    });
  }, []);
  return (
    <div className="disc_body">
      {" "}
      <h2 className="disc_title">{product.title}</h2>
      <div>
        {" "}
        <img className="disc_img" src={product.image} alt="" />
      </div>
      <div className="discription">
        <div className="disc_text">{product.discription}</div>
      </div>
    </div>
  );
};

export default Discription;
