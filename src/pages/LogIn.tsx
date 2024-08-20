import { Navigate } from "react-router-dom";
import { Heading } from "@components/common";

import { Form, Button, Col, Row, Alert, Spinner } from "react-bootstrap";
import Input from "@components/form/Input";
import useLogin from "@hooks/useLogin";

function LogIn() {
  const {
    error,
    loading,
    accessToken,
    register,
    handleSubmit,
    errors,
    logIn,
    serachParam,
  } = useLogin();
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const { error, loading, accessToken } = useAppSelector(
  //   (state) => state.authSlice
  // );
  // const [serachParam, setSearchParam] = useSearchParams();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Tnputs>({
  //   mode: "onBlur",
  //   resolver: zodResolver(signInSchema),
  // });

  // const logIn: SubmitHandler<Tnputs> = async (data) => {
  //   if (serachParam.get("message")) setSearchParam("");

  //   dispatch(actlogin(data))
  //     .unwrap()
  //     .then(() => navigate("/"));
  // };
  // useEffect(() => {
  //   return () => {
  //     dispatch(resetUI());
  //   };
  // }, [dispatch]);
  if (accessToken) return <Navigate to={"/"}></Navigate>;
  return (
    <>
      <Heading title="Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {serachParam.get("message") === "login_required" && (
            <Alert variant="success">
              Your need To Login to view this content
            </Alert>
          )}
          {serachParam.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created , Please Login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(logIn)}>
            <Input
              label="Email address"
              name="email"
              register={register}
              error={errors.email?.message}
            />

            <Input
              type="password"
              label="Password"
              name="password"
              register={register}
              error={errors.password?.message}
            />

            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading ...
                </>
              ) : (
                "submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default LogIn;
