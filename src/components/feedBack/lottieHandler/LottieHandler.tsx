import notFound from "@assets/Lotties/notFound.json";
import empty from "@assets/Lotties/empty.json";
import loading from "@assets/Lotties/loading.json";
import error from "@assets/Lotties/error.json";
import Lottie from "lottie-react";
import success from "@assets/Lotties/success.json";
const lottieType = {
  notFound,
  empty,
  loading,
  error,
  success,
};

type LottieHandlerProps = {
  type: keyof typeof lottieType;
  message?: string;
  className?: string;
};

function lottieHandler({ type, message, className }: LottieHandlerProps) {
  const lottie = lottieType[type];
  const messageStyle =
    type === "error"
      ? { fontSize: "19px", color: "red" }
      : { fontSize: "19px", marginTop: "30px" };
  return (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <Lottie animationData={lottie} style={{ width: "400px" }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
}

export default lottieHandler;
