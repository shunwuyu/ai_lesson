import { createTimerEngine } from './timer-engine';
import { createPhaseManager } from './phase-manager';
import { loadSettings, saveSettings, loadTodayRecord, saveTodayRecord } from './storage';
import { createPomodoroTimer } from './components/pomodoro-timer';
import { createSettingsPanel } from './components/settings-panel';
import { createNotification } from './components/notification';

export function initApp(root: HTMLElement): void {
  const settings = loadSettings();
  let todayRecord = loadTodayRecord();

  const phaseManager = createPhaseManager(settings.workDuration, settings.breakDuration);
  const notification = createNotification(root);

  root.innerHTML = `
    <div class="container">
      <header><h1 class="title">🍅 番茄钟</h1></header>
      <main id="timer-section"></main>
      <section id="progress-section">
        <p id="progress-text">今日已完成 <strong>${todayRecord.completedCount}</strong> 个番茄</p>
      </section>
      <section id="settings-section"></section>
    </div>
  `;

  const timerSection = root.querySelector('#timer-section') as HTMLElement;
  const progressText = root.querySelector('#progress-text') as HTMLElement;
  const settingsSection = root.querySelector('#settings-section') as HTMLElement;

  const timer = createTimerEngine(
    phaseManager.getDuration(),
    phaseManager.getDuration(),
    {
      onTick(remaining: number) {
        timerUI.updateTime(remaining);
      },

      onComplete(mode: 'work' | 'break') {
        notification.show(mode);
        phaseManager.advance();

        todayRecord = {
          date: new Date().toISOString().slice(0, 10),
          completedCount: phaseManager.getCompletedCount(),
        };
        saveTodayRecord(todayRecord.completedCount);
        progressText.innerHTML = `今日已完成 <strong>${todayRecord.completedCount}</strong> 个番茄`;

        timer.switchMode(phaseManager.getCurrentMode());
        timerUI.updatePhase(phaseManager.getCurrentMode());
        timerUI.setModeToggleActive(phaseManager.getCurrentMode());
        timerUI.setStartEnabled(true);
        timerUI.setPauseEnabled(false);
        timerUI.setStartButtonText('开始');
      },
    },
  );

  const timerUI = createPomodoroTimer(timerSection, phaseManager.getCurrentMode(), {
    onStart() {
      timer.start();
      timerUI.setStartEnabled(false);
      timerUI.setPauseEnabled(true);
      timerUI.setStartButtonText('暂停');
    },

    onPause() {
      timer.pause();
      timerUI.setStartEnabled(true);
      timerUI.setPauseEnabled(false);
      timerUI.setStartButtonText('继续');
    },

    onReset() {
      timer.reset();
      timerUI.setStartEnabled(true);
      timerUI.setPauseEnabled(false);
      timerUI.setStartButtonText('开始');
    },

    onSwitchMode(mode: 'work' | 'break') {
      if (timer.getState().status === 'running') return;
      phaseManager.setMode(mode);
      timer.switchMode(mode);
      timerUI.updatePhase(mode);
      timerUI.setModeToggleActive(mode);
      timerUI.setStartEnabled(true);
      timerUI.setPauseEnabled(false);
      timerUI.setStartButtonText('开始');
    },
  });

  createSettingsPanel(
    settingsSection,
    settings.workDuration,
    settings.breakDuration,
    {
      onSave(workDuration: number, breakDuration: number) {
        phaseManager.setWorkDuration(workDuration);
        phaseManager.setBreakDuration(breakDuration);
        timer.setWorkDuration(workDuration);
        timer.setBreakDuration(breakDuration);
        saveSettings({ workDuration, breakDuration });

        const state = timer.getState();
        if (state.status === 'idle') {
          timerUI.updateTime(state.remaining);
        }
      },
    },
  );

  timerUI.updateTime(phaseManager.getDuration());
}
