import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import Input from "./Input";

export default function Table({}) {
  const { control, watch } = useFormContext();
  const { fields, append, prepend, remove } = useFieldArray({
    name: "cart",
    control,
    rules: {
      required: "Please append at least 1 item",
    },
  });

  const watchCart = watch("cart");
  return (
    <>
      {fields.map((field, index) => {
        const total =
          (watchCart[index].qt.a + watchCart[index].qt.b) *
          watchCart[index].amount;
        return (
          <section key={field.id}>
            <label>
              <span>Name</span>
              <Input type="text" name={`cart.${index}.name`} />
            </label>
            <label>
              <span>amount</span>
              <Input type="number" name={`cart.${index}.amount`} />
            </label>
            <label>
              <span>qta</span>
              <Input type="number" name={`cart.${index}.qt.a`} />
            </label>
            <label>
              <span>qtb</span>
              <Input type="number" name={`cart.${index}.qt.b`} />
            </label>
            <label>
              <span>total</span>
              <span>{isNaN(total) ? 0 : total}</span>
            </label>

            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </section>
        );
      })}
      <button
        type="button"
        onClick={() => {
          append({
            name: "append",
            amount: 0,
            qt: 1,
            total: 0,
          });
        }}
      >
        Append
      </button>
      <button
        type="button"
        onClick={() => {
          prepend({
            name: "prepend",
            amount: 0,
            qt: 1,
            total: 0,
          });
        }}
      >
        prepend
      </button>
    </>
  );
}
