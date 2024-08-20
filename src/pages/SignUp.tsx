import { Heading } from "@components/common";

import { Form, Button, Col, Row, Spinner } from "react-bootstrap";

import Input from "@components/form/Input";
import { Navigate } from "react-router-dom";
import useSingup from "@hooks/useSingup";

function SignUp() {
  const {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    errors,
    emailAvailabilityStatus,
    submitForm,
    emailOnBlurHandler,
  } = useSingup();
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const { loading, error, accessToken } = useAppSelector(
  //   (state) => state.authSlice
  // );
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   getFieldState,
  //   trigger,
  // } = useForm<Tinputs>({
  //   mode: "onBlur",
  //   resolver: zodResolver(singUpschema),
  // });
  // const {
  //   emailAvailabilityStatus,
  //   enteredEmail,
  //   checkEmailAvailability,
  //   resetCheckEmailAvailability,
  // } = useCheckEmailAvailability();

  // const submitForm: SubmitHandler<Tinputs> = async (data) => {
  //   const { firstName, lastName, password, email } = data;
  //   dispatch(actsingup({ firstName, lastName, password, email }))
  //     .unwrap()
  //     .then(() => navigate("/login?message=account_created"));
  // };
  // const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   await trigger("email");
  //   const { isDirty, invalid } = getFieldState("email");
  //   if (isDirty && !invalid && enteredEmail !== value) {
  //     checkEmailAvailability(value);
  //   }
  //   if (isDirty && invalid && enteredEmail) {
  //     resetCheckEmailAvailability();
  //   }
  // };
  // useEffect(() => {
  //   return () => {
  //     dispatch(resetUI());
  //   };
  // }, [dispatch]);

  if (accessToken) return <Navigate to={"/"}></Navigate>;
  return (
    <>
      <Heading title="Sign up" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
            />
            <Input
              label="Email Address"
              name="email"
              register={register}
              onBlur={emailOnBlurHandler}
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                  ? "Error from the server."
                  : ""
              }
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "This email is available for use."
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
            <Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword?.message}
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabilityStatus === "checking"
                  ? true
                  : false || loading === "pending"
              }
            >
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

export default SignUp;
