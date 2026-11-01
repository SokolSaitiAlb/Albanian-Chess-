# Shah Shqip — Master Implementation Plan

**Product:** Shah Shqip  
**Platform:** Android (first release), with a browser-based development and preview target  
**Product direction:** Cinematic Medieval  
**Camera:** Free 3D orbit camera  
**Status:** Planning / repository foundation

## 1. Product vision

Build a polished, offline-first 3D chess game for Android, inspired by Albanian history and medieval visual culture. The experience must combine correct chess gameplay, a credible AI opponent, touch-first interaction, and a distinctive 3D presentation.

The first release is deliberately limited to two game modes:
- Play against an offline AI opponent.
- Local two-player mode on one device.

Online multiplayer, accounts, cloud synchronization, monetization, and a full campaign are outside the first-release scope.

## 2. Product requirements

### Gameplay
- Implement all standard chess rules.
- Support legal move highlighting and clear selection feedback.
- Support castling, en passant, all four promotion choices, check, checkmate, stalemate, and draw conditions.
- Provide undo where the selected mode and game configuration allow it.
- Display move history in algebraic notation.
- Save and restore an interrupted local game.
- Provide optional clocks for local games.

### AI
- Run Stockfish locally through WebAssembly in a Web Worker.
- Communicate through UCI.
- Send the current position as FEN.
- Parse the engine's best move and validate it through the chess rules layer before applying it.
- Provide Beginner, Easy, Medium, Hard, and Expert presets.
- Calibrate difficulty with real-device testing; labels must correspond to measured behavior.
- Keep engine work off the UI and rendering thread.

### 3D experience
- Render a complete 8×8 board and all 32 pieces.
- Load optimized GLB/glTF assets.
- Provide a free orbit camera with rotate, zoom, pan, sensible angle/distance limits, and reset view.
- Support touch input without accidental camera movement or piece selection.
- Animate piece movement and captures.
- Highlight selected squares, legal destinations, the last move, check, and game-ending states.
- Restore rendering resources after Android WebView context loss where feasible.

### Visual identity
- Cinematic medieval stone hall.
- Obsidian/dark bronze army versus limestone/ivory army.
- Antique gold accents.
- Restrained fog, dust particles, and dramatic but legible lighting.
- Albanian-history-inspired design language without presenting unverified historical details as fact.

### Persistence and privacy
- Store settings, game state, and move history locally.
- No account, mandatory network connection, analytics, or cloud service in v1.
- Load all required runtime assets from the installed application.
- Make data deletion and saved-game management understandable to the player.

## 3. Technical stack

| Layer | Selection | Responsibility |
|---|---|---|
| Web application | React + TypeScript + Vite | UI and development runtime |
| 3D | Three.js | Scene, board, pieces, camera, lighting, animation |
| Camera controls | OrbitControls | Free orbit, zoom, pan |
| Chess rules | chess.js | Legal moves, state, FEN, PGN, outcomes |
| AI | Stockfish WASM | Offline move search |
| AI threading | Web Worker | Prevent UI/render thread blocking |
| Android wrapper | Capacitor | Android packaging and native lifecycle |
| Persistence | IndexedDB | Saved games and settings |
| Tests | Vitest + Playwright | Unit and browser integration tests |
| 3D authoring | Blender | Modeling, UVs, materials, animation, GLB export |

Use stable, mutually compatible package versions and commit the lockfile. Do not assume a package version is compatible until installation and build verification succeed.

## 4. Proposed architecture

### Presentation layer
React components render menus, HUD, settings, move history, dialogs, and accessibility labels. UI components must not implement chess rules or directly mutate Three.js scene state.

### Game orchestration
A game session coordinates mode, current player, turn state, pause/resume, persistence, and end-of-game transitions.

### Chess domain
A chess service wraps chess.js. It is the only authority for legal moves, FEN/PGN, check state, and game outcomes. Rendering must reflect the domain state rather than inventing its own board state.

### 3D presentation
Three.js receives a read-only representation of the board and animates it. Raycasting maps pointer/touch interaction to a board square. A selected move is submitted to the game controller, validated by the chess domain, and only then rendered as committed state.

### AI adapter
A Stockfish adapter owns the Worker lifecycle and UCI protocol. It receives FEN from the chess domain, requests a search, parses the response, and returns a proposed move. The game controller validates the proposal before committing it.

### Persistence
A repository abstraction stores versioned game snapshots and settings in IndexedDB. Persist enough information to restore the game reliably, including FEN, PGN/move history, mode, player side, and timestamps.

## 5. Repository structure

```text
src/
  app/             Application entry, routing, composition
  components/      React UI components
  game/            Game session and orchestration
  chess/           Chess domain adapter and types
  ai/               Stockfish Worker and UCI adapter
  three/            Scene, camera, board, pieces, input, animation
  data/             IndexedDB repositories and migrations
  styles/           Global theme and responsive styling
public/assets/
  models/           GLB models
  textures/         Optimized textures
  audio/            Licensed audio
  fonts/            Licensed fonts
tests/
  chess/            Rules and edge-case tests
  game/             Session and state tests
  ai/               UCI adapter tests
  integration/      Browser-level flows
docs/               Architecture and production documentation
```

## 6. Implementation phases and exit criteria

### Phase 0 — Repository and engineering foundation
Deliverables:
- Vite + React + TypeScript application scaffold.
- Strict TypeScript configuration.
- Formatting/linting and test scripts.
- Basic CI for install, type-check, tests, and production build.
- Capacitor configuration.
- Documentation and license inventory.

Exit criteria: clean dependency installation, type-check, tests, and production web build pass in CI.

### Phase 1 — 3D vertical slice
Deliverables:
- Three.js scene and renderer.
- Procedural 8×8 board.
- Placeholder chess pieces.
- Free orbit camera and touch controls.
- Basic picking and square-coordinate conversion.
- Responsive layout and device pixel ratio cap.

Exit criteria: all 64 squares are selectable and the scene remains usable on desktop browser and Android WebView.

### Phase 2 — Chess domain
Deliverables:
- chess.js adapter.
- Board state projection.
- Legal move highlighting.
- Promotion UI.
- Check/checkmate/stalemate/draw states.
- FEN and PGN support.

Exit criteria: rules test suite covers special moves and terminal positions; no illegal move can be committed through the UI.

### Phase 3 — Local multiplayer
Deliverables:
- Player turn management.
- Optional board rotation.
- Optional clocks.
- Undo/restart flows.
- Save/resume.
- Move list and game result screen.

Exit criteria: a complete local game can be played, saved, closed, and resumed.

### Phase 4 — Offline AI
Deliverables:
- Stockfish WASM integration.
- UCI Worker adapter.
- Difficulty presets.
- Search cancellation and lifecycle handling.
- AI move validation and error recovery.

Exit criteria: AI completes games at each preset without blocking the UI or producing an accepted illegal move; offline operation is verified after installation.

### Phase 5 — Final 3D assets
Deliverables:
- Six unique chess-piece role models.
- Dark and light material variants.
- Board and environment assets.
- GLB export and asset manifest.
- LOD/texture/compression strategy where appropriate.

Exit criteria: assets load locally, fit their board squares, have consistent pivots, and meet measured memory/performance budgets.

### Phase 6 — Cinematic polish
Deliverables:
- Piece movement/capture animations.
- Lighting and shadow tuning.
- Controlled atmospheric effects.
- Audio feedback and licensed music.
- Main menu, settings, history content, and accessibility improvements.

Exit criteria: visual effects do not obscure board readability or cause unacceptable frame-time spikes.

### Phase 7 — Android QA and release
Deliverables:
- Capacitor Android project.
- App icon, splash screen, package metadata.
- Lifecycle and WebGL context-loss handling.
- Real-device profiling.
- Accessibility and screen-size checks.
- License notices and release documentation.
- Signed APK/AAB generated by the maintainer.

Exit criteria: installation, offline play, persistence, AI, and gameplay pass on target Android devices; release artifacts and source obligations are documented.

## 7. Performance strategy

Initial target: aim for 60 FPS on capable Android devices, but publish no performance claim until measured.

- Cap renderer pixel ratio; start with a conservative device-dependent value.
- Use optimized geometry and texture sizes.
- Prefer baked lighting where dynamic lighting is not essential.
- Keep shadow maps and post-processing restrained.
- Avoid expensive per-frame allocations.
- Use instancing for repeated environment geometry where useful.
- Pause or reduce rendering while the app is backgrounded.
- Dispose GPU resources when scenes are replaced.
- Profile frame time, memory, battery, and thermal behavior on physical devices.

## 8. Asset production requirements

- Author models in Blender.
- Use consistent scale, orientation, and origin/pivot conventions.
- Export glTF 2.0 binary (.glb).
- Use PBR materials and optimized texture maps.
- Keep the six chess roles visually distinct at mobile viewing distance.
- Create material variants for both armies without duplicating geometry where possible.
- Record source, author, license, and modifications for every external asset.
- Treat generated concept art as visual reference, not as a production 3D model.

## 9. Security, privacy, and licensing

- No secrets or private tokens in the repository.
- No mandatory remote services in v1.
- Audit all dependencies and licenses.
- Stockfish is GPL-3.0; distribution must meet applicable source and license obligations for the exact engine build and modifications.
- Preserve third-party notices and attribution.
- Verify commercial-use rights for generated or externally sourced art, fonts, music, and sound effects.
- Choose and add a project-level license before accepting external contributions.

## 10. Definition of Done

A feature is complete only when:
1. Its acceptance criteria are documented.
2. Type-check and relevant tests pass.
3. It works in the browser target.
4. Android behavior is tested when the feature touches native/WebView behavior.
5. Loading, error, pause/resume, and offline behavior are considered.
6. Documentation and license notices are updated.
7. No unverified claims are made about performance or completion.

## 11. Explicitly out of scope for v1

- Online matchmaking and multiplayer servers.
- User accounts and cloud sync.
- In-app purchases and advertising.
- Historical campaign mode.
- Mandatory telemetry.
- Large, unoptimized cinematic cutscenes.
