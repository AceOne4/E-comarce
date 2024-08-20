import { Container } from "react-bootstrap";
import LottieHandler from "@components/feedBack/lottieHandler/LottieHandler";
import { Link } from "react-router-dom";

function ErrorElment() {
  return (
    <Container>
      <div
        className="d-flex flex-column align-items-center"
        style={{ marginTop: "15%" }}
      >
        <LottieHandler type="notFound" />
        <Link to="/" replace={true}>
          Home
        </Link>
      </div>
    </Container>
  );
}

export default ErrorElment;
