import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./update.css";

export default function Update() {
  const [data, setData] = useState([]);
  const [box, setbox] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/products/").then(function (response) {
      setData(response.data);
    });
  }, []);

  const [title, setTitle] = useState();
  function Add_title(title) {
    setTitle(title.target.value);
  }

  const [image, setimage] = useState();
  const Add_image = (e) => {
    setimage(e.target.value);
  };

  const [price, setPrice] = useState();
  const Add_price = (e) => {
    setPrice(e.target.value);
  };

  const [quantity, setQuantity] = useState();
  const Add_quantity = (e) => {
    setQuantity(e.target.value);
  };
  const [discription, setDiscription] = useState();
  const Add_discription = (e) => {
    setDiscription(e.target.value);
  };

  const Add_product = () => {
    console.log("adding");
    // if (!image) {
    //   ;
    //   });
    axios
      .post("http://127.0.0.1:8000/products/", {
        title: title,
        image: image,
        price: price,
        quantity: quantity,
        discription: discription,
      })
      .then((res) => {
        console.log("POST DATA", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  const fileInput = useRef();
  const uploadImage = () => {
    if (fileInput) {
      const uploadedFile = fileInput.current;

      axios.post("http://localhost:8000/upload", uploadedFile.files[0], {
        params: { filename: uploadedFile.files[0].name },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(percentCompleted);
          setimage(
            "http://localhost:8000/images/" + uploadedFile.files[0].name
          );
        },
      });
    }
  };

  return (
    <div>
      {" "}
      <div className="adding">
        <h1 className="adding_title">הוספת מוצר</h1>
        <label className="input lable">
          title:
          <input
            className="input title"
            type="text"
            name="title"
            placeholder="שם המוצר"
            onChange={Add_title}
          />
        </label>
        <input className="input file" type="file" ref={fileInput} />
        <button onClick={uploadImage}>Upload Image</button>
        <label className="input lable">
          תמונה:
          <input
            className="input pic"
            type="url"
            name="image"
            placeholder="כתובת תמונה"
            size="40"
            pattern="https://.*"
            onChange={Add_image}
          />
        </label>
        <label className="input lable">
          price:
          <input
            className="input price"
            type="number"
            name="price"
            placeholder="מחיר המוצר"
            onChange={Add_price}
          />
        </label>
        <label className="input lable">
          quantity:
          <input
            className="input quantity"
            type="number"
            name="quantity"
            placeholder="כמות במלאי"
            onChange={Add_quantity}
          />
        </label>
        <label>
          discription:
          <textarea
            className="input text"
            name="discription"
            placeholder="תיאור המוצר"
            onChange={Add_discription}
            rows="5"
            cols="33"
          ></textarea>
        </label>{" "}
        <button onClick={Add_product}>הוסף מוצר</button>
      </div>
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
