import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // Fetching Data with React Router "Loaders": Pizza Menu
  // Instead of using useEffect, the react router's loader and useLoaderData()
  // will start fetching the data at the same time as it starts rendering the
  // correct route, which is better useEffect, which render component first,
  // then after the component rendered, it starts fetching the data
  const menu = useLoaderData();
  // console.log(menu);
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// Fetching Data with React Router "Loaders": Pizza Menu

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
