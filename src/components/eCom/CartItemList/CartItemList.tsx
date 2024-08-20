import CartItem from "../CartItem/CartItem";
import { TProduct } from "@Types/shared";
type CartItemListProps = {
  products: TProduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

function CartItemList({
  products,
  removeItemHandler,
  changeQuantityHandler,
}: CartItemListProps) {
  const renderList = products.map((el) => (
    <CartItem
      key={el.id}
      {...el}
      changeQuantityHandler={changeQuantityHandler}
      removeItemHandler={removeItemHandler}
    />
  ));

  return <div>{renderList}</div>;
}

export default CartItemList;
