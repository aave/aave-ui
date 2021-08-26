import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const FORK_SKIP_AHEAD = localStorage.getItem('forkTimeAhead');

function getCurrentTimestamp(): number {
  const offset = FORK_SKIP_AHEAD ? Number(FORK_SKIP_AHEAD) : 0;
  return dayjs().unix() + offset;
}

export function useCurrentTimestamp(updateInterval = 15): number {
  const [timestamp, setTimestamp] = useState(getCurrentTimestamp());

  useEffect(() => {
    const intervalHandlerID = setInterval(
      () => setTimestamp(getCurrentTimestamp()),
      1000 * updateInterval
    );
    return () => clearInterval(intervalHandlerID);
  }, [updateInterval]);

  return timestamp;
}
