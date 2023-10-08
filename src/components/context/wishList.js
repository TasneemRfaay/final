import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();
export function WishListContextProvider({ children }) {
  const [wishProducts, setWishProducts] = useState([]);

  const [numOfItemsW, setnumOfItemsW] = useState(0);
  useEffect(() => {
    getWishList();
  }, [wishProducts]);

  async function getWishList() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );

      setWishProducts(data.data);
      setnumOfItemsW(data.count);
    } catch (error) {
      console.log("wishList", error);
    }
  }
  async function addProductToWishList(prodId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: prodId,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      setWishProducts(data.data);
      setnumOfItemsW(data.count);
      getWishList();
      return data;
    } catch (e) {
      console.log("error", e);
    }
  }
  async function deleteProdWish(prodId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,

        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      // console.log(responsea.data.data);
      console.log("delete wish list", data);
      // setWishProducts(data);
      setnumOfItemsW(data.count);
      console.log(data);
      return data;
    } catch (error) {
      console.log("delete wish List error", error);
    }
  }
  // console.log("from context", wishProducts);
  return (
    <WishListContext.Provider
      value={{
        getWishList,
        wishProducts,
        numOfItemsW,
        addProductToWishList,
        deleteProdWish,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
