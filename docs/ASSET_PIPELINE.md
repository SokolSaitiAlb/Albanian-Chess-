# Shah Shqip — Historical Chess Asset Pipeline

## Core identity

Shah Shqip is an Albanian-history-inspired chess experience. Its six traditional chess roles are represented through figures and defensive architecture associated with Arbëria in the fifteenth century.

The international rules and six-role structure of chess remain unchanged. Historical identity is expressed through character design, heraldry, materials, architecture, and narrative content.

**Creative direction:** cinematic medieval, historically grounded in visual language, with a clear distinction between documented history and artistic interpretation.

## Canonical six-piece cast

The following mapping is the approved product direction. It replaces generic fantasy chess-piece concepts.

| Chess role | Shah Shqip identity | Visual asset |
|---|---|---|
| King | Gjergj Kastrioti Skënderbeu | Armored Albanian ruler, horned goat-head helmet crest inspired by the Vienna helmet tradition, Kastrioti heraldic sword and double-headed eagle motif |
| Queen | Donika Kastrioti (Arianiti) | Fifteenth-century noblewoman, ceremonial gown, embroidered mantle, noble veil and restrained Byzantine-Arbëresh goldwork |
| Bishop | Pal Engjëlli | Fifteenth-century archbishop, episcopal mitre, pastoral staff, vestments and a manuscript |
| Knight | Arbërian cavalry / Stratioti | Mounted light-cavalry warrior, warhorse, round bronze-trimmed shield and lance |
| Rook | Krujë Castle tower | Cylindrical medieval stone defensive tower, battlements, arrow slits, torch niches and weathered masonry |
| Pawn | League of Lezhë foot soldier / oath-bound defender | Infantry guard with conical helmet, round shield, spear and short sword |

Each role must be immediately recognizable from its silhouette at normal gameplay camera distance. The King and Queen should have the strongest character presence; Bishop and Knight need distinctive vertical and mounted silhouettes; Rook must read as architecture; Pawn must remain visually simpler and smaller.

## The two armies

Create two material variants for each of the six roles:

- **Dark Army:** charcoal / near-black forged metal and dark stone, aged bronze, restrained antique-gold trim.
- **Light Army:** warm limestone / ivory stone, subtle gold and bronze details.

Prefer one shared role mesh with material variants when appropriate. If a role requires different geometry for readability, keep the two versions visually consistent.

The expected runtime set is six role meshes and twelve role/material combinations. This is not a requirement to duplicate all geometry.

## Character-specific art briefs

### King — Gjergj Kastrioti Skënderbeu

- Heroic but plausible fifteenth-century Albanian noble-warrior proportions.
- Beard, armor, layered cloak and a strong, readable stance.
- Helmet crest inspired by the famous goat-head helmet associated with Skanderbeg and the Vienna collection.
- Sword and Kastrioti heraldic references.
- Double-headed eagle motif may be used as a chest emblem or shield detail.
- Avoid modern fantasy plate armor, oversized weapons, or anachronistic ornament.

### Queen — Donika Kastrioti (Arianiti)

- Noblewoman rather than a generic fantasy queen.
- Fifteenth-century court dress, layered fabric, embroidered mantle and noble veil.
- Jewelry and goldwork should be restrained and historically plausible.
- Pose should communicate authority and diplomacy, not a combat role.
- Avoid a European fantasy crown unless supported by a documented reference.

### Bishop — Pal Engjëlli

- Archbishop and statesman, not a generic wizard.
- Episcopal mitre, pastoral staff, period-appropriate vestments and manuscript.
- Calm, authoritative pose.
- Avoid magical effects, fantasy runes, or oversized fantasy staff ornaments.

### Knight — Arbërian cavalry / Stratioti

- Mounted warrior on a compact warhorse silhouette.
- Round shield, lance and period-inspired light/medium cavalry equipment.
- Horse and rider must be one optimized asset or a small number of efficiently managed meshes.
- Pose should communicate speed and maneuverability while fitting one chess square.
- Avoid tournament-knight chess iconography; this is a mounted historical warrior.

### Rook — Krujë Castle tower

- A defensive tower inspired by the stone fortifications of Krujë.
- Cylindrical or slightly tapered masonry form, battlements, narrow arrow slits and a robust base.
- Readable architectural silhouette from above and at gameplay distance.
- Avoid generic European fairy-tale castle styling.

### Pawn — League of Lezhë foot soldier

- Ordinary defender / infantryman, visually less ornate than the King.
- Conical helmet, round shield, spear and short sword.
- Practical clothing and protective equipment.
- Sturdy, compact pose suitable for repeated use across sixteen pieces.
- Avoid making pawns look like miniature kings or elite knights.

## Supplied concept references

The project conversation contains three visual references supplied by the user:

1. **Complete six-piece lineup** — design reference for the six role identities and dark/light material treatments.
2. **King turnaround / sculpt reference** — front, side and rear views for the Skanderbeg King model, including cloak, armor, helmet, base and heraldic chest motif.
3. **Cinematic fortress chess scene** — environmental mood, stonework, mountain backdrop, braziers, overcast lighting and atmospheric composition.

These are 2D concept references, not production geometry. Do not use flat image planes or billboards as substitutes for the playable chess pieces. Archive the original reference files in the repository before marking the reference-archive task complete. Record provenance and usage rights.

## Historical accuracy and editorial policy

This is a creative game inspired by the history of Arbëria, not a claim that every chess role was a literal historical office or that every visual detail is an authenticated reconstruction.

Before publishing the in-game historical encyclopedia, fact-check dates, titles, quotations, heraldic claims, battle counts, siege descriptions, and biographical details against reputable historical sources. In particular:

- Distinguish documented facts from later tradition and modern artistic interpretation.
- Describe the 1443–1468 resistance period carefully and avoid unsupported exact battle totals.
- Verify the wording, date, and context of the *Athleta Christi* title before presenting it as a direct contemporary award.
- Verify the details and dating of the 1451 marriage and its location before presenting them as settled fact.
- Verify Pal Engjëlli's role and the manuscript context of the 1462 *Formula e Pagëzimit*.
- Treat the Vienna helmet's attribution, provenance, and iconographic interpretation carefully.
- Verify the chronology and outcomes of the three major Krujë sieges before publishing claims about them.
- Do not imply that every foot soldier or cavalry unit used identical equipment.

Historical copy may be localized into Albanian and English, but both versions must preserve the same verified meaning.

## Blender production workflow

1. Create a blockout for each role and compare it against the approved concept references.
2. Validate the six silhouettes on an 8×8 board at actual mobile display scale.
3. Sculpt or model the high-detail source mesh.
4. Retopologize and create UVs.
5. Bake normal, ambient-occlusion and other required detail maps.
6. Author PBR materials for the Dark and Light armies.
7. Standardize scale, forward axis, pivot and origin at the center of the base.
8. Test the model under the actual Three.js gameplay camera and lighting.
9. Export glTF 2.0 binary (.glb).
10. Validate loading, materials, bounds, memory use and frame time in a clean Three.js scene and Android WebView.
11. Record triangle count, texture dimensions, file size, source and license.

## Runtime asset naming

```text
piece_king.glb
piece_queen.glb
piece_bishop.glb
piece_knight.glb
piece_rook.glb
piece_pawn.glb
board_main.glb
environment_kruje_fortress.glb
```

Suggested material identifiers:

- `army_dark`
- `army_light`

## Runtime requirements

- All gameplay-critical assets must be packaged locally and work offline.
- Load GLB files through Three.js GLTFLoader.
- Use an asset manifest with explicit paths, roles, variants and license metadata.
- Share geometry between material variants where possible.
- Dispose geometries, materials and textures when no longer used.
- Consider mesh and texture compression only after testing on the target Android WebView.
- Provide a reduced-cost environment mode for mobile.
- Preserve clear piece recognition and board readability over cinematic effects.
- Do not claim a model is historically accurate solely because it resembles generated concept art.

## Asset manifest fields

Each production asset must record:

- Asset ID and path.
- Chess role and army variant.
- Author / generation or modeling source.
- License and attribution.
- Concept-reference identifier(s).
- Blender source file path, if available.
- Export date.
- Triangle count and texture dimensions.
- Bounding dimensions, origin and forward-axis convention.
- Runtime validation status.
