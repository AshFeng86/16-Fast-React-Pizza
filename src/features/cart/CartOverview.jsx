import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  // Building the Cart Overview w/ Redux Selector
  // Check cartSlice.js, our reducer is called cart
  // and we have a cart key in our initialState object
  // Thereofre, state.cart.cart
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartQuantity) return null;
  return (
    // Working with color
    // Styling Text
    // The Box Model: Spacing, Borders, and Display
    // Responsive Design
    // Using Flexbox
    <div className="flex items-center justify-between bg-stone-800 p-4 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        {/* Building the Cart Overview w/ Redux Selector */}
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
