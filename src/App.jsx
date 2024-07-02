import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import AppLayout from "./ui/AppLayout";

// A New Way of Implementing Routes
const router = createBrowserRouter([
  {
    // No path: make the route a layout route
    element: <AppLayout />,
    // Handling Errors with Error Elements
    errorElement: <Error />,

    children: [
      { path: "/", element: <Home /> },
      // Fetching Data with React Router "Loaders": Pizza Menu
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      // Writing Data with React Router "Actions"
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      // Fetching Orders
      {
        // Updating Data with Navigation
        // Even though the action is not from Order, but
        // a child component of Order, but it's fine.
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
