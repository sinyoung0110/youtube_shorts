# Manim 이진 탐색 쇼츠

`binary_search.py`는 정렬 배열 `[-1, 0, 3, 5, 9, 12]`에서 9를 찾아 `lo / mid / hi` 반복문, 경계 갱신, Big O를 설명합니다. Apple SD Gothic Neo 글꼴을 쓰며 Remotion 버전과 같은 오프라인 한국어 내레이션을 포함합니다.

## 설치

이 Mac에서는 Manim 설치를 완료했습니다. 새 환경에서 Cairo/Pango 개발 파일과 Python 패키지를 준비합니다.

```bash
cd /Users/sinyoung/youtube-shorts
brew install cairo pango pkgconf
python3 -m venv manim/.venv
source manim/.venv/bin/activate
python -m pip install -r manim/requirements.txt
ln -sf "$(python -c 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())')" manim/.venv/bin/ffmpeg
```

ImageIO에 포함된 ffmpeg를 사용하므로 이 영상에는 Homebrew ffmpeg formula가 필요하지 않습니다. 추가 LaTeX도 필요하지 않습니다.

## 렌더

```bash
cd /Users/sinyoung/youtube-shorts
source manim/.venv/bin/activate
manim -pqh manim/binary_search.py BinarySearchShorts
```

완료 파일은 `manim/media/videos/binary_search/1920p30/BinarySearchShorts.mp4`입니다. 이 렌더는 55.04초, 1080×1920, 30fps, H.264/AAC이며 전체 디코딩 검사를 통과했습니다. 내레이션 WAV와 정확한 대본은 `remotion/public/audio/narration.wav`, `shared/내레이션.md`에 있습니다.
