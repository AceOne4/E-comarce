import { TLoading } from "@Types/shared";
import React from "react";
import CategorySkeleton from "../skeleton/categorySkeleton/CategorySkeleton";
import CartSkeleton from "../skeleton/cartSkeleton/CartSkeleton";
import ProductSkeleton from "../skeleton/productSkeleton/ProductSkeleton";
import LottieHandler from "../lottieHandler/LottieHandler";
type loaingProps = {
  loading: TLoading;
  error: null | string;
  children: React.ReactNode;
  type: keyof typeof typeOfCompnent;
};

const typeOfCompnent = {
  category: CategorySkeleton,
  cart: CartSkeleton,
  product: ProductSkeleton,
};

function Loading({ loading, error, children, type }: loaingProps) {
  const Component = typeOfCompnent[type];

  if (loading === "pending") {
    return <Component />;
  }
  if (loading === "Failed") {
    return <LottieHandler type="error" message={error as string} />;
  }

  return <div>{children}</div>;
}

export default Loading;
