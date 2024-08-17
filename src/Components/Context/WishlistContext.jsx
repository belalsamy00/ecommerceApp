import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { CartContext } from "./CartContext";

export const WishlistContext = createContext();

function WishlistContextProvider({ children }) {
  const [WishlistItemscount, setWishlistItemscount] = useState(0);
  const [WishlistProducts, setWishlistProducts] = useState(null);
  const [WishlistProductsId, setWishlistProductsId] = useState(null);
  const { token } = useContext(AuthContext);
  async function AddToWishlist(id) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        { headers: { token: token } }
      );
      GetLoggedUserWishlist();
      toast.success(data.message);
    } catch (error) {
      toast.error("error");
    }
  }
  async function DeleteWishlistItem(id) {
    try {
      const data = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        { headers: { token: token } }
      );
      GetLoggedUserWishlist();
    } catch (error) {
      toast.error("error");
    }
  }
  async function GetLoggedUserWishlist() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: { token: token } }
      );
      setWishlistItemscount(data?.count);
      setWishlistProducts(data?.data);
      const valueArr = data?.data.map(function (item) {
        return item?.id;
      });
      setWishlistProductsId(valueArr);
    } catch (error) {
      console.log(error);
      setWishlistItemscount(0);
      setWishlistProducts([]);
    }
  }
  useEffect(() => {
    if (token) {
      GetLoggedUserWishlist();
    }

    return () => {};
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        WishlistItemscount,
        WishlistProducts,
        AddToWishlist,
        DeleteWishlistItem,
        GetLoggedUserWishlist,
        WishlistProductsId,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContextProvider;
