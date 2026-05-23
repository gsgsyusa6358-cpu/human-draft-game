let audioContext: AudioContext | null = null;

type SoundKind = "select" | "button" | "result";

const frequencies: Record<SoundKind, number> = {
  select: 520,
  button: 420,
  result: 660
};

export function playBeep(kind: SoundKind, enabled: boolean) {
  if (!enabled || typeof window === "undefined") return;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  audioContext ??= new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequencies[kind];
  gain.gain.setValueAtTime(0.05, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.13);
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
