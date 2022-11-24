import Lottie from "lottie-react";
import arrowAnimation from "../assets/lottie/arrow.json";
import explosionAnimation from "../assets/lottie/explosion.json";

export const Map = () => {
  return (
    <>
      <div className="island">
        {new Array(16).fill(0).map((_, rowIndex) => (
          <div className="row" key={rowIndex}>
            {new Array(16).fill(0).map((_, colIndex) => {
              return <div className="col" key={colIndex} />;
            })}
          </div>
        ))}
      </div>
      <div className="playground">
        <div className="grid">
          {new Array(12).fill(0).map((_, rowIndex) => (
            <div className="row" key={rowIndex}>
              {new Array(12).fill(0).map((_, colIndex) => {
                return (
                  <div
                    className={[
                      "col",
                      rowIndex === 0 && colIndex === 1 ? "next" : "",
                    ].join(" ")}
                    key={colIndex}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="bomb">
          <Lottie animationData={explosionAnimation} />
        </div>
        <div className="players">
          {[
            {
              x: 0,
              y: 0,
            },
            {
              x: 11,
              y: 0,
            },
            {
              x: 0,
              y: 11,
            },
            {
              x: 11,
              y: 11,
            },
          ].map((player, index) => (
            <div
              className={[
                "player",
                index === 1 ? "hit" : "idle",
                index % 2 === 1 ? "face-left" : "",
              ].join(" ")}
              key={index}
              style={{
                left: player.x * 48,
                top: player.y * 48,
              }}
            >
              <div className="nametag">Player {index}</div>
            </div>
          ))}
        </div>
        <div className="arrow">
          <Lottie animationData={arrowAnimation} />
        </div>
      </div>
    </>
  );
};
