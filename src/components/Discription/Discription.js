import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Discription = () => {
  const { idParam } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/").then(function (response) {
      setProduct(response.data.find((product) => product.id === +idParam));
    });
  }, []);
  return (
    <div>
      <h2>{product.title}</h2>
      <div>
        {" "}
        <img src={product.image} alt="" />
      </div>
      <div>{product.discription}</div>
    </div>
  );
};

export default Discription;
