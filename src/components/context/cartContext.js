import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const cartContext = createContext();

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [numOfItems, setnumOfItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    getUserCart();
    // console.log("cart id", cartId);
  }, []);

  async function addProductToCart(prodId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: prodId,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );

      getUserCart();
      return data;
    } catch (e) {
      console.log("error", e);
    }
  }
  async function getUserCart() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      setCartId(data.data._id);
      setCartProducts(data.data.products);
      settotalPrice(data.data.totalCartPrice);
      setnumOfItems(data.numOfCartItems);
      // console.log("cart id", cartId);
    } catch (e) {
      console.log("error", e);
    }
  }

  async function deleteProd(prodId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      setCartProducts(data.data.products);
      settotalPrice(data.data.totalCartPrice);
      setnumOfItems(data.numOfCartItems);
      return data;
    } catch (e) {
      console.log("error", e);
    }
  }
  async function UpdateCount(pId, countP) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${pId}`,
        {
          count: countP,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setCartProducts(data.data.products);
      settotalPrice(data.data.totalCartPrice);
      setnumOfItems(data.numOfCartItems);
      return data;
    } catch (e) {
      console.log("Update Error", e);
    }
  }

  async function clearCart() {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      setCartId(null);
      setCartProducts([]);
      settotalPrice(0);
      setnumOfItems(0);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        cartProducts,
        totalPrice,
        numOfItems,
        getUserCart,
        deleteProd,
        UpdateCount,
        clearCart,
        cartId,
        setnumOfItems,
        settotalPrice,
        setCartProducts,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
