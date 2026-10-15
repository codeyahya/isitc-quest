import "./style.css";
import { loadTmx } from "./mapLoader";
import { actors, characterScaleByWorld, dialogues, services } from "./content";
import { Dialogue } from "./dialogue";
import { nearbyActor } from "./interaction";
import { Player } from "./player";
import { Renderer } from "./renderer";
import { complete, totalQuizQuestions, trackerText } from "./quests";
import { showQuiz } from "./quiz";
import { ActorConfig, QuestState, TiledMap, WorldName } from "./types";
import { AudioManager } from "./audio";

const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas")!;
const title = document.querySelector("#title-screen")!;
const gameScreen = document.querySelector("#game-screen")!;
const gameBox = document.querySelector("#game-box")!;
const prompt = document.querySelector("#interaction-prompt")!;
const tracker = document.querySelector("#quest-tracker")!;
const achievementList = document.querySelector("#achievement-list")!;
const scoreTracker = document.querySelector("#score-tracker")!;
const achievementNotification = document.querySelector(
  "#achievement-notification",
)!;
const dialogue = new Dialogue(document.querySelector("#dialogue")!);
const quiz = document.querySelector<HTMLElement>("#quiz")!;
const renderer = new Renderer(canvas);
const audio = new AudioManager();
const keys = new Set<string>();
const quest: QuestState = {
  started: false,
  completed: [],
  achievements: [],
  quiz: { answered: [], score: 0, correct: 0, totalAnswered: 0 },
};
let world: WorldName = "exterior";
let map: TiledMap;
let player: Player;
let last = performance.now();
let paused = false;
let nearest: ActorConfig | undefined;
let exteriorSpeed = 92;
let interiorSpeed = 92;

document.querySelector("#start-button")!.addEventListener("click", () => {
  audio.unlock();
  audio.play("click");
  void start();
});
document
  .querySelector("#help-button")!
  .addEventListener("click", () =>
    showHomeInfo(
      "<strong>Comment jouer</strong><br>Utilise les flèches pour te déplacer. Dirige-toi vers un personnage ou une porte, puis appuie sur <kbd>E</kbd> pour interagir.<br><br><button data-close-info>Fermer</button>",
    ),
  );
document
  .querySelector("#about-button")!
  .addEventListener("click", () =>
    showHomeInfo(
      "<strong>À propos</strong><br>Projet Jeu Web Study Skills réalisé à l'aide de TypeScript et de Canvas.<br><br><button data-close-info>Fermer</button>",
    ),
  );
document.querySelector("#home-info")!.addEventListener("click", (event) => {
  if ((event.target as HTMLElement).matches("[data-close-info]"))
    (event.currentTarget as HTMLElement).classList.add("hidden");
});
const homeBackground = new Image();
homeBackground.onerror = () =>
  showHomeInfo(
    "<strong>Image d’accueil indisponible</strong><br>Le fichier <code>public/Campus_Quest__Academy_Adventure.png</code> n’a pas pu être chargé.",
  );
homeBackground.src = "/Campus_Quest__Academy_Adventure.png";
document.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    keys.add(event.key);
    event.preventDefault();
  }
  if (event.key === "Escape" && !document.querySelector(".modal:not(.hidden)"))
    togglePause();
  if (event.key.toLowerCase() === "r" && !event.repeat) void start();
  if (
    event.key.toLowerCase() === "e" &&
    !event.repeat &&
    nearest &&
    !paused &&
    document.querySelector(".modal:not(.hidden)") === null
  ) {
    event.preventDefault();
    audio.play("interact");
    interact(nearest);
  }
});
document.addEventListener("keyup", (event) => keys.delete(event.key));
document
  .querySelector("#continue-button")!
  .addEventListener("click", () =>
    document.querySelector("#completion")!.classList.add("hidden"),
  );
document
  .querySelector("#options-button")!
  .addEventListener("click", (event) => {
    event.stopPropagation();
    paused = true;
    document.querySelector("#pause")!.classList.remove("hidden");
  });
document.querySelector("#close-options")!.addEventListener("click", (event) => {
  event.stopPropagation();
  paused = false;
  document.querySelector("#pause")!.classList.add("hidden");
});
const speedSlider = document.querySelector<HTMLInputElement>("#speed-slider")!;
const speedValue = document.querySelector<HTMLOutputElement>("#speed-value")!;
speedSlider.addEventListener("input", () => {
  const selectedSpeed = clampSpeed(Number(speedSlider.value));
  if (world === "interior") interiorSpeed = selectedSpeed;
  else exteriorSpeed = selectedSpeed;
  applyPlayerSpeed();
});

async function start(): Promise<void> {
  title.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  resizeCanvas();
  quest.started = true;
  const requestedWorld = new URLSearchParams(window.location.search).get("map");
  await loadWorld(
    requestedWorld === "interior" ? "interior" : "exterior",
    requestedWorld === "interior" ? 760 : 80,
    requestedWorld === "interior" ? 760 : 150,
  );
}

async function loadWorld(
  nextWorld: WorldName,
  x?: number,
  y?: number,
): Promise<void> {
  world = nextWorld;
  nearest = undefined;
  prompt.textContent = "";
  const path =
    world === "exterior"
      ? "/maps/campus_exterior.tmx"
      : "/maps/capus_interior.tmx";
  map = await loadTmx(path);
  player = new Player(
    map,
    x ?? (world === "exterior" ? 80 : 760),
    y ?? (world === "exterior" ? 150 : 760),
  );
  if (world === "interior") interiorSpeed = getSliderMaximum();
  speedSlider.value = `${world === "interior" ? interiorSpeed : exteriorSpeed}`;
  applyPlayerSpeed();
  updateHud();
}

function applyPlayerSpeed(): void {
  const effectiveSpeed = world === "interior" ? interiorSpeed : exteriorSpeed;
  speedSlider.value = `${effectiveSpeed}`;
  speedValue.value = `${effectiveSpeed}`;
  player?.setSpeed(effectiveSpeed);
}

function clampSpeed(speed: number): number {
  const minimum = Number(speedSlider.min) || 40;
  const maximum = Number(speedSlider.max) || 180;
  return Math.max(minimum, Math.min(maximum, Number.isFinite(speed) ? speed : minimum));
}

function getSliderMaximum(): number {
  return clampSpeed(Number(speedSlider.max));
}

function showHomeInfo(content: string): void {
  const info = document.querySelector<HTMLElement>("#home-info")!;
  info.innerHTML = content;
  info.classList.remove("hidden");
}

function resizeCanvas(): void {
  const rect = gameBox.getBoundingClientRect();
  renderer.resize(
    rect.width,
    rect.height,
    Math.min(window.devicePixelRatio || 1, 2),
  );
}
window.addEventListener("resize", resizeCanvas);

function updateTracker(): void {
  tracker.innerHTML = trackerText(quest);
}

function updateHud(): void {
  updateTracker();
  achievementList.innerHTML = quest.achievements.length
    ? quest.achievements
        .map(
          (achievement) =>
            `<div class="achievement-item">✓ ${achievement}</div>`,
        )
        .join("")
    : "Aucun accomplissement pour le moment.";
  scoreTracker.textContent = `${quest.quiz.score} points · ${quest.quiz.totalAnswered}/${totalQuizQuestions()} réponses · ${quest.quiz.correct} correcte(s)`;
}

function unlockAchievement(message: string): void {
  if (quest.achievements.includes(message)) return;
  quest.achievements.push(message);
  achievementNotification.textContent = `✓ ${message}`;
  achievementNotification.classList.remove("hidden");
  window.setTimeout(
    () => achievementNotification.classList.add("hidden"),
    2800,
  );
  updateHud();
}

function interact(actor: ActorConfig): void {
  if (actor.kind === "door") {
    void loadWorld(
      world === "exterior" ? "interior" : "exterior",
      world === "exterior" ? 760 : 304,
      world === "exterior" ? 760 : 176,
    );
    return;
  }
  const text = dialogues[actor.id];
  dialogue.show(text.name, actor.sprite, text.lines, () => {
    if (actor.service)
      showQuiz(quiz, actor.service, quest, (result) => {
        if (result.serviceComplete && complete(quest, actor.service!)) {
          unlockAchievement(`${actor.name.split(" · ")[0]} : quiz terminé`);
        }
        updateHud();
        if (quest.completed.length === services.length) {
          unlockAchievement("Première journée à ISITCOM terminée");
          document.querySelector("#completion")!.classList.remove("hidden");
        }
      });
  });
}

function togglePause(): void {
  paused = !paused;
  document.querySelector("#pause")!.classList.toggle("hidden", !paused);
}

function loop(now: number): void {
  const delta = Math.min(40, now - last);
  last = now;
  if (
    map &&
    player &&
    !paused &&
    document.querySelector(".modal:not(.hidden)") === null
  )
    player.update(keys, delta);
  if (map && player) {
    renderer.renderMap(map);
    actors[world].forEach((actor) =>
      actor.kind === "door"
        ? renderer.drawDoor(actor)
        : renderer.drawActor(
            actor,
            renderer.loadSprite(actor.sprite),
            actor.id === "player"
              ? player.direction
              : (actor.idleDirection ?? "down"),
            actor.id === "player" ? player.frame : (actor.idleFrame ?? 1),
            characterScaleByWorld[world],
          ),
    );
    renderer.drawActor(
      {
        id: "player",
        name: "Toi",
        sprite: "/characters/player.png",
        x: player.x,
        y: player.y,
        kind: "npc",
      },
      renderer.loadSprite("/characters/player.png"),
      player.direction,
      player.frame,
      characterScaleByWorld[world],
    );
    nearest = nearbyActor(player.x, player.y, player.direction, actors[world]);
    prompt.textContent = nearest ? `E — ${nearest.name}` : "";
  }
  async function boot(): Promise<void> {
    await document.fonts.load('16px "Press Start 2P"');
    await document.fonts.ready;
    requestAnimationFrame(loop);
  }
  void boot();
}
requestAnimationFrame(loop);
