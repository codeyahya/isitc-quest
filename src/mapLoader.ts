import { Rect, TiledMap, Tileset } from './types';

const csv = (text: string) => text.split(',').map((part) => Number(part.trim())).filter(Number.isFinite);
const attr = (element: Element, name: string, fallback = 0) => Number(element.getAttribute(name) ?? fallback);

export async function loadTmx(url: string): Promise<TiledMap> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Impossible de charger ${url} (${response.status})`);
  const xml = new DOMParser().parseFromString(await response.text(), 'application/xml');
  if (xml.querySelector('parsererror')) throw new Error(`XML TMX invalide : ${url}`);
  const map = xml.querySelector('map');
  const tileset = map?.querySelector(':scope > tileset');
  if (!map || !tileset) throw new Error(`TMX incomplet : ${url}`);
  const layers = Array.from(map.querySelectorAll(':scope > layer')).map((layer) => ({
    name: layer.getAttribute('name') ?? 'Couche',
    data: csv(layer.querySelector('data')?.textContent ?? '')
  }));
  const collisions = Array.from(map.querySelectorAll(':scope > objectgroup[name="Collisions"] > object')).map((object): Rect => ({
    x: attr(object, 'x'), y: attr(object, 'y'),
    width: attr(object, 'width', 16) || 16, height: attr(object, 'height', 16) || 16
  }));
  const source = tileset.getAttribute('source') ?? '';
  const tilesetUrl = new URL(source, new URL(url, window.location.origin)).pathname;
  const tilesetResponse = await fetch(tilesetUrl);
  if (!tilesetResponse.ok) throw new Error(`Tileset manquant : ${tilesetUrl}`);
  const tilesetXml = new DOMParser().parseFromString(await tilesetResponse.text(), 'application/xml');
  const tilesetRoot = tilesetXml.querySelector('tileset');
  const imageElement = tilesetRoot?.querySelector('image');
  const imageSource = imageElement?.getAttribute('source');
  if (!tilesetRoot || !imageElement || !imageSource) throw new Error(`Tileset incomplet : ${tilesetUrl}`);
  const imagePath = new URL(imageSource, new URL(tilesetUrl, window.location.origin)).pathname;
  const image = new Image();
  image.src = imagePath;
  await image.decode();
  const parsedTileset: Tileset = {
    tileWidth: attr(tilesetRoot, 'tilewidth'), tileHeight: attr(tilesetRoot, 'tileheight'),
    columns: attr(tilesetRoot, 'columns'), tileCount: attr(tilesetRoot, 'tilecount'),
    imagePath, imageWidth: attr(imageElement, 'width'), imageHeight: attr(imageElement, 'height'), image
  };
  return {
    width: attr(map, 'width'), height: attr(map, 'height'),
    tileWidth: attr(map, 'tilewidth'), tileHeight: attr(map, 'tileheight'),
    layers, collisions, tilesetPath: tilesetUrl, tileset: parsedTileset
  };
}
