import { Heading } from "@components/common";
import ProductInfo from "@components/eCom/ProductInfo/ProductInfo";
import { Loading } from "@components/feedBack";
import useOrders from "@hooks/useOrders";
import { Table, Modal } from "react-bootstrap";

function Orders() {
  const {
    showModal,
    selectedProduct,
    loading,
    error,
    orderlist,
    handleCloseModal,
    viewDetailsHandler,
  } = useOrders();
  // const dispatch = useAppDispatch();

  // const [showModal, setShowModal] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  // const { loading, error, orderlist } = useAppSelector(
  //   (state) => state.orderSlice
  // );
  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setSelectedProduct([]);
  // };

  // const viewDetailsHandler = (id: number) => {
  //   const productDetails = orderlist.find((order) => order.id === id);

  //   const newItems = productDetails?.items ?? [];
  //   setShowModal(true);
  //   setSelectedProduct((prev) => [...prev, ...newItems]);
  // };

  // useEffect(() => {
  //   dispatch(actGetOrders());
  //   return () => {
  //     dispatch(restOrderStatus());
  //   };
  // }, [dispatch]);
  const table = orderlist.map((order) => (
    <tr key={order.id}>
      <td>#{order.id}</td>
      <td>
        {order.items.length}items {" / "}{" "}
        <span
          onClick={() => viewDetailsHandler(order.id)}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          ProductDetail
        </span>
      </td>
      <td>#{order.subTotal.toFixed(2)}</td>
    </tr>
  ));
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              style={{ marginBottom: "10px" }}
              quantity={el.quantity}
            />
          ))}
        </Modal.Body>
      </Modal>
      <Heading title="My Order" />
      <Loading loading={loading} error={error} type="category">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </Table>
      </Loading>
    </>
  );
}

export default Orders;
