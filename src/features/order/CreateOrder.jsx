/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];
function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData();

  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={actionData?.values?.customer || ""}
            required
          />
          {actionData?.errors?.customer && <p>{actionData.errors.customer}</p>}
        </div>

        <div>
          <label>Phone number</label>
          <input type="tel" name="phone" defaultValue={actionData?.values?.phone || ""} required />
          {actionData?.errors?.phone && <p>{actionData.errors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            defaultValue={actionData?.values?.address || ""}
            required
          />
          {actionData?.errors?.address && <p>{actionData.errors.address}</p>}
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            defaultChecked={actionData?.values?.priority === "on"}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <button disabled={isSubmitting}>{isSubmitting ? "Placing order..." : "Order now"}</button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};

  if (!data.customer || data.customer.trim().length < 3) {
    errors.customer = "Please enter a valid name 👱‍♂️";
  }

  if (!isValidPhone(data.phone)) {
    errors.phone = "Enter correct number 📱";
  }

  if (!data.address || data.address.trim().length < 4) {
    errors.address = "Write your full address for delivery";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: data };
  }

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
