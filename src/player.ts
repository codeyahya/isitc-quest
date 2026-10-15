import { canMove } from "./collision";
import { Direction, Rect, TiledMap } from "./types";

export class Player {
  x: number;
  y: number;
  direction: Direction = "down";
  frame = 1;
  moving = false;
  private animationTime = 0;
  private speed = 92;
  private speedMultiplier = 1;
  constructor(
    private readonly map: TiledMap,
    x: number,
    y: number,
  ) {
    this.x = x;
    this.y = y;
  }
  setSpeed(speed: number): void {
    this.speed = Math.max(40, Math.min(180, speed));
  }
  setSpeedMultiplier(multiplier: number): void {
    this.speedMultiplier = Math.max(0.5, Math.min(2, multiplier));
  }
  update(keys: Set<string>, delta: number): void {
    const dx = Number(keys.has("ArrowRight")) - Number(keys.has("ArrowLeft"));
    const dy = Number(keys.has("ArrowDown")) - Number(keys.has("ArrowUp"));
    this.moving = dx !== 0 || dy !== 0;
    if (!this.moving) {
      this.frame = 1;
      return;
    }
    if (Math.abs(dx) > Math.abs(dy)) this.direction = dx > 0 ? "right" : "left";
    else this.direction = dy > 0 ? "down" : "up";
    const length = Math.hypot(dx, dy) || 1;
    const speed = (this.speed * this.speedMultiplier * delta) / 1000;
    const next: Rect = {
      x: this.x + (dx / length) * speed - 7,
      y: this.y + (dy / length) * speed - 10,
      width: 14,
      height: 10,
    };
    if (canMove(this.map, next)) {
      this.x = next.x + 7;
      this.y = next.y + 10;
    }
    this.animationTime += delta;
    if (this.animationTime > 130) {
      this.frame = (this.frame + 1) % 3;
      this.animationTime = 0;
    }
  }
}
