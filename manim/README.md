# Manim 이진 탐색 쇼츠

`binary_search.py`는 9:16, 1080×1920, 30fps 영상 예제입니다. 정렬된 배열 `[4, 9, 13, 18, 23, 27, 31, 36, 42]`에서 27을 찾고, 가운데 비교가 `23 → 31 → 27` 순서로 진행됩니다.

## 설치

이 Mac에서는 아래 설치와 렌더를 완료했습니다. 새 환경에서는 macOS용 Cairo/Pango 개발 파일과 Python 패키지가 필요합니다.

```bash
cd /Users/sinyoung/youtube-shorts
brew install cairo pango pkgconf
python3 -m venv manim/.venv
source manim/.venv/bin/activate
python -m pip install -r manim/requirements.txt
ln -sf "$(python -c 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())')" manim/.venv/bin/ffmpeg
```

ImageIO 패키지의 ffmpeg 실행 파일을 가상환경에 연결하므로 이 예제에는 Homebrew의 ffmpeg formula가 필요하지 않습니다. `MathTex`를 새로 추가할 때만 LaTeX 배포판을 설치하세요. 현재 코드는 `Text`만 사용합니다.

## 렌더

```bash
cd /Users/sinyoung/youtube-shorts
source manim/.venv/bin/activate
manim -pqh manim/binary_search.py BinarySearchShorts
```

- `-p`: 렌더 뒤 동영상 열기
- `-q h`: 고화질 프리셋. 빠른 미리보기는 `-q l`

완성 영상은 `manim/media/videos/binary_search/1920p30/BinarySearchShorts.mp4`에 생성됩니다. 이 환경에서 생성·검증한 파일은 [BinarySearchShorts.mp4](media/videos/binary_search/1920p30/BinarySearchShorts.mp4)입니다. 길이는 31.60초, 1080×1920, 30fps, H.264이며 전체 디코딩 검사에 통과했습니다.

메타데이터와 재생 여부는 가상환경의 ffmpeg로 확인할 수 있습니다:

```bash
ffmpeg -i manim/media/videos/binary_search/1920p30/BinarySearchShorts.mp4
ffmpeg -v error -i manim/media/videos/binary_search/1920p30/BinarySearchShorts.mp4 -f null -
```

한글이 네모로 표시되면 `binary_search.py`의 `Text`에 macOS 한글 산세리프 글꼴을 명시하세요.
