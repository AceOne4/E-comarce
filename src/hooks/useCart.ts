import {
  actgetcartitemsbyId,
  cartCleanup,
  cartItemChangeQuantity,
  cartItemRemove,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { restOrderStatus } from "@store/orders/orderSlice";
import { useEffect, useCallback } from "react";

function useCart() {
  const dispatch = useAppDispatch();
  const { items, ProductFullInfo, loading, error } = useAppSelector(
    (state) => state.cartSlice
  );
  const userAccessToken = useAppSelector(
    (state) => state.authSlice.accessToken
  );
  const placeOrderStatus = useAppSelector((state) => state.orderSlice.loading);
  useEffect(() => {
    dispatch(actgetcartitemsbyId());
    return () => {
      dispatch(cartCleanup());
      dispatch(restOrderStatus());
    };
  }, [dispatch]);

  const products = ProductFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));
  // we used useCallback to save the reference of the function so it wont change when render the app and to be readable when memo check its cashed data
  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );
  return {
    loading,
    error,
    products,
    changeQuantityHandler,
    removeItemHandler,
    userAccessToken,
    placeOrderStatus,
  };
}

export default useCart;
