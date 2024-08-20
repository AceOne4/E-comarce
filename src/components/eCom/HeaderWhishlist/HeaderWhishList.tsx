// import { useEffect, useState } from "react";
// import { useAppSelector } from "@store/hooks";
// import { useNavigate } from "react-router-dom";
// import Logo from "@assets/wishlist.svg?react";

// import styles from "./style.module.css";
// const { container, totalNum, pumpAnimate, iconWrapper } = styles;

// const HeaderWishlist = () => {
//   const totalQuantities = useAppSelector(
//     (state) => state.whishlistSlice.ProductId
//   );
//   const [isAnimate, setIsAnimate] = useState(false);
//   const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!totalQuantities) {
//       return;
//     }
//     setIsAnimate(true);

//     const debounce = setTimeout(() => {
//       setIsAnimate(false);
//     }, 300);

//     return () => clearTimeout(debounce);
//   }, [totalQuantities]);

//   return (
//     <div className={container} onClick={() => navigate("/whishlist")}>
//       <div className={iconWrapper}>
//         <Logo title="basket icon" />
//         {totalQuantities.length > 0 && (
//           <div className={quantityStyle}>{totalQuantities.length}</div>
//         )}
//       </div>
//       <h3>Wishlist</h3>
//     </div>
//   );
// };

// export default HeaderWishlist;
