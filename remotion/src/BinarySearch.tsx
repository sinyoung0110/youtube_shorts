import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

const values = [-1, 0, 3, 5, 9, 12];
const codeLines = [
  "def binary_search(A, x):",
  "lo, hi = 0, len(A) - 1",
  "while lo <= hi:",
  "    mid = (lo + hi) // 2",
  "    if A[mid] == x: return mid",
  "    if A[mid] < x: lo = mid + 1",
  "    else: hi = mid - 1",
  "return -1",
];

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const colors = { cyan: "#75d6e8", yellow: "#ffc95c", pink: "#ef78ae", green: "#60d69c" };

export const BinarySearch: React.FC = () => {
  const frame = useCurrentFrame();
  const seconds = frame / 30;
  const phase = seconds < 4 ? 0 : seconds < 13 ? 1 : seconds < 21 ? 2 : seconds < 37 ? 3 : seconds < 48 ? 4 : 5;
  const codeLine = Math.min(codeLines.length - 1, Math.max(0, Math.floor((seconds - 21) / 2)));
  const codeProgress = fade(frame, 630, 660);

  const headline = [
    "정렬 배열에서 9를 찾아볼까요?",
    "가운데부터 확인합니다",
    "남은 구간의 가운데를 봅니다",
    "같은 판단을 코드로 반복해요",
    "탐색 범위가 절반씩 줄어요",
    "이진 탐색의 핵심 세 가지",
  ][phase];

  const state = phase < 2
    ? { lo: 0, mid: 2, hi: 5, found: -1 }
    : { lo: 3, mid: 4, hi: 5, found: phase === 2 ? 4 : -1 };

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 20%, #17202d 0%, #0b0d12 55%, #090b10 100%)",
        color: "#f4f5f7",
        fontFamily: 'Arial, "Apple SD Gothic Neo", Helvetica, sans-serif',
      }}
    >
      <Audio src={staticFile("audio/narration.wav")} volume={0.96} />

      <div style={{ position: "absolute", top: 76, left: 78, color: colors.cyan, fontSize: 27, fontWeight: 750, letterSpacing: 3 }}>
        ALGORITHM 01 <span style={{ color: "#738093" }}>/</span> BINARY SEARCH
      </div>
      <div style={{ position: "absolute", top: 142, left: 78, right: 78, textAlign: "center", fontSize: 56, lineHeight: 1.2, fontWeight: 800 }}>
        {headline}
      </div>

      {phase <= 2 && (
        <>
          <div style={{ position: "absolute", top: 276, left: 80, right: 80, textAlign: "center", color: "#98a3b4", fontSize: 30 }}>
            A = [−1, 0, 3, 5, 9, 12] <span style={{ color: "#667184" }}>·</span> target = <b style={{ color: colors.yellow }}>9</b>
          </div>

          <div style={{ position: "absolute", top: 412, left: 74, right: 74, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
            {values.map((value, index) => {
              const isExcluded = phase === 2 && index < 3;
              const isMid = index === state.mid;
              const isFound = state.found === index;
              const stroke = isFound ? colors.green : isMid ? colors.yellow : "#45465f";
              const markerColor = index === state.lo ? colors.cyan : index === state.mid ? colors.yellow : index === state.hi ? colors.pink : "transparent";
              const marker = index === state.lo ? "lo" : index === state.mid ? "mid" : index === state.hi ? "hi" : "";
              return (
                <div key={index} style={{ textAlign: "center", opacity: isExcluded ? 0.3 : 1 }}>
                  <div style={{ height: 78, display: "flex", flexDirection: "column", justifyContent: "end", alignItems: "center", color: markerColor, fontSize: 26, fontFamily: "monospace", fontWeight: 700 }}>
                    {marker && <><span>{marker}</span><span style={{ fontSize: 25, lineHeight: 1 }}>▼</span></>}
                  </div>
                  <div style={{ height: 130, border: `3px solid ${stroke}`, borderRadius: 18, background: isFound ? "#173226" : isMid ? "#302819" : "#191a28", boxShadow: isFound || isMid ? `0 0 26px ${stroke}30` : "0 9px 0 #07080d", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
                    <span style={{ fontFamily: "monospace", fontSize: 42, fontWeight: 700, color: isFound ? colors.green : isMid ? colors.yellow : "#edf0f4" }}>{value}</span>
                  </div>
                  <div style={{ color: "#8a91a0", fontSize: 24, marginTop: 15, fontFamily: "monospace" }}>{index}</div>
                </div>
              );
            })}
          </div>

          <div style={{ position: "absolute", top: 770, left: 94, right: 94, minHeight: 154, border: "1px solid #343749", borderRadius: 20, background: "#141722", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 32px", textAlign: "center", color: "#dce1e8", fontSize: 31, lineHeight: 1.45 }}>
            {phase === 0 && <span>시작: <code>lo = 0</code>, <code>hi = 5</code>, <code>mid = 2</code></span>}
            {phase === 1 && <span><code>mid = (0 + 5) // 2 = 2</code><br /><b style={{ color: colors.yellow }}>A[2] = 3 &lt; 9</b> → <code>lo = mid + 1 = 3</code></span>}
            {phase === 2 && <span><code>mid = (3 + 5) // 2 = 4</code><br /><b style={{ color: colors.green }}>A[4] = 9</b> → index <b style={{ color: colors.green }}>4</b> 반환</span>}
          </div>
          {phase === 2 && <div style={{ position: "absolute", top: 1000, left: 0, right: 0, textAlign: "center", color: colors.green, fontSize: 29, fontWeight: 700 }}>가운데 값 확인: 2회</div>}
        </>
      )}

      {phase === 3 && (
        <>
          <div style={{ position: "absolute", top: 275, left: 98, right: 98, textAlign: "center", color: "#9ea8b8", fontSize: 28 }}>
            정렬된 배열 · 찾으면 index · 없으면 −1
          </div>
          <div style={{ position: "absolute", top: 355, left: 78, right: 78, padding: "28px 24px", border: "1px solid #373a4b", borderRadius: 20, background: "#12141d", opacity: codeProgress }}>
            {codeLines.map((line, index) => {
              const active = index === codeLine;
              return (
                <div key={line} style={{ minHeight: 66, display: "flex", alignItems: "center", borderRadius: 8, padding: "0 14px", background: active ? "#2d2a22" : "transparent", color: active ? colors.yellow : index === 6 ? "#9da8b9" : "#e7eaf0", fontFamily: "SFMono-Regular, Menlo, Consolas, monospace", fontSize: 29, whiteSpace: "pre" }}>
                  <span style={{ width: 48, color: active ? colors.yellow : "#687184", fontSize: 22 }}>{index + 1}</span>{line}
                </div>
              );
            })}
          </div>
          <div style={{ position: "absolute", top: 1012, left: 96, right: 96, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[["lo", "현재 구간의 왼쪽"], ["mid", "가운데 인덱스"], ["hi", "현재 구간의 오른쪽"]].map(([term, meaning]) => (
              <div key={term} style={{ padding: 18, borderRadius: 14, background: "#151824", border: "1px solid #343748", textAlign: "center" }}>
                <div style={{ color: colors.cyan, fontFamily: "monospace", fontWeight: 800, fontSize: 28 }}>{term}</div>
                <div style={{ color: "#a9b2c1", fontSize: 20, marginTop: 9 }}>{meaning}</div>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", top: 1160, left: 110, right: 110, textAlign: "center", color: "#a7b0bf", fontSize: 26, lineHeight: 1.5 }}>
            비교 결과에 따라 한쪽 끝만 바꾸고,<br />남은 구간에서 <b style={{ color: colors.yellow }}>mid</b>를 다시 계산합니다.
          </div>
        </>
      )}

      {phase === 4 && (
        <>
          <div style={{ position: "absolute", top: 306, left: 90, right: 90, textAlign: "center", color: "#c1cad7", fontSize: 31 }}>
            한 번 확인할 때마다 남은 후보 수가 절반
          </div>
          <div style={{ position: "absolute", top: 440, left: 82, right: 82, display: "flex", justifyContent: "center", alignItems: "center", gap: 13 }}>
            {[16, 8, 4, 2, 1].map((n, i) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 124, height: 112, border: `2px solid ${i === 4 ? colors.green : "#41435a"}`, borderRadius: 18, background: i === 4 ? "#183025" : "#191a28", display: "grid", placeItems: "center", color: i === 4 ? colors.green : "#f0f2f6", fontSize: 38, fontFamily: "monospace", fontWeight: 800 }}>{n}</div>
                {i < 4 && <span style={{ color: colors.yellow, fontSize: 28 }}>→</span>}
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", top: 640, left: 120, right: 120, textAlign: "center", color: "#9ba5b5", fontSize: 27 }}>
            n → n/2 → n/4 → … → 1
          </div>
          <div style={{ position: "absolute", top: 790, left: 128, right: 128, padding: 30, border: "1px solid #3a3c4f", borderRadius: 18, background: "#141722", textAlign: "center" }}>
            <div style={{ color: "#aeb7c5", fontSize: 27 }}>최선 · 최악의 시간</div>
            <div style={{ color: colors.yellow, fontSize: 52, fontWeight: 850, marginTop: 15 }}>O(1) · O(log₂ n)</div>
            <div style={{ color: "#c3cbd7", fontSize: 27, marginTop: 22 }}>n = 16이면 최악에도 mid 확인은 최대 5회</div>
          </div>
          <div style={{ position: "absolute", top: 1045, left: 130, right: 130, textAlign: "center", color: "#9ba5b5", fontSize: 26, lineHeight: 1.5 }}>
            최선은 첫 mid에서 찾는 경우예요.<br />평균·최악은 <b style={{ color: colors.yellow }}>O(log n)</b> — O는 정확한 횟수가 아닌 증가율입니다.
          </div>
        </>
      )}

      {phase === 5 && (
        <>
          <div style={{ position: "absolute", top: 340, left: 110, right: 110, display: "grid", gap: 22 }}>
            {[
              ["01", "정렬된 배열", "정렬되어 있어야 어느 쪽을 버릴지 알 수 있어요."],
              ["02", "mid 비교", "같으면 반환, 다르면 절반 중 한쪽을 버려요."],
              ["03", "경계 갱신", "lo = mid + 1 또는 hi = mid − 1로 좁혀요."],
            ].map(([number, title, detail]) => (
              <div key={number} style={{ display: "grid", gridTemplateColumns: "90px 1fr", alignItems: "center", padding: 25, borderRadius: 18, border: "1px solid #343748", background: "#141722" }}>
                <div style={{ color: colors.cyan, fontFamily: "monospace", fontSize: 30 }}>{number}</div>
                <div><div style={{ color: "#f3f5f8", fontSize: 31, fontWeight: 800 }}>{title}</div><div style={{ color: "#a9b2c1", fontSize: 23, marginTop: 9 }}>{detail}</div></div>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", top: 1020, left: 100, right: 100, textAlign: "center", color: "#9ea8b7", fontSize: 25, lineHeight: 1.55 }}>
            보내주신 <code>bst_search</code>는 트리 노드의 left/right를 따라가는 재귀 탐색이에요.<br />여기서는 배열의 인덱스 <code>lo / mid / hi</code>를 사용했습니다.
          </div>
          <div style={{ position: "absolute", top: 1250, left: 0, right: 0, textAlign: "center", color: colors.yellow, fontSize: 37, fontWeight: 800 }}>핵심: 정렬 · 가운데 · 절반 버리기</div>
        </>
      )}

      <div style={{ position: "absolute", bottom: 76, left: 82, right: 82, height: 5, background: "#2b2e3c", borderRadius: 5 }}>
        <div style={{ height: "100%", width: `${(frame / 1650) * 100}%`, background: colors.cyan, borderRadius: 5 }} />
      </div>
      <div style={{ position: "absolute", bottom: 34, left: 84, color: "#727d8e", fontSize: 20, fontFamily: "monospace" }}>BINARY SEARCH · 0-BASED INDEX</div>
      <div style={{ position: "absolute", bottom: 34, right: 84, color: "#727d8e", fontSize: 20, fontFamily: "monospace" }}>{String(Math.floor(seconds)).padStart(2, "0")} / 55s</div>
    </AbsoluteFill>
  );
};
