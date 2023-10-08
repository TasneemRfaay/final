import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../context/cartContext";
import { FallingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    clearCart,
    getUserCart,
    cartProducts,
    numOfItems,
    totalPrice,
    deleteProd,
    UpdateCount,
  } = useContext(cartContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const x = jwtDecode(localStorage.getItem("userToken"));
    console.log(x);
    setUser(x.name);
  }, []);

  if (user === null) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      </div>
    );
  }

  async function deleteEle(id) {
    const res = await deleteProd(id);
    if (res.status === "success") {
      toast.success("Product has been Removed Successfully");
    }
  }
  async function updatetElementCount(id, count) {
    const result = await UpdateCount(id, count);

    if (result.status === "success") {
      toast.success("Updating Successfully");
    } else {
      toast.error("An error Ocurred");
    }
  }
  async function deleteCart() {
    await clearCart();
  }
  if (cartProducts === 0) {
    <h2>No items for this Cart</h2>;
  }

  if (cartProducts === null) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      </div>
    );
  }

  return (
    <div className="bg-light text-start p-5 ">
      <h1 className="mt-5"> {user}'s cart</h1>
      <h2>ShopCart</h2>
      <h5>Tatal cart Prtice:{totalPrice}</h5>
      <h5>Number of Items: {numOfItems} </h5>
      <div className="d-flex justify-content-between">
        <button onClick={() => deleteCart()} className="btn btn-outline-danger">
          Clear Cart
        </button>
        <Link to={"/cash"} className="btn btn-primary">
          Confirm Payment
        </Link>
      </div>

      <div className="container ">
        {cartProducts.map((product, index) => {
          return (
            <>
              <div className="row align-items-center justify-content-center border-3 border-bottom p-2">
                <div className="col-lg-2">
                  <img
                    src={product.product.imageCover}
                    className="w-100 "
                    alt="product"
                  />
                </div>
                <div className="col-lg-8">
                  <h2 className="h6">Title:{product.product.title}</h2>
                  <h5 className="h6">Price:{product.price}</h5>
                  <button
                    onClick={() => {
                      deleteEle(product.product.id);
                    }}
                    className="btn btn-outline-danger text-center"
                  >
                    Remove
                  </button>
                </div>
                <div className="col-lg-2">
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        updatetElementCount(
                          product.product.id,
                          product.count - 1
                        );
                      }}
                    >
                      -
                    </button>
                    <span className="m-1">{product.count}</span>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        updatetElementCount(
                          product.product.id,
                          product.count + 1
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
