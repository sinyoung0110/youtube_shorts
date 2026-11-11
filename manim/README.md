# Manim 예제

`binary_search.py`는 9:16, 1080×1920, 30 fps의 약 32초짜리 이진 탐색 애니메이션입니다. 별도의 음성이나 API 키 없이 화면 요소만 렌더링합니다. 내레이션은 상위 폴더의 `shared/대본.md`를 사용합니다.

## 설치

현재 가상환경 생성은 되어 있지만, Manim의 `pycairo` 의존성 설치가 macOS의 `pkg-config` 부재로 중단됐습니다. 개발 도구 설치 후 다음을 실행하세요.

```bash
cd /Users/sinyoung/youtube-shorts/manim
brew install ffmpeg cairo pango pkgconf
source .venv/bin/activate
pip install -r requirements.txt
```

Homebrew가 Xcode Command Line Tools 오류를 내면 **시스템 설정 → 일반 → 소프트웨어 업데이트**에서 Command Line Tools를 먼저 업데이트한 후 위 설치를 다시 실행합니다. `MathTex`를 추가할 경우에만 LaTeX 배포판도 설치하세요. 이 예제는 `Text`만 사용하므로 LaTeX가 필요 없습니다.

## 렌더

```bash
manim -pqh binary_search.py BinarySearchShorts
```

- `-p`: 렌더 뒤 동영상 열기
- `-q h`: 고화질 프리셋. 빠른 미리보기는 `-q l`

정상 출력 위치는 `media/videos/binary_search/1080p30/BinarySearchShorts.mp4`입니다. 확인:

```bash
ffprobe -v error -show_entries format=duration:stream=width,height,r_frame_rate -of default=noprint_wrappers=1 media/videos/binary_search/1080p30/BinarySearchShorts.mp4
```

예상 값은 약 32초, 1080×1920, 30/1 fps입니다. 동영상이 생성되면 처음·23 확인·31 확인·27 정답·마지막 O(log n) 화면을 재생해 대본과 같은지 확인하세요.

## 흔한 오류

- `pkg-config` 또는 `cairo`를 찾을 수 없음: `brew install cairo pango pkgconf` 후 새 터미널에서 가상환경을 다시 켭니다.
- `ffmpeg`를 찾을 수 없음: `brew install ffmpeg` 후 `which ffmpeg`와 `ffmpeg -version`으로 확인합니다.
- `latex` 또는 `dvisvgm` 오류: 이 예제에선 수식 렌더를 쓰지 않으므로 `MathTex`를 일반 `Text`로 바꾸거나 LaTeX를 설치합니다.
- 폰트/한글이 네모로 표시됨: macOS에 설치된 한글 산세리프 글꼴을 지정하고 다시 렌더합니다.
