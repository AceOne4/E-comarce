import { Suspense } from "react";

import LottieHandler from "../lottieHandler/LottieHandler";

const PageSuspense = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <LottieHandler type="loading" message="loading please wait.." />
      }
    >
      {children}
    </Suspense>
  );
};

export default PageSuspense;
