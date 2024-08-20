import styles from "./style.module.css";
// makin reusable components to the product and cartitem
type Tproductinfo = {
  title: string;
  img: string;
  price: number;
  direction?: "col" | "row";
  children?: React.ReactNode;
  style?: React.CSSProperties;
  quantity?: number;
};
function ProductInfo({
  title,
  img,
  price,
  direction = "row",
  children,
  style,
  quantity,
}: Tproductinfo) {
  return (
    <div className={`${styles[`product_${direction}`]}`} style={style}>
      <div className={`${styles[`productImg_${direction}`]}`}>
        <img src={img} alt={title} />
      </div>
      <div className={`${styles[`productInfo_${direction}`]}`}>
        <h2>{title}</h2>
        <h3>{price.toFixed(2)} EGP</h3>
        {quantity && <h3>Total Quantity {quantity}</h3>}
        {quantity && <h3>Total Price {(quantity * price).toFixed(2)} EGP</h3>}
        {children}
      </div>
    </div>
  );
}

export default ProductInfo;
