// import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { WishListContext } from "../context/wishList";
import { FallingLines } from "react-loader-spinner";

export default function WishList() {
  const { getWishList, wishProducts, numOfItemsW, deleteProdWish } =
    useContext(WishListContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const x = jwtDecode(localStorage.getItem("userToken"));
    console.log(x);
    getWishList();
    setUser(x.name);
  }, []);

  async function deleteProd(id) {
    const response = await deleteProdWish(id);
    console.log(response);
  }
  if (wishProducts === null) {
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
    <div>
      <div className="bg-light p-5 mt-4">
        <h1 className="">{user}'s Wish List</h1>
        <h3>number of items {numOfItemsW}</h3>

        <div className="container">
          {wishProducts.map((product, index) => {
            return (
              <>
                <div
                  key={index}
                  className="row align-items-center justify-content-center border-3 border-bottom p-2"
                >
                  <div className="col-lg-2">
                    <img
                      src={product.imageCover}
                      className="w-100 "
                      alt="product"
                    />
                  </div>
                  <div className="col-lg-8">
                    <h2 className="h6">Title:{product.title}</h2>
                  </div>
                  <div className="col-lg-2">
                    <button
                      onClick={() => {
                        deleteProd(product._id);
                      }}
                      style={{ backgroundColor: "#c6edc6" }}
                      className="btn text-center rounded"
                    >
                      <i className="fa-solid fa-heart text-danger "></i>
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
