import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const navigate = useNavigate();
  // Handling Errors with Error Element
  const error = useRouteError();
  // console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {/* Handling Errors with Error Element */}
      <p>{error.data || error.message}</p>

      {/* Reusing Styles with React Components */}
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
