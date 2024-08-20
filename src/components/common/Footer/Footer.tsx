import style from "./style.module.css";

const { footerContainer } = style;
function Footer() {
  return (
    <div className={footerContainer}>
      © 2024 Ace home store. All rights reserved.
    </div>
  );
}

export default Footer;
