export const Loader: React.FC = () => {
  return (
    <div
      style={{
        animation: "spin 1s linear infinite",
        borderTopColor: "#3498db",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",
      }}
      className="loader mb-4 h-32 w-32 animate-spin rounded-full border-8 border-t-8 border-gray-200 ease-linear"
    ></div>
  );
};
