import { ChangeEventHandler } from "react";

export interface InputProps {
  name: string;
  type?: string;
  label?: string;
  value: string;
  placeholder: string;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = (props: InputProps) => {
  const { value, onChange, placeholder, className, type, label, name } = props;
  return (
    <>
      {label && <label className="text-base text-gray-900">{label}</label>}
      <input
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 ${className}`}
      />
    </>
  );
};

export default Input;
