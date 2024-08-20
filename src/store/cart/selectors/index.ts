import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";
// we use createSelector to prevent the uncessery fire for the use selector
// RootState is all the states on the stores
export const getCartQuantities = createSelector(
  (state: RootState) => state.cartSlice.items,
  (items) => Object.values(items).reduce((acc, item) => acc + item, 0)
);

export const itemQuantityAvailabilityCheckingSelector = createSelector(
  (itemQuantity) => itemQuantity,
  (_, itemMax) => itemMax,
  (itemQuantity, itemMax) => {
    const currentItemQuantityInCart = itemQuantity || 0;
    const currentRemainingQuantity = itemMax - currentItemQuantityInCart;
    const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;
    return { currentRemainingQuantity, quantityReachedToMax };
  }
);
