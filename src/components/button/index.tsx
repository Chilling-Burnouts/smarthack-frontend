import React, { ButtonHTMLAttributes } from "react";

import classNames from "classnames";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="submit"
      className={classNames(
        "bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
