import { useEffect, useRef, useState } from "react";

export type UseCountdownResult = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  done: boolean;
  percentage: number;
  remainderInSeconds: number;
};

type UseCountdownParams = number | Date;

function getDiff(input: UseCountdownParams) {
  const now = Date.now();
  let when: number;
  if (typeof input === "number") {
    when = input + now;
  } else {
    when = input.getTime();
  }
  const difference = when - now;
  return difference;
}

export default function useCountdown(
  input: UseCountdownParams
): UseCountdownResult {
  const initialDiff = getDiff(input);
  const [diff, setDiff] = useState(initialDiff);
  const initialDiffRef = useRef<number>(initialDiff);
  const intervalRef = useRef<number>();

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setDiff((d) => Math.max(Math.min(d - 1000, d), 0));
    }, 1000);
    return () => window.clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (diff <= 0) {
      window.clearInterval(intervalRef.current);
    } else {
      window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        setDiff((d) => Math.max(Math.min(d - 1000, d), 0));
      }, 1000);
    }
    return () => window.clearInterval(intervalRef.current);
  }, [diff]);

  useEffect(() => {
    setDiff(getDiff(input));
  }, [input]);

  const result = {
    seconds: diff > 0 ? Math.floor((diff % (1000 * 60)) / 1000) : 0,
    minutes: diff > 0 ? Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)) : 0,
    hours:
      diff > 0
        ? Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        : 0,
    days: diff > 0 ? Math.floor(diff / (1000 * 60 * 60 * 24)) : 0,
    done: diff <= 0,
    percentage: diff > 0 ? 1 - diff / initialDiffRef.current : 1,
    remainderInSeconds: Math.floor(initialDiff / 1000),
  };

  return result;
}
