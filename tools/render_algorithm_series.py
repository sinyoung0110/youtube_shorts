#!/usr/bin/env python3
"""Render the 14 generated Remotion compositions to remotion/out."""
from __future__ import annotations

import json
import os
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REMOTION = ROOT / "remotion"
EPISODES = json.loads((REMOTION / "src/lessons/algorithm-episodes.json").read_text(encoding="utf-8"))

for index, episode in enumerate(EPISODES, 1):
    slug = episode["slug"]
    output = f"out/{slug}.mp4"
    command = ["npx", "remotion", "render", slug, output, "--concurrency=5", "--port=3010"]
    environment = os.environ.copy()
    environment["NODE_OPTIONS"] = (environment.get("NODE_OPTIONS", "") + " --dns-result-order=ipv4first").strip()
    print(f"\n[{index}/{len(EPISODES)}] {slug} → {output}", flush=True)
    subprocess.run(command, cwd=REMOTION, env=environment, check=True)

print(f"\nRendered all {len(EPISODES)} episodes.", flush=True)
