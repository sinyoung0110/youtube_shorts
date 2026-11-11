# youtube_shorts

## 첫 알고리즘 쇼츠: 배열 이진 탐색

정렬 배열에서 `9`를 찾으며 `lo`, `mid`, `hi`, 반복문 코드와 Big O를 함께 익히는 55초 영상입니다. 개념 설명 뒤에 문제 풀이에 다시 쓸 수 있도록 실행 흐름과 경계 갱신 코드를 보여줍니다.

## 예시와 코드

```text
A = [-1, 0, 3, 5, 9, 12]   x = 9

lo=0, hi=5 → mid=(0+5)//2=2 → A[2]=3 < 9 → lo=3
lo=3, hi=5 → mid=(3+5)//2=4 → A[4]=9 → return 4
```

가운데 값 확인은 2회입니다. `mid`의 `// 2`는 정수 나눗셈(내림)입니다.

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

`lo`와 `hi`는 현재 확인할 인덱스 구간의 양 끝이며, 둘 다 포함합니다. 각 반복에서 가운데를 확인하고 불가능한 쪽 절반을 제외합니다. 값이 없으면 `lo > hi`가 되어 `-1`을 반환합니다. 배열은 반드시 정렬되어 있어야 합니다.

## Big O

- 최선: 목표가 첫 `mid`와 같으면 `O(1)`.
- 평균·최악: 남은 구간이 절반씩 줄어 `O(log n)` 시간.
- 길이 16의 최악 탐색은 `⌊log₂16⌋ + 1 = 5`번 이내로 `mid`를 확인합니다. 길이가 커져도 확인 횟수는 천천히 증가합니다.
- 이 반복문 버전의 추가 공간은 `O(1)`입니다.
- Big O는 이 예제에서 항상 정확히 몇 번 실행된다는 말이 아니라, 입력이 커질 때 비용이 증가하는 비율을 나타냅니다.

보내주신 `bst_search`는 배열 이진 탐색과 구분되는 BST 재귀 검색입니다. 배열 코드는 `lo/mid/hi` 인덱스를 움직이고, BST 코드는 `node.left/right`로 내려갑니다. 양쪽 모두 비교 결과에 따라 후보를 줄인다는 아이디어를 공유합니다.

## 장면표

| 시간 | 화면 |
| --- | --- |
| 0–4초 | 정렬 배열과 target 9 소개 |
| 4–13초 | `lo=0, hi=5, mid=2`, `A[2]=3`; `lo=3`으로 갱신 |
| 13–21초 | 남은 `3..5`에서 `mid=4`, `A[4]=9`, `return 4` |
| 21–37초 | 반복문 코드와 조건별 경계 갱신을 순서대로 강조 |
| 37–48초 | `16→8→4→2→1`, 최선 `O(1)`, 최악 `O(log n)` |
| 48–55초 | 정렬·가운데·절반 제거 요약, 배열과 BST의 구조 차이 |

대본과 수치 검산은 [`shared/대본.md`](shared/대본.md), [`shared/장면표.md`](shared/장면표.md)에 있습니다.

## 결과물

- Remotion MP4: [`remotion/out/binary-search.mp4`](remotion/out/binary-search.mp4)
- Manim MP4: [`manim/media/videos/binary_search/1920p30/BinarySearchShorts.mp4`](manim/media/videos/binary_search/1920p30/BinarySearchShorts.mp4)
- 오프라인 음성 원본: [`remotion/public/audio/narration.wav`](remotion/public/audio/narration.wav), macOS Yuna 음성
- Remotion은 55.02초, Manim은 55.04초입니다. 두 버전 모두 세로 1080×1920, 30fps, H.264이며 오프라인 내레이션 AAC 트랙을 포함합니다. 두 MP4 전체 디코딩을 확인했습니다.
- HyperFrames는 이전 독립 초안으로 남아 있으며, 이번 코드 중심 대본으로 다시 렌더하지 않았습니다.

## 실행

Remotion:

```bash
cd /Users/sinyoung/youtube-shorts/remotion
npm run dev
npx remotion render BinarySearchShorts out/binary-search.mp4
```

Manim:

```bash
cd /Users/sinyoung/youtube-shorts
source manim/.venv/bin/activate
manim -pqh manim/binary_search.py BinarySearchShorts
```

`manim/README.md`에는 새 Mac의 설치 방법도 있습니다. 이 컴퓨터에서는 Python 3.12.4, Manim 0.22.1, Node 26.13.0을 사용합니다. Remotion은 macOS에서 렌더 경고를 출력할 수 있지만 인코딩은 완료합니다.

## 저장소 구성

- `remotion/`: 코드 강조와 내레이션이 포함된 메인 영상
- `manim/`: 같은 설명을 Python Manim으로 표현한 보조 버전
- `hyperframes/`: 별도로 검증해 둔 무음 초안. 현재 55초 코드 중심 버전은 아님
- `openmontage/`: 공식 OpenMontage 서브모듈
- `shared/`: 대본, 장면표, OpenMontage brief

API 키, 가상환경, Node 의존성은 저장소에 포함하지 않습니다. OpenMontage 클라우드 공급자를 쓸 때만 필요한 키를 로컬 `.env`에 넣으세요.
