export interface PomodoroTimerActions {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSwitchMode: (mode: 'work' | 'break') => void;
}

export interface PomodoroTimer {
  updateTime(seconds: number): void;
  updatePhase(mode: 'work' | 'break'): void;
  setStartEnabled(enabled: boolean): void;
  setPauseEnabled(enabled: boolean): void;
  setStartButtonText(text: string): void;
  setModeToggleActive(mode: 'work' | 'break'): void;
}

export function createPomodoroTimer(
  container: HTMLElement,
  initialMode: 'work' | 'break',
  actions: PomodoroTimerActions,
): PomodoroTimer {
  container.innerHTML = `
    <div id="phase-label">${initialMode === 'work' ? '专 注' : '休 息'}</div>
    <div id="timer-display">25:00</div>
    <div id="controls">
      <button id="start-btn">开始</button>
      <button id="pause-btn" disabled>暂停</button>
      <button id="reset-btn">重置</button>
    </div>
    <div id="mode-toggle">
      <button class="mode-btn ${initialMode === 'work' ? 'active' : ''}" data-mode="work">专注</button>
      <button class="mode-btn ${initialMode === 'break' ? 'active' : ''}" data-mode="break">休息</button>
    </div>
  `;

  container.className = initialMode === 'work' ? 'mode-work' : 'mode-break';

  const phaseLabel = container.querySelector('#phase-label') as HTMLElement;
  const timerDisplay = container.querySelector('#timer-display') as HTMLElement;
  const startBtn = container.querySelector('#start-btn') as HTMLButtonElement;
  const pauseBtn = container.querySelector('#pause-btn') as HTMLButtonElement;
  const resetBtn = container.querySelector('#reset-btn') as HTMLButtonElement;
  const modeBtns = container.querySelectorAll('.mode-btn') as NodeListOf<HTMLButtonElement>;

  startBtn.addEventListener('click', () => actions.onStart());
  pauseBtn.addEventListener('click', () => actions.onPause());
  resetBtn.addEventListener('click', () => actions.onReset());

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode as 'work' | 'break';
      actions.onSwitchMode(mode);
    });
  });

  return {
    updateTime(seconds: number) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      timerDisplay.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    },

    updatePhase(mode: 'work' | 'break') {
      phaseLabel.textContent = mode === 'work' ? '专 注' : '休 息';
      container.className = mode === 'work' ? 'mode-work' : 'mode-break';
    },

    setStartEnabled(enabled: boolean) {
      startBtn.disabled = !enabled;
    },

    setPauseEnabled(enabled: boolean) {
      pauseBtn.disabled = !enabled;
    },

    setStartButtonText(text: string) {
      startBtn.textContent = text;
    },

    setModeToggleActive(mode: 'work' | 'break') {
      modeBtns.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
      });
    },
  };
}
