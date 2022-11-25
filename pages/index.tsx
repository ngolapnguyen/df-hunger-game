import { Logs } from "../components/Logs";
import { Map } from "../components/Map";
import { MovementControls } from "../components/MovementControls";
import { LeftCorner } from "../components/LeftCorner";
import { RightCorner } from "../components/RightCorner";
import { StartScreen } from "../components/StartScreen";

export default function Home() {
  return (
    <div className="game-container">
      <Map />
      <MovementControls />
      <Logs />
      <LeftCorner />
      <RightCorner />
      <StartScreen />
    </div>
  );
}
