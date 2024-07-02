import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  // Reading and updating the user state
  const username = useSelector((state) => state.user.username);

  // Building the Cart Page
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;

  return (
    // Styling the Cart
    <div className="px-4 py-3">
      {/* Styling Buttons: Element States and Transitions */}
      {/* Reusing Styles With React Components */}
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      {/* Styling the Cart */}
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        {/* Building the Cart Page */}
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
