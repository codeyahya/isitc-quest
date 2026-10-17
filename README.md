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


