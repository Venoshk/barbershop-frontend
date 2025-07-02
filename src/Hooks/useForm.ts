import { useState, type ChangeEvent } from 'react';

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  // A função para inputs de texto padrão (não muda)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const setFieldValue = (field: keyof T, value: string) => {
    setValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return {
    values,
    handleChange,
    setFieldValue, 
    setValues 
  };
}