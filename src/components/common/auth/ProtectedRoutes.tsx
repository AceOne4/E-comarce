import { useAppSelector } from "@store/hooks";
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAppSelector((state) => state.authSlice);
  if (!accessToken) return <Navigate to="/login?message=login_required" />;
  return <>{children}</>;
}

export default ProtectedRoutes;
