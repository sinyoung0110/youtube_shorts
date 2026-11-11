import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

const colors = { cyan: "#75d6e8", yellow: "#ffc95c", pink: "#ef78ae", green: "#60d69c", muted: "#a7b0bf" };
const values = [-1, 0, 3, 5, 9, 12];
const codeLines = [
  "while lo <= hi:",
  "    mid = (lo + hi) // 2",
  "    if A[mid] == x:",
  "        return mid",
  "    if A[mid] < x:",
  "        lo = mid + 1",
  "    else:",
  "        hi = mid - 1",
  "return -1",
];

const phaseStarts = [0, 7.3, 14, 26.3, 39.3, 49.2];
const phaseFor = (seconds: number) => phaseStarts.reduce((phase, start, index) => (seconds >= start ? index : phase), 0);

const Panel: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <div style={{ border: "1px solid #343748", borderRadius: 22, background: "#141722", ...style }}>{children}</div>
);

export const BinarySearch: React.FC = () => {
  const frame = useCurrentFrame();
  const seconds = frame / 30;
  const phase = phaseFor(seconds);
  const codeLine = Math.min(8, Math.max(0, Math.floor((seconds - 26.3) / 1.42)));
  const secondComparison = phase === 2 && seconds >= 20.2;

  const headings = [
    "백만 개 중 원하는 값, 어떻게 찾을까?",
    "정렬되어 있으면 절반을 버릴 수 있어요",
    "9를 찾는 과정을 따라가 봐요",
    "이 판단을 코드로 쓰면",
    "후보는 얼마나 빨리 줄어들까?",
    "빠른 검색, 필요한 조건",
  ][phase];

  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 17%, #17202d 0%, #0b0d12 54%, #090b10 100%)", color: "#f4f5f7", fontFamily: '"Apple SD Gothic Neo", Arial, Helvetica, sans-serif' }}>
      <Audio src={staticFile("audio/narration.wav")} volume={0.96} />
      <div style={{ position: "absolute", top: 210, left: 74, color: colors.cyan, fontSize: 25, fontWeight: 750, letterSpacing: 3 }}>ALGORITHM 01 <span style={{ color: "#738093" }}>/</span> BINARY SEARCH</div>
      <div style={{ position: "absolute", top: 300, left: 64, right: 64, textAlign: "center", fontSize: 49, lineHeight: 1.23, fontWeight: 800 }}>{headings}</div>

      {phase === 0 && <>
        <div style={{ position: "absolute", top: 440, left: 100, right: 100, textAlign: "center", color: colors.muted, fontSize: 34 }}>정렬된 전화번호부처럼</div>
        <Panel style={{ position: "absolute", top: 570, left: 100, right: 100, padding: 38 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 31 }}><b>하나씩 확인</b><span style={{ color: colors.pink }}>최악 1,000,000번</span></div>
          <div style={{ marginTop: 24, height: 20, borderRadius: 14, background: "#333346", overflow: "hidden" }}><div style={{ width: "94%", height: "100%", background: colors.pink }} /></div>
        </Panel>
        <div style={{ position: "absolute", top: 780, left: 100, right: 100, textAlign: "center", color: "#626d7e", fontSize: 38 }}>↓</div>
        <Panel style={{ position: "absolute", top: 880, left: 100, right: 100, padding: 38, borderColor: "#31505b" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 31 }}><b>이진 탐색</b><span style={{ color: colors.green }}>백만 개도 최대 20번</span></div>
          <div style={{ marginTop: 24, height: 20, borderRadius: 14, background: "#333346", overflow: "hidden" }}><div style={{ width: "12%", height: "100%", background: colors.green }} /></div>
        </Panel>
        <div style={{ position: "absolute", top: 1130, left: 120, right: 120, textAlign: "center", color: "#d9dee7", fontSize: 31, lineHeight: 1.55 }}>정렬된 데이터라면, 매번 절반을<br />버릴 수 있습니다. 어떻게 가능할까요?</div>
      </>}

      {phase === 1 && <>
        <div style={{ position: "absolute", top: 440, left: 100, right: 100, textAlign: "center", fontSize: 30, color: colors.muted }}>정렬되어 있으니 가운데 값이 방향을 알려줘요</div>
        <div style={{ position: "absolute", top: 600, left: 95, right: 95, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((n, i) => <div key={n} style={{ height: 116, display: "grid", placeItems: "center", borderRadius: 16, border: `2px solid ${i === 3 ? colors.yellow : "#43455a"}`, background: i === 3 ? "#302819" : "#191a28", color: i === 3 ? colors.yellow : "#dce1e8", fontSize: 34, fontFamily: "monospace" }}>{n}</div>)}
        </div>
        <div style={{ position: "absolute", top: 770, left: 120, right: 120, display: "flex", justifyContent: "space-between", color: colors.muted, fontSize: 36 }}><span>작은 쪽</span><span style={{ color: colors.yellow }}>가운데</span><span>큰 쪽</span></div>
        <Panel style={{ position: "absolute", top: 900, left: 110, right: 110, padding: 36, textAlign: "center", fontSize: 32, lineHeight: 1.6 }}>목표가 가운데보다 크면<br /><b style={{ color: colors.pink }}>왼쪽 절반은 전부 버려도 돼요.</b><br />작으면 오른쪽을 버립니다.</Panel>
        <div style={{ position: "absolute", top: 1160, left: 120, right: 120, textAlign: "center", color: colors.muted, fontSize: 28 }}>단, 데이터가 먼저 정렬되어 있어야 해요.</div>
      </>}

      {phase === 2 && <>
        <div style={{ position: "absolute", top: 386, left: 65, right: 65, textAlign: "center", color: colors.muted, fontSize: 31 }}>A = [−1, 0, 3, 5, 9, 12] <span style={{ color: "#697587" }}>·</span> target = <b style={{ color: colors.yellow }}>9</b></div>
        <div style={{ position: "absolute", top: 516, left: 70, right: 70, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
          {values.map((value, index) => {
            const lo = secondComparison ? 3 : 0; const hi = 5; const mid = secondComparison ? 4 : 2; const found = secondComparison && index === 4;
            const excluded = index < lo || index > hi;
            const marker = index === lo ? "lo" : index === mid ? "mid" : index === hi ? "hi" : "";
            const stroke = found ? colors.green : index === mid ? colors.yellow : "#45465f";
            return <div key={index} style={{ textAlign: "center", opacity: excluded ? 0.25 : 1 }}>
              <div style={{ height: 78, color: marker ? (marker === "lo" ? colors.cyan : marker === "mid" ? colors.yellow : colors.pink) : "transparent", fontFamily: "monospace", fontSize: 23, fontWeight: 700 }}>{marker || "·"}<br />{marker ? "▼" : "·"}</div>
              <div style={{ height: 128, border: `3px solid ${stroke}`, borderRadius: 17, background: found ? "#173226" : index === mid ? "#302819" : "#191a28", display: "grid", placeItems: "center", color: found ? colors.green : index === mid ? colors.yellow : "#edf0f4", fontFamily: "monospace", fontSize: 40, fontWeight: 750, boxShadow: found || index === mid ? `0 0 24px ${stroke}30` : "0 8px 0 #07080d" }}>{value}</div>
              <div style={{ color: "#8a91a0", fontSize: 22, marginTop: 12, fontFamily: "monospace" }}>{index}</div>
            </div>;
          })}
        </div>
        <Panel style={{ position: "absolute", top: 860, left: 90, right: 90, minHeight: 182, display: "grid", placeItems: "center", padding: 28, textAlign: "center", color: "#dce1e8", fontFamily: "monospace", fontSize: 36, lineHeight: 1.5 }}>
          {secondComparison ? <>lo=3 · hi=5 · mid=<b style={{ color: colors.yellow }}>4</b><br />A[4]=9 → <b style={{ color: colors.green }}>return 4</b></> : <>lo=0 · hi=5 · mid=<b style={{ color: colors.yellow }}>2</b><br />A[2]=3 &lt; 9 → <b style={{ color: colors.cyan }}>lo=3</b></>}
        </Panel>
      </>}

      {phase === 3 && <>
        <div style={{ position: "absolute", top: 375, left: 90, right: 90, textAlign: "center", color: colors.muted, fontSize: 31 }}>lo / hi 범위에서 mid를 다시 계산</div>
        <Panel style={{ position: "absolute", top: 460, left: 50, right: 50, padding: "18px 14px", opacity: interpolate(frame, [789, 819], [0, 1], { extrapolateRight: "clamp" }) }}>
          {codeLines.map((line, index) => {
            const active = index === codeLine;
            return <div key={index} style={{ height: 65, display: "flex", alignItems: "center", borderRadius: 8, padding: "0 10px", background: active ? "#302819" : "transparent", color: active ? colors.yellow : "#e7eaf0", fontFamily: "SFMono-Regular, Menlo, Consolas, monospace", fontSize: 40, whiteSpace: "pre" }}><span style={{ width: 42, flexShrink: 0, color: active ? colors.yellow : "#687184", fontSize: 24 }}>{index + 1}</span>{line}</div>;
          })}
        </Panel>
        <div style={{ position: "absolute", top: 1130, left: 94, right: 94, textAlign: "center", color: "#bdc6d3", fontSize: 31, lineHeight: 1.5 }}>같으면 반환 · 작으면 lo↑ · 크면 hi↓<br />구간이 비면 −1</div>
      </>}

      {phase === 4 && <>
        <div style={{ position: "absolute", top: 402, left: 80, right: 80, textAlign: "center", fontSize: 29, color: colors.muted }}>한 번 비교할 때마다 후보 범위가 절반</div>
        <div style={{ position: "absolute", top: 540, left: 60, right: 60, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>{[16, 8, 4, 2, 1].map((n, i) => <div key={n} style={{ display: "flex", alignItems: "center", gap: 7 }}><div style={{ width: 132, height: 118, display: "grid", placeItems: "center", border: `2px solid ${i === 4 ? colors.green : "#41435a"}`, borderRadius: 18, background: i === 4 ? "#183025" : "#191a28", color: i === 4 ? colors.green : "#f0f2f6", fontSize: 38, fontFamily: "monospace", fontWeight: 800 }}>{n}</div>{i < 4 && <span style={{ color: colors.yellow, fontSize: 24 }}>→</span>}</div>)}</div>
        <div style={{ position: "absolute", top: 720, left: 100, right: 100, textAlign: "center", color: "#9ba5b5", fontSize: 31 }}>16개: 최대 5회 <span style={{ color: "#687184" }}>·</span> 백만 개: 최대 20회</div>
        <Panel style={{ position: "absolute", top: 850, left: 100, right: 100, padding: 34, textAlign: "center" }}><div style={{ color: colors.yellow, fontSize: 50, fontWeight: 850 }}>최선 O(1)</div><div style={{ marginTop: 20, color: colors.cyan, fontSize: 44, fontWeight: 850 }}>평균 · 최악 O(log n)</div><div style={{ marginTop: 20, color: colors.muted, fontSize: 31 }}>반복문 공간 O(1)</div></Panel>
        <div style={{ position: "absolute", top: 1140, left: 100, right: 100, textAlign: "center", color: "#c1cad7", fontSize: 29, lineHeight: 1.55 }}>O는 정확한 횟수가 아니라<br />입력 증가에 따른 비용의 증가율</div>
      </>}

      {phase === 5 && <>
        <Panel style={{ position: "absolute", top: 510, left: 88, right: 88, padding: 38, borderColor: "#31534a" }}><div style={{ color: colors.green, fontSize: 38, fontWeight: 800 }}>장점 · 큰 배열도 빠른 검색</div><div style={{ color: "#c5ceda", fontSize: 32, marginTop: 20, lineHeight: 1.5 }}>확인할 후보를 절반씩 줄여요.</div></Panel>
        <Panel style={{ position: "absolute", top: 760, left: 88, right: 88, padding: 38, borderColor: "#624b39" }}><div style={{ color: colors.yellow, fontSize: 38, fontWeight: 800 }}>전제 · 미리 정렬</div><div style={{ color: "#c5ceda", fontSize: 31, marginTop: 20, lineHeight: 1.5 }}>정렬되지 않으면 절반을 버릴 수 없어요.</div></Panel>
        <Panel style={{ position: "absolute", top: 1040, left: 88, right: 88, padding: 38 }}><div style={{ color: colors.cyan, fontSize: 36, fontWeight: 800 }}>배열 삽입은 O(n)일 수 있음</div><div style={{ color: "#c5ceda", fontSize: 31, marginTop: 20, lineHeight: 1.5 }}>값을 찾는 것과 옮기는 건<br />비용이 달라요.</div></Panel>
      </>}

          </AbsoluteFill>
  );
};
