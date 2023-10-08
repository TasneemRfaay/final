import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <Slider {...settings}>
        <div>
          <img
            class="w-100"
            style={{ height: "400px" }}
            src={require("../assets/image/slider-image-1.jpeg")}
            alt="carsoul"
          />
        </div>
        <div>
          <img
            class="w-100"
            style={{ height: "400px" }}
            src={require("../assets/image/slider-image-2.jpeg")}
            alt="carsoul"
          />
        </div>
        <div>
          <img
            class="w-100"
            style={{ height: "400px" }}
            src={require("../assets/image/slider-image-3.jpeg")}
            alt="carsoul"
          />
        </div>
      </Slider>
    </>
  );
}
