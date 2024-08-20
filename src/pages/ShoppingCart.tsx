import { Heading } from "@components/common";
import { CTotalPrice, CartItemList } from "@components/eCom";
import { Loading } from "@components/feedBack";
import useCart from "@hooks/useCart";
import LottieHandler from "@components/feedBack/lottieHandler/LottieHandler";

function ShoppingCart() {
  const {
    loading,
    error,
    products,
    changeQuantityHandler,
    removeItemHandler,
    userAccessToken,
    placeOrderStatus,
  } = useCart();
  // const dispatch = useAppDispatch();
  // const { items, ProductFullInfo, loading, error } = useAppSelector(
  //   (state) => state.cartSlice
  // );

  // useEffect(() => {
  //   dispatch(actgetcartitemsbyId());
  //   return () => {
  //     dispatch(cartCleanup());
  //   };
  // }, [dispatch]);

  // const products = ProductFullInfo.map((el) => ({
  //   ...el,
  //   quantity: items[el.id],
  // }));
  // // we used useCallback to save the reference of the function so it wont change when render the app and to be readable when memo check its cashed data
  // const changeQuantityHandler = useCallback(
  //   (id: number, quantity: number) => {
  //     dispatch(cartItemChangeQuantity({ id, quantity }));
  //   },
  //   [dispatch]
  // );

  // const removeItemHandler = useCallback(
  //   (id: number) => {
  //     dispatch(cartItemRemove(id));
  //   },
  //   [dispatch]
  // );
  return (
    <>
      <Heading title="Shopping Cart" />
      <Loading loading={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CTotalPrice products={products} accessToken={userAccessToken} />
          </>
        ) : placeOrderStatus === "successeded" ? (
          <LottieHandler
            message="Your order has been placed successfully"
            type="success"
          />
        ) : (
          <LottieHandler type="empty" message="Your Cart is empty" />
        )}
      </Loading>
    </>
  );
}

export default ShoppingCart;
