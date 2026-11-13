import React from "react";

const C = { cyan: "#75d6e8", yellow: "#ffc95c", pink: "#ef78ae", green: "#60d69c", muted: "#a7b0bf", panel: "#141722" };

type Snapshot = { values: string[]; active?: number[]; sorted?: number; fixed?: number[]; label: string; badge?: string };

const traces: Record<string, Snapshot[]> = {
  "bubble-sort": [
    { values: ["5", "1", "4", "2"], active: [0, 1], label: "5 > 1 · 이웃끼리 교환", badge: "비교 1 / 6" },
    { values: ["1", "5", "4", "2"], active: [1, 2], label: "5 > 4 · 또 교환", badge: "비교 2 / 6" },
    { values: ["1", "4", "5", "2"], active: [2, 3], label: "5 > 2 · 가장 큰 값이 끝으로", badge: "비교 3 / 6" },
    { values: ["1", "4", "2", "5"], active: [0, 1], label: "두 번째 바퀴 · 1 < 4라 그대로", badge: "비교 4 / 6" },
    { values: ["1", "4", "2", "5"], active: [1, 2], label: "4 > 2 · 교환", badge: "비교 5 / 6" },
    { values: ["1", "2", "4", "5"], active: [0, 1], label: "마지막 비교 · 정렬 완료", badge: "비교 6 / 6" },
  ],
  "insertion-sort": [
    { values: ["5", "2", "4", "1"], active: [0, 1], sorted: 1, label: "key=2 · 5를 오른쪽으로 밀고 앞에 삽입", badge: "정렬 구간 + key" },
    { values: ["2", "5", "4", "1"], active: [1, 2], sorted: 2, label: "key=4 · 5만 한 칸 밀기", badge: "정렬 구간 + key" },
    { values: ["2", "4", "5", "1"], active: [0, 1, 2, 3], sorted: 3, label: "key=1 · 5, 4, 2를 차례로 밀기", badge: "key는 임시 보관" },
    { values: ["1", "2", "4", "5"], sorted: 4, label: "빈자리에 key=1 · 정렬 완료", badge: "삽입 완료" },
  ],
  "selection-sort": [
    { values: ["5", "3", "4", "1"], active: [1, 2, 3], label: "남은 구간을 훑어 최솟값 1 찾기", badge: "최솟값 후보" },
    { values: ["1", "3", "4", "5"], active: [0, 3], sorted: 1, label: "첫 칸의 5와 최솟값 1을 한 번 교환", badge: "자리 1 확정" },
    { values: ["1", "3", "4", "5"], active: [1, 2, 3], sorted: 2, label: "남은 [3, 4, 5]의 최솟값은 3", badge: "자리 2 확정" },
    { values: ["1", "3", "4", "5"], sorted: 4, label: "한 칸씩 확정 · 정렬 완료", badge: "교환은 최대 n−1회" },
  ],
  "heap-sort": [
    { values: ["4", "10", "3", "5", "1"], label: "먼저 최대 힙을 구성", badge: "입력 배열" },
    { values: ["10", "5", "3", "4", "1"], active: [0], label: "부모 ≥ 자식 · 최댓값 10이 루트", badge: "최대 힙" },
    { values: ["1", "5", "3", "4", "10"], active: [0, 4], fixed: [4], label: "루트 10을 끝으로 보내 정렬 구간에 고정", badge: "최댓값 확정" },
    { values: ["5", "4", "3", "1", "10"], active: [0, 1], fixed: [4], label: "sift-down · 큰 자식 5를 새 루트로", badge: "힙 복구" },
    { values: ["1", "4", "3", "5", "10"], active: [0, 3], fixed: [3, 4], label: "다음 최댓값 5도 끝에 고정", badge: "반복" },
  ],
  "quick-sort": [
    { values: ["6", "3", "8", "2", "5"], active: [4], label: "끝 값 5를 pivot으로 선택", badge: "pivot = 5" },
    { values: ["3", "6", "8", "2", "5"], active: [0, 1], label: "5 이하인 3을 왼쪽 경계로", badge: "작은 값 모으기" },
    { values: ["3", "2", "8", "6", "5"], active: [1, 3], label: "5 이하인 2도 경계 안으로", badge: "분할 진행" },
    { values: ["3", "2", "5", "6", "8"], active: [2], label: "pivot을 경계에 놓으면 왼쪽 ≤5, 오른쪽 >5", badge: "분할 완료" },
    { values: ["2", "3", "5", "6", "8"], sorted: 5, label: "양쪽 구간도 재귀 정렬", badge: "정렬 완료" },
  ],
  "merge-sort": [
    { values: ["4", "1", "3", "2"], active: [0, 1, 2, 3], label: "배열을 반으로 나누기", badge: "[4, 1]  /  [3, 2]" },
    { values: ["1", "4", "2", "3"], active: [0, 1, 2, 3], label: "각 절반을 작은 문제로 정렬", badge: "[1, 4]  /  [2, 3]" },
    { values: ["1", "2", "4", "3"], active: [1, 2], label: "앞 값 1과 2 비교 · 작은 1부터 출력", badge: "병합 중" },
    { values: ["1", "2", "3", "4"], sorted: 4, label: "남은 앞 값을 순서대로 병합", badge: "정렬 완료" },
  ],
  "counting-sort": [
    { values: ["4", "2", "2", "1", "3"], label: "입력 · 값의 범위는 1부터 4", badge: "비교 대신 개수 세기" },
    { values: ["1", "2", "3", "4"], active: [0, 1, 2, 3], label: "값별 빈도 · 1:1개, 2:2개, 3:1개, 4:1개", badge: "count[1..4] = 1,2,1,1" },
    { values: ["1", "2", "2", "3", "4"], sorted: 5, label: "빈도만큼 차례로 출력", badge: "정렬 완료" },
  ],
  "radix-sort": [
    { values: ["21", "13", "12", "23"], label: "두 자리 수 · 먼저 일의 자리", badge: "일의 자리 기준" },
    { values: ["21", "12", "13", "23"], active: [0, 1, 2, 3], label: "끝자리 1, 2, 3, 3 순 · 같은 숫자는 순서 유지", badge: "안정 정렬 1회" },
    { values: ["12", "13", "21", "23"], sorted: 4, label: "십의 자리도 안정 정렬 · 전체 순서 완성", badge: "안정 정렬 2회" },
  ],
  "bucket-sort": [
    { values: [".42", ".32", ".23", ".52", ".25"], label: "소수 입력 · 값 구간별 바구니로", badge: "0.0 이상 1.0 미만 가정" },
    { values: [".23", ".25", ".32", ".42", ".52"], active: [0, 1], label: "0.2대 [0.23, 0.25] · 바구니 안 정렬", badge: "0.3대 [0.32]  ·  0.4대 [0.42]" },
    { values: [".23", ".25", ".32", ".42", ".52"], sorted: 5, label: "낮은 구간부터 이어 붙이기", badge: "정렬 완료" },
  ],
  "shell-sort": [
    { values: ["8", "5", "3", "7", "6", "2"], active: [0, 3, 1, 4, 2, 5], label: "gap=3 · 3칸 떨어진 원소끼리 비교", badge: "(8,7)  (5,6)  (3,2)" },
    { values: ["7", "5", "2", "8", "6", "3"], active: [0, 2, 3, 5], label: "간격 그룹마다 삽입 정렬", badge: "gap=3 결과" },
    { values: ["2", "3", "5", "6", "7", "8"], sorted: 6, label: "gap=1 · 전체 삽입 정렬로 마무리", badge: "정렬 완료" },
  ],
};

const ArrayCards: React.FC<{ values: string[]; active?: number[]; sorted?: number; fixed?: number[] }> = ({ values, active = [], sorted = 0, fixed: fixedIndices }) => {
  const width = values.length > 5 ? 126 : values.length === 5 ? 148 : 174;
  const gap = values.length > 5 ? 7 : 12;
  return <div style={{ display: "flex", justifyContent: "center", gap, marginTop: 30 }}>
    {values.map((value, i) => {
      const on = active.includes(i);
      const fixed = fixedIndices ? fixedIndices.includes(i) : i < sorted;
      return <div key={`${i}-${value}`} style={{ width, height: 112, borderRadius: 18, border: `3px solid ${fixed ? C.green : on ? C.yellow : "#42465a"}`, background: fixed ? "#10251f" : on ? "#302818" : "#1b1d29", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", boxShadow: on ? `0 0 24px ${C.yellow}55` : "none", transform: on ? "translateY(-8px)" : "none", color: fixed ? C.green : on ? C.yellow : "#f4f5f7", fontFamily: "monospace", fontSize: values.length > 5 ? 30 : 36, fontWeight: 850 }}>
        {value}<span style={{ color: C.muted, fontSize: 18, fontWeight: 500, marginTop: 7 }}>{i}</span>
      </div>;
    })}
  </div>;
};

export const SortingTrace: React.FC<{ slug: string; seconds: number; duration: number }> = ({ slug, seconds, duration }) => {
  const steps = traces[slug] ?? traces["bubble-sort"];
  const index = Math.min(steps.length - 1, Math.floor(seconds / Math.max(duration, 1) * steps.length));
  const step = steps[index];
  return <div style={{ position: "absolute", top: 485, left: 64, right: 205, height: 680 }}>
    <div style={{ textAlign: "center", color: C.muted, fontFamily: "monospace", fontSize: 26 }}>{step.badge}</div>
    <ArrayCards values={step.values} active={step.active} sorted={step.sorted} fixed={step.fixed} />
    <div style={{ margin: "45px auto 0", maxWidth: 810, minHeight: 94, border: "1px solid #343748", borderRadius: 20, background: C.panel, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 28px", color: C.yellow, fontSize: 31, fontWeight: 800, lineHeight: 1.35, textAlign: "center" }}>{step.label}</div>
    {slug === "bubble-sort" && <div style={{ marginTop: 24, textAlign: "center", color: C.muted, fontSize: 25 }}>n=4 → 비교 (3 + 2 + 1) = <b style={{ color: C.cyan }}>6회</b> · 이미 정렬돼도 6회</div>}
  </div>;
};

type TreeNode = { key: number; x: number; y: number; parent?: number; highlighted?: boolean };
const TreeSvg: React.FC<{ nodes: TreeNode[]; viewBox?: string; scale?: number }> = ({ nodes, viewBox = "0 0 820 500", scale = 1 }) => (
  <svg viewBox={viewBox} style={{ width: "100%", height: "100%", overflow: "visible" }}>
    {nodes.filter((n) => n.parent !== undefined).map((node) => { const parent = nodes.find((candidate) => candidate.key === node.parent); return parent ? <line key={`edge-${node.key}`} x1={parent.x} y1={parent.y} x2={node.x} y2={node.y} stroke={node.highlighted ? C.yellow : "#62677d"} strokeWidth={node.highlighted ? 7 : 5} /> : null; })}
    {nodes.map((node) => <g key={node.key} transform={`translate(${node.x},${node.y}) scale(${scale})`}>
      <circle r="43" fill={node.highlighted ? "#382d16" : "#1b1e2a"} stroke={node.highlighted ? C.yellow : C.cyan} strokeWidth="5" />
      <text textAnchor="middle" dominantBaseline="central" fill={node.highlighted ? C.yellow : "#f4f5f7"} fontSize="34" fontWeight="800" fontFamily="monospace">{node.key}</text>
    </g>)}
  </svg>
);

export const TreeTrace: React.FC<{ slug: string; seconds: number; duration: number }> = ({ slug, seconds, duration }) => {
  const progress = Math.min(1, seconds / Math.max(duration, 1));
  if (slug === "binary-search-tree") {
    const nodes: TreeNode[] = [
      { key: 8, x: 410, y: 75, highlighted: progress > 0.06 }, { key: 3, x: 250, y: 210, parent: 8, highlighted: progress > 0.25 },
      { key: 10, x: 570, y: 210, parent: 8 }, { key: 1, x: 165, y: 360, parent: 3 },
    ];
    return <div style={{ position: "absolute", top: 460, left: 72, right: 218, height: 610 }}>
      <div style={{ height: 470 }}><TreeSvg nodes={nodes} /></div>
      <div style={{ textAlign: "center", color: C.yellow, fontSize: 30, fontWeight: 800 }}>탐색 6: 8 → 3 → 오른쪽 비어 있음</div>
      <div style={{ textAlign: "center", color: C.muted, fontSize: 24, marginTop: 12 }}>왼쪽에는 더 작은 값 · 오른쪽에는 더 큰 값</div>
    </div>;
  }
  if (slug === "avl-tree") {
    const rotateProgress = Math.max(0, Math.min(1, (progress - 0.36) / 0.34));
    const move = (from: number, to: number) => Math.round(from + (to - from) * rotateProgress);
    const rotated = rotateProgress > 0.5;
    const nodes: TreeNode[] = [
      { key: 10, x: move(410, 270), y: move(95, 290), parent: rotated ? 20 : undefined, highlighted: !rotated },
      { key: 20, x: move(520, 410), y: move(260, 95), parent: rotated ? undefined : 10, highlighted: rotated },
      { key: 30, x: move(630, 550), y: move(425, 290), parent: 20, highlighted: !rotated },
    ];
    if (rotated) nodes[1].parent = undefined;
    if (rotated) nodes[2].parent = 20;
    return <div style={{ position: "absolute", top: 470, left: 72, right: 218, height: 600 }}>
      <div style={{ height: 470 }}><TreeSvg nodes={nodes} /></div>
      <div style={{ textAlign: "center", color: rotateProgress >= 1 ? C.green : C.yellow, fontSize: 30, fontWeight: 850 }}>{rotateProgress >= 1 ? "왼쪽 회전 후 · 높이 차 0" : rotateProgress > 0 ? "회전하며 20이 위로 이동" : "10 → 20 → 30 · 오른쪽으로 기울어짐"}</div>
      <div style={{ textAlign: "center", color: C.muted, fontSize: 24, marginTop: 12 }}>회전 전 → 회전 후</div>
    </div>;
  }
  const left: TreeNode[] = [{ key: 10, x: 110, y: 100 }, { key: 20, x: 220, y: 250, parent: 10 }, { key: 30, x: 330, y: 400, parent: 20 }];
  const right: TreeNode[] = [{ key: 20, x: 200, y: 100 }, { key: 10, x: 100, y: 260, parent: 20 }, { key: 30, x: 300, y: 260, parent: 20 }];
  return <div style={{ position: "absolute", top: 480, left: 72, right: 218, height: 560 }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, textAlign: "center" }}>
      <div><div style={{ color: C.pink, fontSize: 30, fontWeight: 850 }}>기본 BST</div><div style={{ height: 430 }}><TreeSvg nodes={left} viewBox="0 0 420 500" scale={0.88} /></div><div style={{ color: C.pink, fontSize: 26 }}>높이 3 · 최악 Θ(n)</div></div>
      <div><div style={{ color: C.green, fontSize: 30, fontWeight: 850 }}>AVL</div><div style={{ height: 430 }}><TreeSvg nodes={right} viewBox="0 0 420 500" scale={0.88} /></div><div style={{ color: C.green, fontSize: 26 }}>높이 2 · 최악 Θ(log n)</div></div>
    </div>
    <div style={{ textAlign: "center", color: C.muted, fontSize: 23, marginTop: 16 }}>같은 삽입 순서: 10, 20, 30</div>
  </div>;
};
