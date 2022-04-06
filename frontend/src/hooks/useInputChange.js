import { useState } from "react";

export default function useInputChange(initialValue) {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return [
    value,
    handleChange,
  ]
}
