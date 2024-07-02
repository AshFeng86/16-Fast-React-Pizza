import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
import { useState } from "react";

function UpdateOrder() {
  // Updating Data without Navigation
  // Purpose: users should be able to mark "priority" order
  // even after it has been placed
  const fetcher = useFetcher();

  return (
    // <fetcher.Form>: Component!! will NOT navigate the page away
    // <Form action="path"> in CreateOrder.jsx will navigate the page away
    // method="PATCH": apply partial modifications to a resource
    // method="POST": send data to the server to create/update source
    // method="GET": retrieve data from the server
    // method="PUT": update a resource entirely or create it if it doesn't exist
    // method="DELETE": delete a source
    <fetcher.Form method="PATCH" className="flex justify-end">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

// action: React Router
// action function handles the form submission on the server side
// When the form is submitted, this function is invoked to
// to process the request
export async function action({ request, params }) {
  // Set priorit to true if customer click "Make Priority"
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
