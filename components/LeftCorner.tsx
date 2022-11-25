import Image from "next/image";
import { useGameContext } from "../contexts/game";

export const LeftCorner = () => {
  const { currentPlayer, isLoadingGameState } = useGameContext();

  return (
    <div className="left-corner">
      <div className="points">Points: {currentPlayer?.points || 0}</div>
      <div className="rounds">
        <span>Next round in: 30s</span>
        {isLoadingGameState && (
          <Image
            src="/assets/images/spinner.svg"
            className="loader"
            width={48}
            height={48}
            alt=""
          />
        )}
      </div>
    </div>
  );
};
