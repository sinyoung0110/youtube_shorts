import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";

export type Episode = {
  slug: string; title: string; tag: string; kind: string; question: string; why: string; input: string;
  trace: string[]; code: string; complexity: string; space: string; pre: string; pro: string; con: string;
  voice: string[]; starts: number[]; durations: number[]; totalSeconds: number; summaryRows?: string[][];
};

const palette = { cyan: "#75d6e8", yellow: "#ffc95c", pink: "#ef78ae", green: "#60d69c", muted: "#a7b0bf", panel: "#141722" };
const fps = 30;

const Panel: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <div style={{ border: "1px solid #343748", borderRadius: 22, background: palette.panel, ...style }}>{children}</div>
);

const TableRows: React.FC<{ rows: string[][] }> = ({ rows }) => (
  <div style={{ position: "absolute", top: 440, left: 66, right: 208, display: "flex", flexDirection: "column", gap: 11 }}>
    <div style={{ display: "grid", gridTemplateColumns: "0.95fr 2.1fr 0.95fr 1fr", color: palette.muted, fontSize: 24, padding: "0 16px" }}><span>정렬</span><span>시간</span><span>추가 공간</span><span>안정성</span></div>
    {rows.map((row) => <Panel key={row[0]} style={{ display: "grid", gridTemplateColumns: "0.95fr 2.1fr 0.95fr 1fr", alignItems: "center", minHeight: 86, padding: "10px 16px", fontSize: 25 }}>
      <b style={{ color: palette.cyan }}>{row[0]}</b><span style={{ fontFamily: "monospace", fontSize: 25 }}>{row[1]}</span><span style={{ color: palette.muted }}>{row[2]}</span><span style={{ color: row[3] === "안정" ? palette.green : palette.yellow }}>{row[3]}</span>
    </Panel>)}
  </div>
);

export const AlgorithmEpisode: React.FC<{ episode: Episode }> = ({ episode }) => {
  const frame = useCurrentFrame();
  const seconds = frame / fps;
  const phase = episode.starts.reduce((index, start, i) => (seconds >= start ? i : index), 0);
  const phaseDuration = episode.durations[phase] ?? 1;
  const localTime = Math.max(0, seconds - episode.starts[phase]);
  const code = episode.code.split("\n");
  const codeLine = Math.min(code.length - 1, Math.floor((localTime / Math.max(phaseDuration, 1)) * code.length));
  const traceIndex = Math.min(episode.trace.length - 1, Math.floor((localTime / Math.max(phaseDuration, 1)) * episode.trace.length));
  const isSummary = Boolean(episode.summaryRows);
  const summaryHalf = (episode.durations[3] ?? 0) / 2;
  const summaryRows = episode.summaryRows ? (localTime < summaryHalf ? episode.summaryRows.slice(0, 6) : episode.summaryRows.slice(6)) : [];
  const titleFor = ["왜 이 방법이 필요할까요?", "작은 예시로 직접 따라가요", "핵심 코드를 한 줄씩 봐요", "복잡도와 선택 기준"];

  return <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 22%, #17202d 0%, #0b0d12 55%, #090b10 100%)", color: "#f4f5f7", fontFamily: '"Apple SD Gothic Neo", Arial, Helvetica, sans-serif' }}>
    {episode.voice.map((_, i) => <Sequence key={i} from={Math.round(episode.starts[i] * fps)}><Audio src={staticFile(`audio/${episode.slug}-${String(i + 1).padStart(2, "0")}.wav`)} volume={0.98} /></Sequence>)}
    <div style={{ position: "absolute", top: 210, left: 70, right: 215, color: palette.cyan, fontSize: 22, fontWeight: 800, letterSpacing: 1.8 }}>{episode.kind.toUpperCase()} <span style={{ color: "#738093" }}>/</span> {episode.tag}</div>
    <div style={{ position: "absolute", top: 278, left: 64, right: 205, textAlign: "center", fontSize: 44, lineHeight: 1.24, fontWeight: 900 }}>{phase === 0 ? episode.title : titleFor[phase]}</div>

    {phase === 0 && <>
      <Panel style={{ position: "absolute", top: 475, left: 66, right: 208, padding: "36px 30px", borderColor: palette.yellow, textAlign: "center" }}>
        <div style={{ color: palette.yellow, fontSize: 34, fontWeight: 850 }}>{episode.question}</div>
        <div style={{ color: "#f4f5f7", fontSize: 31, lineHeight: 1.55, marginTop: 30 }}>{episode.why}</div>
      </Panel>
      <div style={{ position: "absolute", top: 1130, left: 85, right: 225, textAlign: "center", color: palette.cyan, fontSize: 31, fontWeight: 800 }}>{episode.pro}</div>
    </>}

    {phase === 1 && <>
      <Panel style={{ position: "absolute", top: 420, left: 66, right: 208, padding: 25, borderColor: palette.yellow, textAlign: "center" }}>
        <div style={{ color: palette.muted, fontSize: 25 }}>예시 입력</div>
        <div style={{ color: palette.yellow, fontSize: 34, lineHeight: 1.35, fontWeight: 850, fontFamily: "monospace", marginTop: 10 }}>{episode.input}</div>
      </Panel>
      <div style={{ position: "absolute", top: 625, left: 66, right: 208, display: "flex", flexDirection: "column", gap: 14 }}>
        {episode.trace.map((step, i) => <Panel key={step} style={{ minHeight: 126, padding: "22px 24px", display: "flex", alignItems: "center", borderColor: traceIndex === i ? palette.green : "#343748", background: traceIndex === i ? "#14251f" : palette.panel, opacity: traceIndex === i ? 1 : 0.75 }}>
          <b style={{ color: traceIndex === i ? palette.green : palette.muted, fontSize: 29, marginRight: 18 }}>{i + 1}</b><span style={{ fontSize: 28, lineHeight: 1.4 }}>{step}</span>
        </Panel>)}
      </div>
    </>}

    {phase === 2 && <>
      <Panel style={{ position: "absolute", top: 405, left: 62, right: 205, padding: "26px 22px", borderColor: palette.cyan }}>
        <div style={{ color: palette.cyan, fontSize: 24, fontWeight: 800, marginBottom: 20 }}>핵심 의사코드 · Python 형태</div>
        {code.map((line, i) => <div key={`${i}-${line}`} style={{ minHeight: 57, padding: "5px 12px", borderRadius: 8, background: codeLine === i ? "#2e2a1c" : "transparent", color: codeLine === i ? palette.yellow : i === codeLine + 1 ? "#f4f5f7" : "#aeb5c1", fontFamily: "monospace", fontSize: 31, lineHeight: 1.35, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{line || " "}</div>)}
      </Panel>
      <div style={{ position: "absolute", top: 1350, left: 75, right: 220, textAlign: "center", color: palette.muted, fontSize: 25 }}>예시의 선택·이동 규칙을 코드와 연결하세요</div>
    </>}

    {phase === 3 && isSummary && <>
      <div style={{ position: "absolute", top: 370, left: 66, right: 208, color: palette.yellow, fontSize: 29, fontWeight: 850, textAlign: "center" }}>{localTime < summaryHalf ? "비교 기반 정렬" : "범위·자릿수·분포를 이용"}</div>
      <TableRows rows={summaryRows} />
      <div style={{ position: "absolute", top: 1280, left: 70, right: 215, fontSize: 26, color: palette.muted, textAlign: "center" }}>{localTime < summaryHalf ? "n은 원소 수 · 안정 정렬은 같은 키의 순서를 지킴" : "k는 키 범위 · d는 자릿수 · b는 기수·버킷 수"}</div>
    </>}

    {phase === 3 && !isSummary && <>
      <Panel style={{ position: "absolute", top: 430, left: 66, right: 208, padding: 30, borderColor: palette.cyan, textAlign: "center" }}>
        <div style={{ color: palette.cyan, fontSize: 27, fontWeight: 850 }}>시간 복잡도</div>
        <div style={{ color: palette.yellow, fontFamily: "monospace", fontSize: 35, fontWeight: 900, lineHeight: 1.4, marginTop: 18 }}>{episode.complexity}</div>
      </Panel>
      <Panel style={{ position: "absolute", top: 720, left: 66, right: 208, padding: 28, borderColor: palette.green, textAlign: "center" }}>
        <div style={{ color: palette.green, fontSize: 27, fontWeight: 850 }}>전제 · 공간</div>
        <div style={{ fontSize: 28, lineHeight: 1.42, marginTop: 16 }}>{episode.pre}<br />{episode.space}</div>
      </Panel>
      <Panel style={{ position: "absolute", top: 1045, left: 66, right: 208, padding: 27, borderColor: palette.yellow, textAlign: "center" }}>
        <div style={{ color: palette.cyan, fontSize: 27, fontWeight: 850 }}>장점</div><div style={{ fontSize: 27, marginTop: 9 }}>{episode.pro}</div>
        <div style={{ color: palette.yellow, fontSize: 27, fontWeight: 850, marginTop: 20 }}>주의할 점</div><div style={{ fontSize: 27, marginTop: 9 }}>{episode.con}</div>
      </Panel>
    </>}

  </AbsoluteFill>;
};
