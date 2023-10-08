import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Brands() {
  const [subCat, setSubCat] = useState([]);
  async function getAllCat() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isLoading } = useQuery("cateogries", getAllCat);

  async function getSpecificCat(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    setSubCat(data?.data);
  }

  useEffect(() => {
    getAllCat();
  }, []);

  console.log(subCat);
  return (
    <>
      {!isLoading ? (
        <div className="row g-3 my-3 ">
          {data?.data.data.map((cateogry, index) => {
            return (
              <div
                className="col-md-4"
                key={index}
                onClick={() => {
                  getSpecificCat(cateogry._id);
                }}
              >
                <div className="product text-center border-2 overflow-hidden">
                  <img
                    src={cateogry.image}
                    alt={cateogry.name}
                    style={{ width: "300px", height: "300px" }}
                  />
                  <h3>{cateogry.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        "loading"
      )}
      <div className="container">
        <div className="row g-3 justify-conent-between">
          {subCat?.map((cat, index) => {
            return (
              <>
                <div className="col-md-4 " key={index}>
                  <div
                    className="product text-center mx-3 overflow-hidden text-center rounded  p-1 text-success shadow-sm"
                    style={{ border: "2px solid gray" }}
                  >
                    <h3>{cat.name}</h3>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
