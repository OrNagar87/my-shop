import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./update.css";
import Adding from "./Adding";

export default function Update() {
  const [data, setData] = useState([]);
  const [box, setbox] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/").then(function (response) {
      setData(response.data);
    });
  }, []);
  // change items in products//
  const [change_title, setChange_title] = useState();
  const Change_title = (e) => {
    setChange_title(e.target.value);
  };
  const [img, setImg] = useState();
  const Change_img = (e) => {
    setImg(e.target.value);
  };
  const [change_price, setCnage_price] = useState();
  const Change_price = (e) => {
    setCnage_price(e.target.value);
  };
  const [change_quantity, setCnage_quantity] = useState();
  const Change_quantity = (e) => {
    setCnage_quantity(e.target.value);
  };
  const [change_discription, setCnage_discription] = useState();
  const Change_discription = (e) => {
    setCnage_discription(e.target.value);
  };

  return (
    <div>
      {" "}
      <Adding />
      {data.map((product, key) => (
        <li key={product.id}>
          <ul>
            <h2> עדכן או מחק מוצר</h2>
            <label>
              title:
              <input
                type="text"
                placeholder={product.title}
                onChange={Change_title}
              />
            </label>
            <label>
              <img src={product.image} alt="" />
              <input
                type="url"
                placeholder={product.image}
                size="40"
                onChange={Change_img}
              />
            </label>
            <label>
              price:
              <input
                type="number"
                placeholder={product.price}
                onChange={Change_price}
              />
            </label>
            <label>
              quantity:
              <input
                type="number"
                placeholder={product.quantity}
                onChange={Change_quantity}
              />
            </label>
            <label>
              discription:
              <textarea
                placeholder={product.discription}
                rows="5"
                cols="33"
                onChange={Change_discription}
              ></textarea>
            </label>
            <button
              onClick={() => {
                if (window.confirm("are you sure you want to delete?")) {
                  axios
                    .delete("http://127.0.0.1:8000/products/" + product.id)
                    .then((res) => {
                      console.log("POST DATA", res);
                      axios
                        .get("http://127.0.0.1:8000/products/")
                        .then(function (response) {
                          setData(response.data);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }}
            >
              מחק את המוצר
            </button>{" "}
            <button
              onClick={() => {
                axios
                  .put("http://127.0.0.1:8000/products/" + product.id, {
                    title: change_title,
                    image: img,
                    price: change_price,
                    quantity: change_quantity,
                    discription: change_discription,
                  })
                  .then((res) => {
                    console.log("POST DATA", res);
                    axios
                      .get("http://127.0.0.1:8000/products/")
                      .then(function (response) {
                        setData(response.data);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              שמור את השינויים
            </button>
          </ul>
          ַ
        </li>
      ))}{" "}
    </div>
  );
}
