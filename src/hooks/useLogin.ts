import { actlogin, resetUI } from "@store/auth/authSlice";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tnputs, signInSchema } from "@validation/signInSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading, accessToken } = useAppSelector(
    (state) => state.authSlice
  );
  const [serachParam, setSearchParam] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tnputs>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const logIn: SubmitHandler<Tnputs> = async (data) => {
    if (serachParam.get("message")) setSearchParam("");

    dispatch(actlogin(data))
      .unwrap()
      .then(() => navigate("/"));
  };
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  return {
    error,
    loading,
    accessToken,
    register,
    handleSubmit,
    errors,
    logIn,
    serachParam,
  };
};

export default useLogin;
