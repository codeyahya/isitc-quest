export interface AudioConfig {
  enabled: boolean;
  volume: number;
  files: Partial<
    Record<
      | "hover"
      | "click"
      | "step"
      | "interact"
      | "dialogue"
      | "transition"
      | "complete",
      string
    >
  >;
}

export const audioConfig: AudioConfig = {
  enabled: true,
  volume: 0.35,
  files: {},
};

export class AudioManager {
  private unlocked = false;
  unlock(): void {
    this.unlocked = true;
  }
  play(name: keyof AudioConfig["files"]): void {
    if (!this.unlocked || !audioConfig.enabled) return;
    const path = audioConfig.files[name];
    if (!path) return;
    const sound = new Audio(path);
    sound.volume = audioConfig.volume;
    void sound.play().catch(() => undefined);
  }
}
