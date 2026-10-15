import { ActorConfig, Direction } from "./types";

export function nearbyActor(
  x: number,
  y: number,
  direction: Direction,
  actors: ActorConfig[],
  radius = 46,
): ActorConfig | undefined {
  const vectors: Record<Direction, [number, number]> = {
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
    up: [0, -1],
  };
  const [fx, fy] = vectors[direction];
  return actors
    .map((actor, index) => {
      const dx = actor.x - x;
      const dy = actor.y - y;
      const distance = Math.hypot(dx, dy);
      const facing =
        distance === 0 ? 1 : (dx / distance) * fx + (dy / distance) * fy;
      return { actor, index, distance, facing };
    })
    .filter(
      (candidate) => candidate.distance <= radius && candidate.facing >= -0.15,
    )
    .sort((a, b) => a.distance - b.distance || a.index - b.index)[0]?.actor;
}
