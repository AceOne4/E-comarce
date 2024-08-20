import { Col, Row } from "react-bootstrap";
import LottieHandler from "@components/feedBack/lottieHandler/LottieHandler";
//prop render pattern
// usablity of generic

type GridList<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  emptyMessage: string;
};
type hasID = { id?: number };
function GridList<T extends hasID>({
  records,
  renderItem,
  emptyMessage,
}: GridList<T>) {
  const List =
    records.length > 0 ? (
      records.map((el) => (
        <Col
          xs={6}
          md={3}
          key={el.id}
          className="d-flex justify-content-center mb-5 mt-2"
        >
          {renderItem(el)}
        </Col>
      ))
    ) : (
      <LottieHandler type="empty" message={emptyMessage} />
    );
  return <Row>{List}</Row>;
}

export default GridList;
