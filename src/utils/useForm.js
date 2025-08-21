import { useState } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  // Generic change handler for inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Reset the form (optional, handy for modals)
  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, setValues, resetForm };
}
