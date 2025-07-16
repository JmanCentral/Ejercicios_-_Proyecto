// hooks/useFormFields.ts
import { useState } from "react";

export function useFormFields<T>(initialValues: T) {
  const [fields, setFields] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  return { fields, handleChange };
}
