export type PhaseMode = 'work' | 'break';

export interface PhaseManager {
  getCurrentMode(): PhaseMode;
  getDuration(): number;
  getCompletedCount(): number;
  advance(): void;
  setMode(mode: PhaseMode): void;
  setWorkDuration(seconds: number): void;
  setBreakDuration(seconds: number): void;
  getWorkDuration(): number;
  getBreakDuration(): number;
  reset(): void;
}

export function createPhaseManager(
  initialWorkDuration: number,
  initialBreakDuration: number,
): PhaseManager {
  let currentMode: PhaseMode = 'work';
  let completedCount = 0;
  let workDuration = initialWorkDuration;
  let breakDuration = initialBreakDuration;

  return {
    getCurrentMode: () => currentMode,
    getDuration: () => (currentMode === 'work' ? workDuration : breakDuration),
    getCompletedCount: () => completedCount,

    advance() {
      if (currentMode === 'work') {
        completedCount++;
        currentMode = 'break';
      } else {
        currentMode = 'work';
      }
    },

    setMode(mode: PhaseMode) {
      currentMode = mode;
    },

    setWorkDuration(seconds: number) {
      workDuration = seconds;
    },

    setBreakDuration(seconds: number) {
      breakDuration = seconds;
    },

    getWorkDuration: () => workDuration,
    getBreakDuration: () => breakDuration,

    reset() {
      currentMode = 'work';
      completedCount = 0;
    },
  };
}
