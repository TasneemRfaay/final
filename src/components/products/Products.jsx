import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Bars, FallingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import toast from "react-hot-toast";
import { WishListContext } from "../context/wishList";

export default function Products() {
  const [like, setLike] = useState(false);
  // const [products, setProducts] = useState([]);
  // async function getProduct() {
  //   let { data } = await axios(
  //     "https://ecommerce.routemisr.com/api/v1/products"
  //   );
  //   setProducts(data.data);
  // }
  // useEffect(() => {
  //   getProduct();
  // }, []);

  const [loader, setLoader] = useState(false);

  async function getProducts() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { data, isLoading } = useQuery("products", getProducts);
  // console.log(data?.data.data);

  //-------------------cart------------------
  const { addProductToCart } = useContext(cartContext);

  async function addCart(id) {
    setLoader(true);
    const res = await addProductToCart(id);
    if (res.status === "success") {
      toast.success(res.message, {
        position: "top-right",
        duration: 2000,
      });
      setLoader(false);
    }
  }

  // --------------------------------wishList-----------------------------------
  const { addProductToWishList, wishProducts } = useContext(WishListContext);

  async function addToWishlist(id) {
    const result = await addProductToWishList(id);
    console.log(result);
    document.getElementById(`${id}`).classList.remove("text-light");
    document.getElementById(`${id}`).classList.add("text-danger");
    
    if (result.status === "success") {
      toast.success(result.message, {
        position: "top-right",
        duration: 2000,
      });
      setLike(true);
    }
  }
  console.log("fromProducts", wishProducts);
  useEffect(() => {
    console.log("useeffect wishlist", wishProducts);
    if (wishProducts != null) {
      wishProducts.map((prod, index) => {
        if (document.getElementById(`${prod.id}`) != null) {
          document.getElementById(`${prod.id}`).classList.remove("text-light");
          document.getElementById(`${prod.id}`).classList.add("text-danger");
        }
      });
    }
  }, [wishProducts]);

  return (
    <>
      {!isLoading ? (
        <div className="row gy-3">
          {data?.data.data.map((product, index) => {
            return (
              <div
                key={index}
                className="py-5 px-5 col-12 col-md-3 overflow-hidden"
              >
                <div className="product text-center">
                  <Link
                    key={index}
                    style={{ textDecoration: "none" }}
                    to={`/prodDetails/${product.id}`}
                  >
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-100"
                    />
                    <p className="text-main">{product.category.name}</p>
                    <h6 className="text-muted">
                      {product.title.split(" ").splice(0, 2).join(" ")}
                    </h6>
                    <div className="d-flex justify-content-between">
                      <span className="ps-2">{product.price} EGP</span>

                      <span>
                        <i className="fa-solid fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <p className="text-end">
                    <i
                      onClick={() => {
                        addToWishlist(product.id);
                      }}
                      className="fa-solid fa-heart text-light p-2 me-1"
                      id={product.id}
                      style={{ backgroundColor: "#c6edc6" }}
                    ></i>
                  </p>
                  <button
                    onClick={() => {
                      addCart(product.id);
                    }}
                    className="btn bg-main text-light w-50 mx-auto text-center "
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
                          wrapperClass="text-center"
                          visible={true}
                        />
                      </div>
                    ) : (
                      <>"+ Add "</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
              ariaLabel="falling-lines-loading"
            />
          </div>
        </>
      )}
    </>
  );
}
