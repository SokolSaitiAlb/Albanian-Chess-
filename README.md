# Shah Shqip

**A cinematic 3D chess game inspired by the history of Arbëria.**

Shah Shqip preserves the international rules of chess while giving its six traditional roles an Albanian historical identity inspired by fifteenth-century Arbëria.

## The six-piece collection

| Chess role | Historical identity |
|---|---|
| King | Gjergj Kastrioti Skënderbeu |
| Queen | Donika Kastrioti (Arianiti) |
| Bishop | Pal Engjëlli |
| Knight | Arbërian cavalry / Stratioti |
| Rook | Krujë Castle tower |
| Pawn | League of Lezhë foot soldier |

The two armies use distinct visual treatments: dark forged metal and aged bronze versus warm limestone / ivory with restrained gold details.

## Product goals

- Play standard chess against an offline AI opponent.
- Play local two-player chess on one device.
- Explore a cinematic 3D board with touch-friendly free camera controls.
- Use original 3D assets inspired by Albanian history and the project's approved visual references.
- Keep gameplay available offline.
- Package the application for Android.

## Planned technology

| Area | Technology |
|---|---|
| Application | React + TypeScript + Vite |
| 3D rendering | Three.js |
| Camera | Three.js OrbitControls |
| 3D asset format | glTF 2.0 binary (GLB) |
| Chess rules | chess.js |
| AI opponent | Stockfish WebAssembly via Web Worker |
| Android packaging | Capacitor |
| 3D authoring | Blender |
| Local persistence | IndexedDB |
| Testing | Vitest, Playwright, Android device testing |

## Visual direction

- **Characters:** Skanderbeg, Donika, Pal Engjëlli, Arbërian cavalry, Krujë Castle and the League's foot soldiers.
- **Materials:** dark forged metal / bronze and pale limestone / ivory.
- **Environment:** medieval stone fortress atmosphere inspired by Krujë and the Albanian highlands.
- **Camera:** free orbit, zoom and pan, with touch-friendly limits and reset.
- **Readability:** historical detail must never obscure the chess role or legal-move feedback.

## Historical content policy

Shah Shqip is a creative interpretation inspired by history. Historical biographies, dates, battle descriptions, titles and heraldic claims must be checked against reputable sources before appearing as factual in-game content. Visual concept art is not itself historical evidence.

## Repository map

```text
.
├── docs/
│   ├── ARCHITECTURE.md
│   ├── ASSET_PIPELINE.md
│   └── MASTER_PLAN.md
├── public/assets/
├── src/
│   ├── ai/
│   ├── app/
│   ├── chess/
│   ├── components/
│   ├── data/
│   ├── game/
│   ├── styles/
│   └── three/
├── tests/
└── TODO.md
```

## Getting started

```bash
npm install
npm run dev
```

Android development requires the Android SDK, a compatible JDK and the Capacitor Android platform.

## Development principles

- Keep chess rules independent from rendering and UI.
- The chess rules library is authoritative for legal moves and game outcomes.
- AI output is only a proposed move; validate it before applying it.
- Keep gameplay and assets available offline.
- Profile on real Android hardware before making performance claims.
- Do not commit generated build output, secrets or unlicensed assets.

## Documentation

- [Master Plan](docs/MASTER_PLAN.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Historical 3D Asset Pipeline](docs/ASSET_PIPELINE.md)
- [Development To Do](TODO.md)

## License

The project license has not yet been selected. Third-party components and assets retain their own licenses. Stockfish integration must comply with its applicable GPL-3.0 obligations.

## Project language

All source code, documentation, comments, issue titles and project-facing technical content in this repository must be written in **English**.
