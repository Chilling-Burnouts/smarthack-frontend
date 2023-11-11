import classNames from "classnames";

export interface ILoaderProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Loader: React.FC<ILoaderProps> = (props) => {
  return (
    <div
      style={{
        animation: "spin 1s linear infinite",
        borderTopColor: "#3498db",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",

        ...props.style,
      }}
      className={classNames(
        `h-32 w-32 animate-spin rounded-full border-8 border-t-8 border-gray-200 ease-linear`,
        props.className
      )}
    />
  );
};
