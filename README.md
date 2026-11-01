# Shah Shqip

**A cinematic medieval chess game inspired by Albanian history.**

Shah Shqip is an offline-first chess game planned for Android, built with TypeScript, Three.js, React, chess.js, Stockfish WASM, and Capacitor. Its visual direction combines medieval Albanian-inspired character design, dark obsidian and pale limestone materials, antique gold details, and a freely orbiting 3D camera.

> **Project status:** Planning and foundation. This repository is being initialized. The complete game, final 3D assets, AI integration, and Android release are not yet implemented.

## Product goals

- Play a complete chess game against an offline AI opponent.
- Play local two-player chess on one device.
- Present a cinematic, real-time 3D chessboard with touch-friendly free camera controls.
- Use original 3D chess pieces inspired by Albanian history and the project's approved visual references.
- Save games and settings locally.
- Ship an installable Android APK/AAB.

## Planned technology

| Area | Technology |
|---|---|
| Application | React + TypeScript + Vite |
| 3D rendering | Three.js |
| Camera | Three.js OrbitControls |
| Chess rules | chess.js |
| AI opponent | Stockfish WebAssembly via Web Worker |
| Android packaging | Capacitor |
| 3D asset authoring | Blender, exported as GLB/glTF |
| Local persistence | IndexedDB |
| Testing | Vitest, Playwright, Android device testing |

Versions will be pinned in the package lockfile when the implementation foundation is installed and verified.

## Game modes

1. **Play vs AI** — offline Stockfish opponent with calibrated difficulty presets.
2. **Local Multiplayer** — two players take turns on the same device, with optional board rotation.

## Visual direction

- Cinematic Medieval environment: stone hall, restrained atmospheric fog, dust particles, dramatic but readable lighting.
- Board: dark obsidian and pale limestone.
- Pieces: six chess roles per side, with distinct dark and light material variants.
- Accents: antique gold and aged bronze.
- Camera: free orbit, zoom, and pan with touch-friendly limits and a reset-view action.

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

The application scaffold is being established. Once the initial implementation files and dependencies are committed:

```bash
npm install
npm run dev
```

Android development will require Android Studio or the Android SDK, a compatible JDK, and the Capacitor Android platform.

## Development principles

- Keep chess rules independent from rendering and UI.
- Treat the chess rules library as the authority for legal moves and game outcomes.
- Treat AI output as a proposed move; validate it before applying it.
- Keep gameplay and assets available offline.
- Profile on real Android hardware before setting performance claims.
- Do not commit generated build output, local secrets, or unlicensed assets.

## Documentation

- [Master Plan](docs/MASTER_PLAN.md)
- [Architecture](docs/ARCHITECTURE.md)
- [3D Asset Pipeline](docs/ASSET_PIPELINE.md)
- [Development To Do](TODO.md)

## License

The project license has not yet been selected. Third-party components and assets retain their own licenses. Stockfish integration must comply with GPL-3.0 obligations; see the Master Plan before distributing a build containing Stockfish.

## Project language

All source code, documentation, comments, issue titles, and project-facing technical content in this repository should be written in **English**.
