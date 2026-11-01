# Architecture Decision Records

## ADR-001: Web-first application with Android packaging

**Status:** Accepted

**Decision:** Build the application with React, TypeScript, Vite, and Three.js, then package the web application for Android with Capacitor.

**Reasoning:** This allows rapid browser-based iteration of the 3D scene while retaining a path to an installable Android application. The trade-off is that rendering and UI run inside Android WebView rather than a fully native rendering stack.

## ADR-002: Separate chess rules from 3D rendering

**Status:** Accepted

**Decision:** Use chess.js as the rules authority. Three.js visualizes the current position and never independently decides whether a move is legal.

**Reasoning:** This prevents visual state and game state from diverging and makes chess behavior testable without a graphics context.

## ADR-003: Offline AI through Stockfish WASM

**Status:** Accepted, subject to license review

**Decision:** Integrate Stockfish WebAssembly in a Web Worker and communicate through UCI.

**Reasoning:** This supports offline play and avoids blocking the rendering/UI thread. The exact distribution and corresponding GPL-3.0 compliance requirements must be reviewed before release.

## ADR-004: GLB as the runtime 3D asset format

**Status:** Accepted

**Decision:** Author models in Blender and deliver optimized glTF 2.0 binary assets (.glb).

**Reasoning:** GLB provides a practical runtime format for geometry, PBR materials, and animation in Three.js.
