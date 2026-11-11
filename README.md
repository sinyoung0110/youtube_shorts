# youtube_shorts

## 첫 알고리즘 쇼츠: 이진 탐색

처음 제작할 수 있도록 대본, 장면표, Manim 예제와 세 가지 제작 환경을 한곳에 모았습니다. 최종 목표는 세로 9:16, 1080×1920, 약 31–33초입니다.

## 내용 검산

정렬된 배열은 `[4, 9, 13, 18, 23, 27, 31, 36, 42]`, 목표는 `27`입니다. 0부터 세는 인덱스에서 가운데 값은 `23`(인덱스 4)이고, 목표가 더 크므로 왼쪽 절반과 가운데를 버립니다. 남은 `[27, 31, 36, 42]`의 가운데 값은 `31`(인덱스 6)입니다. 목표가 더 작으므로 `31`과 오른쪽을 버리고, 인덱스 5의 `27`을 찾습니다. 이 입력에서는 세 번 비교합니다.

`O(log n)`은 탐색 범위를 절반 가까이 줄이는 방식에서 비교 횟수가 데이터 수보다 훨씬 천천히 증가한다는 뜻입니다. 배열이 정렬되어 있어야 사용할 수 있습니다.

## 34초 내레이션 초안

정렬된 숫자 목록에서 27을 찾아볼게요. 숫자를 하나씩 확인하는 대신, 가운데부터 봅니다. 아홉 개의 가운데인 23은 27보다 작네요. 그러면 왼쪽은 볼 필요가 없어요. 남은 네 개의 가운데 31은 27보다 큽니다. 이번엔 오른쪽을 제외해요. 이제 남은 숫자는 27 하나. 세 번 만에 찾았습니다. 이진 탐색은 범위를 절반 가까이 줄여 가서, 데이터가 많아져도 확인 횟수가 천천히 늘어요. 그래서 시간 복잡도를 O(log n)이라고 씁니다. 단, 목록이 정렬되어 있어야 사용할 수 있어요.

## 장면표

| 시간 | 화면과 설명 |
| --- | --- |
| 0–3초 | 첫 화면부터 질문: “숫자 27, 몇 번 만에 찾을까?” |
| 3–7초 | 정렬된 배열 9개와 목표값 27을 소개 |
| 7–14초 | 인덱스 4의 23을 확인. 27 > 23이므로 왼쪽 범위를 흐리게 제외 |
| 14–21초 | 남은 범위의 가운데 인덱스 6, 값 31을 확인. 27 < 31이므로 오른쪽 제외 |
| 21–26초 | 인덱스 5의 27을 강조하고 “세 번 만에 찾음” 표시 |
| 26–33초 | 범위를 절반 가까이 줄이는 원리와 O(log n), 정렬 조건 요약 |

## 폴더와 실행

- `manim/binary_search.py` — Python Manim 세로 영상 예제
- `remotion/` — Remotion React 프로젝트와 Codex용 `remotion-create` 스킬
- `hyperframes/` — HyperFrames HTML/GSAP 프로젝트와 Codex용 스킬
- `openmontage/` — 공식 OpenMontage Git submodule. 새 복제본은 `git clone --recurse-submodules`로 받습니다.
- `shared/openmontage-brief.md` — OpenMontage용 제작 brief
- `shared/` — 모든 제작본에서 공유하는 대본과 타임라인

Manim 렌더:

```bash
cd /Users/sinyoung/youtube-shorts
source manim/.venv/bin/activate
manim -pqh manim/binary_search.py BinarySearchShorts
```

완료되면 `manim/media/videos/binary_search/1080p30/BinarySearchShorts.mp4`를 확인합니다. Mac에서 실행할 때 ffmpeg, Cairo/Pango, LaTeX 관련 오류가 나면 아래 설치 안내의 해결 항목을 참고하세요.

Remotion 미리보기와 렌더:

```bash
cd /Users/sinyoung/youtube-shorts/remotion
npm run dev
npx remotion render BinarySearchShorts out/binary-search.mp4
```

HyperFrames 검사, 미리보기, 렌더:

```bash
cd /Users/sinyoung/youtube-shorts/hyperframes
npx --yes hyperframes@0.9.33 check --json
npm run dev
npx --yes hyperframes@0.9.33 render --quality looks -o out/binary-search.mp4
```

OpenMontage 가상환경:

```bash
cd /Users/sinyoung/youtube-shorts/openmontage
source .venv/bin/activate
export PATH="/Users/sinyoung/.nvm/versions/node/v26.13.0/bin:$PATH"
make preflight
```

## 생성 확인

Remotion 버전의 MP4는 실제로 생성하고 전체 디코딩으로 읽기 오류가 없는지 확인했습니다. 출력은 33.00초, 1080×1920, 30fps, H.264입니다. `remotion/out/binary-search.mp4`를 바로 열어 볼 수 있습니다. Manim은 Python 코드 구문은 확인했지만, Manim 의존성 설치와 Manim 렌더는 시스템 `pkg-config` 부재로 아직 실행되지 않았습니다. HyperFrames `check --json --snapshots`는 오류 없이 통과했고, 무음 초안 경고 1건만 남았습니다. 음성과 HyperFrames MP4는 아직 없습니다.

## 수동으로 필요한 시스템 준비

Node.js 26.13.0과 Python 3.12.4는 이 환경에서 확인했습니다. OpenMontage는 Python 패키지·Remotion 컴포저·오프라인 Piper를 설치했습니다. Remotion Studio도 열렸습니다. 다만 macOS Command Line Tools가 오래되어 Homebrew `ffmpeg` 설치가 실패했습니다. 이 컴퓨터에서 실제 MP4 렌더를 진행하려면 먼저 **시스템 설정 → 일반 → 소프트웨어 업데이트**에서 Xcode Command Line Tools를 업데이트하고 `brew install ffmpeg`를 다시 실행하세요. 그 뒤 Manim의 `pycairo` 빌드에 필요한 Cairo/Pango 의존성도 확인합니다.

OpenMontage의 무료 Piper 한국어 음성을 쓰려면 사용할 한국어 음성 모델을 한 번 내려받아야 할 수 있습니다. 스톡 검색이나 클라우드 음성·이미지 제공자는 무료 API 키를 `.env`에 직접 추가해야 합니다. 키는 이 저장소에 커밋하지 마세요. 이번 예제의 대본과 세 로컬 프로젝트는 API 키 없이 준비했습니다.

Remotion 사용 시 회사 규모에 따라 별도 라이선스가 필요할 수 있으므로 영상 게시 전 [Remotion 라이선스](https://www.remotion.dev/license)를 확인하세요. OpenMontage 저장소는 AGPL-3.0입니다.
