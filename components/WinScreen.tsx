import Lottie from "lottie-react";
import winAnimation from "../assets/lottie/win.json";

export const WinScreen = () => {
  return (
    <div className="fixed z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <Lottie animationData={winAnimation} loop={false} />
    </div>
  );
};
