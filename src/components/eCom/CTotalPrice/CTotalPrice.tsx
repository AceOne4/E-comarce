import { Button, Modal, Spinner } from "react-bootstrap";
import style from "./style.module.css";
import { TProduct } from "@Types/shared";
import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import { actPlaceOrder } from "@store/orders/orderSlice";
import { clearCartAfterorder } from "@store/cart/cartSlice";
const { container } = style;

type CartSubtotalPriceProps = {
  products: TProduct[];
  accessToken: string | null;
};

function CTotalPrice({ products, accessToken }: CartSubtotalPriceProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const dispatch = useAppDispatch();

  const subtotal = products.reduce((accumulator, el) => {
    const price = el.price;
    const quantity = el.quantity;
    if (quantity && typeof quantity === "number") {
      return accumulator + price * quantity;
    } else {
      return accumulator;
    }
  }, 0);
  const handleModal = () => {
    setShowModal(!showModal);
    setError(null);
  };
  const confirmHandler = () => {
    setLoading(true);
    dispatch(actPlaceOrder(subtotal))
      .unwrap()
      .then(() => {
        dispatch(clearCartAfterorder());
        setShowModal(false);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Modal show={showModal} onHide={handleModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with subtotal:{" "}
          {subtotal.toFixed(2)} EGP
          {!loading && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={confirmHandler}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={container}>
        <span>Total Price :</span>
        <span>{subtotal.toFixed(2)}</span>
      </div>
      {accessToken && (
        <div className={container}>
          <span></span>
          <span>
            <Button
              variant="info"
              style={{ color: "white" }}
              onClick={handleModal}
            >
              Place Order
            </Button>
          </span>
        </div>
      )}
    </>
  );
}

export default CTotalPrice;
