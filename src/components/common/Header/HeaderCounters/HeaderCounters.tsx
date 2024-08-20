import { useEffect, useState } from "react";

import style from "./style.module.css";

import { useNavigate } from "react-router-dom";
const { container, totalNum, pumpAnimate, iconWrapper } = style;

type THeaderCountersProps = {
  totalQuantities: number;
  svgIcon: React.ReactNode;
  to: string;
  title: string;
};

function HeaderCounters({
  totalQuantities,
  svgIcon,
  to,
  title,
}: THeaderCountersProps) {
  const [isAnimate, setIsAnimate] = useState(false);
  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;
  const navigate = useNavigate();
  useEffect(() => {
    if (!totalQuantities) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantities]);

  return (
    <div className={container} onClick={() => navigate(to)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantities > 0 && (
          <div className={quantityStyle}>{totalQuantities}</div>
        )}
      </div>
      <h3>{title}</h3>
    </div>
  );
}

export default HeaderCounters;
