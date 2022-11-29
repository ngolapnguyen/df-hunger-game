import Image from "next/image";
import { useGameContext } from "../contexts/game";
import useCountdown from "../hooks/useCountdown";

const RoundCountdown = () => {
  const { gameState } = useGameContext();
  const { seconds } = useCountdown(new Date(gameState!.round_expire_at));

  return <>{seconds}s</>;
};

export const LeftCorner = () => {
  const { gameState, currentPlayer, isLoadingGameState } = useGameContext();

  return (
    <div className="left-corner">
      {currentPlayer && (
        <div className="points">Points: {currentPlayer?.points || 0}</div>
      )}
      <div className="items">
        <span>
          <span className="item point-2" />: 2
        </span>
        <span>
          <span className="item point-4" />: 4
        </span>
        <span>
          <span className="item point-8" />: 8
        </span>
        <span>
          <span className="item point-16" />: 16
        </span>
      </div>
      <div>Game ID: {gameState?.id}</div>
      <div>Game Status: {gameState?.status}</div>
      <div className="rounds">
        <span>
          Next round in: {gameState?.round_expire_at ? <RoundCountdown /> : "-"}
        </span>
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
