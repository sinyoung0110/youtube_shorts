# 계수 정렬 — 대본 및 검산

- 대상: 처음 배우는 알고리즘 학습자
- 영상 길이: 약 51초
- 핵심 질문: 값을 비교하지 않고 개수를 세면?

## 왜 필요한가

정수의 값 범위가 좁다면 값별 출현 횟수를 세어 바로 순서대로 출력할 수 있습니다. 비교 정렬의 하한을 피하지만 범위가 커지면 낭비가 큽니다.

## 예시와 단계

입력: `[4, 2, 2, 1, 3]`

1. 1:1개 · 2:2개 · 3:1개 · 4:1개
2. 값 순서로 개수만큼 출력
3. [1, 2, 2, 3, 4]

## 특징

- 전제: 정수 키와 감당 가능한 작은 값 범위
- 시간: 시간 O(n + k) · k=max−min+1
- 공간/안정성: 추가 공간 O(n + k) · 출력형 구현
- 장점: 범위가 작으면 비교 없이 선형에 가까움
- 한계: 값 범위가 크면 시간·메모리 낭비

## 핵심 의사코드

```text
lo, hi = min(A), max(A)
count = [0] * (hi - lo + 1)
for x in A: count[x - lo] += 1
result = []
for i, c in enumerate(count):
    result.extend([i + lo] * c)
```

## 내레이션 및 장면표

| 구간 | 내레이션 | 화면 |
| 00.0–10.6s | 값을 하나씩 비교하지 않고도 정렬할 수 있을까요? 계수 정렬은 정수 값의 범위가 작을 때 각 값이 몇 번 나왔는지 세어 순서대로 내보냅니다. | 왜 필요한가 |
| 10.9–23.0s | 4, 2, 2, 1, 3에서 1은 한 번, 2는 두 번, 3과 4는 각각 한 번입니다. 이 개수를 차례대로 출력하면 1, 2, 2, 3, 4가 됩니다. | 숫자 예시 |
| 23.3–34.0s | 최솟값과 최댓값 차이만큼 count 배열을 만들고, x가 나오면 해당 칸을 하나 늘립니다. 마지막에 각 값을 저장된 횟수만큼 결과에 추가합니다. | 핵심 코드 |
| 34.3–50.8s | k를 값 범위 크기라고 하면 시간은 O(n+k)입니다. 이 코드처럼 결과 배열을 따로 만들면 공간도 O(n+k)입니다. 범위가 좁은 정수에서 유리하고, 범위가 데이터 수보다 훨씬 크면 메모리와 초기화 비용이 커집니다. | 복잡도와 선택 기준 |

## 사실 확인 자료

- [Princeton Algorithms: 정렬 성능표](https://algs4.cs.princeton.edu/cheatsheet/) — 선택·삽입·셸·병합·퀵·힙의 구현별 최선·평균·최악 비교 횟수, 추가 공간, 안정성.
- [Open Data Structures: Counting/Radix sort](https://opendatastructures.org/versions/edition-0.1e/ods-cpp.pdf) — 계수·기수 정렬의 범위, 자릿수, 안정성 요구.
- [CLRS bucket sort 분석 자료](https://belohlavek.inf.upol.cz/vyuka/Cormen-bucket-sort-analysis.pdf) — 균등 분포일 때 기대 선형 시간이라는 조건과 분석.
- [Auckland: Shellsort gap sequences](https://www.cs.auckland.ac.nz/courses/compsci220s1t/lectures/lecturenotes/GG-lectures/220slides-lecture06.pdf) — 시간 복잡도는 간격 수열에 의존하며, 이 자료의 halving sequence 분석을 영상 설명과 구분.
- [OpenDSA: Bubble sort](https://opendsa-server.cs.vt.edu/ODSA/Books/pubbook/odsa-all/fall-2019/Public_Instance/html/BubbleSort.html) — 조기 종료 없는 기본 반복 구조의 실행 시간.
- [NIST DADS: Bubble sort](https://xlinux.nist.gov/dads/HTML/bubblesort.html) — 알고리즘 정의 및 일반적인 제곱 시간 특성.
