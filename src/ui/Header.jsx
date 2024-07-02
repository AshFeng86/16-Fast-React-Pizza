import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    // Working with Color
    // Styling Text
    // The Box Model: Spacing, Borders, and Display
    // Responsive Design
    <header className=" flex items-center justify-between border-b border-stone-500 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      {/* Arbitrary values */}
      <Link to="/" className="tracking-[.2rem]">
        Fast React Pizza Co.
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
