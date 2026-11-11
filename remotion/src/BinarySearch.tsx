import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

const values = [4, 9, 13, 18, 23, 27, 31, 36, 42];

const ease = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const BinarySearch: React.FC = () => {
  const frame = useCurrentFrame();
  const step = frame < 120 ? 0 : frame < 420 ? 1 : frame < 630 ? 2 : frame < 780 ? 3 : 4;
  const arrayOpacity = ease(frame, 75, 100);
  const conclusionOpacity = ease(frame, 780, 810);

  const headline = [
    "숫자 27,\n몇 번 만에 찾을까?",
    "정렬된 숫자에서\n가운데부터 확인",
    "23보다 크니까\n왼쪽을 제외",
    "31보다 작으니까\n오른쪽을 제외",
    "찾았다! 27",
  ][step];
  const explanation = [
    "이진 탐색은 정렬된 목록에서 빠르게 찾는 방법",
    "1단계 · 가운데 값은 23",
    "2단계 · 남은 가운데 값은 31",
    "3단계 · 남은 값 27을 찾음",
    "9개 중 3번 확인",
  ][step];
  const comparisons = ["", "27 > 23", "27 < 31", "27 = 27", ""][step];

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 30%, #20314d 0%, #101827 52%, #0a101a 100%)",
        color: "#f8fafc",
        fontFamily: "Arial, \"Apple SD Gothic Neo\", Helvetica, sans-serif",
        padding: "132px 86px",
        justifyContent: "space-between",
      }}
    >
      <Audio src={staticFile("audio/narration.wav")} volume={0.95} />
      <div style={{ color: "#65d6c4", fontSize: 32, fontWeight: 700, letterSpacing: 4 }}>
        알고리즘 01 · 이진 탐색
      </div>

      <div
        style={{
          opacity: 1,
          textAlign: "center",
          fontSize: 84,
          lineHeight: 1.18,
          fontWeight: 800,
          whiteSpace: "pre-line",
          marginTop: -40,
        }}
      >
        {headline}
      </div>

      <div style={{ opacity: arrayOpacity }}>
        <div style={{ textAlign: "center", color: "#b8c6d9", fontSize: 33, marginBottom: 28 }}>
          정렬된 배열 · 목표값 27
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {values.map((value, index) => {
            const isFirstMid = index === 4 && step >= 1;
            const isSecondMid = index === 6 && step >= 2;
            const isFound = index === 5 && step >= 3;
            const isExcluded = (index < 5 && step >= 2) || (index >= 6 && step >= 3);
            const activeColor = isFound ? "#26c281" : isFirstMid || isSecondMid ? "#f4c95d" : "#6b91d8";
            return (
              <div
                key={value}
                style={{
                  width: 91,
                  height: 126,
                  borderRadius: 18,
                  border: `3px solid ${isExcluded ? "#4b5563" : activeColor}`,
                  background: `${isExcluded ? "#334155" : activeColor}26`,
                  opacity: isExcluded ? 0.34 : arrayOpacity,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 13,
                  transform: isFirstMid || isSecondMid || isFound ? `translateY(${Math.sin(frame / 6) * 4}px)` : "none",
                }}
              >
                <span style={{ color: isFound ? "#86efac" : isFirstMid || isSecondMid ? "#ffe08a" : "#f8fafc", fontSize: 38, fontWeight: 800 }}>
                  {value}
                </span>
                <span style={{ color: "#e2e8f0", fontSize: 24 }}>idx {index}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ textAlign: "center", minHeight: 184 }}>
        <div style={{ fontSize: 39, fontWeight: 750, color: step >= 3 ? "#86efac" : "#f4c95d", marginBottom: 22 }}>
          {explanation}
        </div>
        <div style={{ color: "#b8c6d9", fontSize: 33 }}>{comparisons}</div>
      </div>

      <div style={{ textAlign: "center", borderTop: "1px solid #ffffff24", paddingTop: 38, opacity: conclusionOpacity }}>
        <div style={{ color: "#65d6c4", fontSize: 32, marginBottom: 16 }}>
          매번 탐색 범위를 절반 가까이 줄여요
        </div>
        <div style={{ fontSize: 44, color: "#f4c95d", fontWeight: 800 }}>시간 복잡도 O(log n)</div>
        <div style={{ color: "#a8b4c5", fontSize: 27, marginTop: 16 }}>
          데이터가 커져도 확인 횟수는 천천히 늘어납니다.
        </div>
      </div>
    </AbsoluteFill>
  );
};
