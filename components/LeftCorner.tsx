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

  const items = [
    {
      src: "/assets/spritesheets/items/crimson-shard.png",
      point: 2,
    },
    {
      src: "/assets/spritesheets/items/moon-stone.png",
      point: 4,
    },
    {
      src: "/assets/spritesheets/items/star.png",
      point: 6,
    },
    {
      src: "/assets/spritesheets/items/asteroid.png",
      point: 8,
    },
  ];

  return (
    <div className="absolute top-2 left-2 md:top-4 md:left-4 text-md md:text-xl text-white flex flex-col items-start gap-y-2 md:gap-y-4">
      <div className="flex gap-2 md:gap-4">
        {items.map(({ src, point }, idx) => (
          <div className="flex gap-2 items-center" key={idx}>
            <div className="w-4 h-4 md:w-6 md:h-6">
              <Image src={src} alt="Item" fill className="object-contain" />
            </div>
            {point}
          </div>
        ))}
      </div>

      <table>
        <tbody>
          <tr>
            <td>ID</td>
            <td className="flex items-center">
              <span className="font-bold">{gameState?.id}</span>
              <button onClick={onCopy} className="ml-2">
                {hasCopied ? (
                  <Icon icon="icon-park-outline:success" />
                ) : (
                  <Icon icon="icon-park-outline:copy" />
                )}
              </button>
            </td>
          </tr>

          <tr>
            <td>Status</td>
            <td>{renderStatus(gameState?.status)}</td>
          </tr>

          <tr className="whitespace-pre">
            <td>Next round in </td>
            <td className="flex items-center">
              {gameState?.round_expire_at ? <RoundCountdown /> : "-"}
              {isLoadingGameState && (
                <Image
                  src="/assets/images/spinner.svg"
                  className="w-5 h-5 ml-1"
                  width={48}
                  height={48}
                  alt=""
                />
              )}
            </td>
          </tr>

          {currentPlayer && (
            <tr>
              <td>Points</td>
              <td>{currentPlayer?.points || 0}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
