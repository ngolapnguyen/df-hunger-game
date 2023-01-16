import Image from "next/image";
import { useClipboard } from "@dwarvesf/react-hooks";
import { Icon } from "@iconify/react";
import { useGameContext } from "../contexts/game";
import useCountdown from "../hooks/useCountdown";
import { GameStatus } from "../types/game";

const RoundCountdown = () => {
  const { gameState } = useGameContext();
  const { seconds } = useCountdown(new Date(gameState!.round_expire_at));

  return (
    <>
      {seconds}
      <small>s</small>
    </>
  );
};

export const LeftCorner = () => {
  const { gameState, currentPlayer, isLoadingGameState } = useGameContext();
  const { hasCopied, onCopy } = useClipboard(gameState?.id || "");

  const renderStatus = (status?: string) => {
    let statusClassName = "";
    switch (status) {
      case GameStatus.NEW:
        statusClassName = "text-yellow-300";
        break;
      case GameStatus.PLAYING:
        statusClassName = "text-green-500";
        break;
      case GameStatus.COMPLETED:
        statusClassName = "text-red-500";
        break;
      default:
        break;
    }

    return (
      <div className={`first-letter:uppercase font-medium ${statusClassName}`}>
        {status || "-"}
      </div>
    );
  };

  return (
    <div className="absolute top-4 left-4 text-xl text-white flx flex-col items-start">
      <div className="rounds flex items-center">
        <span>
          Next round in: {gameState?.round_expire_at ? <RoundCountdown /> : "-"}
        </span>
        {isLoadingGameState && (
          <Image
            src="/assets/images/spinner.svg"
            className="w-5 h-5 ml-1"
            width={48}
            height={48}
            alt=""
          />
        )}
      </div>
      {currentPlayer && <div>Points: {currentPlayer?.points || 0}</div>}
      <div className="items">
        <span>
          <span className="item point-2" />: 2
        </span>
        <span>
          <span className="item point-4" />: 4
        </span>
        <span>
          <span className="item point-8" />: 6
        </span>
        <span>
          <span className="item point-16" />: 8
        </span>
      </div>

      <div className="flex whitespace-pre">
        Game Status: {renderStatus(gameState?.status)}
      </div>
      <div className="flex items-center whitespace-pre">
        Game ID: <span className="font-semibold">{gameState?.id}</span>
        <button onClick={onCopy} className="ml-2">
          {hasCopied ? (
            <Icon icon="icon-park-outline:success" />
          ) : (
            <Icon icon="icon-park-outline:copy" />
          )}
        </button>
      </div>
    </div>
  );
};
