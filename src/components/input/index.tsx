import classNames from "classnames";
import React, { Fragment, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input: React.FC<InputProps> = ({ error, className, ...rest }) => {
  const { register } = useFormContext();

  return (
    <Fragment>
      <input
        {...rest}
        className={classNames(
          `shadow-sm focus:ring-primary focus:border-primary block sm:text-sm border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md p-2`,
          className
        )}
        {...register(rest.id as string)}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </Fragment>
  );
};
