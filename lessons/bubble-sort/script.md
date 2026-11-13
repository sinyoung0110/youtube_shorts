# 버블 정렬 — 대본 및 검산

- 대상: 처음 배우는 알고리즘 학습자
- 영상 길이: 약 58초
- 핵심 질문: 이웃끼리 바꾸면 큰 값이 어디로 갈까?

## 왜 필요한가

가까운 원소를 차례로 비교·교환해 큰 값을 끝으로 밀어냅니다. 동작이 단순해 학습에는 좋지만 큰 입력에는 비효율적입니다.

## 예시와 단계

입력: `[5, 1, 4, 2]`

1. 5와 1 교환 → [1,5,4,2]
2. 5와 4, 이어서 5와 2 교환
3. 첫 바퀴 끝 → [1,4,2,5]

## 특징

- 전제: 인접한 두 값을 비교해 큰 값을 오른쪽으로 · 조기 종료 최적화 없음
- 시간: 기본 구현: 최선·평균·최악 Θ(n²)
- 공간/안정성: 추가 공간 O(1) · 안정 정렬
- 장점: 구현과 동작 원리가 단순
- 한계: 정렬된 입력도 비교를 계속해 큰 입력에 비효율적

## 핵심 의사코드

```text
for end in range(n - 1, 0, -1):
    for i in range(end):
        if A[i] > A[i + 1]:
            A[i], A[i+1] = A[i+1], A[i]
```

## 내레이션 및 장면표

| 구간 | 내레이션 | 화면 |
| 00.0–12.2s | 큰 값을 오른쪽 끝으로 보내는 가장 단순한 정렬을 볼까요? 이웃한 두 값을 비교하고 순서가 거꾸로면 바꿉니다. 한 바퀴가 끝나면 가장 큰 값이 제자리에 갑니다. | 왜 필요한가 |
| 12.5–28.2s | 5, 1, 4, 2에서 5와 1, 다음 5와 4, 다음 5와 2를 비교하며 바꾸면 첫 바퀴 끝에 5가 맨 오른쪽에 갑니다. 다음 바퀴는 1과 4, 4와 2를 비교해 1, 2, 4, 5가 됩니다. | 숫자 예시 |
| 28.5–41.0s | 코드에는 교환이 없으면 멈추는 장치가 없습니다. 원소가 네 개면 비교 횟수는 3 더하기 2 더하기 1, 총 6회입니다. 입력이 이미 정렬돼도 같은 여섯 번을 비교합니다. | 핵심 코드 |
| 41.3–58.1s | 따라서 지금 본 기본 구현은 최선·평균·최악 모두 세타 n제곱입니다. 교환이 없는 바퀴에서 멈추는 최적화 버전만 최선 세타 n으로 줄어듭니다. 공간은 상수이고 안정 정렬이지만, 큰 입력에는 보통 다른 정렬을 고릅니다. | 복잡도와 선택 기준 |

## 사실 확인 자료

- [Princeton Algorithms: 정렬 성능표](https://algs4.cs.princeton.edu/cheatsheet/) — 선택·삽입·셸·병합·퀵·힙의 구현별 최선·평균·최악 비교 횟수, 추가 공간, 안정성.
- [Open Data Structures: Counting/Radix sort](https://opendatastructures.org/versions/edition-0.1e/ods-cpp.pdf) — 계수·기수 정렬의 범위, 자릿수, 안정성 요구.
- [CLRS bucket sort 분석 자료](https://belohlavek.inf.upol.cz/vyuka/Cormen-bucket-sort-analysis.pdf) — 균등 분포일 때 기대 선형 시간이라는 조건과 분석.
- [Auckland: Shellsort gap sequences](https://www.cs.auckland.ac.nz/courses/compsci220s1t/lectures/lecturenotes/GG-lectures/220slides-lecture06.pdf) — 시간 복잡도는 간격 수열에 의존하며, 이 자료의 halving sequence 분석을 영상 설명과 구분.
- [OpenDSA: Bubble sort](https://opendsa-server.cs.vt.edu/ODSA/Books/pubbook/odsa-all/fall-2019/Public_Instance/html/BubbleSort.html) — 조기 종료 없는 기본 반복 구조의 실행 시간.
- [NIST DADS: Bubble sort](https://xlinux.nist.gov/dads/HTML/bubblesort.html) — 알고리즘 정의 및 일반적인 제곱 시간 특성.
