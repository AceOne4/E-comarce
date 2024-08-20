import { Loading } from "@components/feedBack";
import GridList from "@components/common/GridList/GridList";
import { Heading } from "@components/common";
import { Product } from "@components/eCom";
import useWishList from "@hooks/useWishList";

function WhishList() {
  const { records, error, loading } = useWishList();

  // const dispatch = useAppDispatch();
  // const { loading, error, ProductFullInfo } = useAppSelector(
  //   (state) => state.whishlistSlice
  // );
  // const cartItems = useAppSelector((state) => state.cartSlice.items);

  // useEffect(() => {
  //   dispatch(actGetWishList());
  //   return () => {
  //     dispatch(whishlistCleanUp());
  //   };
  // }, [dispatch]);

  // const records = ProductFullInfo.map((el) => ({
  //   ...el,
  //   quantity: cartItems[el.id] || 0,
  //   isLiked: true,
  // }));

  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading loading={loading} error={error} type="product">
        <GridList
          emptyMessage="Your Wishlist is empty"
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
}

export default WhishList;
