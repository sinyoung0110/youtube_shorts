# 선택 정렬 — 대본 및 검산

- 대상: 처음 배우는 알고리즘 학습자
- 영상 길이: 약 45초
- 핵심 질문: 남은 값 중 가장 작은 것만 앞으로

## 왜 필요한가

매 단계 남은 구간에서 최솟값을 골라 앞에 확정합니다. 비교는 많지만 교환 횟수가 적어 쓰기 비용이 큰 환경에 쓸 수 있습니다.

## 예시와 단계

입력: `[5, 3, 4, 1]`

1. 최솟값 1을 찾아 첫 칸과 교환
2. 남은 [3,4,5]에서 3 선택
3. 차례대로 확정 → [1,3,4,5]

## 특징

- 전제: 앞쪽부터 위치를 확정
- 시간: 최선·평균·최악 O(n²)
- 공간/안정성: 추가 공간 O(1) · 보통 불안정
- 장점: 교환 최대 n−1회
- 한계: 거의 정렬돼도 비교 횟수는 제곱

## 핵심 의사코드

```text
for i in range(n - 1):
    m = i
    for j in range(i + 1, n):
        if A[j] < A[m]: m = j
    A[i], A[m] = A[m], A[i]
```

## 내레이션 및 장면표

| 구간 | 내레이션 | 화면 |
| 00.0–11.1s | 데이터를 정렬하면서 쓰기 횟수를 아껴야 할 때는 선택 정렬의 아이디어를 볼 수 있습니다. 남은 값 중 가장 작은 하나를 골라 앞자리와 바꿉니다. | 왜 필요한가 |
| 11.4–22.9s | 5, 3, 4, 1에서 최솟값 1을 찾아 맨 앞 5와 교환합니다. 남은 3, 4, 5에서 3을 고르고, 다음은 4를 고르면 완성입니다. | 숫자 예시 |
| 23.2–32.9s | i는 다음에 확정할 자리, m은 지금까지 찾은 최솟값 위치입니다. 뒤쪽을 끝까지 훑고 한 번 교환한 뒤 다음 자리로 이동합니다. | 핵심 코드 |
| 33.2–45.1s | 입력이 어떻든 비교는 O(n²), 추가 공간은 O(1)입니다. 교환은 최대 n−1번이라 쓰기는 적지만, 같은 값 순서가 바뀔 수 있어 보통 안정 정렬은 아닙니다. | 복잡도와 선택 기준 |

## 사실 확인 자료

- [Princeton Algorithms: 정렬 성능표](https://algs4.cs.princeton.edu/cheatsheet/) — 선택·삽입·셸·병합·퀵·힙의 구현별 최선·평균·최악 비교 횟수, 추가 공간, 안정성.
- [Open Data Structures: Counting/Radix sort](https://opendatastructures.org/versions/edition-0.1e/ods-cpp.pdf) — 계수·기수 정렬의 범위, 자릿수, 안정성 요구.
- [CLRS bucket sort 분석 자료](https://belohlavek.inf.upol.cz/vyuka/Cormen-bucket-sort-analysis.pdf) — 균등 분포일 때 기대 선형 시간이라는 조건과 분석.
- [Auckland: Shellsort gap sequences](https://www.cs.auckland.ac.nz/courses/compsci220s1t/lectures/lecturenotes/GG-lectures/220slides-lecture06.pdf) — 시간 복잡도는 간격 수열에 의존하며, 이 자료의 halving sequence 분석을 영상 설명과 구분.
- [OpenDSA: Bubble sort](https://opendsa-server.cs.vt.edu/ODSA/Books/pubbook/odsa-all/fall-2019/Public_Instance/html/BubbleSort.html) — 조기 종료 없는 기본 반복 구조의 실행 시간.
- [NIST DADS: Bubble sort](https://xlinux.nist.gov/dads/HTML/bubblesort.html) — 알고리즘 정의 및 일반적인 제곱 시간 특성.
