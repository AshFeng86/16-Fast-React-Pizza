import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  // Displaying a Loading Indicator
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* Displaying a Loading Indicator */}
      {isLoading ? <Loader /> : null}

      <Header />
      <div className="overflow-scroll">
        {/* Using CSS Grid */}
        <main className="mx-auto max-w-3xl">
          {/* Child Routes */}
          {/* Similar to child component in JSX */}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
