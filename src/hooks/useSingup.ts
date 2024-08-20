import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actsingup, resetUI } from "@store/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { singUpschema, Tinputs } from "@validation/singupSchema";
import useCheckEmailAvailability from "@hooks/useCheckemailavalabilty";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSingup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector(
    (state) => state.authSlice
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
    trigger,
  } = useForm<Tinputs>({
    mode: "onBlur",
    resolver: zodResolver(singUpschema),
  });
  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const submitForm: SubmitHandler<Tinputs> = async (data) => {
    const { firstName, lastName, password, email } = data;
    dispatch(actsingup({ firstName, lastName, password, email }))
      .unwrap()
      .then(() => navigate("/login?message=account_created"));
  };
  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      checkEmailAvailability(value);
    }
    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    errors,
    emailAvailabilityStatus,
    submitForm,
    emailOnBlurHandler,
  };
};

export default useSingup;
