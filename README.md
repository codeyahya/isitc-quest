# Quête à ISITCOM

Petit jeu d’exploration pédagogique réalisé avec TypeScript, Vite et l’API native HTML5 Canvas. Aucun moteur de jeu ni framework frontend n’est utilisé.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir l’adresse affichée par Vite. Pour vérifier la production :

```bash
npm run build
npm run preview
```

## Contrôles

- Flèches : déplacement
- `E` : interaction
- `Échap` : pause
- `R` : recommencer depuis l’extérieur

Le HUD est placé sous la boîte de jeu afin de ne jamais recouvrir la carte. La boîte de jeu conserve un ratio 16:9 ; le dialogue est ancré à l’intérieur, à 20 px du bord inférieur. `E` est la seule touche d’interaction et de progression des dialogues.

## Données Tiled et assets

Les deux cartes sources conservées sont :

- `public/maps/campus_exterior.tmx`
- `public/maps/capus_interior.tmx`

Elles mesurent respectivement 40×21 et 96×64 tuiles, avec des tuiles de 16×16. Les objets du calque `Collisions` sont utilisés pour empêcher le joueur de traverser les obstacles. Les cartes ne fournissent pas de marqueurs de PNJ ou de portes ; les positions ajustables sont regroupées dans `src/content.ts`.

Les sept spritesheets fournis sont utilisés depuis `public/characters/`. Leur dimension réelle est 96×128, donc chaque frame est 32×32 avec 3 colonnes et 4 lignes. Le renderer sélectionne une ligne par direction et anime les 3 frames pendant le déplacement. L’échelle des personnages est centralisée dans `src/content.ts` : 0,9 pour l’extérieur et 2,7 pour l’intérieur ; tous les personnages d’une même carte partagent donc la même échelle.

L’écran Options, accessible avec `Échap`, contient le réglage `Vitesse du personnage` (40 à 180, valeur initiale 92). Il modifie directement la vitesse du joueur et reste actif lors des transitions entre cartes.

Les dépendances originales référencées par les TMX sont conservées dans `public/` aux chemins relatifs attendus :

- `public/maps/tilesets/campus_exterior_tiles.tsx`
- `public/maps/tilesets/interior_full.tsx`
- `public/kenney_rpg-urban-pack/Tilemap/tilemap_packed.png` (432×288)
- `public/interior_full.png` (1536×1024)

Le chargeur lit les données CSV des TMX, résout les chemins relatifs TSX vers les images, puis le renderer Canvas dessine chaque GID depuis la vraie image de tileset. Les bits de flip horizontal, vertical et diagonal de Tiled sont pris en charge. Aucun rectangle ou décor généré ne remplace une tuile.

Les dialogues restent généraux et ne présentent pas de procédures propres à ISITCom comme des faits vérifiés.

Les enseignants sont configurés dans `src/content.ts` près des comptoirs visibles de la carte intérieure : haut-gauche (étudiant), haut-droite (administratif), bas-gauche (technique) et bas-droite (pédagogique). Leur `scale` est centralisée dans cette même configuration et leur frame idle reste fixe.

Chaque service propose trois questions distinctes. Une bonne réponse vaut 10 points ; chaque identifiant de question n’est compté qu’une fois, même si le joueur revient parler au service. Le score, les réponses et les objectifs sont conservés dans l’état de jeu pendant les transitions.

## Audio

Aucun fichier audio local n’est présent dans le projet reçu. `src/audio.ts` fournit néanmoins une configuration centralisée, un volume et un interrupteur global ; les appels restent inactifs tant que des fichiers ne sont pas ajoutés. Les chemins attendus sont ceux indiqués dans `audioConfig.files` (`hover`, `click`, `step`, `interact`, `dialogue`, `transition`, `complete`). Des effets libres peuvent être téléchargés depuis Pixabay Sound Effects, Freesound ou les assets Kenney, puis placés dans `public/audio/` après vérification de leur licence.
