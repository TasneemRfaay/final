import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

export default function Brands() {
  async function getAllBrands() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data, isLoading } = useQuery("brands", getAllBrands);
  console.log(data?.data.data);
  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="row g-3 my-3">
          {data?.data.data.map((brand, index) => {
            return (
              <div className="col-md-4 " key={index}>
                <div className="product text-center border-2 overflow-hidden">
                  <img src={brand.image} alt={brand.name} />
                  <h5>{brand.name}</h5>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}
