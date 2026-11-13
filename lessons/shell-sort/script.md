# 셸 정렬 — 대본 및 검산

- 대상: 처음 배우는 알고리즘 학습자
- 영상 길이: 약 52초
- 핵심 질문: 멀리 있는 값부터 먼저 움직이면?

## 왜 필요한가

삽입 정렬은 멀리 떨어진 값을 옮기기 어렵습니다. 간격을 둔 삽입 정렬로 큰 어긋남을 먼저 줄이고 마지막에 간격 1로 마무리합니다.

## 예시와 단계

입력: `[8, 5, 3, 7, 6, 2] · gaps 3, 1`

1. gap 3: 인덱스 0·3, 1·4, 2·5 정렬
2. 멀리 있는 값 이동
3. gap 1 삽입 정렬로 마무리

## 특징

- 전제: 마지막 간격은 반드시 1
- 시간: 간격 수열에 따라 다름 · halving 최악 O(n²)
- 공간/안정성: 추가 공간 O(1) · 불안정
- 장점: 제자리에서 삽입 정렬보다 멀리 이동 가능
- 한계: 복잡도와 성능이 간격 수열에 민감

## 핵심 의사코드

```text
gap = n // 2
while gap > 0:
    for i in range(gap, n):
        insert_item_among_gap(i, gap)
    gap //= 2
```

## 내레이션 및 장면표

| 구간 | 내레이션 | 화면 |
| 00.0–10.8s | 삽입 정렬은 멀리 떨어진 작은 값을 앞으로 옮기려면 여러 번 움직여야 합니다. 셸 정렬은 큰 간격으로 먼저 비교해 이런 어긋남을 줄입니다. | 왜 필요한가 |
| 11.1–24.0s | 8, 5, 3, 7, 6, 2에서 간격 3이면 인덱스 0과 3, 1과 4, 2와 5를 같은 그룹으로 정렬합니다. 그 뒤 간격 1로 전체를 삽입 정렬합니다. | 숫자 예시 |
| 24.3–36.3s | 처음 간격은 보통 n 나누기 2, 다음은 절반씩 줄입니다. 각 간격마다 그 간격만큼 떨어진 원소들에 삽입 정렬을 적용하고 마지막엔 반드시 1로 마칩니다. | 핵심 코드 |
| 36.6–51.5s | 추가 공간은 O(1)이지만 시간 복잡도는 간격 수열에 따라 달라집니다. 절반씩 줄이는 수열의 최악은 O(n²)이고 안정 정렬도 아닙니다. 특정 복잡도를 말할 때는 간격을 함께 밝혀야 합니다. | 복잡도와 선택 기준 |

## 사실 확인 자료

- [Princeton Algorithms: 정렬 성능표](https://algs4.cs.princeton.edu/cheatsheet/) — 선택·삽입·셸·병합·퀵·힙의 구현별 최선·평균·최악 비교 횟수, 추가 공간, 안정성.
- [Open Data Structures: Counting/Radix sort](https://opendatastructures.org/versions/edition-0.1e/ods-cpp.pdf) — 계수·기수 정렬의 범위, 자릿수, 안정성 요구.
- [CLRS bucket sort 분석 자료](https://belohlavek.inf.upol.cz/vyuka/Cormen-bucket-sort-analysis.pdf) — 균등 분포일 때 기대 선형 시간이라는 조건과 분석.
- [Auckland: Shellsort gap sequences](https://www.cs.auckland.ac.nz/courses/compsci220s1t/lectures/lecturenotes/GG-lectures/220slides-lecture06.pdf) — 시간 복잡도는 간격 수열에 의존하며, 이 자료의 halving sequence 분석을 영상 설명과 구분.
- [OpenDSA: Bubble sort](https://opendsa-server.cs.vt.edu/ODSA/Books/pubbook/odsa-all/fall-2019/Public_Instance/html/BubbleSort.html) — 조기 종료 없는 기본 반복 구조의 실행 시간.
- [NIST DADS: Bubble sort](https://xlinux.nist.gov/dads/HTML/bubblesort.html) — 알고리즘 정의 및 일반적인 제곱 시간 특성.
