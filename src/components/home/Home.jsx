import React from "react";
import Products from "../products/Products";
import HomeSlider from "../../HomeSlider/HomeSlider";
import CatergorySlider from "../CatergorySlider/CatergorySlider";

export default function Home() {
  return (
    <div>
      <div className="row gx-0 my-3 ">
        <div className="col-sm-9">
          <HomeSlider />
        </div>
        <div className="col-sm-3">
          <img
            src={require("../../assets/image/grocery-banner.png")}
            style={{ width: "100%", height: "200px" }}
            alt="banner"
          />
          <img
            src={require("../../assets/image/grocery-banner-2.jpeg")}
            alt="banner"
            style={{ width: "100%", height: "200px" }}
          />
        </div>
      </div>
      <CatergorySlider />
      <Products />
    </div>
  );
}
