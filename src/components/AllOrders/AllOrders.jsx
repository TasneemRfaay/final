import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";

export default function AllOrders() {
  const [userOrders, setUserOrders] = useState(null);
  useEffect(() => {
    const x = jwtDecode(localStorage.getItem("userToken"));
    getUserOrder(x.id);
  }, []);

  async function getUserOrder(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      console.log(data);
      setUserOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  if (userOrders === null) {
    return (
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
    );
  }
  return (
    <>
      <div className="Container">
        <div className="row mt-4 gy-4">
          {userOrders.map((order, idx) => {
            return (
              <div key={idx} className="col-md-12">
                <div className="order py-5 bg-main text-white rounded-4">
                  <h4>Order sent to: {order.shippingAddress.city}</h4>
                  <h5>Phone number :{order.shippingAddress.phone}</h5>
                  <p>Number of cart Items :{order.cartItems.length}</p>
                  <p className="lead ">
                    with total price:{order.totalOrderPrice}
                  </p>
                  <p className="text-bolder">
                    payment Method:{order.paymentMethodType}
                  </p>
                  <div className="d-flex justify-content-center align-items-center">
                    {order.cartItems.map((item, index) => {
                      return (
                        <div key={index} className="text-center m-5">
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            style={{ width: "75px" }}
                          />
                          <p className="position-relative">
                            {item.product.title}
                            <span class="mt-2 ms-3 badge bg-warning rounded-pill text-dark position-absolute translate-middle ">
                              {item.count}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
