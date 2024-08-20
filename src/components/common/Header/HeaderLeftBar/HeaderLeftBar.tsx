import HeaderCounters from "../HeaderCounters/HeaderCounters";
import { useAppSelector } from "@store/hooks";
import { getCartQuantities } from "@store/cart/selectors";
import Cart from "@assets/cart.svg?react";
import WishList from "@assets/wishlist.svg?react";
import syles from "./style.module.css";

const { headerLeftBar } = syles;
function HeaderLeftBar() {
  const cartTotalQuantities = useAppSelector(getCartQuantities);
  const wishlistTotalQuantities = useAppSelector(
    (state) => state.whishlistSlice.ProductId.length
  );
  return (
    <div className={headerLeftBar}>
      <HeaderCounters
        totalQuantities={wishlistTotalQuantities}
        svgIcon={<WishList title="wishlist" />}
        to="/whishlist"
        title="Wishlist"
      />
      <HeaderCounters
        totalQuantities={cartTotalQuantities}
        svgIcon={<Cart title="cart" />}
        to="/cart"
        title="Cart"
      />
    </div>
  );
}

export default HeaderLeftBar;
