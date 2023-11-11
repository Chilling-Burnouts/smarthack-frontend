export const PageLoader: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-30">
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
    </div>
  );
};
