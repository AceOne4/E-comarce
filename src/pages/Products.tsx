import { Product } from "@components/eCom";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedBack";
import GridList from "@components/common/GridList/GridList";
import { Heading } from "@components/common";
import useProducts from "@hooks/useProducts";

function Products() {
  const { error, loading, productsFullInfo, param } = useProducts();

  //we used custom hooks to make the component cleaner
  // const param = useParams();
  // const dispatch = useAppDispatch();
  // const { error, loading, records } = useAppSelector(
  //   (state) => state.ProductSlice
  // );
  // const cartItems = useAppSelector((state) => state.cartSlice.items);
  // const whisListItemId = useAppSelector(
  //   (state) => state.whishlistSlice.ProductId
  // );
  // console.log(whisListItemId);
  // const productsFullInfo = records.map((el) => ({
  //   ...el,
  //   quantity: cartItems[el.id] || 0,
  //   isLiked: whisListItemId.includes(el.id),
  // }));

  // useEffect(() => {
  //   // let prefix: string;
  //   // if (param.prefix && typeof param.prefix === "string") {
  //   //   prefix = param.prefix;
  //   //   dispatch(actgetProductbyPrefix(prefix));
  //   // }
  //   // because i ve a guard alraedy so i dont need another one so casting will work properly in this case
  //   dispatch(actgetProductbyPrefix(param.prefix as string));
  //   return () => {
  //     dispatch(productsCleanUp());
  //   };
  // }, [dispatch, param]);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // we used reusanle component (GridList) cuz of the repeating code
  // const ProductList =
  //   records.length > 0
  //     ? records.map((el) => (
  //         <Col
  //           xs={6}
  //           md={3}
  //           key={el.id}
  //           className="d-flex justify-content-center mb-5 mt-2"
  //         >
  //           <Product {...el} />
  //         </Col>
  //       ))
  //     : "there are no records";
  return (
    <Container>
      <Heading title={`${param.prefix?.toUpperCase()}'s Products`} />

      <Loading loading={loading} error={error} type="product">
        <GridList
          emptyMessage="There are no Products available"
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
}

export default Products;
