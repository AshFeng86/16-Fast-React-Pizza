import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice.js";
import DeleteItem from "../cart/DeleteItem.jsx";
import UpdateItemQuantity from "../cart/UpdateItemQuantity.jsx";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // Adding Menu Items to the Cart
  const dispatch = useDispatch();
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  // Deleting Cart Items
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  return (
    // Styling the Menu
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {/* Deleting Cart Items */}
          {/* Check the quantity of each item is > 0 */}
          {/* If not, don't display the Delete Button */}
          {/* Updating Cart Quantites */}
          {isInCart ? (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          ) : null}
          {!soldOut && !isInCart ? (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
