export function createNotification(root: HTMLElement) {
  const toast = document.createElement('div');
  toast.id = 'notification-toast';
  root.appendChild(toast);

  let audioCtx: AudioContext | null = null;

  function playBeep() {
    try {
      if (audioCtx) {
        audioCtx.close();
      }
      audioCtx = new AudioContext();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = 880;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // Audio not available
    }
  }

  return {
    show(mode: 'work' | 'break') {
      const message = mode === 'work' ? '休息时间到！' : '专注时间到！';
      toast.textContent = message;
      toast.className = 'visible';
      toast.classList.add(mode === 'work' ? 'toast-break' : 'toast-work');
      playBeep();

      setTimeout(() => {
        toast.className = '';
        toast.classList.remove('toast-work', 'toast-break');
      }, 3000);
    },

    destroy() {
      toast.remove();
      if (audioCtx) {
        audioCtx.close();
      }
    },
  };
}
