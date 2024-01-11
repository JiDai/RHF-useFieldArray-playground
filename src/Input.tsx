import React from "react";
import { useController, useFormContext } from "react-hook-form";

export default function Input({
  type = "text",
  name,
}: {
  name: string;
  type?: string;
}) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  return (
    <input
      type={type}
      id={field.name}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
    />
  );
}
