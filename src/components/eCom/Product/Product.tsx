import { useState, useEffect, memo } from "react";
import { useAppDispatch } from "@store/hooks";
import { Button, Spinner, Modal } from "react-bootstrap";
import Like from "@assets/like.svg?react";
import { actToggelLike } from "@store/whishlist/whishlistSlice";
import LikeFill from "@assets/like-fill.svg?react";
import styles from "./style.module.css";
import { TProduct } from "@Types/shared";
import { addToCart } from "@store/cart/cartSlice";
import ProductInfo from "../ProductInfo/ProductInfo";

const { maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({ id, price, title, img, max, quantity, isLiked, isAuth }: TProduct) => {
    const dispatch = useAppDispatch();
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const remainQunatity = max - (quantity ?? 0);
    const maxREached = remainQunatity <= 0;
    useEffect(() => {
      if (!isDisabled) return;

      const debounce = setTimeout(() => {
        setIsDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isDisabled]);
    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsDisabled(true);
    };

    const toggleLikeHandler = () => {
      if (isAuth) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actToggelLike(id)).finally(() => setIsLoading(false));
          // .unwrap()
          // .then(() => setIsLoading(false))
          // .catch(() => setIsLoading(false));
        }
      } else setShowModal(true);
    };
    return (
      <>
        {" "}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>
        <ProductInfo price={price} title={title} img={img} direction="row">
          <div className={wishlistBtn} onClick={toggleLikeHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <p className={maximumNotice}>
            {maxREached
              ? "You have reached  the limit "
              : `You can add ${remainQunatity} item(s)`}
          </p>
          <Button
            variant="info"
            style={{ color: "white", width: "100%" }}
            onClick={addToCartHandler}
            disabled={isDisabled || maxREached}
          >
            {isDisabled ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </ProductInfo>
        {/* <div className={product}>
          <div className={wishlistBtn} onClick={toggleLikeHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <h2>{title}</h2>
          <h3>{price?.toFixed(2)} EGP</h3>
          <p className={maximumNotice}>
            {maxREached
              ? "You have reached  the limit "
              : `You can add ${remainQunatity} item(s)`}
          </p>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={addToCartHandler}
            disabled={isDisabled || maxREached}
          >
            {isDisabled ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </div> */}
      </>
    );
  }
);

export default Product;
