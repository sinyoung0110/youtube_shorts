# OpenMontage starter brief

Use the `animated-explainer` pipeline for a Korean beginner-friendly YouTube Short on binary search. Keep the example and all labels consistent with the shared script and timeline.

- Canvas: portrait 1080×1920, 30 fps, 33 seconds.
- Sorted input: `[4, 9, 13, 18, 23, 27, 31, 36, 42]`.
- Target: `27`.
- Comparisons: index 4/value 23, then index 6/value 31, then index 5/value 27; three comparisons total.
- Claim: binary search is `O(log n)` on sorted input. Explain that the search range shrinks by about half each check; the example takes three checks.
- Cost: prefer local Remotion/HyperFrames composition and an offline voice option. No cloud provider or paid API was selected for this starter.
- Current status: OpenMontage environment setup and provider preflight are complete. No OpenMontage pipeline render has been run.

Source files: `대본.md` and `장면표.md` in this folder.
