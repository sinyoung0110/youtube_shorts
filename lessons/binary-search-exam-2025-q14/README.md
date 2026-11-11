# 2025 국가직 데이터직 알고리즘 14번

재귀 이진 탐색을 두 번 실행할 때 전역 `count` 값이 어떻게 변하는지 추적하는 풀이 영상입니다.

- [완성 영상](../../remotion/out/binary-search-exam-2025-q14.mp4)
- [대본과 단계별 계산](script.md)
- [장면표](scene-plan.md)
- [정리한 C 코드](solution.c)

정답 출력은 `count: 5, count: 9`입니다. 첫 검색의 실패 시 빈 구간 호출도 `count++`가 먼저 실행되어 세며, 두 번째 검색은 전역 `count`를 초기화하지 않아 5부터 누적합니다.
