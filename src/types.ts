export type WorldName = 'exterior' | 'interior';
export type Direction = 'down' | 'left' | 'right' | 'up';
export type ServiceId = 'student' | 'admin' | 'pedago' | 'tech';

export interface Rect { x: number; y: number; width: number; height: number }
export interface TiledLayer { name: string; data: number[] }
export interface Tileset {
  tileWidth: number; tileHeight: number; columns: number; tileCount: number;
  imagePath: string; imageWidth: number; imageHeight: number; image: HTMLImageElement;
}
export interface TiledMap {
  width: number; height: number; tileWidth: number; tileHeight: number;
  layers: TiledLayer[]; collisions: Rect[]; tilesetPath: string; tileset: Tileset;
}
export interface ActorConfig {
  id: string; name: string; sprite: string; x: number; y: number;
  kind: 'npc' | 'door'; service?: ServiceId; idleDirection?: Direction; idleFrame?: number; scale?: number;
}
export interface QuizProgress {
  answered: string[];
  score: number;
  correct: number;
  totalAnswered: number;
}
export interface QuestState { started: boolean; completed: ServiceId[]; achievements: string[]; quiz: QuizProgress }
