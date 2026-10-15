export class Dialogue {
  constructor(private readonly element: HTMLElement) {}
  show(name: string, sprite: string, lines: string[], done: () => void): void {
    let index = 0;
    this.element.classList.remove("hidden");
    const advance = () => {
      if (index >= lines.length) {
        this.element.classList.add("hidden");
        document.removeEventListener("keydown", onKey);
        done();
        return;
      }
      this.element.innerHTML = `<div class="panel dialogue-panel">${sprite ? '<canvas class="dialogue-portrait" width="32" height="32" aria-hidden="true"></canvas>' : ""}<div><h2>${name}</h2><p>${lines[index++]}</p><small>E pour continuer</small></div></div>`;
      if (sprite) {
        const portrait =
          this.element.querySelector<HTMLCanvasElement>(".dialogue-portrait");
        const image = new Image();
        image.onload = () => {
          const context = portrait?.getContext("2d");
          if (!context || !portrait) return;
          context.imageSmoothingEnabled = false;
          context.drawImage(image, 32, 0, 32, 32, 0, 0, 32, 32);
        };
        image.src = sprite;
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (!event.repeat && event.key.toLowerCase() === "e") {
        event.preventDefault();
        advance();
      }
    };
    document.addEventListener("keydown", onKey);
    advance();
  }
}
