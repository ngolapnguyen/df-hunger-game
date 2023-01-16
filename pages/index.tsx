import { Logs } from "../components/Logs";
import { Map } from "../components/Map";
import { MovementControls } from "../components/MovementControls";
import { LeftCorner } from "../components/LeftCorner";
import { RightCorner } from "../components/RightCorner";
import { StartScreen } from "../components/StartScreen";
import { useGameContext } from "../contexts/game";

export default function Home() {
  const { gameId } = useGameContext();

  return (
    <div className="game-container">
      {gameId ? (
        <>
          <Map />
          <MovementControls />
          <Logs />
          <LeftCorner />
          <RightCorner />
        </>
      ) : (
        <StartScreen />
      )}
    </div>
  );
}
