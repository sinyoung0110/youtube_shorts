# 삽입 정렬 — 대본 및 검산

- 대상: 처음 배우는 알고리즘 학습자
- 영상 길이: 약 48초
- 핵심 질문: 카드를 정렬된 손패에 끼워 넣듯

## 왜 필요한가

앞부분을 정렬된 구간으로 유지하고 새 값을 알맞은 위치에 삽입합니다. 작은 입력이나 거의 정렬된 입력에 유리합니다.

## 예시와 단계

입력: `[5, 2, 4, 1]`

1. 2를 5 앞에 → [2,5,4,1]
2. 4를 2와 5 사이에
3. 1을 맨 앞에 → [1,2,4,5]

## 특징

- 전제: 왼쪽 구간은 이미 정렬됐다고 가정
- 시간: 최선 O(n) · 평균·최악 O(n²)
- 공간/안정성: 추가 공간 O(1) · 안정 정렬
- 장점: 작고 거의 정렬된 입력에서 빠름 · 온라인 처리
- 한계: 역순 입력이면 이동이 제곱으로 증가

## 핵심 의사코드

```text
for i in range(1, n):
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key:
        A[j+1] = A[j]; j -= 1
    A[j+1] = key
```

## 내레이션 및 장면표

| 구간 | 내레이션 | 화면 |
| 00.0–11.4s | 새 카드를 정렬된 손패 사이에 넣듯, 삽입 정렬은 앞쪽 정렬 구간에 다음 값을 알맞게 끼웁니다. 작거나 거의 정렬된 데이터에서 간단하고 빠릅니다. | 왜 필요한가 |
| 11.7–24.5s | 5, 2, 4, 1을 보죠. 2를 5 앞에 넣어 2, 5를 만들고, 4를 그 사이에 넣어 2, 4, 5. 마지막 1을 맨 앞으로 옮기면 정렬이 끝납니다. | 숫자 예시 |
| 24.8–35.8s | key가 새로 넣을 값입니다. 왼쪽의 더 큰 값들을 한 칸씩 오른쪽으로 밀고, 빈 자리에 key를 놓습니다. 이미 정렬된 앞부분은 매 단계 유지됩니다. | 핵심 코드 |
| 36.1–48.1s | 거의 정렬된 경우 한 번씩만 확인해 최선 O(n), 평균과 최악은 O(n²)입니다. 추가 공간은 O(1)이고 안정적이지만, 큰 역순 입력에는 이동이 많습니다. | 복잡도와 선택 기준 |

## 사실 확인 자료

- [Princeton Algorithms: 정렬 성능표](https://algs4.cs.princeton.edu/cheatsheet/) — 선택·삽입·셸·병합·퀵·힙의 구현별 최선·평균·최악 비교 횟수, 추가 공간, 안정성.
- [Open Data Structures: Counting/Radix sort](https://opendatastructures.org/versions/edition-0.1e/ods-cpp.pdf) — 계수·기수 정렬의 범위, 자릿수, 안정성 요구.
- [CLRS bucket sort 분석 자료](https://belohlavek.inf.upol.cz/vyuka/Cormen-bucket-sort-analysis.pdf) — 균등 분포일 때 기대 선형 시간이라는 조건과 분석.
- [Auckland: Shellsort gap sequences](https://www.cs.auckland.ac.nz/courses/compsci220s1t/lectures/lecturenotes/GG-lectures/220slides-lecture06.pdf) — 시간 복잡도는 간격 수열에 의존하며, 이 자료의 halving sequence 분석을 영상 설명과 구분.
- [OpenDSA: Bubble sort](https://opendsa-server.cs.vt.edu/ODSA/Books/pubbook/odsa-all/fall-2019/Public_Instance/html/BubbleSort.html) — 조기 종료 없는 기본 반복 구조의 실행 시간.
- [NIST DADS: Bubble sort](https://xlinux.nist.gov/dads/HTML/bubblesort.html) — 알고리즘 정의 및 일반적인 제곱 시간 특성.
