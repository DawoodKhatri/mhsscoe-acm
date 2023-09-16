"use client";
import { BounceLoader } from "react-spinners";
import { useSelector } from "react-redux";

const LoadingProvider = ({ children }) => {
  const { isLoading } = useSelector((state) => state.common);

  return (
    <div className="app_loader_bg">
      {isLoading && (
        <div className="app_loader">
          <BounceLoader color="#8a2be2" />
        </div>
      )}
      {children}
    </div>
  );
};

export default LoadingProvider;
