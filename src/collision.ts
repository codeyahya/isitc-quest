import { Rect, TiledMap } from './types';

export function intersects(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

export function canMove(map: TiledMap, next: Rect): boolean {
  const bounds = { x: 0, y: 0, width: map.width * map.tileWidth, height: map.height * map.tileHeight };
  return next.x >= bounds.x && next.y >= bounds.y && next.x + next.width <= bounds.width && next.y + next.height <= bounds.height
    && !map.collisions.some((obstacle) => intersects(next, obstacle));
}
