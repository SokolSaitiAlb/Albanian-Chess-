# Shah Shqip — Software Architecture

## Architectural rules

1. The chess domain is authoritative for game legality and outcomes.
2. Three.js is a presentation layer; it never owns the canonical chess state.
3. AI proposes moves; the chess domain validates them.
4. React owns application UI, not the Three.js render loop.
5. Persistence is accessed through repository interfaces.
6. The first release must work without network access.

## Runtime flow

```text
React UI
   |
Game Controller
   |-----------------------|
   |                       |
Chess Domain            Three.js View
(chess.js)              (scene and input)
   |
AI Adapter (optional)
   |
Stockfish Web Worker

Game Controller
   |
Persistence Repository
   |
IndexedDB
```

## Move lifecycle

1. The player selects a rendered piece.
2. The 3D input controller maps the pointer/touch position to a board square.
3. The game controller requests legal destinations from the chess domain.
4. The player selects a destination.
5. The chess domain validates and applies the move.
6. The updated domain state is projected into the Three.js view.
7. The game controller persists the new snapshot.
8. If the mode is AI, the current FEN is sent to Stockfish.
9. The AI adapter returns a proposed UCI move.
10. The chess domain validates the AI move before it is committed and rendered.

## Coordinate conventions

- Algebraic files: a through h.
- Algebraic ranks: 1 through 8.
- Internal square mapping must be implemented in one tested utility.
- The 3D board uses a documented world-space orientation.
- Piece model origins must be aligned to the center of their board square.
- Board rotation must not change chess-domain coordinates.

## Module boundaries

### chess/
Wrap chess.js and expose typed operations for legal moves, move application, FEN, PGN, turn, check state, and game outcome.

### game/
Own game mode, player configuration, session lifecycle, turn flow, undo/restart, and orchestration.

### three/
Own renderer, scene graph, camera, GLB loading, raycasting, board projection, animation, and resource disposal.

### ai/
Own Worker creation, Stockfish loading, UCI parsing, search cancellation, difficulty configuration, and engine errors.

### data/
Own IndexedDB schema, version migrations, and repositories for saved games and settings.

### app/ and components/
Own navigation, screens, HUD, menus, dialogs, and accessibility.

## Error handling

- Asset loading failures must show a recoverable state and log actionable diagnostics.
- AI failures must allow the player to retry or finish in local two-player mode.
- Persistence failures must not silently report a successful save.
- WebGL context loss must pause interaction and attempt a controlled renderer/scene restoration.
- Invalid moves must not mutate the canonical game state.

## Testing boundaries

- Chess rules: unit tests with known FEN positions and special-move cases.
- Game controller: deterministic state-transition tests.
- AI adapter: mocked UCI protocol tests plus real engine smoke tests.
- Three.js: coordinate mapping, picking, and lifecycle tests.
- End-to-end: start game, play moves, complete a game, save, and restore.
