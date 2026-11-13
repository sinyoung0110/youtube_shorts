# 기수 정렬 — 대본 및 검산

- 대상: 처음 배우는 알고리즘 학습자
- 영상 길이: 약 47초
- 핵심 질문: 큰 수를 자릿수별로 안정 정렬하면?

## 왜 필요한가

숫자 전체를 비교하는 대신 낮은 자리부터 각 자릿수로 안정 정렬합니다. 자릿수와 기수가 제한된 키에 효과적입니다.

## 예시와 단계

입력: `[21, 13, 12, 23]`

1. 일의 자리 안정 정렬 → [21,12,13,23]
2. 십의 자리 안정 정렬
3. [12,13,21,23]

## 특징

- 전제: 자리 수 d와 기수 b가 제한된 키 · 자릿수별 안정 정렬
- 시간: 시간 O(d(n + b))
- 공간/안정성: 보통 O(n + b) · 각 자리 정렬은 안정적이어야 함
- 장점: 비교 정렬이 아닌 방식으로 많은 키를 정렬
- 한계: 일반 객체 비교에는 바로 적용하기 어렵고 보조 공간 필요

## 핵심 의사코드

```text
exp = 1
while max(A) // exp > 0:
    stable_count_by_digit(A, exp)
    exp *= 10
```

## 내레이션 및 장면표

| 구간 | 내레이션 | 화면 |
| 00.0–10.1s | 큰 숫자를 통째로 비교하는 대신 자릿수를 나눠 정렬할 수 있습니다. 기수 정렬은 낮은 자리부터 각 자릿수별 안정 정렬을 반복합니다. | 왜 필요한가 |
| 10.4–24.3s | 21, 13, 12, 23을 일의 자리로 안정 정렬하면 21, 12, 13, 23입니다. 이어 십의 자리로 안정 정렬하면 12, 13, 21, 23이 됩니다. | 숫자 예시 |
| 24.6–34.2s | exp는 현재 자리의 가중치입니다. 각 자리에서 안정적인 계수 정렬을 하고 exp를 열 배씩 키워 더 높은 자리로 이동합니다. | 핵심 코드 |
| 34.5–46.7s | d자릿수, 기수 b라면 보통 O(d 곱하기 n 더하기 b) 시간과 O(n+b) 공간이 듭니다. 중간 단계가 안정 정렬이어야 하고, 자릿수와 키 표현이 제한된 데이터에 적합합니다. | 복잡도와 선택 기준 |

## 사실 확인 자료

- [Princeton Algorithms: 정렬 성능표](https://algs4.cs.princeton.edu/cheatsheet/) — 선택·삽입·셸·병합·퀵·힙의 구현별 최선·평균·최악 비교 횟수, 추가 공간, 안정성.
- [Open Data Structures: Counting/Radix sort](https://opendatastructures.org/versions/edition-0.1e/ods-cpp.pdf) — 계수·기수 정렬의 범위, 자릿수, 안정성 요구.
- [CLRS bucket sort 분석 자료](https://belohlavek.inf.upol.cz/vyuka/Cormen-bucket-sort-analysis.pdf) — 균등 분포일 때 기대 선형 시간이라는 조건과 분석.
- [Auckland: Shellsort gap sequences](https://www.cs.auckland.ac.nz/courses/compsci220s1t/lectures/lecturenotes/GG-lectures/220slides-lecture06.pdf) — 시간 복잡도는 간격 수열에 의존하며, 이 자료의 halving sequence 분석을 영상 설명과 구분.
- [OpenDSA: Bubble sort](https://opendsa-server.cs.vt.edu/ODSA/Books/pubbook/odsa-all/fall-2019/Public_Instance/html/BubbleSort.html) — 조기 종료 없는 기본 반복 구조의 실행 시간.
- [NIST DADS: Bubble sort](https://xlinux.nist.gov/dads/HTML/bubblesort.html) — 알고리즘 정의 및 일반적인 제곱 시간 특성.
