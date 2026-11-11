---
name: algorithm-short-lesson
description: Turn a study topic or concept into a beginner-friendly Korean lesson script and rendered educational short, with motivation, a worked example, relevant code and complexity, operations, and a practice problem.
---

# Algorithm Short Lesson

In this YouTube Shorts project, when the user names a topic or concept they want to study, create the lesson script and video by default. Follow this skill even when they provide only a topic name. If they explicitly ask for text only, a different language, or a different format, follow that request.

## Priority order

1. Explain **why the idea was created**, what problem it solves, where it is useful, and its advantages and disadvantages. This is the user's highest priority; do not drop it to save runtime.
2. If the lesson is getting long, shorten secondary details before cutting the core explanation.
3. Make the explanation beginner-friendly, concrete, and interesting. Use a question or practical problem to create curiosity, then show how the concept resolves it.

## Lesson structure

Write the script and notes in Korean by default, in this order:

1. **Overview:** origin/motivation, practical use, benefits, and limitations.
2. **Example:** one small, fully worked example. Show intermediate values and decisions, not only the final answer.
3. **Characteristics:** prerequisites, assumptions, invariants, time and space complexity. Give best/average/worst cases when they materially differ. Explain Big O as growth, not an exact count.
4. **Operations:** show the code or pseudocode for the operations that fit the topic (for example search, insert, delete, or traversal). Explain the relevant lines and how state changes. Do not force irrelevant operations into the video.
5. **Practice problem:** give the learner a short problem to calculate or solve. Include a worked solution in the notes; reveal it in the video when the runtime allows.

For data structures, include the relevant operation costs and necessary conditions. For other concepts, adapt the “operations” section to their actual steps or use cases rather than inventing operations. If the learner provides code for a related but different concept (such as BST traversal versus array binary search), identify the distinction briefly and keep the main lesson on the requested concept.

## Runtime and video defaults

- A lesson may run **up to 2 minutes**. Choose enough time to teach the example, code, complexity, and practice clearly. Do not compress it to 33 seconds by default.
- If the content needs trimming, preserve motivation, one representative example, the key code path, complexity/preconditions, and a practice question first. Compress repeated examples, secondary operations, and extended history before those core pieces.
- Make Remotion the primary rendered video. Keep code large enough to read on a phone; highlight the active line while narration explains it. Animate the example's actual variables or candidates so the visual trace matches the code.
- Project visual defaults: portrait 9:16 at 1080×1920 and 30fps; dark slate background; clean Apple SD Gothic Neo-style Korean sans serif; readable monospaced code. Treat these as defaults, not constraints if the user asks for a different style.
- The user chose free offline Korean narration. Use macOS Yuna when available and keep audio local; do not switch to cloud voices or paid providers unless the user asks. If unavailable, explain the limit and offer a local alternative.

## Accuracy check before rendering

- Work through the example independently. Verify every value, index convention, midpoint/rounding rule, boundary update, loop condition, return value, and not-found case.
- Ensure the spoken explanation, displayed code, highlighted lines, worked example, and practice answer all use the same notation and values.
- State prerequisites such as sorted input. Do not claim `O(log n)` for a structure or case where it does not apply; distinguish time from auxiliary space and Big O from the example's exact step count.
- For code, check that the shown logic is valid for the chosen language or label it pseudocode. Make boundary conditions visible, especially inclusive versus exclusive bounds and off-by-one updates.
- After edits, run the relevant project lint/type check and render the video. Inspect representative frames, verify the audio/video duration and stream, and decode the final MP4. Do not claim a render is complete before checking the output file.

## Project workflow

- Use the repository-root `templates/lesson-script-template.md` for a new episode's script and scene plan.
- Preserve the existing binary-search episode. Put each new episode's script, scene plan, code, and notes under `lessons/<topic-slug>/`; add a Remotion composition under `remotion/src/lessons/` and register it in `remotion/src/Root.tsx`. Put local narration under `remotion/public/audio/` and render to `remotion/out/` with a topic-specific filename.
- Keep the example and practice solution in companion text so the learner can review them after watching.
- This repository has an existing user instruction to commit completed work to its configured GitHub `origin` after rendering and verification; keep commits scoped to the new lesson and shared workflow changes.

## Deliverable summary

Provide links to the rendered MP4 and companion script, then briefly state the motivating problem, example result, complexity, and practice problem. Note any section intentionally shortened and why. Include the commit link when the completed work has been pushed.
