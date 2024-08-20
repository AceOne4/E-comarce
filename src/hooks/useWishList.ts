import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  actGetWishList,
  whishlistCleanUp,
} from "@store/whishlist/whishlistSlice";

function useWishList() {
  const dispatch = useAppDispatch();
  const { loading, error, ProductFullInfo } = useAppSelector(
    (state) => state.whishlistSlice
  );
  const cartItems = useAppSelector((state) => state.cartSlice.items);

  useEffect(() => {
    dispatch(actGetWishList("Fullinfo"));
    return () => {
      dispatch(whishlistCleanUp());
    };
  }, [dispatch]);

  const records = ProductFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: true,
    isAuth: true,
  }));

  return { records, error, loading };
}

export default useWishList;
