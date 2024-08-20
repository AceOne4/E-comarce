import { Category } from "@components/eCom";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedBack";
import GridList from "@components/common/GridList/GridList";
import { Heading } from "@components/common";
import useCategories from "@hooks/useCategories";

function Categories() {
  const { error, loading, records } = useCategories();
  // const dispatch = useAppDispatch();
  // const { error, loading, records } = useAppSelector(
  //   (state) => state.catogriesSlice
  // );
  // useEffect(() => {
  //   // to keep data from the first load only and stop unnecessary action fire
  //   if (!records.length) {
  //     dispatch(actgetCatrgories());
  //   }

  //   return () => {
  //     dispatch(categoryCleanUp());
  //   };
  // }, [dispatch]);
  //////////////////////////////////////////////////////////////////////////////
  // we used reusanle component (GridList) cuz of the repeating code
  // const catogreyList =
  //   records.length > 0
  //     ? records.map((el) => (
  //         <Col
  //           xs={6}
  //           md={3}
  //           key={el.id}
  //           className="d-flex justify-content-center mb-5 mt-2"
  //         >
  //           <Category {...el} />
  //         </Col>
  //       ))
  //     : "there are no records";
  return (
    <Container>
      <Heading title="Categories" />
      <Loading error={error} loading={loading} type="category">
        <GridList
          emptyMessage="There are no categories available"
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
}

export default Categories;
