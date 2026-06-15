export interface SettingsActions {
  onSave: (workDuration: number, breakDuration: number) => void;
}

export interface SettingsPanel {
  setSaveEnabled(enabled: boolean): void;
}

export function createSettingsPanel(
  container: HTMLElement,
  initialWorkSeconds: number,
  initialBreakSeconds: number,
  actions: SettingsActions,
): SettingsPanel {
  const workMinutes = Math.floor(initialWorkSeconds / 60);
  const breakMinutes = Math.floor(initialBreakSeconds / 60);

  container.innerHTML = `
    <div id="settings">
      <div class="settings-row">
        <label>专注</label>
        <input type="number" id="work-duration" value="${workMinutes}" min="1" max="120" />
        <span>分钟</span>
      </div>
      <div class="settings-row">
        <label>休息</label>
        <input type="number" id="break-duration" value="${breakMinutes}" min="1" max="60" />
        <span>分钟</span>
      </div>
      <button id="save-settings">保存设置</button>
    </div>
  `;

  const workInput = container.querySelector('#work-duration') as HTMLInputElement;
  const breakInput = container.querySelector('#break-duration') as HTMLInputElement;
  const saveBtn = container.querySelector('#save-settings') as HTMLButtonElement;

  saveBtn.addEventListener('click', () => {
    const w = parseInt(workInput.value, 10) * 60;
    const b = parseInt(breakInput.value, 10) * 60;
    if (w > 0 && b > 0) {
      actions.onSave(w, b);
    }
  });

  return {
    setSaveEnabled(enabled: boolean) {
      saveBtn.disabled = !enabled;
    },
  };
}
