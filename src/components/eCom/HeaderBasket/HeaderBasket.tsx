// import { useEffect, useState } from "react";
// import { useAppSelector } from "@store/hooks";
// import style from "./style.module.css";
// import Logo from "@assets/cart.svg?react";
// import { getCartQuantities } from "@store/cart/selectors";
// import { useNavigate } from "react-router-dom";
// const { container, totalNum, pumpAnimate, iconWrapper } = style;
// function HeaderBasket() {
//   const totalQuantities = useAppSelector(getCartQuantities);
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
//     <div className={container} onClick={() => navigate("/cart")}>
//       <div className={iconWrapper}>
//         <Logo title="basket icon" />
//         {totalQuantities > 0 && (
//           <div className={quantityStyle}>{totalQuantities}</div>
//         )}
//       </div>
//       <h3>Cart</h3>
//     </div>
//   );
// }

// export default HeaderBasket;
