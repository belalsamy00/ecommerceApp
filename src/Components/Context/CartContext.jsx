import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { WishlistContext } from "./WishlistContext";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [cartProducts, setCartProducts] = useState(null);
  const { token } = useContext(AuthContext);
  const { DeleteWishlistItem, WishlistProductsId } =
    useContext(WishlistContext);

  async function AddToCart(id) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        { headers: { token: token } }
      );
      GetLoggedUserCart();
      toast.success(data.message);
    } catch (error) {
      toast.error("error");
    }
  }
  async function UpdateCart(id, Newcount) {
    if (Newcount == 0) {
      DeleteCartItem(id);
    } else {
      try {
        const { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          {
            count: Newcount,
          },
          { headers: { token: token } }
        );
        setNumOfCartItems(data?.numOfCartItems);
        setTotalCartPrice(data?.data?.totalCartPrice);
        setCartProducts(data?.data?.products);
      } catch (error) {
        toast.error("error");
      }
    }
  }
  async function DeleteAllCartItem() {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: token },
      });
      setNumOfCartItems(0);
      setTotalCartPrice(0);
      setCartProducts([]);
    } catch (error) {
      toast.error("error");
    }
  }
  async function DeleteCartItem(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers: { token: token } }
      );
      setNumOfCartItems(data?.numOfCartItems);
      setTotalCartPrice(data?.data?.totalCartPrice);
      setCartProducts(data?.data?.products);
    } catch (error) {
      toast.error("error");
    }
  }
  async function GetLoggedUserCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token: token } }
      );
      setCartId(data?.data?._id);
      setNumOfCartItems(data?.numOfCartItems);
      setTotalCartPrice(data?.data?.totalCartPrice);
      setCartProducts(data?.data?.products);
      data?.data?.products?.map(function (item) {
        return WishlistProductsId?.includes(item.product.id)
          ? DeleteWishlistItem(item.product.id)
          : null;
      });
    } catch (error) {
      setCartId(null);
      setNumOfCartItems(0);
      setTotalCartPrice(null);
      setCartProducts([]);
    }
  }
  useEffect(() => {
    if (token) {
      GetLoggedUserCart();
    }

    return () => {};
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        totalCartPrice,
        cartProducts,
        AddToCart,
        UpdateCart,
        DeleteCartItem,
        DeleteAllCartItem,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
