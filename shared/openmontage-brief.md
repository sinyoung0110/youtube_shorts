# OpenMontage 제작 brief

한국어 초보자 대상 55초 세로형 교육 영상. 정렬 배열 이진 탐색의 실행 흐름, 반복문, Big O를 실제 값으로 가르칩니다. 숫자와 범위를 임의로 바꾸지 말고 `대본.md`와 `장면표.md`를 기준으로 합니다.

- Canvas: 1080×1920, 30fps, 55초.
- Sorted input: `[-1, 0, 3, 5, 9, 12]`; target `9`.
- 0-based indices. First: `lo=0`, `hi=5`, `mid=(0+5)//2=2`, `A[2]=3<9`, update `lo=3`.
- Second: `lo=3`, `hi=5`, `mid=(3+5)//2=4`, `A[4]=9`, return index 4. Two midpoint checks.
- Code: `lo, hi = 0, len(A)-1`; while `lo <= hi`; set `mid=(lo+hi)//2`; return if equal; update only one bound with `mid±1`; return `-1` when the interval is empty.
- Big O: best case `O(1)`, average/worst case `O(log n)` time; iterative extra space `O(1)`. For n=16, maximum midpoint checks are `floor(log2(16))+1=5`.
- Explain Big O as growth rate, not an exact count. Mention the array must already be sorted.
- One brief note may distinguish the user's recursive BST example: arrays update index bounds; BST traversal follows `node.left/right`.
- Voice: offline macOS Korean Yuna narration supplied at `../remotion/public/audio/narration.wav`. Do not replace it with a paid/cloud provider.
- Current OpenMontage setup is ready; no OpenMontage render has been run for this lesson.
