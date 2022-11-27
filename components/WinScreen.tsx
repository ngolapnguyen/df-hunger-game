import Lottie from "lottie-react";
import winAnimation from "../assets/lottie/win.json";

export const WinScreen = () => {
  return (
    <div className="win-screen">
      <Lottie animationData={winAnimation} loop={false} />
    </div>
  );
};
