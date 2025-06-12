import React from "react";
import { Form, Input, Button } from "./SearchForm.styles";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder,
}: SearchFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
      <Button type="submit">Buscar</Button>
    </Form>
  );
};

export default SearchForm;
