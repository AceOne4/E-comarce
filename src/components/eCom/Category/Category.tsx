import styles from "./style.module.css";
const { category, categoryImg, categoryTitle } = styles;
import { Link } from "react-router-dom";
import { TCategory } from "@Types/shared";

const Category = ({ img, title, prefix }: TCategory) => {
  return (
    <div className={category}>
      <Link to={`/products/${prefix}`}>
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;
