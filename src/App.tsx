import { useEffect } from "react";
import { useForm, useWatch, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Headers from "./Header";
import Table from "./Table";
import "./styles.css";
import Input from "./Input";

type FormValues = {
  cart: {
    name: string;
    amount: number;
    qt: {
      a: number | null;
      b: number | null;
    };
    total: number;
  }[];
};

let renderCount = 0;

export default function App() {
  const schema = Yup.object().shape({
    email: Yup.string().required(),
    cart: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("name is required."),
        amount: Yup.number().required("amount is required."),
        qt: Yup.object().shape(
          {
            a: Yup.number()
              .transform((val: string) =>
                !isNaN(Number(val)) ? Number(val) : null,
              )
              .when(["b"], {
                is: (b: number) => !b,
                then: (schema) =>
                  schema.typeError("Required").min(1, "A is Required"),
                otherwise: (schema) => schema.nullable(),
              }),
            b: Yup.number()
              .transform((val: string) =>
                !isNaN(Number(val)) ? Number(val) : null,
              )
              .when(["a"], {
                is: (a: number) => !a,
                then: (schema) =>
                  schema.typeError("Required").min(1, "Required"),
                otherwise: (schema) => schema.nullable(),
              }),
          },
          [["a", "b"]],
        ),
      }),
    ),
  });

  const methods = useForm<FormValues>({
    mode: "onSubmit",
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      console.log(
        "validation result",
        await yupResolver(schema)(data, context, options),
      );
      return yupResolver(schema)(data, context, options);
    },
    defaultValues: {
      cart: [{ name: "", amount: 0, qt: { a: null, b: null }, total: 0 }],
    },
  });
  renderCount++;

  useWatch({ name: "cart", control: methods.control });

  return (
    <div>
      <Headers
        renderCount={renderCount}
        description="Performant, flexible and extensible forms with easy-to-use validation."
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            console.log("Submit data", data);
          })}
        >
          <label>
            <span>Email</span>
            <Input type="text" name={`email`} />
          </label>

          <Table />

          <p>{methods.formState.errors.cart?.root?.message}</p>

          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
}
