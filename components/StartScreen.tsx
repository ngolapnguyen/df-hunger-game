import { FormEvent, useRef } from "react";

export const StartScreen = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputRef.current?.value);
  };

  return (
    <form className="start-screen" onSubmit={onSubmit}>
      <input
        type="number"
        name="gameId"
        placeholder="Enter game ID"
        ref={inputRef}
      />
      <button type="submit" className="play-button" />
    </form>
  );
};
