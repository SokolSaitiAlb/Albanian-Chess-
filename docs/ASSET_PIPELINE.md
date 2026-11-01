# Shah Shqip — 3D Asset Pipeline

## Art direction

Cinematic Medieval, inspired by Albanian history and medieval material culture.

- Dark army: near-black forged metal / obsidian, dark bronze, restrained antique-gold details.
- Light army: warm limestone / ivory, subtle warm-metal details.
- Environment: medieval stone fortress courtyard or hall, inspired by the supplied cinematic fortress reference.
- Lighting: dramatic but readable; legal-move indicators and piece silhouettes must remain clear.
- Character language: historically inspired Albanian/medieval visual motifs. Avoid presenting generated concept art as historically verified reconstruction.

## Approved visual direction — supplied concept references

The user supplied three visual references in this project conversation. Treat them as the current art-direction baseline:

1. **Six-piece lineup, dark and light armies** — primary design reference for the complete chess set. The lineup establishes the role mapping:
   - King: armored bearded ruler with horned helmet / double-headed eagle motif.
   - Queen: crowned female ruler in a long ceremonial gown.
   - Bishop: hooded cleric with staff and richly decorated vestments.
   - Knight: mounted armored warrior.
   - Rook: cylindrical medieval stone tower.
   - Pawn: lightly armored foot soldier with spear and shield.

   Preserve the clear silhouette distinction between all six roles. The two armies should share the same geometry and detailing language, with dark-metal and light-limestone material variants.

2. **King turnaround / sculpt reference** — primary modeling reference for the king. Use front, side, and rear views to guide silhouette, cloak volume, helmet, armor, base proportions, and the double-headed eagle chest emblem. The circular top-down detail is an ornamental motif reference, not a required separate chess asset.

3. **Cinematic fortress chess scene** — environment, lighting, composition, and atmosphere reference. Use the fortress stonework, mountain backdrop, overcast sky, warm braziers, subtle airborne particles, and dramatic focal lighting as visual inspiration. Keep the actual gameplay board less cluttered and more readable than the cinematic key art.

These are 2D concept images, not production 3D geometry. Do not use a flat image plane or billboard as a substitute for interactive chess pieces. The supplied references must be archived in the repository before the reference-archive checklist item can be marked complete. Record provenance and usage rights; do not imply generated imagery is public domain or historically authoritative.

## Required chess assets

Six unique chess roles:
- King
- Queen
- Bishop
- Knight
- Rook
- Pawn

Create two material variants per role. Prefer shared geometry with material variants where this preserves the intended visual distinction. The rook may require a distinct tower mesh; the knight is a mounted rider, so its silhouette and triangle budget need special attention.

## Blender workflow

1. Block out the silhouette and validate readability at actual mobile board scale.
2. Create high-detail source geometry using the supplied concept images as visual guides.
3. Retopologize for real-time rendering.
4. Create UVs and bake required detail maps.
5. Create PBR materials for dark forged metal and light limestone.
6. Standardize scale, orientation, and origin at the base center.
7. Test each model on a representative chess square, both close-up and from the default gameplay camera.
8. Export glTF 2.0 binary (.glb).
9. Validate the exported asset in a clean Three.js test scene.
10. Record file size, triangle count, texture dimensions, source, and license.

## Naming convention

```text
piece_king.glb
piece_queen.glb
piece_bishop.glb
piece_knight.glb
piece_rook.glb
piece_pawn.glb
board_main.glb
environment_fortress.glb
```

Use shared meshes with runtime material variants when appropriate:
- `army_dark`
- `army_light`

## Runtime requirements

- Load assets locally from the installed application.
- Use a manifest with explicit asset paths and metadata.
- Avoid loading duplicate geometry when material variants can share it.
- Dispose geometries, materials, and textures when no longer used.
- Consider KTX2 texture compression and mesh compression only after compatibility testing on target Android WebViews.
- Provide low-cost fallbacks for optional atmosphere and post-processing.
- Prioritize stable mobile frame time over cinematic effects.

## Asset manifest fields

Each production asset should record:
- Asset ID and path.
- Asset type and chess role.
- Author/source.
- License and attribution.
- Concept-reference ID(s).
- Blender source file path, if available.
- Export date.
- Triangle count and texture dimensions.
- Runtime validation status.
