import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";

const C = { cyan: "#75d6e8", yellow: "#ffc95c", pink: "#ff7272", green: "#60d69c", muted: "#a7b0bf" };
const fps = 30;
// Voice segment starts are adjusted to the measured local TTS durations.
const starts = [0, 8.9, 29.67, 41.67];
const Panel: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <div style={{ border: "1px solid #343748", borderRadius: 24, background: "#141722", ...style }}>{children}</div>
);

export const BinarySearchMidpointOverflow: React.FC = () => {
  const frame = useCurrentFrame();
  const seconds = frame / fps;
  const phase = seconds < starts[1] ? 0 : seconds < starts[2] ? 1 : seconds < starts[3] ? 2 : 3;
  const audio = ["01", "02", "03", "04"];
  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 16%, #17202d 0%, #0b0d12 54%, #090b10 100%)", color: "#f4f5f7", fontFamily: '"Apple SD Gothic Neo", Arial, Helvetica, sans-serif' }}>
      {audio.map((part, i) => <Sequence key={part} from={starts[i] * fps}><Audio src={staticFile(`audio/binary-search-overflow-${part}.wav`)} volume={0.98} /></Sequence>)}
      <Sequence from={38}><Audio src={staticFile("audio/warning-beep.wav")} volume={0.55} /></Sequence>
      <div style={{ position: "absolute", top: 62, left: 70, color: C.cyan, fontSize: 23, fontWeight: 750, letterSpacing: 2 }}>BINARY SEARCH <span style={{ color: "#738093" }}>/ MIDPOINT OVERFLOW</span></div>
      <div style={{ position: "absolute", top: 132, left: 55, right: 55, textAlign: "center", fontSize: 47, lineHeight: 1.2, fontWeight: 900 }}>
        {(["가운데 계산, 이 한 줄이 위험할 수 있어요", "둘 다 범위 안인데, 합은 범위 밖", "차이를 먼저 구하면 안전해요", "언어별 차이까지 기억하세요"] as const)[phase]}
      </div>

      {phase === 0 && <>
        <div style={{ position: "absolute", top: 370, left: 74, right: 74, textAlign: "center", color: C.muted, fontSize: 33 }}>이진 탐색에서 mid를 이렇게 구한다면?</div>
        <Panel style={{ position: "absolute", top: 500, left: 60, right: 60, padding: "52px 18px", borderColor: C.pink, borderWidth: 3, textAlign: "center", boxShadow: `0 0 38px ${C.pink}33` }}>
          <div style={{ color: C.pink, fontSize: 68, fontWeight: 950, fontFamily: "monospace" }}>low + high</div>
          <div style={{ color: "#fff", fontSize: 58, fontWeight: 850, marginTop: 12 }}>/ 2 ?</div>
        </Panel>
        <div style={{ position: "absolute", top: 830, left: 90, right: 90, display: "flex", justifyContent: "center", gap: 22, alignItems: "center" }}>
          <span style={{ color: C.green, fontSize: 35, fontFamily: "monospace" }}>low</span><span style={{ color: C.muted, fontSize: 35 }}>+</span><span style={{ color: C.green, fontSize: 35, fontFamily: "monospace" }}>high</span><span style={{ color: C.pink, fontSize: 46 }}>⚠</span>
        </div>
        <div style={{ position: "absolute", top: 950, left: 90, right: 90, textAlign: "center", color: C.pink, fontSize: 40, fontWeight: 900 }}>정수 오버플로우 주의</div>
      </>}

      {phase === 1 && <>
        <Panel style={{ position: "absolute", top: 315, left: 70, right: 70, padding: 30, borderColor: "#51404a" }}>
          <div style={{ color: C.muted, fontSize: 29, textAlign: "center" }}>32비트 signed int의 최댓값</div>
          <div style={{ color: C.yellow, fontSize: 40, fontWeight: 850, textAlign: "center", fontFamily: "monospace", marginTop: 12 }}>2,147,483,647</div>
        </Panel>
        <Panel style={{ position: "absolute", top: 520, left: 70, right: 70, padding: 31 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 38, fontFamily: "monospace" }}><span>low = 1,500,000,000</span><b style={{ color: C.green }}>✓</b></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 38, fontFamily: "monospace", marginTop: 24 }}><span>high = 2,000,000,000</span><b style={{ color: C.green }}>✓</b></div>
          <div style={{ height: 2, background: "#343748", margin: "28px 0" }} />
          <div style={{ color: C.pink, fontSize: 37, fontWeight: 900, textAlign: "center", fontFamily: "monospace" }}>합 = 3,500,000,000 ❌</div>
          <div style={{ color: C.muted, fontSize: 29, textAlign: "center", marginTop: 18 }}>32비트 int 범위를 넘어요</div>
        </Panel>
        <Panel style={{ position: "absolute", top: 940, left: 70, right: 70, padding: 27, borderColor: C.pink, textAlign: "center" }}>
          <div style={{ color: C.pink, fontFamily: "monospace", fontSize: 36, fontWeight: 900 }}>Java int: 음수로 wrap → 잘못된 mid</div>
          <div style={{ color: C.muted, fontSize: 27, marginTop: 12 }}>C signed overflow: 결과는 정의되지 않음</div>
        </Panel>
      </>}

      {phase === 2 && <>
        <div style={{ position: "absolute", top: 300, left: 90, right: 90, textAlign: "center", color: C.muted, fontSize: 31 }}>low ≤ high인 인덱스 범위에서</div>
        <Panel style={{ position: "absolute", top: 420, left: 60, right: 60, padding: "42px 20px", borderColor: C.green, borderWidth: 3, textAlign: "center" }}>
          <div style={{ color: C.green, fontSize: 58, fontWeight: 900, fontFamily: "monospace" }}>low + (high − low) / 2</div>
        </Panel>
        <div style={{ position: "absolute", top: 620, left: 75, right: 75, display: "flex", flexDirection: "column", gap: 22 }}>
          <Panel style={{ padding: 28, textAlign: "center" }}><div style={{ color: C.muted, fontSize: 28 }}>안전한 계산 예시</div><div style={{ fontFamily: "monospace", fontSize: 32, marginTop: 14 }}>1.5B + (2.0B − 1.5B) / 2</div><div style={{ color: C.green, fontSize: 44, fontWeight: 900, marginTop: 15 }}>= 1.75B ✓</div></Panel>
          <div style={{ color: C.cyan, fontSize: 32, textAlign: "center", fontWeight: 800 }}>차이를 먼저 구해 합의 overflow를 피함</div>
        </div>
        <Panel style={{ position: "absolute", top: 1040, left: 80, right: 80, padding: 22, borderColor: "#62522c", textAlign: "center" }}><span style={{ color: C.yellow, fontFamily: "monospace", fontSize: 31 }}>int mid = low + (high - low) / 2;</span></Panel>
      </>}

      {phase === 3 && <>
        <Panel style={{ position: "absolute", top: 310, left: 68, right: 68, padding: 28, borderColor: C.cyan }}>
          <div style={{ color: C.cyan, fontSize: 34, fontWeight: 850 }}>Python</div>
          <div style={{ fontFamily: "monospace", fontSize: 34, marginTop: 16 }}>mid = (low + high) // 2</div>
          <div style={{ color: C.muted, fontSize: 27, marginTop: 14 }}>고정 32비트가 아님 · 메모리 한계는 있음</div>
        </Panel>
        <Panel style={{ position: "absolute", top: 600, left: 68, right: 68, padding: 28, borderColor: C.green }}>
          <div style={{ color: C.green, fontSize: 34, fontWeight: 850 }}>C / Java의 경계 계산</div>
          <div style={{ fontFamily: "monospace", fontSize: 31, marginTop: 16 }}>mid = low + (high - low) / 2</div>
          <div style={{ color: C.muted, fontSize: 27, marginTop: 14 }}>인덱스 범위와 자료형 전제 확인</div>
        </Panel>
        <Panel style={{ position: "absolute", top: 925, left: 75, right: 75, padding: 34, borderColor: C.yellow, textAlign: "center" }}>
          <div style={{ color: C.yellow, fontSize: 35, fontWeight: 900 }}>안전한 계산은 신뢰할 코드의 기본</div>
          <div style={{ color: "#f4f5f7", fontSize: 34, marginTop: 22 }}>구독하고 코딩 디테일 챙겨가세요!</div>
        </Panel>
      </>}

      <div style={{ position: "absolute", bottom: 72, left: 78, right: 78, height: 5, background: "#2b2e3c", borderRadius: 5 }}><div style={{ height: "100%", width: `${Math.min(100, (seconds / 58.5) * 100)}%`, background: phase === 0 || phase === 1 ? C.pink : C.green, borderRadius: 5 }} /></div>
      <div style={{ position: "absolute", bottom: 30, left: 78, color: "#727d8e", fontSize: 19, fontFamily: "monospace" }}>MIDPOINT OVERFLOW · BINARY SEARCH</div>
      <div style={{ position: "absolute", bottom: 30, right: 78, color: "#727d8e", fontSize: 19, fontFamily: "monospace" }}>{String(Math.floor(seconds)).padStart(2, "0")}s</div>
    </AbsoluteFill>
  );
};
