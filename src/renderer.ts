import { ActorConfig, Direction, TiledMap } from './types';

export interface SpriteImage { image: HTMLImageElement; ready: boolean }

export class Renderer {
  private readonly ctx: CanvasRenderingContext2D;
  private scale = 1;
  private offsetX = 0;
  private offsetY = 0;
  private readonly images = new Map<string, SpriteImage>();

  constructor(private readonly canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D indisponible');
    this.ctx = context;
    this.ctx.imageSmoothingEnabled = false;
  }

  resize(width: number, height: number, devicePixelRatio: number): void {
    this.canvas.width = Math.max(1, Math.round(width * devicePixelRatio));
    this.canvas.height = Math.max(1, Math.round(height * devicePixelRatio));
    this.ctx.imageSmoothingEnabled = false;
  }

  loadSprite(path: string): SpriteImage {
    const existing = this.images.get(path);
    if (existing) return existing;
    const image = new Image();
    const sprite = { image, ready: false };
    image.onload = () => { sprite.ready = true; };
    image.src = path;
    this.images.set(path, sprite);
    return sprite;
  }

  project(map: TiledMap): void {
    this.scale = Math.min(this.canvas.width / (map.width * map.tileWidth), this.canvas.height / (map.height * map.tileHeight));
    this.offsetX = Math.floor((this.canvas.width - map.width * map.tileWidth * this.scale) / 2);
    this.offsetY = Math.floor((this.canvas.height - map.height * map.tileHeight * this.scale) / 2);
  }

  worldToCanvas(x: number, y: number): [number, number] {
    return [Math.round(this.offsetX + x * this.scale), Math.round(this.offsetY + y * this.scale)];
  }

  canvasToWorld(x: number, y: number): [number, number] {
    return [(x - this.offsetX) / this.scale, (y - this.offsetY) / this.scale];
  }

  renderMap(map: TiledMap): void {
    this.project(map);
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    map.layers.forEach((layer) => {
      layer.data.forEach((gid, index) => {
        if (!gid) return;
        const tileX = index % map.width;
        const tileY = Math.floor(index / map.width);
        const [x, y] = this.worldToCanvas(tileX * map.tileWidth, tileY * map.tileHeight);
        const size = Math.ceil(map.tileWidth * this.scale) + 1;
        this.drawTile(map, gid, x, y, size);
      });
    });
  }

  private drawTile(map: TiledMap, rawGid: number, x: number, y: number, size: number): void {
    const gid = rawGid >>> 0;
    const horizontal = (gid & 0x80000000) !== 0;
    const vertical = (gid & 0x40000000) !== 0;
    const diagonal = (gid & 0x20000000) !== 0;
    const localId = (gid & 0x1fffffff) - 1;
    if (localId < 0 || localId >= map.tileset.tileCount) return;
    const sourceX = (localId % map.tileset.columns) * map.tileset.tileWidth;
    const sourceY = Math.floor(localId / map.tileset.columns) * map.tileset.tileHeight;
    this.ctx.save();
    this.ctx.translate(x + size / 2, y + size / 2);
    if (diagonal) {
      this.ctx.rotate(Math.PI / 2);
      if (horizontal !== vertical) this.ctx.scale(-1, 1);
    } else {
      this.ctx.scale(horizontal ? -1 : 1, vertical ? -1 : 1);
    }
    this.ctx.drawImage(map.tileset.image, sourceX, sourceY, map.tileset.tileWidth, map.tileset.tileHeight, -size / 2, -size / 2, size, size);
    this.ctx.restore();
  }

  drawActor(actor: ActorConfig, sprite: SpriteImage, direction: Direction, frame: number, mapScale = 1): void {
    const [x, y] = this.worldToCanvas(actor.x, actor.y);
    if (sprite.ready) {
      const row = ({ down: 0, left: 1, right: 2, up: 3 } satisfies Record<Direction, number>)[direction];
      const frameWidth = sprite.image.width / 3;
      const frameHeight = sprite.image.height / 4;
      const size = Math.round(32 * this.scale * mapScale);
      this.ctx.drawImage(sprite.image, frame * frameWidth, row * frameHeight, frameWidth, frameHeight, x - size / 2, y - size, size, size);
    } else {
      this.ctx.fillStyle = '#ffd166';
      this.ctx.fillRect(x - 6, y - 16, 12, 16);
    }
    this.ctx.fillStyle = '#fff4d6';
    this.ctx.font = `${Math.max(9, Math.round(11 * this.scale))}px "Press Start 2P", monospace`;
    this.ctx.textAlign = 'center';
    this.ctx.fillText(actor.name, x, y - Math.max(20, Math.round(24 * this.scale)));
  }

  drawDoor(actor: ActorConfig): void {
    const [x, y] = this.worldToCanvas(actor.x, actor.y);
    this.ctx.fillStyle = '#e87992';
    this.ctx.fillRect(x - 12, y - 6, 24, 12);
    this.ctx.fillStyle = '#fff4d6';
    this.ctx.font = '11px "Press Start 2P", monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(actor.name, x, y - 12);
  }
}
