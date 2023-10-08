import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { FallingLines } from "react-loader-spinner";

export default function CatergorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
  };

  function getAllCat() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("allCatSlider", getAllCat, {
    refetchOnMount: false,
  });
  //   console.log(data?.data.data);

  if (isLoading) {
    return (
      <>
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      </>
    );
  }
  return (
    <div className="my-5">
      <h2>CatergorySlider</h2>
      <Slider {...settings}>
        {data?.data.data.map(function (category, index) {
          return (
            <div key={index}>
              <img
                src={category.image}
                alt={category.slug}
                style={{ width: "100%", height: "150px" }}
              />
              <h6 className="mt-2">{category.name}</h6>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
