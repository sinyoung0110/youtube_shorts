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
