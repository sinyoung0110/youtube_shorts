# 버킷 정렬 — 대본 및 검산

- 대상: 처음 배우는 알고리즘 학습자
- 영상 길이: 약 51초
- 핵심 질문: 값 구간을 나눠 바구니마다 정렬하면?

## 왜 필요한가

값 범위를 여러 버킷으로 나눠 분산하고, 각 버킷 내부를 정렬한 뒤 이어 붙입니다. 값이 고르게 퍼질 때 빠릅니다.

## 예시와 단계

입력: `[0.42, 0.32, 0.23, 0.52, 0.25]`

1. 0.2대: [0.23, 0.25]
2. 0.3대: [0.32] · 0.4대: [0.42]
3. 0.5대: [0.52] → 이어 붙이기

## 특징

- 전제: 예시는 값이 [0,1)에 있고 버킷에 고르게 분산된다고 가정
- 시간: 균등 분포 기대 O(n + k) · 최악 O(n²)
- 공간/안정성: 추가 공간 O(n + k)
- 장점: 균등하게 퍼진 실수 데이터에서 빠를 수 있음
- 한계: 분포가 치우치면 한 버킷에서 느려짐

## 핵심 의사코드

```text
buckets = [[] for _ in range(10)]  # 0.1 간격
for x in A: buckets[int(10 * x)].append(x)
for bucket in buckets:
    insertion_sort(bucket)
return flatten(buckets)
```

## 내레이션 및 장면표

| 구간 | 내레이션 | 화면 |
| 00.0–09.9s | 값들이 범위에 고르게 퍼져 있다면 구간별 바구니로 나눌 수 있습니다. 버킷 정렬은 각 버킷을 따로 정렬하고 순서대로 이어 붙입니다. | 왜 필요한가 |
| 10.2–26.8s | 0.42, 0.32, 0.23, 0.52, 0.25를 소수 첫째 자리 구간으로 나눕니다. 0.2대엔 0.23과 0.25, 0.3대엔 0.32, 0.4대엔 0.42, 0.5대엔 0.52가 들어갑니다. | 숫자 예시 |
| 27.1–38.4s | 각 값을 버킷에 넣고, 버킷 내부를 삽입 정렬한 다음 앞 버킷부터 이어 붙입니다. 이 예시는 값이 0 이상 1 미만이라 인덱스 계산이 간단합니다. | 핵심 코드 |
| 38.7–51.1s | 값이 고르게 퍼지면 기대 시간 O(n+k)에 가까울 수 있지만, 한 버킷에 몰리면 내부 정렬 때문에 최악 O(n²)입니다. 분포 가정과 버킷 수 선택이 성능을 좌우합니다. | 복잡도와 선택 기준 |

## 사실 확인 자료

- [Princeton Algorithms: 정렬 성능표](https://algs4.cs.princeton.edu/cheatsheet/) — 선택·삽입·셸·병합·퀵·힙의 구현별 최선·평균·최악 비교 횟수, 추가 공간, 안정성.
- [Open Data Structures: Counting/Radix sort](https://opendatastructures.org/versions/edition-0.1e/ods-cpp.pdf) — 계수·기수 정렬의 범위, 자릿수, 안정성 요구.
- [CLRS bucket sort 분석 자료](https://belohlavek.inf.upol.cz/vyuka/Cormen-bucket-sort-analysis.pdf) — 균등 분포일 때 기대 선형 시간이라는 조건과 분석.
- [Auckland: Shellsort gap sequences](https://www.cs.auckland.ac.nz/courses/compsci220s1t/lectures/lecturenotes/GG-lectures/220slides-lecture06.pdf) — 시간 복잡도는 간격 수열에 의존하며, 이 자료의 halving sequence 분석을 영상 설명과 구분.
- [OpenDSA: Bubble sort](https://opendsa-server.cs.vt.edu/ODSA/Books/pubbook/odsa-all/fall-2019/Public_Instance/html/BubbleSort.html) — 조기 종료 없는 기본 반복 구조의 실행 시간.
- [NIST DADS: Bubble sort](https://xlinux.nist.gov/dads/HTML/bubblesort.html) — 알고리즘 정의 및 일반적인 제곱 시간 특성.
