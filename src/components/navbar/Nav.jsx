import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/image/freshcart-logo.svg";
import { UserToken } from "../context/userToken";
import { cartContext } from "../context/cartContext";
export default function Nav() {
  let { userToken, setToken } = useContext(UserToken);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }
  const { numOfItems } = useContext(cartContext);
  return (
    <>
      <nav
        className="navbar navbar-expand-md navbar-light bg-light  "
        style={{ index: "99" }}
      >
        <div className="container ">
          <Link className="navbar-brand" to="">
            <img src={img} alt="logo" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userToken != null ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="cart">
                    Cart
                    <span class="mt-2 badge bg-success rounded-pill text-dark position-absolute top-0 start-100 translate-middle ">
                      {numOfItems}
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="allorders">
                    AllOrders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="wishList">
                    Wish List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="cateogry">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-google"></i>
                <i className="fab mx-2 fa-linkedin"></i>
              </li>
              {userToken == null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="signup">
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="logout"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
