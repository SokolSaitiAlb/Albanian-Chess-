# Shah Shqip — 3D Asset Pipeline

## Art direction

Cinematic Medieval, inspired by Albanian history and medieval material culture.

- Dark army: obsidian, dark bronze, restrained antique-gold details.
- Light army: limestone, ivory, subtle warm-metal details.
- Environment: medieval stone hall and fortress-inspired architecture.
- Lighting: dramatic but readable; avoid hiding legal-move indicators or piece silhouettes.

## Reference policy

Higgsfield-generated concept images are visual references. They are not production 3D geometry and must not be represented as finished GLB assets.

Before modeling, preserve the original reference images and record their source and usage rights in the asset manifest.

## Required chess assets

Six unique chess roles:
- King
- Queen
- Bishop
- Knight
- Rook
- Pawn

Create two material variants per role. Prefer shared geometry with material variants where this preserves the intended visual distinction.

## Blender workflow

1. Block out the silhouette and validate readability at actual mobile board scale.
2. Create high-detail source geometry.
3. Retopologize for real-time rendering.
4. Create UVs and bake required detail maps.
5. Create PBR materials.
6. Standardize scale, orientation, and origin at the base center.
7. Test each model on a representative chess square.
8. Export glTF 2.0 binary (.glb).
9. Validate the exported asset in a clean Three.js test scene.
10. Record file size, texture dimensions, triangle count, source, and license.

## Naming convention

```text
piece_king_dark.glb
piece_king_light.glb
piece_queen_dark.glb
piece_queen_light.glb
...
board_main.glb
environment_medieval_hall.glb
```

## Runtime requirements

- Load assets locally from the installed application.
- Use a manifest with explicit asset paths and metadata.
- Avoid loading duplicate geometry when material variants can share it.
- Dispose geometries, materials, and textures when no longer used.
- Consider KTX2 texture compression and mesh compression only after compatibility testing on target Android WebViews.
- Provide low-cost fallbacks for optional atmosphere and post-processing.

## Asset manifest fields

Each production asset should record:
- Asset ID and path.
- Asset type.
- Author/source.
- License and attribution.
- Blender source file path, if available.
- Export date.
- Triangle count and texture dimensions.
- Runtime validation status.
