import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

const values = [1, 3, 5, 8, 12, 15, 20, 24, 30, 44, 52, 61, 64, 70, 81, 90];
const codeLines = [
  "count++;",
  "if (low > high) return 0;",
  "mid = (low + high) / 2;",
  "if (key == A[mid]) return 1;",
  "else if (key < A[mid])",
  "    return bin(low, mid - 1, key);",
  "else return bin(mid + 1, high, key);",
];

type SearchStep = {
  count: number;
  low: number;
  high: number;
  mid: number | null;
  value: number | null;
  decision: string;
  next: string;
  result?: "found" | "missing";
};

const steps22: SearchStep[] = [
  { count: 1, low: 0, high: 15, mid: 7, value: 24, decision: "22 < A[7] = 24", next: "왼쪽 구간 → 0..6" },
  { count: 2, low: 0, high: 6, mid: 3, value: 8, decision: "22 > A[3] = 8", next: "오른쪽 구간 → 4..6" },
  { count: 3, low: 4, high: 6, mid: 5, value: 15, decision: "22 > A[5] = 15", next: "오른쪽 구간 → 6..6" },
  { count: 4, low: 6, high: 6, mid: 6, value: 20, decision: "22 > A[6] = 20", next: "오른쪽 구간 → 7..6" },
  { count: 5, low: 7, high: 6, mid: null, value: null, decision: "low = 7 > high = 6", next: "빈 구간 → return 0", result: "missing" },
];

const steps52: SearchStep[] = [
  { count: 6, low: 0, high: 15, mid: 7, value: 24, decision: "52 > A[7] = 24", next: "오른쪽 구간 → 8..15" },
  { count: 7, low: 8, high: 15, mid: 11, value: 61, decision: "52 < A[11] = 61", next: "왼쪽 구간 → 8..10" },
  { count: 8, low: 8, high: 10, mid: 9, value: 44, decision: "52 > A[9] = 44", next: "오른쪽 구간 → 10..10" },
  { count: 9, low: 10, high: 10, mid: 10, value: 52, decision: "52 = A[10]", next: "찾음 → return 1", result: "found" },
];

const colors = { cyan: "#75d6e8", yellow: "#ffc95c", pink: "#ef78ae", green: "#60d69c", muted: "#a7b0bf", red: "#ff7d75" };
const phaseStarts = [0, 16.4, 30, 57.5, 79.5, 91];
const phaseAt = (seconds: number) => phaseStarts.reduce((phase, start, index) => (seconds >= start ? index : phase), 0);

const Panel: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <div style={{ border: "1px solid #343748", borderRadius: 22, background: "#141722", ...style }}>{children}</div>
);

const ArrayGrid: React.FC<{ step?: SearchStep; top?: number }> = ({ step, top = 420 }) => (
  <div style={{ position: "absolute", top, left: 58, right: 58, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", columnGap: 12, rowGap: 14 }}>
    {values.map((value, index) => {
      const inside = !step || (index >= step.low && index <= step.high);
      const isMid = step?.mid === index;
      const isFound = step?.result === "found" && isMid;
      const labels = [];
      if (step && index === step.low) labels.push(step.low === step.high ? "lo=hi" : "lo");
      if (isMid) labels.push("mid");
      if (step && index === step.high && step.low !== step.high) labels.push("hi");
      const markerColor = isFound ? colors.green : isMid ? colors.yellow : colors.cyan;
      return (
        <div key={index} style={{ textAlign: "center", opacity: inside ? 1 : 0.18 }}>
          <div style={{ height: 40, color: labels.length ? markerColor : "transparent", fontFamily: "monospace", fontSize: labels.join("/").length > 5 ? 20 : 25, fontWeight: 800, whiteSpace: "nowrap" }}>{labels.join("/") || "·"}</div>
          <div style={{ height: 104, display: "grid", placeItems: "center", border: `3px solid ${isFound ? colors.green : isMid ? colors.yellow : "#424459"}`, borderRadius: 15, background: isFound ? "#173226" : isMid ? "#302819" : "#191a28", color: isFound ? colors.green : isMid ? colors.yellow : "#edf0f4", fontFamily: "monospace", fontSize: 54, fontWeight: 800, boxShadow: isFound || isMid ? `0 0 20px ${markerColor}30` : "0 7px 0 #07080d" }}>{value}</div>
          <div style={{ color: "#929aaa", fontSize: 25, marginTop: 7, fontFamily: "monospace" }}>{index}</div>
        </div>
      );
    })}
  </div>
);

export const BinarySearchExam2025Q14: React.FC = () => {
  const frame = useCurrentFrame();
  const seconds = frame / 30;
  const phase = phaseAt(seconds);
  const headings = [
    "두 번 찾으면 count는 얼마일까?",
    "한 줄의 순서가 count를 바꿉니다",
    "첫 검색: key = 22",
    "두 번째 검색: key = 52",
    "출력은 count: 5, count: 9",
    "왜 count와 비교 횟수가 다를까?",
  ][phase];
  const step22Index = Math.min(4, Math.floor((seconds - 30) / 5.5));
  const step52Index = Math.min(3, Math.floor((seconds - 57.5) / 5.5));
  const traceStep = phase === 2 ? steps22[step22Index] : phase === 3 ? steps52[step52Index] : undefined;
  const codeLine = seconds < 23.4 ? 0 : 1;
  const codeOpacity = interpolate(frame, [492, 522], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 16%, #17202d 0%, #0b0d12 54%, #090b10 100%)", color: "#f4f5f7", fontFamily: '"Apple SD Gothic Neo", Arial, Helvetica, sans-serif' }}>
      <Audio src={staticFile("audio/binary-search-exam-2025-q14.wav")} volume={0.98} />
      <div style={{ position: "absolute", top: 62, left: 70, color: colors.cyan, fontSize: 23, fontWeight: 750, letterSpacing: 2 }}>2025 국가직 · 데이터직 <span style={{ color: "#738093" }}>/</span> 알고리즘 14번</div>
      <div style={{ position: "absolute", top: 132, left: 58, right: 58, textAlign: "center", fontSize: 48, lineHeight: 1.2, fontWeight: 850 }}>{headings}</div>

      {phase === 0 && <>
        <Panel style={{ position: "absolute", top: 290, left: 100, right: 100, padding: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: colors.muted, fontSize: 30 }}>전역 변수</span><b style={{ color: colors.yellow, fontFamily: "monospace", fontSize: 42 }}>count = 0</b>
        </Panel>
        <div style={{ position: "absolute", top: 405, left: 90, right: 90, display: "flex", justifyContent: "center", gap: 24 }}>
          {[22, 52].map((key) => <Panel key={key} style={{ width: 400, padding: 26, textAlign: "center", borderColor: seconds > 8 && key === 52 ? colors.green : "#343748" }}><div style={{ color: colors.muted, fontSize: 25 }}>찾을 key</div><div style={{ color: key === 22 && seconds < 8 ? colors.yellow : key === 52 && seconds >= 8 ? colors.green : "#f4f5f7", fontSize: 51, fontFamily: "monospace", fontWeight: 850, marginTop: 8 }}>{key}</div></Panel>)}
        </div>
        <div style={{ position: "absolute", top: 570, left: 60, right: 60, textAlign: "center", color: colors.muted, fontSize: 31 }}>오름차순 배열 A · index 0부터 15</div>
        <ArrayGrid top={630} />
      </>}

      {phase === 1 && <>
        <Panel style={{ position: "absolute", top: 270, left: 110, right: 110, padding: 12, textAlign: "center", borderColor: "#5a4b2c" }}><span style={{ color: colors.yellow, fontFamily: "monospace", fontSize: 38, fontWeight: 800 }}>count++</span><span style={{ color: colors.muted, fontSize: 30 }}> 먼저 실행</span></Panel>
        <div style={{ position: "absolute", top: 355, left: 100, right: 100, textAlign: "center", color: colors.muted, fontSize: 30 }}>재귀 함수의 진입 횟수를 셉니다</div>
        <Panel style={{ position: "absolute", top: 435, left: 45, right: 45, padding: "22px 16px", opacity: codeOpacity }}>
          <div style={{ color: colors.cyan, fontFamily: "monospace", fontSize: 31, margin: "0 10px 10px" }}>int bin(int low, int high, int key)</div>
          {codeLines.map((line, index) => <div key={line} style={{ height: 72, display: "flex", alignItems: "center", borderRadius: 9, padding: "0 10px", background: index === codeLine ? "#302819" : "transparent", color: index === codeLine ? colors.yellow : "#e6eaf0", fontFamily: "SFMono-Regular, Menlo, Consolas, monospace", fontSize: 38, whiteSpace: "pre" }}><span style={{ width: 37, color: index === codeLine ? colors.yellow : "#687184", fontSize: 22 }}>{index + 1}</span>{line}</div>)}
        </Panel>
        <div style={{ position: "absolute", top: 1050, left: 100, right: 100, textAlign: "center", color: colors.pink, fontSize: 34, fontWeight: 800 }}>count++ → low &gt; high 검사</div>
        <div style={{ position: "absolute", top: 1110, left: 110, right: 110, textAlign: "center", color: colors.muted, fontSize: 29 }}>빈 범위 호출도 count에 포함</div>
      </>}

      {(phase === 2 || phase === 3) && traceStep && <>
        <div style={{ position: "absolute", top: 275, left: 70, right: 70, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: phase === 2 ? colors.yellow : colors.green, fontSize: 32, fontWeight: 800 }}>key = {phase === 2 ? 22 : 52}</div>
          <Panel style={{ padding: "12px 23px", borderColor: colors.cyan }}><span style={{ color: colors.muted, fontSize: 23 }}>호출 {traceStep.count}</span><span style={{ color: colors.cyan, fontFamily: "monospace", fontSize: 34, fontWeight: 850, marginLeft: 18 }}>count={traceStep.count}</span></Panel>
        </div>
        {phase === 3 && <div style={{ position: "absolute", top: 340, left: 80, right: 80, textAlign: "center", color: colors.muted, fontSize: 27 }}>두 번째 bin 진입 전 count = 5</div>}
        <ArrayGrid step={traceStep} />
        <Panel style={{ position: "absolute", top: 1220, left: 78, right: 78, minHeight: 210, padding: 30, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          <div style={{ color: traceStep.result === "missing" ? colors.red : traceStep.result === "found" ? colors.green : colors.yellow, fontFamily: "monospace", fontSize: 39, fontWeight: 850 }}>{traceStep.mid === null ? "low=7 · high=6" : `low=${traceStep.low} · high=${traceStep.high} · mid=${traceStep.mid}`}</div>
          <div style={{ color: "#edf0f4", fontSize: 35, fontWeight: 750 }}>{traceStep.decision}</div>
          <div style={{ color: traceStep.result === "missing" ? colors.red : traceStep.result === "found" ? colors.green : colors.cyan, fontSize: 34, fontWeight: 800 }}>{traceStep.next}</div>
        </Panel>
      </>}

      {phase === 4 && <>
        <div style={{ position: "absolute", top: 330, left: 100, right: 100, textAlign: "center", color: colors.muted, fontSize: 31 }}>첫 검색 실패 후에도 count는 초기화되지 않음</div>
        <Panel style={{ position: "absolute", top: 440, left: 105, right: 105, padding: 34, textAlign: "center" }}>
          <div style={{ color: colors.yellow, fontFamily: "monospace", fontSize: 36 }}>bin(0, 15, 22) → 0</div>
          <div style={{ color: colors.muted, fontSize: 32, margin: "12px 0" }}>첫 printf 시점</div>
          <div style={{ color: colors.yellow, fontFamily: "monospace", fontSize: 54, fontWeight: 850 }}>count: 5,</div>
        </Panel>
        <div style={{ position: "absolute", top: 720, left: 0, right: 0, textAlign: "center", color: colors.cyan, fontSize: 46, fontWeight: 850 }}>count 5 + 두 번째 호출 4회</div>
        <Panel style={{ position: "absolute", top: 835, left: 105, right: 105, padding: 34, textAlign: "center", borderColor: "#31534a" }}>
          <div style={{ color: colors.green, fontFamily: "monospace", fontSize: 36 }}>bin(0, 15, 52) → 1</div>
          <div style={{ color: colors.muted, fontSize: 32, margin: "12px 0" }}>두 번째 printf 시점</div>
          <div style={{ color: colors.green, fontFamily: "monospace", fontSize: 54, fontWeight: 850 }}>count: 9</div>
        </Panel>
        <div style={{ position: "absolute", top: 1115, left: 0, right: 0, textAlign: "center", color: "#f3f5f8", fontFamily: "monospace", fontSize: 40, fontWeight: 850 }}>count: 5, count: 9</div>
      </>}

      {phase === 5 && <>
        <div style={{ position: "absolute", top: 330, left: 80, right: 80, textAlign: "center", color: colors.muted, fontSize: 30 }}>매 호출마다 남은 후보 수가 절반</div>
        <div style={{ position: "absolute", top: 440, left: 62, right: 62, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>{[16, 8, 4, 2, 1].map((n, index) => <div key={n} style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 128, height: 110, display: "grid", placeItems: "center", border: `2px solid ${index === 4 ? colors.green : "#41435a"}`, borderRadius: 16, background: index === 4 ? "#183025" : "#191a28", color: index === 4 ? colors.green : "#f0f2f6", fontSize: 37, fontFamily: "monospace", fontWeight: 850 }}>{n}</div>{index < 4 && <span style={{ color: colors.yellow, fontSize: 24 }}>→</span>}</div>)}</div>
        <Panel style={{ position: "absolute", top: 650, left: 105, right: 105, padding: 34, textAlign: "center" }}><div style={{ color: colors.yellow, fontFamily: "monospace", fontSize: 54, fontWeight: 900 }}>시간 O(log n)</div><div style={{ color: colors.cyan, fontSize: 36, marginTop: 16 }}>재귀 스택 공간 O(log n)</div></Panel>
        <Panel style={{ position: "absolute", top: 900, left: 90, right: 90, padding: 31, textAlign: "center", borderColor: "#614243" }}><div style={{ color: colors.red, fontSize: 34, fontWeight: 850 }}>이 문제의 count ≠ 비교 횟수</div><div style={{ color: "#d0d6df", fontSize: 30, marginTop: 16 }}>함수 진입 때 증가 · 빈 구간 호출도 포함</div></Panel>
        <div style={{ position: "absolute", top: 1130, left: 90, right: 90, textAlign: "center", color: colors.muted, fontSize: 28 }}>전제: A가 오름차순으로 정렬되어 있음</div>
      </>}

      <div style={{ position: "absolute", bottom: 72, left: 78, right: 78, height: 5, background: "#2b2e3c", borderRadius: 5 }}><div style={{ height: "100%", width: `${(frame / 3120) * 100}%`, background: colors.cyan, borderRadius: 5 }} /></div>
      <div style={{ position: "absolute", bottom: 30, left: 78, color: "#727d8e", fontSize: 19, fontFamily: "monospace" }}>RECURSIVE BINARY SEARCH · GLOBAL COUNT</div>
      <div style={{ position: "absolute", bottom: 30, right: 78, color: "#727d8e", fontSize: 19, fontFamily: "monospace" }}>{String(Math.floor(seconds)).padStart(2, "0")} / 104s</div>
    </AbsoluteFill>
  );
};
