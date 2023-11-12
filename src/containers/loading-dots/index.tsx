import { useState, useEffect } from "react";

export const LoadingDots = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots.length < 3 ? dots + "." : "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <p className="text-center">Generating an answer{dots}</p>;
};
