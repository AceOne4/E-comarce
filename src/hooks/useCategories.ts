import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actgetCatrgories,
  categoryCleanUp,
} from "@store/catgories/catogriesSlice";
import { useEffect } from "react";
function useCategories() {
  const dispatch = useAppDispatch();

  const { error, loading, records } = useAppSelector(
    (state) => state.catogriesSlice
  );
  useEffect(() => {
    // to keep data from the first load only and stop unnecessary action fire

    const promise = dispatch(actgetCatrgories());

    return () => {
      dispatch(categoryCleanUp());
      promise.abort();
    };
  }, [dispatch]);
  return { error, loading, records };
}

export default useCategories;
