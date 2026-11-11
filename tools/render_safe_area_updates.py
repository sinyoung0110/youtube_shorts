#!/usr/bin/env python3
"""Re-render the earlier binary-search videos with social UI safe margins."""
from __future__ import annotations

import os
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REMOTION = ROOT / "remotion"
VIDEOS = [
    ("BinarySearchShorts", "out/binary-search.mp4"),
    ("BinarySearchMidpoint12", "out/binary-search-midpoint-12.mp4"),
    ("BinarySearchMidpointOverflow", "out/binary-search-midpoint-overflow.mp4"),
]
environment = os.environ.copy()
environment["NODE_OPTIONS"] = (environment.get("NODE_OPTIONS", "") + " --dns-result-order=ipv4first").strip()

for index, (composition, output) in enumerate(VIDEOS, 1):
    print(f"\n[{index}/{len(VIDEOS)}] {composition} → {output}", flush=True)
    subprocess.run(
        ["npx", "remotion", "render", composition, output, "--concurrency=5", "--port=3010"],
        cwd=REMOTION,
        env=environment,
        check=True,
    )

print("\nUpdated all three binary-search videos for social UI safe margins.", flush=True)
