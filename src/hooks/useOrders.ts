import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders, restOrderStatus } from "@store/orders/orderSlice";
import { useEffect, useState } from "react";
import { TProduct } from "@Types/shared";

function useOrders() {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);

  const { loading, error, orderlist } = useAppSelector(
    (state) => state.orderSlice
  );
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  const viewDetailsHandler = (id: number) => {
    const productDetails = orderlist.find((order) => order.id === id);

    const newItems = productDetails?.items ?? [];
    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...newItems]);
  };

  useEffect(() => {
    dispatch(actGetOrders());
    return () => {
      dispatch(restOrderStatus());
    };
  }, [dispatch]);

  return {
    showModal,
    selectedProduct,
    loading,
    error,
    orderlist,
    handleCloseModal,
    viewDetailsHandler,
  };
}

export default useOrders;
