# youtube_shorts

## 첫 알고리즘 수업: 배열 이진 탐색

처음 공부하는 사람을 위해 “정렬된 기록 백만 개 중 하나를 어떻게 빨리 찾을까?”라는 문제에서 출발하는 58초 세로 영상입니다. 숫자 예시를 추적하고, 반복문 코드와 Big O, 정렬 전제 및 배열 삽입 비용을 간결하게 설명합니다. 연습문제는 개념 소개 영상에서 제외했습니다.

- **영상:** [`remotion/out/binary-search.mp4`](remotion/out/binary-search.mp4)
- **한국어 대본과 수치 검증:** [`shared/대본.md`](shared/대본.md)
- **장면표:** [`shared/장면표.md`](shared/장면표.md)
- **음성 원본:** [`remotion/public/audio/narration.wav`](remotion/public/audio/narration.wav), Supertonic 3 M1 남성 음색을 사용한 한국어 오프라인 합성

## 예시와 코드

```text
A = [-1, 0, 3, 5, 9, 12]   x = 9

lo=0, hi=5 → mid=2 → A[2]=3 < 9 → lo=3
lo=3, hi=5 → mid=4 → A[4]=9 → return 4
```

가운데 비교는 2회입니다. 최선 시간은 `O(1)`, 평균·최악 시간은 `O(log n)`, 이 반복문 구현의 추가 공간은 `O(1)`입니다. 정렬 배열에서만 올바르게 동작합니다. 백만 개에서 최악 비교는 최대 20회입니다. Big O는 정확한 횟수가 아니라 입력 크기에 따른 비용의 증가율을 나타냅니다.

```python
def binary_search(A, x):
    lo, hi = 0, len(A) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if A[mid] == x:
            return mid
        if A[mid] < x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
```

배열의 이진 탐색은 `lo / mid / hi` 인덱스를 움직입니다. 앞서 예로 든 `bst_search`는 `node.left/right`를 따라가는 BST 탐색으로, 자료구조와 코드가 다릅니다.

## 실행

```bash
cd /Users/sinyoung/youtube-shorts/remotion
npm run dev
npx remotion render BinarySearchShorts out/binary-search.mp4
```

Manim과 HyperFrames의 기존 산출물은 이번 Remotion 리마스터와 별개인 이전 초안입니다. 새 대본과 동기화된 기본 결과물은 위 Remotion 영상입니다.

음성은 한국어를 지원하는 Supertonic 3를 로컬 CPU에서 합성했습니다. 모델 라이선스와 출처 표기는 [공식 안내](https://supertonic3.github.io/)를 참고하세요.

## 오프라인 남성 음성 준비

이 영상의 한국어 음성은 **Supertonic 3 M1**을 Supertone 로컬 모델로 합성했습니다. 한국어를 지원하고 CPU에서 실행되며, 모델을 처음 내려받은 뒤에는 오프라인으로 합성할 수 있습니다. 가중치 라이선스는 OpenRAIL-M이며, [공식 모델 안내](https://supertonic3.github.io/)의 사용 조건과 출처 표기를 따르세요.

새 환경에서 준비할 때:

```bash
python3 -m venv ~/.venvs/supertonic
~/.venvs/supertonic/bin/pip install "supertonic==1.3.1"
```

## 문제 풀이 영상: 2025 국가직 데이터직 알고리즘 14번

재귀 이진 탐색 두 번의 모든 호출을 단계별로 보여주는 1분 44초 영상입니다. `key=22`의 실패 호출까지 `count=5`에 포함되고, 초기화 없이 이어지는 `key=52` 검색 후 `count=9`가 됩니다.

- **영상:** [`remotion/out/binary-search-exam-2025-q14.mp4`](remotion/out/binary-search-exam-2025-q14.mp4)
- **풀이·계산 표:** [`lessons/binary-search-exam-2025-q14/script.md`](lessons/binary-search-exam-2025-q14/script.md)
- **코드와 장면표:** [`lessons/binary-search-exam-2025-q14/`](lessons/binary-search-exam-2025-q14/)

## 이진 탐색 중간값 공식 비교: 12 찾기

배열 `[1,3,5,12,19,20,22,25,29,31]`에서 두 mid 공식으로 `12`를 찾는 과정을 비교합니다. 아래쪽 mid는 `19 → 3 → 5 → 12`, 위쪽 mid는 `20 → 5 → 19 → 12`를 확인하고 둘 다 인덱스 `3`을 반환합니다.

- **영상:** [`remotion/out/binary-search-midpoint-12.mp4`](remotion/out/binary-search-midpoint-12.mp4)
- **대본·풀이:** [`lessons/binary-search-midpoint-12/script.md`](lessons/binary-search-midpoint-12/script.md)
- **코드·장면표:** [`lessons/binary-search-midpoint-12/`](lessons/binary-search-midpoint-12/)

## 이진 탐색 중간값과 정수 오버플로우

큰 인덱스에서 `(low + high) / 2`가 왜 위험한지 32비트 정수 예로 설명하고, 안전한 mid 계산식과 Java·C·Python의 차이를 비교합니다. 합성 경고음과 오프라인 남성 음성을 넣은 60초 영상입니다.

- **영상:** [`remotion/out/binary-search-midpoint-overflow.mp4`](remotion/out/binary-search-midpoint-overflow.mp4)
- **대본·수치 검산:** [`lessons/binary-search-midpoint-overflow/script.md`](lessons/binary-search-midpoint-overflow/script.md)
- **Java 예제·장면표:** [`lessons/binary-search-midpoint-overflow/`](lessons/binary-search-midpoint-overflow/)

## 알고리즘 영상 시리즈 14편

모든 영상은 세로형 9:16이며, 휴대전화 쇼츠 인터페이스를 고려해 핵심 제목과 예시를 위·아래 및 오른쪽 UI 여백 안쪽에 배치했습니다. 각 편은 처음 배우는 사람을 위한 동기, 단계별 숫자 예시, 핵심 의사코드, 시간·공간 복잡도와 장단점을 담고 있습니다. 한국어 Supertonic 3 M1 남성 오프라인 내레이션입니다.

| # | 주제 | 영상 | 대본·예시 검산 |
| ---: | --- | --- | --- |
| 1 | 이진 탐색 트리 | [`binary-search-tree.mp4`](remotion/out/binary-search-tree.mp4) | [`script.md`](lessons/binary-search-tree/script.md) |
| 2 | AVL 트리 | [`avl-tree.mp4`](remotion/out/avl-tree.mp4) | [`script.md`](lessons/avl-tree/script.md) |
| 3 | 버블 정렬 | [`bubble-sort.mp4`](remotion/out/bubble-sort.mp4) | [`script.md`](lessons/bubble-sort/script.md) |
| 4 | 삽입 정렬 | [`insertion-sort.mp4`](remotion/out/insertion-sort.mp4) | [`script.md`](lessons/insertion-sort/script.md) |
| 5 | 선택 정렬 | [`selection-sort.mp4`](remotion/out/selection-sort.mp4) | [`script.md`](lessons/selection-sort/script.md) |
| 6 | 힙 정렬 | [`heap-sort.mp4`](remotion/out/heap-sort.mp4) | [`script.md`](lessons/heap-sort/script.md) |
| 7 | 퀵 정렬 | [`quick-sort.mp4`](remotion/out/quick-sort.mp4) | [`script.md`](lessons/quick-sort/script.md) |
| 8 | 병합 정렬 | [`merge-sort.mp4`](remotion/out/merge-sort.mp4) | [`script.md`](lessons/merge-sort/script.md) |
| 9 | 계수 정렬 | [`counting-sort.mp4`](remotion/out/counting-sort.mp4) | [`script.md`](lessons/counting-sort/script.md) |
| 10 | 기수 정렬 | [`radix-sort.mp4`](remotion/out/radix-sort.mp4) | [`script.md`](lessons/radix-sort/script.md) |
| 11 | 버킷 정렬 | [`bucket-sort.mp4`](remotion/out/bucket-sort.mp4) | [`script.md`](lessons/bucket-sort/script.md) |
| 12 | 셸 정렬 | [`shell-sort.mp4`](remotion/out/shell-sort.mp4) | [`script.md`](lessons/shell-sort/script.md) |
| 13 | BST와 AVL 특성 비교 | [`tree-comparison.mp4`](remotion/out/tree-comparison.mp4) | [`script.md`](lessons/tree-comparison/script.md) |
| 14 | 열 가지 정렬 한눈에 비교 | [`sorting-overview.mp4`](remotion/out/sorting-overview.mp4) | [`비교표 포함 대본`](lessons/sorting-overview/script.md) |

영상 제작 데이터는 [`algorithm-episodes.json`](remotion/src/lessons/algorithm-episodes.json)에서 관리합니다. 로컬 음성은 `tools/build_algorithm_series.py`로 재생성할 수 있습니다.
