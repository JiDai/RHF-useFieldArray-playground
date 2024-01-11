import {
  Control,
  useFieldArray,
  useForm,
  useWatch,
  FormProvider,
} from "react-hook-form";
import Headers from "./Header";
import Table from "./Table";
import "./styles.css";

type FormValues = {
  cart: {
    name: string;
    amount: number;
    qt: number;
    total: number;
  }[];
};

let renderCount = 0;

function getTotal(payload: FormValues["cart"]) {
  let total = 0;

  for (const item of payload) {
    total = total + (Number.isNaN(item.amount) ? 0 : item.amount);
  }

  return total;
}

function TotalAmout({ control }: { control: Control<FormValues> }) {
  const cartValues = useWatch({
    control,
    name: "cart",
  });

  return <p>{getTotal(cartValues)}</p>;
}

export default function App() {
  const methods = useForm<FormValues>({
    defaultValues: {
      cart: [{ name: "", amount: 0, qt: 1, total: 0 }],
    },
  });
  renderCount++;

  // const watchCart = watch("cart");

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
          <Table />
          <TotalAmout control={methods.control} />

          <p>{methods.formState.errors.cart?.root?.message}</p>
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
}
