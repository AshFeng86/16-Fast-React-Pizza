import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utilities/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // Styling the Order Form

  // Error handling in Form Actions
  const formErrors = useActionData();
  const dispatch = useDispatch();

  // Error Handling in Form Actions
  // We want to hide the "Order Now" button when user already clicks it
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Reading and Updating the User State
  // Integrating Gelocation
  // position: {latitude: ..., longitudue:...}
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  // Using the Cart for New Orders
  const cart = useSelector(getCart);
  const [withPriority, setWithPriority] = useState(false);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* Writing Data with React Router “Actions” */}
      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="customer" className="sm:basis-40">
            First Name
          </label>
          <input
            type="text"
            name="customer"
            id="customer"
            required
            className="input grow"
            // Reading and Updating the User State
            // can NOT use value={username}, if so, we can't modify
            // the First Name, but defaultValue allows to change
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="phone">
            Phone number
          </label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              id="phone"
              className="input w-full"
            />
            {/* Error handling in Form Actions */}
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Integrating Gelocation */}
        {/* To make sure button is on the top of input field */}
        {/* use relative  */}
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40" htmlFor="address">
            Address
          </label>
          <div className="grow">
            {/* Integrating Geolocation */}
            {/* Disabled the input when isLoadingAddress */}
            {/* defaultValue={}: make sure it can be edit */}
            {/* value={}: can NOT edit */}
            <input
              type="text"
              name="address"
              id="address"
              required
              // Styling Form Elements
              className="input w-full"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {/* Integrating Gelocation */}
          {/* To make sure button is on the top of input field */}
          {/* use absolute  */}
          {/* Since this is a form, clicking the button */}
          {/* will automatically submit the form, which */}
          {/* we want to prevent */}
          <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
              type="small"
              disabled={isLoadingAddress}
            >
              Get Position
            </Button>
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5 py-2">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* Writing Data with React Router “Actions” */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* Integrating Geolocation */}
          {/* Get GPS location to help the delivery */}
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          {/* Styling Buttons: Element States & Transitions */}
          {/* Reusing Styles With React Components */}
          <Button disabled={isSubmitting} type="primary">
            {/* Using the Cart for New Orders */}
            {isSubmitting
              ? "Placing Order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// Writing Data with React Router “Actions”
// As soon as the <Form> above get submitted, a HTML request (an object) will
// be intercepted by this action when it connects to React Router.
export async function action({ request }) {
  const formData = await request.formData();
  // Retrieves the form data from the request and converts it into an object
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    // Using the Cart for New Orders
    priority: data.priority === "true",
  };

  // Error Handling in Form Actions
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = `Please give us your correct phone number. We might need it to contact you.`;
  // Check if there are any keys in the "errors" object
  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  // createOrder: POST requst in apiRestaurant.js
  const newOrder = await createOrder(order);

  // Using the Cart for New Orders
  // Do NOT overuse
  store.dispatch(clearCart());

  // Can't use useNavigate because this is NOT a component
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
