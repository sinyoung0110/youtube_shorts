import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";

const values = [1, 3, 5, 12, 19, 20, 22, 25, 29, 31];
const colors = { cyan: "#75d6e8", yellow: "#ffc95c", pink: "#ef78ae", green: "#60d69c", muted: "#a7b0bf", red: "#ff7d75" };

type Step = {
  left: number;
  right: number;
  mid: number;
  value: number;
  compare: string;
  update: string;
  found?: boolean;
};

const lowerSteps: Step[] = [
  { left: 0, right: 9, mid: 4, value: 19, compare: "12 < A[4] = 19", update: "right = 3" },
  { left: 0, right: 3, mid: 1, value: 3, compare: "12 > A[1] = 3", update: "left = 2" },
  { left: 2, right: 3, mid: 2, value: 5, compare: "12 > A[2] = 5", update: "left = 3" },
  { left: 3, right: 3, mid: 3, value: 12, compare: "12 = A[3]", update: "찾음 → return 3", found: true },
];

const upperSteps: Step[] = [
  { left: 0, right: 9, mid: 5, value: 20, compare: "12 < A[5] = 20", update: "right = 4" },
  { left: 0, right: 4, mid: 2, value: 5, compare: "12 > A[2] = 5", update: "left = 3" },
  { left: 3, right: 4, mid: 4, value: 19, compare: "12 < A[4] = 19", update: "right = 3" },
  { left: 3, right: 3, mid: 3, value: 12, compare: "12 = A[3]", update: "찾음 → return 3", found: true },
];

const phases = [0, 8.5, 15.3, 30.3, 45.5];
const phaseAt = (seconds: number) => phases.reduce((phase, start, index) => (seconds >= start ? index : phase), 0);

const Panel: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <div style={{ border: "1px solid #343748", borderRadius: 22, background: "#141722", ...style }}>{children}</div>
);

const ArrayGrid: React.FC<{ step?: Step; top: number }> = ({ step, top }) => (
  <div style={{ position: "absolute", top, left: 58, right: 58, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
    {values.map((value, index) => {
      const active = !step || (index >= step.left && index <= step.right);
      const mid = step?.mid === index;
      const labels = [];
      if (step && index === step.left) labels.push(step.left === step.right ? "left=right" : "left");
      if (mid) labels.push("mid");
      if (step && index === step.right && step.left !== step.right) labels.push("right");
      const tint = step?.found && mid ? colors.green : mid ? colors.yellow : colors.cyan;
      return (
        <div key={index} style={{ textAlign: "center", opacity: active ? 1 : 0.18 }}>
          <div style={{ height: 38, color: labels.length ? tint : "transparent", fontFamily: "monospace", fontSize: labels.join("/").length > 8 ? 18 : 23, fontWeight: 800, whiteSpace: "nowrap" }}>{labels.join("/") || "·"}</div>
          <div style={{ height: 106, display: "grid", placeItems: "center", border: `3px solid ${step?.found && mid ? colors.green : mid ? colors.yellow : "#424459"}`, borderRadius: 17, background: step?.found && mid ? "#173226" : mid ? "#302819" : "#191a28", color: step?.found && mid ? colors.green : mid ? colors.yellow : "#edf0f4", fontFamily: "monospace", fontSize: 54, fontWeight: 850, boxShadow: mid ? `0 0 22px ${tint}30` : "0 7px 0 #07080d" }}>{value}</div>
          <div style={{ color: "#929aaa", fontSize: 26, marginTop: 7, fontFamily: "monospace" }}>{index}</div>
        </div>
      );
    })}
  </div>
);

export const BinarySearchMidpoint12: React.FC = () => {
  const seconds = useCurrentFrame() / 30;
  const phase = phaseAt(seconds);
  const lowerIndex = Math.min(3, Math.floor((seconds - 15.3) / 3.75));
  const upperIndex = Math.min(3, Math.floor((seconds - 30.3) / 3.8));
  const step = phase === 2 ? lowerSteps[lowerIndex] : phase === 3 ? upperSteps[upperIndex] : undefined;
  const headers = [
    "12의 인덱스를 찾아볼까요?",
    "두 공식은 첫 mid가 달라요",
    "1번 · 아래쪽 mid",
    "2번 · 위쪽 mid",
    "두 공식 모두 index 3을 찾습니다",
  ];

  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 16%, #17202d 0%, #0b0d12 54%, #090b10 100%)", color: "#f4f5f7", fontFamily: '"Apple SD Gothic Neo", Arial, Helvetica, sans-serif' }}>
      <Audio src={staticFile("audio/binary-search-midpoint-12.wav")} volume={0.98} />
      <div style={{ position: "absolute", top: 210, left: 70, color: colors.cyan, fontSize: 23, fontWeight: 750, letterSpacing: 2 }}>BINARY SEARCH <span style={{ color: "#738093" }}>/</span> MIDPOINT ROUNDING</div>
      <div style={{ position: "absolute", top: 300, left: 58, right: 58, textAlign: "center", fontSize: 49, lineHeight: 1.2, fontWeight: 850 }}>{headers[phase]}</div>

      {phase === 0 && <>
        <Panel style={{ position: "absolute", top: 400, left: 120, right: 120, padding: 24, display: "flex", justifyContent: "center", alignItems: "center", gap: 25, borderColor: "#31534a" }}><span style={{ color: colors.muted, fontSize: 30 }}>찾을 값</span><b style={{ color: colors.green, fontSize: 52, fontFamily: "monospace" }}>12</b></Panel>
        <div style={{ position: "absolute", top: 495, left: 60, right: 60, textAlign: "center", color: colors.muted, fontSize: 31 }}>오름차순 배열 · 인덱스 0부터 9</div>
        <ArrayGrid top={545} />
        <Panel style={{ position: "absolute", top: 950, left: 95, right: 95, padding: 32, textAlign: "center", borderColor: "#3c5960" }}><div style={{ color: colors.cyan, fontSize: 38, fontWeight: 850 }}>두 mid 공식으로 탐색 순서를 비교</div><div style={{ color: "#d1d7df", fontSize: 32, marginTop: 15 }}>각 단계에서 left · right · mid 갱신</div></Panel>
      </>}

      {phase === 1 && <>
        <div style={{ position: "absolute", top: 410, left: 80, right: 80, textAlign: "center", color: colors.muted, fontSize: 31 }}>현재 구간이 index 0..9일 때</div>
        <Panel style={{ position: "absolute", top: 510, left: 80, right: 80, padding: 32, borderColor: "#5a4b2c" }}><div style={{ color: colors.cyan, fontSize: 31, fontWeight: 800 }}>아래쪽 가운데 · floor</div><div style={{ color: "#f4f5f7", fontFamily: "monospace", fontSize: 37, marginTop: 18 }}>0 + (9 − 0) / 2 = <b style={{ color: colors.cyan }}>4</b></div></Panel>
        <Panel style={{ position: "absolute", top: 780, left: 80, right: 80, padding: 32, borderColor: "#624d28" }}><div style={{ color: colors.yellow, fontSize: 31, fontWeight: 800 }}>위쪽 가운데 · upper mid</div><div style={{ color: "#f4f5f7", fontFamily: "monospace", fontSize: 37, marginTop: 18 }}>0 + (9 − 0 + 1) / 2 = <b style={{ color: colors.yellow }}>5</b></div></Panel>
        <div style={{ position: "absolute", top: 1080, left: 90, right: 90, textAlign: "center", color: colors.muted, fontSize: 30 }}>C의 정수 나눗셈 · 소수 부분 버림</div>
      </>}

      {(phase === 2 || phase === 3) && step && <>
        <div style={{ position: "absolute", top: 360, left: 75, right: 75, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: phase === 2 ? colors.cyan : colors.yellow, fontSize: 31, fontWeight: 850 }}>key = 12</div>
          <Panel style={{ padding: "12px 22px", borderColor: phase === 2 ? colors.cyan : colors.yellow }}><span style={{ color: colors.muted, fontSize: 24 }}>비교</span><span style={{ color: "#f4f5f7", fontFamily: "monospace", fontSize: 33, fontWeight: 850, marginLeft: 15 }}>{(phase === 2 ? lowerIndex : upperIndex) + 1} / 4</span></Panel>
        </div>
        <div style={{ position: "absolute", top: 430, left: 60, right: 60, textAlign: "center", color: colors.muted, fontFamily: "monospace", fontSize: 30 }}>{phase === 2 ? "mid = left + (right − left) / 2" : "mid = left + (right − left + 1) / 2"}</div>
        <ArrayGrid step={step} top={390} />
        <Panel style={{ position: "absolute", top: 900, left: 75, right: 75, minHeight: 235, padding: 28, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18, textAlign: "center" }}>
          <div style={{ color: colors.muted, fontFamily: "monospace", fontSize: 33 }}>left={step.left} · right={step.right} · mid={step.mid}</div>
          <div style={{ color: step.found ? colors.green : colors.yellow, fontSize: 40, fontWeight: 850 }}>{step.compare}</div>
          <div style={{ color: step.found ? colors.green : colors.cyan, fontSize: 38, fontWeight: 850 }}>{step.update}</div>
        </Panel>
      </>}

      {phase === 4 && <>
        <div style={{ position: "absolute", top: 400, left: 72, right: 72, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Panel style={{ padding: 27, textAlign: "center", borderColor: "#3c5960" }}><div style={{ color: colors.cyan, fontSize: 30, fontWeight: 850 }}>아래쪽 mid</div><div style={{ color: "#edf0f4", fontFamily: "monospace", fontSize: 32, marginTop: 20 }}>19 → 3 → 5 → 12</div></Panel>
          <Panel style={{ padding: 27, textAlign: "center", borderColor: "#62522c" }}><div style={{ color: colors.yellow, fontSize: 30, fontWeight: 850 }}>위쪽 mid</div><div style={{ color: "#edf0f4", fontFamily: "monospace", fontSize: 32, marginTop: 20 }}>20 → 5 → 19 → 12</div></Panel>
        </div>
        <Panel style={{ position: "absolute", top: 630, left: 100, right: 100, padding: 28, textAlign: "center", borderColor: "#31534a" }}><div style={{ color: colors.green, fontSize: 42, fontWeight: 900 }}>A[3] = 12 → index 3</div><div style={{ color: colors.green, fontSize: 44, fontWeight: 900, marginTop: 12 }}>두 방식 모두 return 3</div></Panel>
        <Panel style={{ position: "absolute", top: 880, left: 100, right: 100, padding: 31, textAlign: "center" }}><div style={{ color: colors.cyan, fontSize: 36, fontWeight: 850 }}>두 방식 모두 4회 비교</div><div style={{ color: "#f4f5f7", fontSize: 34, marginTop: 18 }}>시간 복잡도 O(log n)</div></Panel>
        <div style={{ position: "absolute", top: 1130, left: 90, right: 90, textAlign: "center", color: colors.muted, fontSize: 31 }}>정렬 배열 · left/right를 mid 기준으로 갱신</div>
      </>}

          </AbsoluteFill>
  );
};
