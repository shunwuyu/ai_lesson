const SETTINGS_KEY = 'pomodoro-settings';
const RECORDS_KEY = 'pomodoro-records';

export interface Settings {
  workDuration: number;
  breakDuration: number;
}

export interface DailyRecord {
  date: string;
  completedCount: number;
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Settings>;
      return {
        workDuration:
          typeof parsed.workDuration === 'number' && parsed.workDuration > 0
            ? parsed.workDuration
            : 25 * 60,
        breakDuration:
          typeof parsed.breakDuration === 'number' && parsed.breakDuration > 0
            ? parsed.breakDuration
            : 5 * 60,
      };
    }
  } catch {
    // corrupted data, use defaults
  }
  return { workDuration: 25 * 60, breakDuration: 5 * 60 };
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadTodayRecord(): DailyRecord {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const raw = localStorage.getItem(RECORDS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<DailyRecord>;
      if (parsed.date === today && typeof parsed.completedCount === 'number') {
        return { date: today, completedCount: parsed.completedCount };
      }
    }
  } catch {
    // corrupted data
  }
  return { date: today, completedCount: 0 };
}

export function saveTodayRecord(count: number): void {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem(
    RECORDS_KEY,
    JSON.stringify({ date: today, completedCount: count }),
  );
}

export function clearRecords(): void {
  localStorage.removeItem(RECORDS_KEY);
}
