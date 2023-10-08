import axios from "axios";
import React, { useContext, useState } from "react";
import { cartContext } from "../context/cartContext";
import toast from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function CashPayment() {
  const { cartId, setnumOfItems, settotalPrice, setCartProducts } =
    useContext(cartContext);
  const [loader, setloader] = useState(false);

  async function confirmCashPayment() {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#details").value;
    const Shipping = {
      shippingAddress: {
        details: detailsValue,
        phone: phoneValue,
        city: cityValue,
      },
    };
    try {
      setloader(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        Shipping,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      console.log(data);
      if (data.status === "success") {
        toast.success("order has been added Successfully");
        setnumOfItems(0);
        settotalPrice(0);
        setCartProducts([]);
      }
      setloader(false);
    } catch (e) {
      console.log("payment", e);
      setloader(false);
      toast.error(e.message);
    }
  }
  async function confirmOnlinePayment() {
    const phoneValue = document.querySelector("#phone").value;
    const cityValue = document.querySelector("#city").value;
    const detailsValue = document.querySelector("#details").value;
    const Shipping = {
      shippingAddress: {
        details: detailsValue,
        phone: phoneValue,
        city: cityValue,
      },
    };
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        Shipping,
        {
          headers: { token: localStorage.getItem("userToken") },
          params: { url: `http://localhost:${window.location.port}` },
        }
      );
      window.open(data.session.url, "_blank");
    } catch (error) {
      console.log("online", error);
    }
  }

  return (
    <>
      <div className="container py-5 ">
        <form className="mt-5 text-start">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            className="form-control mb-3"
            placeholder="phone"
            id="phone"
          />
          <label htmlFor="city">City:</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="city"
            id="city"
          />
          <label htmlFor="details">Deatils:</label>
          <textarea
            className="form-control mb-3"
            placeholder="details"
            id="details"
          ></textarea>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => confirmCashPayment()}
          >
            {loader ? (
              <>
                <i className="fa-solid fa-spin fa-spinner"> </i>
                Loading
              </>
            ) : (
              "CashPayment"
            )}
          </button>

          <button
            type="button"
            className="btn btn-outline-primary ms-3"
            onClick={() => confirmOnlinePayment()}
          >
            Online Payment
          </button>
        </form>
      </div>
    </>
  );
}
