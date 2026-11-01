# Shah Shqip — Development To Do

This is the source-of-truth implementation checklist. Items are not complete until their acceptance criteria are verified.

## P0 — Repository foundation
- [x] Initialize the Vite + React + TypeScript application.
- [x] Add strict TypeScript settings.
- [ ] Add linting and formatting.
- [x] Add Vitest and a smoke test.
- [ ] Add Playwright browser smoke test.
- [x] Add CI for install, type-check, tests, and production build.
- [ ] Add Capacitor configuration and Android platform.
- [ ] Add project license decision and third-party license inventory.

## P1 — Three.js prototype
- [x] Create the Three.js renderer and scene lifecycle.
- [x] Build a procedural 8×8 chessboard.
- [x] Add placeholder geometry for all 32 pieces.
- [x] Implement free orbit camera.
- [x] Add touch-friendly rotate, zoom, pan, and reset-view controls.
- [x] Implement raycasting and world-to-chess-square mapping.
- [x] Add selected-square highlighting.
- [x] Handle resize and renderer disposal.
- [ ] Handle app backgrounding and WebGL context restoration.
- [ ] Test the prototype in desktop browser and Android WebView.

## P2 — Chess rules and local play
- [ ] Integrate chess.js behind a typed ChessService.
- [ ] Implement canonical board-state projection.
- [ ] Add legal move generation and highlighting.
- [ ] Add castling tests.
- [ ] Add en passant tests.
- [ ] Add promotion selection for all four legal pieces.
- [ ] Add check, checkmate, stalemate, and draw handling.
- [ ] Add move history in SAN/PGN.
- [ ] Implement local two-player turn flow.
- [ ] Add optional board rotation between turns.
- [ ] Add undo, restart, and optional clocks.
- [ ] Add save/resume with IndexedDB.

## P3 — Offline AI
- [ ] Select and pin a Stockfish WASM distribution.
- [ ] Review the exact Stockfish license and source-distribution obligations.
- [ ] Implement a Web Worker wrapper.
- [ ] Implement UCI initialization and readiness handling.
- [ ] Send FEN positions and parse bestmove responses.
- [ ] Validate every AI move through chess.js.
- [ ] Add search cancellation and worker recovery.
- [ ] Implement difficulty presets.
- [ ] Verify AI operation with network disabled.

## P4 — Final art and 3D assets
- [ ] Archive the three user-supplied concept references in the repository with provenance and usage-rights notes.
- [x] Define visual role mapping and dark/light material direction from the supplied concept references.
- [ ] Model the king, queen, bishop, knight, rook, and pawn in Blender.
- [ ] Create dark and light material variants.
- [ ] Model the final board and base.
- [ ] Create the medieval fortress environment.
- [ ] Export optimized GLB assets.
- [ ] Validate scale, pivots, materials, and mobile readability.
- [ ] Add asset manifest and license records.

## P5 — Cinematic polish
- [ ] Implement piece movement and capture animations.
- [ ] Tune lighting and shadows for mobile.
- [ ] Add restrained fog and dust particles.
- [ ] Add check and checkmate visual feedback.
- [ ] Add licensed sound effects and music.
- [ ] Build main menu and game HUD.
- [ ] Build settings and accessibility options.
- [ ] Add Albanian-history content with verifiable sources.

## P6 — Android QA and release
- [ ] Configure Android app metadata and icon.
- [ ] Verify offline asset loading.
- [ ] Test Android lifecycle and WebGL context restoration.
- [ ] Profile FPS, memory, battery, and thermal behavior on Pixel 8a.
- [ ] Test different screen sizes and orientations.
- [ ] Test interrupted and restored games.
- [ ] Audit dependencies, assets, and licenses.
- [ ] Generate signed release APK/AAB.
- [ ] Write installation and release notes.

## Definition of done
- [ ] Relevant automated tests pass.
- [ ] Type-check and production build pass.
- [ ] Acceptance criteria are demonstrated.
- [ ] Android behavior is tested where applicable.
- [ ] Documentation and license notices are updated.
