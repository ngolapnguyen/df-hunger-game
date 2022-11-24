import { Logs } from "../components/Logs";
import { Map } from "../components/Map";
import { MovementControls } from "../components/MovementControls";
import { Points } from "../components/Points";
import { Rounds } from "../components/Rounds";
import { StartScreen } from "../components/StartScreen";

export default function Home() {
  return (
    <div className="game-container">
      <Map />
      <MovementControls />
      <Logs />
      <Points />
      <Rounds />
      <StartScreen />
    </div>
  );
}
