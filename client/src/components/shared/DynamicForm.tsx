import React, { useState } from "react";
import Input from "./Input";

interface Field {
  name: string;
  label?: string;
  placeholder: string;
  type: string;
}

interface FormProps<T> {
  fields: Field[];
  buttonText: string;
  onSubmit: (formData: T) => void;
}
const DynamicForm = <T extends object>(props: FormProps<T>) => {
  const { onSubmit, buttonText, fields } = props;
  const [formData, setFormData] = useState<Partial<T>>({});

  const handleInputChange = (name: keyof T, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData as T); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
      {fields.map(({ name, label, placeholder, type }) => (
        <div key={name} className="flex flex-col w-full gap-1">
          <Input
            type={type}
            value={(formData[name as keyof T] as string) || ""}
            onChange={(e) => handleInputChange(name as keyof T, e.target.value)}
            placeholder={placeholder}
            label={label}
            name={name}
          />
        </div>
      ))}
      <button
        type="submit"
        className=" bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400
                 hover:bg-pink-600 text-white w-full px-4 py-2 rounded-md transition-all shadow-lg hover:shadow-xl"
      >
        {buttonText}
      </button>
    </form>
  );
};


export default DynamicForm;
