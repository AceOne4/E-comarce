import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  actgetProductbyPrefix,
  productsCleanUp,
} from "@store/Products/ProductSlice";

function useProducts() {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { error, loading, records } = useAppSelector(
    (state) => state.ProductSlice
  );
  const cartItems = useAppSelector((state) => state.cartSlice.items);
  const whisListItemId = useAppSelector(
    (state) => state.whishlistSlice.ProductId
  );
  const useAuth = useAppSelector((state) => state.authSlice.accessToken);
  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: whisListItemId.includes(el.id),
    isAuth: useAuth ? true : false,
  }));

  useEffect(() => {
    const promise = dispatch(actgetProductbyPrefix(param.prefix as string));
    return () => {
      dispatch(productsCleanUp());
      promise.abort();
    };
  }, [dispatch, param]);
  return { error, loading, productsFullInfo, param };
}

export default useProducts;
