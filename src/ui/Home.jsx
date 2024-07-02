import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    // Responsive Design
    <div className="my-10 px-4 text-center sm:my-16">
      {/* Setting Up Tailwind CSS */}
      {/* The Box Model: Spacing, Borders, and Display */}
      <h1 className="mb-8 text-center text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {/* Reading and Updating the User State */}
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Go to menu, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
