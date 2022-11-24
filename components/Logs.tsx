import { useState } from "react";

export const Logs = () => {
  const [isLogsExpanded, setIsLogsExpanded] = useState(false);

  return (
    <div className={["logs", isLogsExpanded ? "expanded" : ""].join(" ")}>
      <div className="header">Logs</div>
      <div className="content">
        <div className="log-item">
          You moved to (2, 2).{" "}
          <span className="success">
            You reached the goal! Congratulations!
          </span>
        </div>
        <div className="log-item">You moved to (1, 1).</div>
        <div className="log-item">
          You moved to (2, 2).{" "}
          <span className="success">You got 4 points!</span>
        </div>
        <div className="log-item">
          You moved to (3, 3). <span className="danger">You hit a bomb!</span>
        </div>
      </div>
      <button
        type="button"
        className="expand-button"
        onClick={() => setIsLogsExpanded((o) => !o)}
      >
        {!isLogsExpanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 8l6 6H6z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 16l-6-6h12z" />
          </svg>
        )}
      </button>
    </div>
  );
};
