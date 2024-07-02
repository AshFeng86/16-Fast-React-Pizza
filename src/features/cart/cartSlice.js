import { createSlice } from "@reduxjs/toolkit";

// Modeling the “Cart” State
const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "Mediterranean",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId

      // When using .find(...), it returns a reference to the object
      // within the "state.cart" array. This means that modifying
      // "item" will directly modify the corresponding object within
      // "state.cart"
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      // Updating Cart Quantities
      // If we click "-" to quantity  = 0, delete the item
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Building the Cart Overview w/ Redux Selector
// Later call useSelector() on this funciton in other components
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((accu, item) => accu + item.quantity, 0);
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((accu, item) => accu + item.totalPrice, 0);

// Building the Cart Page
export const getCart = (state) => state.cart.cart;

// Deleting Cart Items
// Nullish Operator: handle null or undefined values, not "" and 0
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// Same as above
// export function getCurrentQuantityById(id) {
//   return function (state) {
//     return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
//   };
// }
