export type TimerStatus = 'idle' | 'running' | 'paused';
export type TimerMode = 'work' | 'break';

export interface TimerEngineCallbacks {
  onTick?: (remaining: number) => void;
  onComplete?: (mode: TimerMode) => void;
}

export interface TimerEngine {
  start(): void;
  pause(): void;
  reset(): void;
  switchMode(mode: TimerMode): void;
  setWorkDuration(seconds: number): void;
  setBreakDuration(seconds: number): void;
  getState(): { mode: TimerMode; status: TimerStatus; remaining: number };
  destroy(): void;
}

export function createTimerEngine(
  workDuration: number,
  breakDuration: number,
  callbacks: TimerEngineCallbacks
): TimerEngine {
  let mode: TimerMode = 'work';
  let status: TimerStatus = 'idle';
  let duration = workDuration;
  let remaining = duration;

  let baseTimestamp = 0;
  let elapsedBeforePause = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let lastDisplaySecond = remaining;

  function getDisplaySecond(): number {
    if (status === 'idle') return duration;
    if (status === 'paused') return Math.max(0, Math.ceil(remaining));
    const elapsed = Date.now() - baseTimestamp + elapsedBeforePause;
    const left = duration * 1000 - elapsed;
    return Math.max(0, Math.ceil(left / 1000));
  }

  function tickLoop() {
    const display = getDisplaySecond();

    if (display <= 0) {
      stopLoop();
      status = 'idle';
      remaining = 0;
      lastDisplaySecond = 0;
      callbacks.onTick?.(0);
      callbacks.onComplete?.(mode);
      return;
    }

    if (display !== lastDisplaySecond) {
      lastDisplaySecond = display;
      callbacks.onTick?.(display);
    }
  }

  function stopLoop() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function doReset() {
    stopLoop();
    status = 'idle';
    remaining = duration;
    elapsedBeforePause = 0;
    baseTimestamp = 0;
    lastDisplaySecond = duration;
    callbacks.onTick?.(duration);
  }

  return {
    start() {
      if (status === 'running') return;

      if (status === 'paused') {
        elapsedBeforePause += Date.now() - baseTimestamp;
        baseTimestamp = Date.now();
        status = 'running';
      } else {
        baseTimestamp = Date.now();
        elapsedBeforePause = 0;
        status = 'running';
      }

      lastDisplaySecond = getDisplaySecond();
      intervalId = setInterval(tickLoop, 200);
      callbacks.onTick?.(lastDisplaySecond);
    },

    pause() {
      if (status !== 'running') return;
      stopLoop();
      elapsedBeforePause += Date.now() - baseTimestamp;
      remaining = getDisplaySecond();
      status = 'paused';
      callbacks.onTick?.(remaining);
    },

    reset() {
      doReset();
    },

    switchMode(newMode: TimerMode) {
      if (status === 'running') return;
      mode = newMode;
      duration = newMode === 'work' ? workDuration : breakDuration;
      doReset();
    },

    setWorkDuration(seconds: number) {
      workDuration = seconds;
      if (mode === 'work') {
        if (status === 'idle') {
          duration = seconds;
          doReset();
        } else if (status === 'paused') {
          duration = seconds;
          remaining = Math.max(0, Math.ceil((duration * 1000 - elapsedBeforePause) / 1000));
          lastDisplaySecond = remaining;
          callbacks.onTick?.(remaining);
        }
      }
    },

    setBreakDuration(seconds: number) {
      breakDuration = seconds;
      if (mode === 'break') {
        if (status === 'idle') {
          duration = seconds;
          doReset();
        } else if (status === 'paused') {
          duration = seconds;
          remaining = Math.max(0, Math.ceil((duration * 1000 - elapsedBeforePause) / 1000));
          lastDisplaySecond = remaining;
          callbacks.onTick?.(remaining);
        }
      }
    },

    getState() {
      return { mode, status, remaining: getDisplaySecond() };
    },

    destroy() {
      stopLoop();
    },
  };
}
