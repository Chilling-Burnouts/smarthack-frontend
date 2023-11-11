import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  placeholder: string;
}
export const Input: React.FC<InputProps> = ({
  id,
  type,
  placeholder,
  ...props
}) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border border-gray-300 rounded-md p-2"
      {...props}
    />
  );
};
