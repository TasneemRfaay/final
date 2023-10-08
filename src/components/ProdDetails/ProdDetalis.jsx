import axios from "axios";
import React, { useContext, useState } from "react";
import { Bars, FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import toast from "react-hot-toast";
export default function ProdDetalis() {
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading } = useQuery("prodDetails", getProductDetails);
  // console.log(data?.data.data);
  // ----------------cart------------------
  const { addProductToCart } = useContext(cartContext);
  async function addProduct(id) {
    setLoader(true);
    const response = await addProductToCart(id);
    console.log(response);
    if (response.status === "success") {
      console.log(response.message);
      toast.success(response.message, {
        position: "top-right",
        duration: 2000,
      });
      setLoader(false);
    } else {
      toast.error(response.message, {
        position: "top-right",
        duration: 2000,
      });
      setLoader(false);
    }
  }

  if (isLoading) {
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
    <>
      <div className="container p-5">
        <div className="row align-items-center">
          <div className="col-md-3">
            <div>
              <img
                src={data.data.data.imageCover}
                style={{ width: "100%" }}
                alt={data.data.data.title}
              />
            </div>
          </div>
          <div className="col-md-9">
            <div className="Details text-start">
              <h2>{data.data.data.title}</h2>
              <p className="text-muted">{data.data.data.description} </p>
              <div className="d-flex justify-content-between mb-5">
                <span>{data.data.data.price} EGP</span>
                <span>
                  <i className="fa-solid fa-star rating-color"></i>
                  {data.data.data.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => {
                  addProduct(data.data.data.id);
                }}
                className=" text-center w-100 p-3 bg-main rounded-3 text-white border-white text-center"
              >
                {loader ? (
                  <div className="d-flex justify-content-center">
                    <Bars
                      style={{ margin: "auto" }}
                       height="40"
                      width="40"
                      color="#fff"
                      ariaLabel="bars-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                ) : (
                  "+ Add to cart"
                )}
              </button>
              <p>{data.data.data.id}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
