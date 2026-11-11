import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

const colors = { cyan: "#75d6e8", yellow: "#ffc95c", pink: "#ef78ae", green: "#60d69c", muted: "#a7b0bf" };
const values = [-1, 0, 3, 5, 9, 12];
const codeLines = [
  "def binary_search(A, x):",
  "    lo, hi = 0, len(A) - 1",
  "    while lo <= hi:",
  "        mid = (lo + hi) // 2",
  "        if A[mid] == x: return mid",
  "        if A[mid] < x: lo = mid + 1",
  "        else: hi = mid - 1",
  "    return -1",
];

const phaseStarts = [0, 9, 19, 34, 45, 62, 78, 91, 100];
const phaseFor = (seconds: number) => phaseStarts.reduce((phase, start, index) => (seconds >= start ? index : phase), 0);

const Panel: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <div style={{ border: "1px solid #343748", borderRadius: 22, background: "#141722", ...style }}>{children}</div>
);

export const BinarySearch: React.FC = () => {
  const frame = useCurrentFrame();
  const seconds = frame / 30;
  const phase = phaseFor(seconds);
  const codeLine = Math.min(7, Math.max(0, Math.floor((seconds - 45) / 2.1)));

  const headings = [
    "정렬된 기록 백만 개, 어떻게 찾을까?",
    "가운데를 보고, 절반을 버려요",
    "목표 9: 첫 번째 비교",
    "남은 범위에서 한 번 더",
    "이 판단을 코드로 옮기면",
    "후보가 절반씩 줄면 O(log n)",
    "빠른 대신, 정렬이 먼저예요",
    "잠깐 직접 찾아보세요",
    "정답은 index 5",
  ][phase];

  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 17%, #17202d 0%, #0b0d12 54%, #090b10 100%)", color: "#f4f5f7", fontFamily: '"Apple SD Gothic Neo", Arial, Helvetica, sans-serif' }}>
      <Audio src={staticFile("audio/narration.wav")} volume={0.96} />
      <div style={{ position: "absolute", top: 66, left: 74, color: colors.cyan, fontSize: 25, fontWeight: 750, letterSpacing: 3 }}>ALGORITHM 01 <span style={{ color: "#738093" }}>/</span> BINARY SEARCH</div>
      <div style={{ position: "absolute", top: 142, left: 64, right: 64, textAlign: "center", fontSize: 49, lineHeight: 1.23, fontWeight: 800 }}>{headings}</div>

      {phase === 0 && <>
        <div style={{ position: "absolute", top: 340, left: 100, right: 100, textAlign: "center", color: colors.muted, fontSize: 32 }}>예: 정렬된 전화번호부 · 이름 목록</div>
        <Panel style={{ position: "absolute", top: 470, left: 100, right: 100, padding: 38 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 31 }}><b>하나씩 확인</b><span style={{ color: colors.pink }}>최악 1,000,000번</span></div>
          <div style={{ marginTop: 24, height: 20, borderRadius: 14, background: "#333346", overflow: "hidden" }}><div style={{ width: "94%", height: "100%", background: colors.pink }} /></div>
        </Panel>
        <div style={{ position: "absolute", top: 680, left: 100, right: 100, textAlign: "center", color: "#626d7e", fontSize: 38 }}>↓</div>
        <Panel style={{ position: "absolute", top: 780, left: 100, right: 100, padding: 38, borderColor: "#31505b" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 31 }}><b>이진 탐색</b><span style={{ color: colors.green }}>백만 개도 최대 20번</span></div>
          <div style={{ marginTop: 24, height: 20, borderRadius: 14, background: "#333346", overflow: "hidden" }}><div style={{ width: "12%", height: "100%", background: colors.green }} /></div>
        </Panel>
        <div style={{ position: "absolute", top: 1030, left: 120, right: 120, textAlign: "center", color: "#d9dee7", fontSize: 31, lineHeight: 1.55 }}>정렬된 데이터라면, 매번 절반을<br />버릴 수 있습니다. 어떻게 가능할까요?</div>
      </>}

      {phase === 1 && <>
        <div style={{ position: "absolute", top: 340, left: 100, right: 100, textAlign: "center", fontSize: 30, color: colors.muted }}>정렬되어 있으니 가운데 값이 방향을 알려줘요</div>
        <div style={{ position: "absolute", top: 500, left: 95, right: 95, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((n, i) => <div key={n} style={{ height: 116, display: "grid", placeItems: "center", borderRadius: 16, border: `2px solid ${i === 3 ? colors.yellow : "#43455a"}`, background: i === 3 ? "#302819" : "#191a28", color: i === 3 ? colors.yellow : "#dce1e8", fontSize: 34, fontFamily: "monospace" }}>{n}</div>)}
        </div>
        <div style={{ position: "absolute", top: 670, left: 120, right: 120, display: "flex", justifyContent: "space-between", color: colors.muted, fontSize: 29 }}><span>작은 쪽</span><span style={{ color: colors.yellow }}>가운데</span><span>큰 쪽</span></div>
        <Panel style={{ position: "absolute", top: 800, left: 110, right: 110, padding: 36, textAlign: "center", fontSize: 32, lineHeight: 1.6 }}>목표가 가운데보다 크면<br /><b style={{ color: colors.pink }}>왼쪽 절반은 전부 버려도 돼요.</b><br />작으면 오른쪽을 버립니다.</Panel>
        <div style={{ position: "absolute", top: 1060, left: 120, right: 120, textAlign: "center", color: colors.muted, fontSize: 28 }}>단, 데이터가 먼저 정렬되어 있어야 해요.</div>
      </>}

      {(phase === 2 || phase === 3) && <>
        <div style={{ position: "absolute", top: 286, left: 65, right: 65, textAlign: "center", color: colors.muted, fontSize: 27 }}>A = [−1, 0, 3, 5, 9, 12] <span style={{ color: "#697587" }}>·</span> target = <b style={{ color: colors.yellow }}>9</b></div>
        <div style={{ position: "absolute", top: 416, left: 70, right: 70, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
          {values.map((value, index) => {
            const lo = phase === 2 ? 0 : 3; const hi = 5; const mid = phase === 2 ? 2 : 4; const found = phase === 3 && index === 4;
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
        <Panel style={{ position: "absolute", top: 760, left: 90, right: 90, minHeight: 182, display: "grid", placeItems: "center", padding: 28, textAlign: "center", color: "#dce1e8", fontFamily: "monospace", fontSize: 31, lineHeight: 1.55 }}>
          {phase === 2 ? <>mid = (0 + 5) // 2 = <b style={{ color: colors.yellow }}>2</b><br />A[2] = 3 &lt; 9 → lo = mid + 1 = <b style={{ color: colors.cyan }}>3</b></> : <>mid = (3 + 5) // 2 = <b style={{ color: colors.yellow }}>4</b><br />A[4] = 9 → <b style={{ color: colors.green }}>return 4</b></>}
        </Panel>
        {phase === 3 && <div style={{ position: "absolute", top: 1000, left: 0, right: 0, textAlign: "center", color: colors.green, fontSize: 29, fontWeight: 750 }}>가운데 비교 2회 · 0부터 세는 index 4</div>}
      </>}

      {phase === 4 && <>
        <div style={{ position: "absolute", top: 275, left: 100, right: 100, textAlign: "center", color: colors.muted, fontSize: 27 }}>lo · mid · hi는 현재 탐색 구간의 인덱스</div>
        <Panel style={{ position: "absolute", top: 360, left: 56, right: 56, padding: "24px 14px", opacity: interpolate(frame, [1350, 1380], [0, 1], { extrapolateRight: "clamp" }) }}>
          {codeLines.map((line, index) => {
            const active = index === codeLine;
            return <div key={index} style={{ height: 58, display: "flex", alignItems: "center", borderRadius: 8, padding: "0 10px", background: active ? "#302819" : "transparent", color: active ? colors.yellow : "#e7eaf0", fontFamily: "SFMono-Regular, Menlo, Consolas, monospace", fontSize: 24, whiteSpace: "pre" }}><span style={{ width: 34, flexShrink: 0, color: active ? colors.yellow : "#687184", fontSize: 18 }}>{index + 1}</span>{line}</div>;
          })}
        </Panel>
        <div style={{ position: "absolute", top: 920, left: 94, right: 94, textAlign: "center", color: "#bdc6d3", fontSize: 26, lineHeight: 1.55 }}>같으면 index 반환 · 작으면 lo를 오른쪽으로<br />크면 hi를 왼쪽으로 · 구간이 비면 −1</div>
        <div style={{ position: "absolute", top: 1080, left: 110, right: 110, textAlign: "center", color: colors.cyan, fontSize: 26 }}>정렬 배열 · lo ≤ hi인 동안 반복</div>
      </>}

      {phase === 5 && <>
        <div style={{ position: "absolute", top: 302, left: 80, right: 80, textAlign: "center", fontSize: 29, color: colors.muted }}>한 번 비교할 때마다 후보 범위가 절반</div>
        <div style={{ position: "absolute", top: 440, left: 60, right: 60, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>{[16, 8, 4, 2, 1].map((n, i) => <div key={n} style={{ display: "flex", alignItems: "center", gap: 7 }}><div style={{ width: 132, height: 118, display: "grid", placeItems: "center", border: `2px solid ${i === 4 ? colors.green : "#41435a"}`, borderRadius: 18, background: i === 4 ? "#183025" : "#191a28", color: i === 4 ? colors.green : "#f0f2f6", fontSize: 38, fontFamily: "monospace", fontWeight: 800 }}>{n}</div>{i < 4 && <span style={{ color: colors.yellow, fontSize: 24 }}>→</span>}</div>)}</div>
        <div style={{ position: "absolute", top: 620, left: 100, right: 100, textAlign: "center", color: "#9ba5b5", fontSize: 27 }}>16개: 최대 5회 <span style={{ color: "#687184" }}>·</span> 1,000,000개: 최대 20회</div>
        <Panel style={{ position: "absolute", top: 750, left: 100, right: 100, padding: 34, textAlign: "center" }}><div style={{ color: colors.yellow, fontSize: 48, fontWeight: 850 }}>최선 O(1)</div><div style={{ marginTop: 20, color: colors.cyan, fontSize: 42, fontWeight: 850 }}>평균 · 최악 O(log n)</div><div style={{ marginTop: 20, color: colors.muted, fontSize: 27 }}>반복문 추가 공간 O(1)</div></Panel>
        <div style={{ position: "absolute", top: 1040, left: 100, right: 100, textAlign: "center", color: "#c1cad7", fontSize: 25, lineHeight: 1.55 }}>log₂(1,000,000) ≈ 20<br />Big O는 정확한 횟수가 아니라 증가율이에요.</div>
      </>}

      {phase === 6 && <>
        <Panel style={{ position: "absolute", top: 370, left: 88, right: 88, padding: 32, borderColor: "#31534a" }}><div style={{ color: colors.green, fontSize: 33, fontWeight: 800 }}>장점 · 큰 정렬 배열에서 빠른 탐색</div><div style={{ color: "#c5ceda", fontSize: 27, marginTop: 20, lineHeight: 1.5 }}>확인할 후보를 매번 절반으로 줄여요.</div></Panel>
        <Panel style={{ position: "absolute", top: 600, left: 88, right: 88, padding: 32, borderColor: "#624b39" }}><div style={{ color: colors.yellow, fontSize: 33, fontWeight: 800 }}>전제 · 입력이 정렬되어야 함</div><div style={{ color: "#c5ceda", fontSize: 27, marginTop: 20, lineHeight: 1.5 }}>정렬이 깨지면 버릴 쪽을 판단할 수 없어요.</div></Panel>
        <Panel style={{ position: "absolute", top: 830, left: 88, right: 88, padding: 32 }}><div style={{ color: colors.cyan, fontSize: 30, fontWeight: 800 }}>배열 삽입·삭제는 따로 생각</div><div style={{ color: "#c5ceda", fontSize: 26, marginTop: 18, lineHeight: 1.55 }}>위치 찾기 O(log n)이어도<br />원소 밀기는 O(n)일 수 있어요.</div></Panel>
      </>}

      {phase === 7 && <>
        <div style={{ position: "absolute", top: 320, left: 72, right: 72, textAlign: "center", color: colors.muted, fontSize: 28 }}>목표는 16 · 인덱스는 0부터 시작</div>
        <div style={{ position: "absolute", top: 485, left: 65, right: 65, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 9 }}>{[1, 2, 4, 7, 11, 16, 20].map((v, i) => <div key={i} style={{ textAlign: "center" }}><div style={{ height: 55, color: i === 3 ? colors.yellow : "transparent", fontFamily: "monospace", fontSize: 20 }}>mid<br />▼</div><div style={{ height: 112, border: `2px solid ${i === 3 ? colors.yellow : "#43455a"}`, borderRadius: 15, background: i === 3 ? "#302819" : "#191a28", display: "grid", placeItems: "center", fontFamily: "monospace", fontSize: 31, color: i === 3 ? colors.yellow : "#e5e9ef" }}>{v}</div><div style={{ color: "#8a91a0", fontSize: 20, marginTop: 10 }}>{i}</div></div>)}</div>
        <Panel style={{ position: "absolute", top: 760, left: 100, right: 100, padding: 40, textAlign: "center", fontSize: 30, lineHeight: 1.6 }}>어떤 mid 값부터 보나요?<br />비교 후 <b style={{ color: colors.cyan }}>lo / hi</b>는 어떻게 바뀔까요?</Panel>
        <div style={{ position: "absolute", top: 1010, left: 0, right: 0, textAlign: "center", color: colors.yellow, fontSize: 29 }}>먼저 머릿속으로 한 번 계산해 보세요</div>
      </>}

      {phase === 8 && <>
        <div style={{ position: "absolute", top: 320, left: 74, right: 74, textAlign: "center", color: colors.muted, fontSize: 26 }}>A = [1, 2, 4, 7, 11, 16, 20] · x = 16</div>
        <Panel style={{ position: "absolute", top: 455, left: 90, right: 90, padding: 36, fontFamily: "monospace", fontSize: 30, lineHeight: 1.8 }}><div>1회: lo=0, hi=6 → mid=3</div><div>A[3]=7 &lt; 16 → <b style={{ color: colors.cyan }}>lo=4</b></div><div style={{ marginTop: 18 }}>2회: lo=4, hi=6 → mid=5</div><div>A[5]=16 → <b style={{ color: colors.green }}>return 5</b></div></Panel>
        <div style={{ position: "absolute", top: 880, left: 0, right: 0, textAlign: "center", color: colors.green, fontSize: 32, fontWeight: 800 }}>가운데 비교는 2회</div>
        <div style={{ position: "absolute", top: 1010, left: 100, right: 100, textAlign: "center", color: colors.muted, fontSize: 27 }}>정렬 · 가운데 · 절반 버리기</div>
      </>}

      <div style={{ position: "absolute", bottom: 72, left: 78, right: 78, height: 5, background: "#2b2e3c", borderRadius: 5 }}><div style={{ height: "100%", width: `${(frame / 3270) * 100}%`, background: colors.cyan, borderRadius: 5 }} /></div>
      <div style={{ position: "absolute", bottom: 30, left: 80, color: "#727d8e", fontSize: 19, fontFamily: "monospace" }}>BINARY SEARCH · 0-BASED INDEX</div>
      <div style={{ position: "absolute", bottom: 30, right: 80, color: "#727d8e", fontSize: 19, fontFamily: "monospace" }}>{String(Math.floor(seconds)).padStart(2, "0")} / 109s</div>
    </AbsoluteFill>
  );
};
