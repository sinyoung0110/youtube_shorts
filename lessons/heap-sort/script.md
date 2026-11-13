# 힙 정렬 — 대본 및 검산

- 대상: 처음 배우는 알고리즘 학습자
- 영상 길이: 약 45초
- 핵심 질문: 최댓값을 매번 빠르게 꺼내려면?

## 왜 필요한가

완전 이진 트리 모양의 힙은 배열에 저장되고 부모가 자식보다 큰 성질을 가집니다. 루트 최댓값을 끝으로 보내며 정렬합니다.

## 예시와 단계

입력: `[4, 10, 3, 5, 1]`

1. 최대 힙 구성: 루트 10
2. 10과 끝의 1 교환
3. 남은 힙에서 다음 최대 5 꺼내기

## 특징

- 전제: 부모 값 ≥ 자식 값인 최대 힙
- 시간: 최선·평균·최악 O(n log n)
- 공간/안정성: 배열 내부 정렬 O(1) · 불안정
- 장점: 최악도 O(n log n) · 추가 배열 불필요
- 한계: 안정적이지 않고 메모리 접근이 흩어짐

## 핵심 의사코드

```text
build_max_heap(A)
for end in range(n - 1, 0, -1):
    swap(A[0], A[end])
    sift_down(A, 0, end)
```

## 내레이션 및 장면표

| 구간 | 내레이션 | 화면 |
| 00.0–10.0s | 최댓값을 반복해서 찾아야 한다면 힙을 쓸 수 있습니다. 배열로 표현한 최대 힙은 부모가 자식보다 크고, 가장 큰 값이 항상 루트에 있습니다. | 왜 필요한가 |
| 10.3–22.4s | 4, 10, 3, 5, 1로 최대 힙을 만들면 루트는 10입니다. 10을 배열 끝으로 보내고, 남은 부분을 다시 힙으로 고치면 다음 최댓값 5가 루트에 옵니다. | 숫자 예시 |
| 22.7–32.3s | 먼저 build max heap으로 힙을 만들고, 루트와 끝을 바꿉니다. sift down은 새 루트를 더 큰 자식과 바꾸며 힙 성질을 복구합니다. | 핵심 코드 |
| 32.6–44.9s | 힙 구성은 선형 시간이고 전체 정렬은 최선과 최악 모두 O(n log n)입니다. 배열 안에서 처리해 추가 공간 O(1)이지만 안정 정렬은 아니고 접근이 흩어질 수 있습니다. | 복잡도와 선택 기준 |

## 사실 확인 자료

- [Princeton Algorithms: 정렬 성능표](https://algs4.cs.princeton.edu/cheatsheet/) — 선택·삽입·셸·병합·퀵·힙의 구현별 최선·평균·최악 비교 횟수, 추가 공간, 안정성.
- [Open Data Structures: Counting/Radix sort](https://opendatastructures.org/versions/edition-0.1e/ods-cpp.pdf) — 계수·기수 정렬의 범위, 자릿수, 안정성 요구.
- [CLRS bucket sort 분석 자료](https://belohlavek.inf.upol.cz/vyuka/Cormen-bucket-sort-analysis.pdf) — 균등 분포일 때 기대 선형 시간이라는 조건과 분석.
- [Auckland: Shellsort gap sequences](https://www.cs.auckland.ac.nz/courses/compsci220s1t/lectures/lecturenotes/GG-lectures/220slides-lecture06.pdf) — 시간 복잡도는 간격 수열에 의존하며, 이 자료의 halving sequence 분석을 영상 설명과 구분.
- [OpenDSA: Bubble sort](https://opendsa-server.cs.vt.edu/ODSA/Books/pubbook/odsa-all/fall-2019/Public_Instance/html/BubbleSort.html) — 조기 종료 없는 기본 반복 구조의 실행 시간.
- [NIST DADS: Bubble sort](https://xlinux.nist.gov/dads/HTML/bubblesort.html) — 알고리즘 정의 및 일반적인 제곱 시간 특성.
