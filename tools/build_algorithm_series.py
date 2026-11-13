#!/usr/bin/env python3
"""Generate the 14 Korean lesson scripts, local M1 voice clips, and Remotion data."""
from __future__ import annotations

import json
import math
import sys
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, "/Users/sinyoung/.venvs/supertonic/lib/python3.12/site-packages")
from supertonic import TTS  # noqa: E402

LESSONS = [
    {
        "slug":"binary-search-tree", "title":"이진 탐색 트리", "tag":"BST", "kind":"트리",
        "question":"찾을 때마다 절반씩 버리려면?", "why":"정렬 배열은 빠르게 찾지만 중간 삽입이 비쌉니다. BST는 비교 결과에 따라 왼쪽·오른쪽 가지로 내려가며 탐색과 삽입을 연결합니다.",
        "input":"삽입 순서 8, 3, 10, 1 · 찾기 6", "trace":["8에서 시작", "6 < 8 → 왼쪽 3", "6 > 3 → 오른쪽 비어 있음 → 없음"],
        "code":"def search(node, x):\n    if node is None or node.key == x:\n        return node\n    if x < node.key:\n        return search(node.left, x)\n    return search(node.right, x)",
        "complexity":"평균 탐색·삽입 O(log n) · 최악 O(n)", "space":"재귀 스택 평균 O(log n), 최악 O(n)",
        "pre":"왼쪽 < 노드 < 오른쪽 순서 유지", "pro":"정렬된 순서 순회와 유연한 삽입", "con":"입력 순서가 나쁘면 한쪽으로 기울어짐",
        "voice":["값을 찾을 때 매번 절반씩 후보를 버리고 싶지만, 배열은 중간 삽입이 번거롭죠. 이진 탐색 트리는 비교 방향을 가지로 저장해 검색과 삽입을 돕습니다.","8을 루트로 넣고 3은 왼쪽, 10은 오른쪽, 1은 3의 왼쪽에 둡니다. 6을 찾으면 8보다 작아 왼쪽 3으로, 3보다 커 오른쪽으로 갑니다. 그 자리가 비어 있으니 6은 없습니다.","코드에서 현재 노드가 비었거나 값이 같으면 멈춥니다. 작으면 left, 크면 right로 재귀 호출해 한 번에 한 가지씩 따라갑니다.","균형이 좋을 때 평균 탐색과 삽입은 로그 엔이지만, 정렬된 순서로만 넣으면 높이가 엔이 되어 최악은 선형입니다. 회전으로 균형을 보장하는 AVL과 달리 기본 BST는 스스로 균형을 맞추지 않습니다."],
    },
    {
        "slug":"avl-tree", "title":"AVL 트리", "tag":"AVL · 균형 BST", "kind":"트리",
        "question":"한쪽으로 기울어진 BST를 막으려면?", "why":"일반 BST는 삽입 순서에 따라 느려질 수 있습니다. AVL은 각 노드의 높이 차를 제한하고 회전해 탐색 성능을 지킵니다.",
        "input":"차례로 10, 20, 30 삽입", "trace":["10의 오른쪽에 20", "20의 오른쪽에 30", "왼쪽 회전 → 20이 루트"],
        "code":"balance = height(left) - height(right)\nif balance > 1:\n    if key > left.key:\n        left = rotate_left(left)\n    return rotate_right(node)\nif balance < -1:\n    if key < right.key:\n        right = rotate_right(right)\n    return rotate_left(node)", "complexity":"탐색·삽입·삭제 O(log n)", "space":"노드 높이 정보 O(n) · 재귀 스택 O(log n)",
        "pre":"모든 노드의 |왼쪽 높이−오른쪽 높이| ≤ 1", "pro":"최악에도 로그 시간 보장", "con":"삽입·삭제 때 높이 갱신과 회전 비용",
        "voice":["보통 이진 탐색 트리는 값이 한쪽으로 몰리면 줄처럼 길어져 탐색이 느려집니다. AVL은 높이 차를 관리하고 회전해 트리 높이를 로그 크기로 유지합니다.","10, 20, 30을 순서대로 넣으면 오른쪽으로만 이어집니다. 아래쪽 불균형을 왼쪽 회전하면 20이 위, 10은 왼쪽, 30은 오른쪽이 되어 균형을 되찾습니다.","각 노드에서 왼쪽 높이에서 오른쪽 높이를 뺀 균형 인수를 계산합니다. 절댓값이 1보다 커지면 모양에 맞는 회전을 하고, 꺾인 경우에는 두 번 회전합니다.","AVL의 탐색·삽입·삭제는 최악에도 O(log n)입니다. 대신 높이 정보를 갱신하고 회전해야 하므로 일반 BST보다 구현과 수정 비용이 큽니다."],
    },
    {
        "slug":"bubble-sort", "title":"버블 정렬", "tag":"BUBBLE SORT", "kind":"정렬",
        "question":"이웃끼리 바꾸면 큰 값이 어디로 갈까?", "why":"가까운 원소를 차례로 비교·교환해 큰 값을 끝으로 밀어냅니다. 동작이 단순해 학습에는 좋지만 큰 입력에는 비효율적입니다.",
        "input":"[5, 1, 4, 2]", "trace":["5와 1 교환 → [1,5,4,2]", "5와 4, 이어서 5와 2 교환", "첫 바퀴 끝 → [1,4,2,5]"],
        "code":"for end in range(n - 1, 0, -1):\n    for i in range(end):\n        if A[i] > A[i + 1]:\n            A[i], A[i+1] = A[i+1], A[i]", "complexity":"기본 구현: 최선·평균·최악 Θ(n²)", "space":"추가 공간 O(1) · 안정 정렬",
        "pre":"인접한 두 값을 비교해 큰 값을 오른쪽으로 · 조기 종료 최적화 없음", "pro":"구현과 동작 원리가 단순", "con":"정렬된 입력도 비교를 계속해 큰 입력에 비효율적",
        "voice":["큰 값을 오른쪽 끝으로 보내는 가장 단순한 정렬을 볼까요? 이웃한 두 값을 비교하고 순서가 거꾸로면 바꿉니다. 한 바퀴가 끝나면 가장 큰 값이 제자리에 갑니다.","5, 1, 4, 2에서 5와 1, 다음 5와 4, 다음 5와 2를 비교하며 바꾸면 첫 바퀴 끝에 5가 맨 오른쪽에 갑니다. 다음 바퀴는 1과 4, 4와 2를 비교해 1, 2, 4, 5가 됩니다.","코드에는 교환이 없으면 멈추는 장치가 없습니다. 원소가 네 개면 비교 횟수는 3 더하기 2 더하기 1, 총 6회입니다. 입력이 이미 정렬돼도 같은 여섯 번을 비교합니다.","따라서 지금 본 기본 구현은 최선·평균·최악 모두 세타 n제곱입니다. 교환이 없는 바퀴에서 멈추는 최적화 버전만 최선 세타 n으로 줄어듭니다. 공간은 상수이고 안정 정렬이지만, 큰 입력에는 보통 다른 정렬을 고릅니다."],
    },
    {
        "slug":"insertion-sort", "title":"삽입 정렬", "tag":"INSERTION SORT", "kind":"정렬",
        "question":"카드를 정렬된 손패에 끼워 넣듯", "why":"앞부분을 정렬된 구간으로 유지하고 새 값을 알맞은 위치에 삽입합니다. 작은 입력이나 거의 정렬된 입력에 유리합니다.",
        "input":"[5, 2, 4, 1]", "trace":["2를 5 앞에 → [2,5,4,1]", "4를 2와 5 사이에", "1을 맨 앞에 → [1,2,4,5]"],
        "code":"for i in range(1, n):\n    key = A[i]\n    j = i - 1\n    while j >= 0 and A[j] > key:\n        A[j+1] = A[j]; j -= 1\n    A[j+1] = key", "complexity":"최선 O(n) · 평균·최악 O(n²)", "space":"추가 공간 O(1) · 안정 정렬",
        "pre":"왼쪽 구간은 이미 정렬됐다고 가정", "pro":"작고 거의 정렬된 입력에서 빠름 · 온라인 처리", "con":"역순 입력이면 이동이 제곱으로 증가",
        "voice":["새 카드를 정렬된 손패 사이에 넣듯, 삽입 정렬은 앞쪽 정렬 구간에 다음 값을 알맞게 끼웁니다. 작거나 거의 정렬된 데이터에서 간단하고 빠릅니다.","5, 2, 4, 1을 보죠. 2를 5 앞에 넣어 2, 5를 만들고, 4를 그 사이에 넣어 2, 4, 5. 마지막 1을 맨 앞으로 옮기면 정렬이 끝납니다.","key가 새로 넣을 값입니다. 왼쪽의 더 큰 값들을 한 칸씩 오른쪽으로 밀고, 빈 자리에 key를 놓습니다. 이미 정렬된 앞부분은 매 단계 유지됩니다.","거의 정렬된 경우 한 번씩만 확인해 최선 O(n), 평균과 최악은 O(n²)입니다. 추가 공간은 O(1)이고 안정적이지만, 큰 역순 입력에는 이동이 많습니다."],
    },
    {
        "slug":"selection-sort", "title":"선택 정렬", "tag":"SELECTION SORT", "kind":"정렬",
        "question":"남은 값 중 가장 작은 것만 앞으로", "why":"매 단계 남은 구간에서 최솟값을 골라 앞에 확정합니다. 비교는 많지만 교환 횟수가 적어 쓰기 비용이 큰 환경에 쓸 수 있습니다.",
        "input":"[5, 3, 4, 1]", "trace":["최솟값 1을 찾아 첫 칸과 교환", "남은 [3,4,5]에서 3 선택", "차례대로 확정 → [1,3,4,5]"],
        "code":"for i in range(n - 1):\n    m = i\n    for j in range(i + 1, n):\n        if A[j] < A[m]: m = j\n    A[i], A[m] = A[m], A[i]", "complexity":"최선·평균·최악 O(n²)", "space":"추가 공간 O(1) · 보통 불안정",
        "pre":"앞쪽부터 위치를 확정", "pro":"교환 최대 n−1회", "con":"거의 정렬돼도 비교 횟수는 제곱",
        "voice":["데이터를 정렬하면서 쓰기 횟수를 아껴야 할 때는 선택 정렬의 아이디어를 볼 수 있습니다. 남은 값 중 가장 작은 하나를 골라 앞자리와 바꿉니다.","5, 3, 4, 1에서 최솟값 1을 찾아 맨 앞 5와 교환합니다. 남은 3, 4, 5에서 3을 고르고, 다음은 4를 고르면 완성입니다.","i는 다음에 확정할 자리, m은 지금까지 찾은 최솟값 위치입니다. 뒤쪽을 끝까지 훑고 한 번 교환한 뒤 다음 자리로 이동합니다.","입력이 어떻든 비교는 O(n²), 추가 공간은 O(1)입니다. 교환은 최대 n−1번이라 쓰기는 적지만, 같은 값 순서가 바뀔 수 있어 보통 안정 정렬은 아닙니다."],
    },
    {
        "slug":"heap-sort", "title":"힙 정렬", "tag":"HEAP SORT", "kind":"정렬",
        "question":"최댓값을 매번 빠르게 꺼내려면?", "why":"완전 이진 트리 모양의 힙은 배열에 저장되고 부모가 자식보다 큰 성질을 가집니다. 루트 최댓값을 끝으로 보내며 정렬합니다.",
        "input":"[4, 10, 3, 5, 1]", "trace":["최대 힙 구성: 루트 10", "10과 끝의 1 교환", "남은 힙에서 다음 최대 5 꺼내기"],
        "code":"build_max_heap(A)\nfor end in range(n - 1, 0, -1):\n    swap(A[0], A[end])\n    sift_down(A, 0, end)", "complexity":"최선·평균·최악 O(n log n)", "space":"배열 내부 정렬 O(1) · 불안정",
        "pre":"부모 값 ≥ 자식 값인 최대 힙", "pro":"최악도 O(n log n) · 추가 배열 불필요", "con":"안정적이지 않고 메모리 접근이 흩어짐",
        "voice":["최댓값을 반복해서 찾아야 한다면 힙을 쓸 수 있습니다. 배열로 표현한 최대 힙은 부모가 자식보다 크고, 가장 큰 값이 항상 루트에 있습니다.","4, 10, 3, 5, 1로 최대 힙을 만들면 루트는 10입니다. 10을 배열 끝으로 보내고, 남은 부분을 다시 힙으로 고치면 다음 최댓값 5가 루트에 옵니다.","먼저 build max heap으로 힙을 만들고, 루트와 끝을 바꿉니다. sift down은 새 루트를 더 큰 자식과 바꾸며 힙 성질을 복구합니다.","힙 구성은 선형 시간이고 전체 정렬은 최선과 최악 모두 O(n log n)입니다. 배열 안에서 처리해 추가 공간 O(1)이지만 안정 정렬은 아니고 접근이 흩어질 수 있습니다."],
    },
    {
        "slug":"quick-sort", "title":"퀵 정렬", "tag":"QUICK SORT", "kind":"정렬",
        "question":"기준 하나로 작은 값·큰 값을 나누면?", "why":"기준값 pivot으로 배열을 두 편으로 분할하고 각 편을 재귀 정렬합니다. 평균적으로 빠르지만 분할이 한쪽으로 몰리면 느려집니다.",
        "input":"[6, 3, 8, 2, 5] · pivot=5", "trace":["5보다 작은 쪽 [3,2]", "pivot 5를 가운데 위치로", "큰 쪽 [6,8] → [2,3,5,6,8]"],
        "code":"pivot = A[hi]\ni = lo\nfor j in range(lo, hi):\n    if A[j] <= pivot:\n        A[i], A[j] = A[j], A[i]; i += 1\nA[i], A[hi] = A[hi], A[i]", "complexity":"평균 O(n log n) · 최악 O(n²)", "space":"분할 재귀 스택 평균 O(log n) · 불안정",
        "pre":"pivot 기준 분할 후 양쪽 구간 재귀 정렬", "pro":"제자리 분할로 실전에서 빠른 편", "con":"나쁜 pivot 선택은 최악 시간과 깊은 재귀",
        "voice":["기준값 하나로 작은 값과 큰 값을 나누면 어떨까요? 퀵 정렬은 pivot을 기준으로 분할하고 양쪽을 다시 정렬해 평균적으로 빠르게 동작합니다.","6, 3, 8, 2, 5에서 pivot을 5로 잡습니다. 3과 2는 왼쪽, 6과 8은 오른쪽에 두고 pivot을 가운데 놓으면 2, 3, 5, 6, 8이 됩니다.","코드는 끝 값을 pivot으로 택합니다. j가 구간을 훑고 pivot 이하 값을 왼쪽에 모은 뒤, 마지막에 pivot을 경계 위치와 교환합니다.","평균 시간은 O(n log n)이지만 pivot이 매번 최솟값이나 최댓값이면 최악 O(n²)입니다. 제자리 분할은 빠르지만 재귀 스택이 필요하고 보통 안정 정렬은 아닙니다."],
    },
    {
        "slug":"merge-sort", "title":"병합 정렬", "tag":"MERGE SORT", "kind":"정렬",
        "question":"작게 나눠 정렬한 뒤 합치면?", "why":"문제를 반으로 쪼개 정렬하고 두 정렬 구간을 합칩니다. 입력 모양에 관계없이 성능이 일정하고 안정적입니다.",
        "input":"[4, 1, 3, 2]", "trace":["[4,1] → [1,4]", "[3,2] → [2,3]", "두 정렬 구간 병합 → [1,2,3,4]"],
        "code":"def merge_sort(A):\n    if len(A) <= 1: return A\n    mid = len(A) // 2\n    L = merge_sort(A[:mid])\n    R = merge_sort(A[mid:])\n    return merge(L, R)", "complexity":"최선·평균·최악 O(n log n)", "space":"배열 병합 추가 공간 O(n) · 안정 정렬",
        "pre":"분할 후 작은 정렬 결과를 순서대로 병합", "pro":"안정적이고 최악 시간 보장", "con":"배열에 합칠 임시 공간 필요",
        "voice":["큰 배열을 한 번에 정렬하기보다 반으로 나눠 작은 문제를 해결하고 합치면 됩니다. 병합 정렬은 입력 모양과 무관하게 일정한 성능을 냅니다.","4, 1을 정렬해 1, 4를 만들고 3, 2는 2, 3으로 만듭니다. 두 정렬 구간의 앞 값을 비교해 작은 순으로 합치면 1, 2, 3, 4입니다.","원소가 하나면 이미 정렬됐으니 반환합니다. 가운데서 둘로 나눠 각각 재귀 정렬하고, merge가 두 결과를 순서대로 합칩니다.","분할 단계는 로그 엔 번, 각 단계에서 총 엔 개를 병합해 모든 경우 O(n log n)입니다. 안정적이지만 배열 기준 추가 공간 O(n)이 필요합니다."],
    },
    {
        "slug":"counting-sort", "title":"계수 정렬", "tag":"COUNTING SORT", "kind":"정렬",
        "question":"값을 비교하지 않고 개수를 세면?", "why":"정수의 값 범위가 좁다면 값별 출현 횟수를 세어 바로 순서대로 출력할 수 있습니다. 비교 정렬의 하한을 피하지만 범위가 커지면 낭비가 큽니다.",
        "input":"[4, 2, 2, 1, 3]", "trace":["1:1개 · 2:2개 · 3:1개 · 4:1개", "값 순서로 개수만큼 출력", "[1, 2, 2, 3, 4]"],
        "code":"lo, hi = min(A), max(A)\ncount = [0] * (hi - lo + 1)\nfor x in A: count[x - lo] += 1\nresult = []\nfor i, c in enumerate(count):\n    result.extend([i + lo] * c)", "complexity":"시간 O(n + k) · k=max−min+1", "space":"추가 공간 O(n + k) · 출력형 구현",
        "pre":"정수 키와 감당 가능한 작은 값 범위", "pro":"범위가 작으면 비교 없이 선형에 가까움", "con":"값 범위가 크면 시간·메모리 낭비",
        "voice":["값을 하나씩 비교하지 않고도 정렬할 수 있을까요? 계수 정렬은 정수 값의 범위가 작을 때 각 값이 몇 번 나왔는지 세어 순서대로 내보냅니다.","4, 2, 2, 1, 3에서 1은 한 번, 2는 두 번, 3과 4는 각각 한 번입니다. 이 개수를 차례대로 출력하면 1, 2, 2, 3, 4가 됩니다.","최솟값과 최댓값 차이만큼 count 배열을 만들고, x가 나오면 해당 칸을 하나 늘립니다. 마지막에 각 값을 저장된 횟수만큼 결과에 추가합니다.","k를 값 범위 크기라고 하면 시간은 O(n+k)입니다. 이 코드처럼 결과 배열을 따로 만들면 공간도 O(n+k)입니다. 범위가 좁은 정수에서 유리하고, 범위가 데이터 수보다 훨씬 크면 메모리와 초기화 비용이 커집니다."],
    },
    {
        "slug":"radix-sort", "title":"기수 정렬", "tag":"RADIX SORT", "kind":"정렬",
        "question":"큰 수를 자릿수별로 안정 정렬하면?", "why":"숫자 전체를 비교하는 대신 낮은 자리부터 각 자릿수로 안정 정렬합니다. 자릿수와 기수가 제한된 키에 효과적입니다.",
        "input":"[21, 13, 12, 23]", "trace":["일의 자리 안정 정렬 → [21,12,13,23]", "십의 자리 안정 정렬", "[12,13,21,23]"],
        "code":"exp = 1\nwhile max(A) // exp > 0:\n    stable_count_by_digit(A, exp)\n    exp *= 10", "complexity":"시간 O(d(n + b))", "space":"보통 O(n + b) · 각 자리 정렬은 안정적이어야 함",
        "pre":"자리 수 d와 기수 b가 제한된 키 · 자릿수별 안정 정렬", "pro":"비교 정렬이 아닌 방식으로 많은 키를 정렬", "con":"일반 객체 비교에는 바로 적용하기 어렵고 보조 공간 필요",
        "voice":["큰 숫자를 통째로 비교하는 대신 자릿수를 나눠 정렬할 수 있습니다. 기수 정렬은 낮은 자리부터 각 자릿수별 안정 정렬을 반복합니다.","21, 13, 12, 23을 일의 자리로 안정 정렬하면 21, 12, 13, 23입니다. 이어 십의 자리로 안정 정렬하면 12, 13, 21, 23이 됩니다.","exp는 현재 자리의 가중치입니다. 각 자리에서 안정적인 계수 정렬을 하고 exp를 열 배씩 키워 더 높은 자리로 이동합니다.","d자릿수, 기수 b라면 보통 O(d 곱하기 n 더하기 b) 시간과 O(n+b) 공간이 듭니다. 중간 단계가 안정 정렬이어야 하고, 자릿수와 키 표현이 제한된 데이터에 적합합니다."],
    },
    {
        "slug":"bucket-sort", "title":"버킷 정렬", "tag":"BUCKET SORT", "kind":"정렬",
        "question":"값 구간을 나눠 바구니마다 정렬하면?", "why":"값 범위를 여러 버킷으로 나눠 분산하고, 각 버킷 내부를 정렬한 뒤 이어 붙입니다. 값이 고르게 퍼질 때 빠릅니다.",
        "input":"[0.42, 0.32, 0.23, 0.52, 0.25]", "trace":["0.2대: [0.23, 0.25]", "0.3대: [0.32] · 0.4대: [0.42]", "0.5대: [0.52] → 이어 붙이기"],
        "code":"buckets = [[] for _ in range(10)]  # 0.1 간격\nfor x in A: buckets[int(10 * x)].append(x)\nfor bucket in buckets:\n    insertion_sort(bucket)\nreturn flatten(buckets)", "complexity":"균등 분포 기대 O(n + k) · 최악 O(n²)", "space":"추가 공간 O(n + k)",
        "pre":"예시는 값이 [0,1)에 있고 버킷에 고르게 분산된다고 가정", "pro":"균등하게 퍼진 실수 데이터에서 빠를 수 있음", "con":"분포가 치우치면 한 버킷에서 느려짐",
        "voice":["값들이 범위에 고르게 퍼져 있다면 구간별 바구니로 나눌 수 있습니다. 버킷 정렬은 각 버킷을 따로 정렬하고 순서대로 이어 붙입니다.","0.42, 0.32, 0.23, 0.52, 0.25를 소수 첫째 자리 구간으로 나눕니다. 0.2대엔 0.23과 0.25, 0.3대엔 0.32, 0.4대엔 0.42, 0.5대엔 0.52가 들어갑니다.","각 값을 버킷에 넣고, 버킷 내부를 삽입 정렬한 다음 앞 버킷부터 이어 붙입니다. 이 예시는 값이 0 이상 1 미만이라 인덱스 계산이 간단합니다.","값이 고르게 퍼지면 기대 시간 O(n+k)에 가까울 수 있지만, 한 버킷에 몰리면 내부 정렬 때문에 최악 O(n²)입니다. 분포 가정과 버킷 수 선택이 성능을 좌우합니다."],
    },
    {
        "slug":"shell-sort", "title":"셸 정렬", "tag":"SHELL SORT", "kind":"정렬",
        "question":"멀리 있는 값부터 먼저 움직이면?", "why":"삽입 정렬은 멀리 떨어진 값을 옮기기 어렵습니다. 간격을 둔 삽입 정렬로 큰 어긋남을 먼저 줄이고 마지막에 간격 1로 마무리합니다.",
        "input":"[8, 5, 3, 7, 6, 2] · gaps 3, 1", "trace":["gap 3: 인덱스 0·3, 1·4, 2·5 정렬", "멀리 있는 값 이동", "gap 1 삽입 정렬로 마무리"],
        "code":"gap = n // 2\nwhile gap > 0:\n    for i in range(gap, n):\n        insert_item_among_gap(i, gap)\n    gap //= 2", "complexity":"간격 수열에 따라 다름 · halving 최악 O(n²)", "space":"추가 공간 O(1) · 불안정",
        "pre":"마지막 간격은 반드시 1", "pro":"제자리에서 삽입 정렬보다 멀리 이동 가능", "con":"복잡도와 성능이 간격 수열에 민감",
        "voice":["삽입 정렬은 멀리 떨어진 작은 값을 앞으로 옮기려면 여러 번 움직여야 합니다. 셸 정렬은 큰 간격으로 먼저 비교해 이런 어긋남을 줄입니다.","8, 5, 3, 7, 6, 2에서 간격 3이면 인덱스 0과 3, 1과 4, 2와 5를 같은 그룹으로 정렬합니다. 그 뒤 간격 1로 전체를 삽입 정렬합니다.","처음 간격은 보통 n 나누기 2, 다음은 절반씩 줄입니다. 각 간격마다 그 간격만큼 떨어진 원소들에 삽입 정렬을 적용하고 마지막엔 반드시 1로 마칩니다.","추가 공간은 O(1)이지만 시간 복잡도는 간격 수열에 따라 달라집니다. 절반씩 줄이는 수열의 최악은 O(n²)이고 안정 정렬도 아닙니다. 특정 복잡도를 말할 때는 간격을 함께 밝혀야 합니다."],
    },
    {
        "slug":"tree-comparison", "title":"BST와 AVL 트리 비교", "tag":"TREE GUIDE", "kind":"비교",
        "question":"둘 다 왼쪽은 작고 오른쪽은 큰데 뭐가 다를까?", "why":"BST는 순서 규칙만 지키며 단순하게 넣고 찾습니다. AVL은 그 순서에 높이 균형 규칙을 더해 최악의 탐색 속도를 보장합니다.",
        "input":"같은 값 10, 20, 30 삽입", "trace":["BST: 10 → 오른쪽 20 → 오른쪽 30", "AVL: 불균형 감지", "회전 후 20 루트 · 양쪽 높이 균형"],
        "code":"BST: left < node < right\nAVL: BST order + |height(L)-height(R)| <= 1\nif unbalanced:\n    rotate(node)", "complexity":"BST 평균 O(log n), 최악 O(n) · AVL 최악 O(log n)", "space":"둘 다 노드 O(n) · AVL은 높이 정보 추가",
        "pre":"둘 다 이진 탐색 순서 유지", "pro":"BST 단순 · AVL은 성능 보장", "con":"AVL은 갱신마다 높이 관리와 회전 비용",
        "voice":["BST와 AVL은 둘 다 왼쪽 값은 작고 오른쪽 값은 큰 이진 탐색 트리입니다. 차이는 AVL이 높이 균형 규칙까지 지킨다는 점입니다.","10, 20, 30 순서로 넣으면 BST는 오른쪽으로 세로로 길어집니다. AVL은 불균형을 감지하고 회전해 20을 루트, 10과 30을 양쪽 자식으로 둡니다.","BST는 순서만 맞추면 삽입이 끝납니다. AVL은 왼쪽·오른쪽 높이 차가 1보다 커지면 회전합니다. 모양에 따라 한 번 또는 두 번 회전합니다.","BST는 균형일 때 평균 O(log n), 기울면 최악 O(n)입니다. AVL은 탐색·삽입·삭제 최악 O(log n)을 보장하지만, 높이 관리와 회전으로 구현과 갱신 비용이 더 듭니다."],
    },
    {
        "slug":"sorting-overview", "title":"정렬 알고리즘 한눈에 비교", "tag":"SORTING GUIDE", "kind":"종합",
        "question":"데이터마다 정렬법이 다른 이유는?", "why":"정렬은 크기만 빠르다고 끝나지 않습니다. 메모리, 안정성, 입력 분포, 최악 시간 보장 중 무엇이 중요한지에 따라 선택이 달라집니다.",
        "input":"비교 정렬 vs 범위·자릿수 활용", "trace":["작고 거의 정렬 → 삽입", "최악 성능 보장 → 병합·힙", "작은 정수 범위 → 계수"],
        "code":"choose_sort(data):\n    inspect_size_and_order()\n    check_key_range_or_digits()\n    choose_memory_and_stability()\n    select_algorithm()", "complexity":"비교 정렬 일반 하한 Ω(n log n) · 특수 조건 정렬은 범위 활용", "space":"제자리: 삽입·선택·힙·퀵(스택 제외) · 보조 공간: 병합·계수·기수·버킷",
        "pre":"안정성·메모리·분포·최악 시간 요구를 먼저 정함", "pro":"조건에 맞추면 속도와 메모리를 함께 조절", "con":"모든 입력에서 가장 빠른 단일 정렬은 없음",
        "voice":["정렬 알고리즘이 이렇게 많은 이유는 하나가 모든 입력에서 최고가 아니기 때문입니다. 작은 데이터, 최악 시간, 안정성, 메모리 중 무엇을 지킬지 먼저 정합니다.","작고 거의 정렬됐다면 삽입 정렬, 최악 O(n log n)이 필요하면 병합이나 힙, 값 범위가 좁은 정수면 계수 정렬이 후보입니다. 데이터 조건이 선택을 바꿉니다.","버블·삽입·선택은 구현이 단순하지만 보통 O(n²)입니다. 병합·힙은 최악 O(n log n), 퀵은 평균 O(n log n)이지만 최악 O(n²)입니다. 계수·기수·버킷은 값 범위나 자릿수, 분포를 활용합니다.","병합은 안정적이고 추가 메모리를 쓰며, 힙은 제자리지만 불안정합니다. 계수와 기수는 조건이 맞으면 비교 정렬보다 빨라질 수 있습니다. 입력 크기뿐 아니라 키 범위, 분포, 안정성 요구를 함께 보세요."],
        "summaryRows": [
            ["버블", "Θ(n²) 모든 경우¹", "O(1)", "안정"], ["삽입", "최선 Θ(n), 평균·최악 Θ(n²)", "O(1)", "안정"], ["선택", "Θ(n²) 모든 경우", "O(1)", "불안정"],
            ["병합", "O(n log n)", "O(n)", "안정"], ["힙", "O(n log n)", "O(1)", "불안정"], ["퀵", "avg O(n log n)", "스택", "불안정"],
            ["계수", "O(n+k)", "O(n+k)", "구현별"], ["기수", "O(d(n+b))", "O(n+b)", "안정 패스"],
            ["버킷", "기대 O(n+k)", "O(n+k)", "구현별"], ["셸", "간격별 상이", "O(1)", "불안정"],
        ],
        "voice":["정렬 알고리즘이 이렇게 많은 이유는 하나가 모든 입력에서 최고가 아니기 때문입니다. 작은 데이터, 최악 시간, 안정성, 메모리 중 무엇을 지킬지 먼저 정합니다.","작고 거의 정렬됐다면 삽입 정렬, 최악 O(n log n)이 필요하면 병합이나 힙, 값 범위가 좁은 정수면 계수 정렬이 후보입니다. 데이터 조건이 선택을 바꿉니다.","버블·삽입·선택은 보통 O(n²)입니다. 병합·힙은 최악 O(n log n), 퀵은 평균 O(n log n)이지만 최악 O(n²)입니다. 계수·기수·버킷은 각각 범위, 자릿수, 분포를 활용하고 셸은 간격 수열에 따라 달라집니다.","메모리 O(1)인 힙은 불안정하고, 병합은 안정적이지만 O(n)을 더 씁니다. 버블과 삽입은 안정적이고, 선택·퀵·셸은 보통 불안정합니다. 계수·기수는 키 조건이 맞을 때, 버킷은 고른 분포일 때 유리합니다. 입력과 메모리, 안정성 요구를 보고 고르세요."],
    },
]


def write_lesson_docs(lesson: dict, timings: list[float]) -> None:
    folder = ROOT / "lessons" / lesson["slug"]
    folder.mkdir(parents=True, exist_ok=True)
    starts, cursor = [], 0.0
    for duration in timings:
        starts.append(cursor)
        cursor += duration + 0.3
    lines = [f"# {lesson['title']} — 대본 및 검산", "", f"- 대상: 처음 배우는 알고리즘 학습자", f"- 영상 길이: 약 {cursor:.0f}초", f"- 핵심 질문: {lesson['question']}", "", "## 왜 필요한가", "", lesson["why"], "", "## 예시와 단계", "", f"입력: `{lesson['input']}`", ""]
    for index, step in enumerate(lesson["trace"], 1):
        lines.append(f"{index}. {step}")
    lines += ["", "## 특징", "", f"- 전제: {lesson['pre']}", f"- 시간: {lesson['complexity']}", f"- 공간/안정성: {lesson['space']}", f"- 장점: {lesson['pro']}", f"- 한계: {lesson['con']}", "", "## 핵심 의사코드", "", "```text", lesson["code"], "```", "", "## 내레이션 및 장면표", "", "| 구간 | 내레이션 | 화면 |"]
    for i, (voice, start, duration) in enumerate(zip(lesson["voice"], starts, timings)):
        lines.append(f"| {start:04.1f}–{start+duration:04.1f}s | {voice} | {['왜 필요한가','숫자 예시','핵심 코드','복잡도와 선택 기준'][i]} |")
    if lesson.get("note"):
        lines += ["", f"검산 주의: {lesson['note']}"]
    if lesson.get("summaryRows"):
        lines += ["", "## 열 가지 정렬 비교 표", "", "시간은 평균·최악 또는 조건부 복잡도임을 구분하세요. `n`은 원소 수, `k`는 키 범위 또는 버킷 수, `d`는 자릿수, `b`는 기수입니다.", "", "| 정렬 | 시간 | 추가 공간 | 안정성 |", "| --- | --- | --- | --- |"]
        lines.extend("| " + " | ".join(row) + " |" for row in lesson["summaryRows"])
        lines += ["", "기본 버블 정렬(조기 종료 없음)은 정렬된 입력에서도 비교하므로 최선·평균·최악 모두 Θ(n²)입니다. 교환이 없으면 종료하는 최적화 변형의 최선은 Θ(n)입니다. 삽입 정렬 최선은 Θ(n), 선택 정렬은 모든 경우 Θ(n²)입니다. 퀵 정렬 최악과 버킷 정렬의 최악은 Θ(n²)일 수 있습니다. 안정성은 같은 키의 입력 순서를 지키는 성질입니다.", "", "## 사실 확인 자료", "", "- [OpenDSA: 기본 버블 정렬 분석](https://opendsa-server.cs.vt.edu/ODSA/Books/pubbook/odsa-all/fall-2019/Public_Instance/html/BubbleSort.html) — 조기 종료를 넣지 않은 반복 구조의 best/average/worst 실행 시간 분석.", "- [NIST DADS: Bubble sort](https://xlinux.nist.gov/dads/HTML/bubblesort.html) — 버블 정렬 정의와 일반적인 O(n²) 특성.", "- [Princeton Algorithms: 정렬 성능표](https://algs4.cs.princeton.edu/cheatsheet/) — 선택·삽입·셸·병합·퀵·힙 정렬의 구현별 비교 횟수, 공간, 안정성. 버블 항목은 조기 종료 구현이라 기본 구현과 구분.", "- [CLRS bucket sort 분석 자료](https://belohlavek.inf.upol.cz/vyuka/Cormen-bucket-sort-analysis.pdf) — 균등 분포 가정에서의 기대 선형 시간과 입력 분포 조건.", "- [Open Data Structures](https://opendatastructures.org/versions/edition-0.1e/ods-cpp.pdf) — 계수 정렬 및 기수 정렬의 실행 시간과 안정성 전제."]
    if lesson["kind"] == "정렬":
        lines += ["", "## 사실 확인 자료", "", "- [Princeton Algorithms: 정렬 성능표](https://algs4.cs.princeton.edu/cheatsheet/) — 선택·삽입·셸·병합·퀵·힙의 구현별 최선·평균·최악 비교 횟수, 추가 공간, 안정성.", "- [Open Data Structures: Counting/Radix sort](https://opendatastructures.org/versions/edition-0.1e/ods-cpp.pdf) — 계수·기수 정렬의 범위, 자릿수, 안정성 요구.", "- [CLRS bucket sort 분석 자료](https://belohlavek.inf.upol.cz/vyuka/Cormen-bucket-sort-analysis.pdf) — 균등 분포일 때 기대 선형 시간이라는 조건과 분석.", "- [Auckland: Shellsort gap sequences](https://www.cs.auckland.ac.nz/courses/compsci220s1t/lectures/lecturenotes/GG-lectures/220slides-lecture06.pdf) — 시간 복잡도는 간격 수열에 의존하며, 이 자료의 halving sequence 분석을 영상 설명과 구분.", "- [OpenDSA: Bubble sort](https://opendsa-server.cs.vt.edu/ODSA/Books/pubbook/odsa-all/fall-2019/Public_Instance/html/BubbleSort.html) — 조기 종료 없는 기본 반복 구조의 실행 시간.", "- [NIST DADS: Bubble sort](https://xlinux.nist.gov/dads/HTML/bubblesort.html) — 알고리즘 정의 및 일반적인 제곱 시간 특성."]
    (folder / "script.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    (folder / "scene-plan.md").write_text(
        "# 장면표\n\n| 장면 | 화면 구성 | 검산 포인트 |\n| --- | --- | --- |\n" +
        "\n".join(f"| {i+1}. {name} | {visual} | {lesson['trace'][min(i, len(lesson['trace'])-1)] if i == 1 else lesson['complexity'] if i == 3 else lesson['pre']} |" for i, (name, visual) in enumerate(zip(["동기", "예시", "코드", "정리"], [lesson['why'], lesson['input']+" · 단계별 강조", lesson['code'].splitlines()[0], lesson['complexity']+" · "+lesson['con']]))) + "\n",
        encoding="utf-8",
    )
    (folder / "README.md").write_text(f"# {lesson['title']}\n\n{lesson['why']}\n\n- [영상](../../remotion/out/{lesson['slug']}.mp4)\n- [대본·검산](script.md)\n- [장면표](scene-plan.md)\n", encoding="utf-8")


def main() -> None:
    tts = TTS(model="supertonic-3", auto_download=False, intra_op_num_threads=2, inter_op_num_threads=1)
    style = tts.get_voice_style("M1")
    rows = []
    total = len(LESSONS)
    for index, lesson in enumerate(LESSONS, 1):
        print(f"[{index}/{total}] Korean M1 narration: {lesson['title']}", flush=True)
        audiodir = ROOT / "remotion" / "public" / "audio"
        audiodir.mkdir(parents=True, exist_ok=True)
        durations = []
        for segment, text in enumerate(lesson["voice"], 1):
            wav, _ = tts.synthesize(text, style, speed=1.12, lang="ko", silence_duration=0.15)
            output = audiodir / f"{lesson['slug']}-{segment:02d}.wav"
            tts.save_audio(wav, str(output))
            with wave.open(str(output), "rb") as source:
                durations.append(source.getnframes() / source.getframerate())
        starts, cursor = [], 0.0
        for duration in durations:
            starts.append(round(cursor, 3))
            cursor += duration + 0.3
        lesson["starts"] = starts
        lesson["durations"] = [round(x, 3) for x in durations]
        lesson["totalSeconds"] = math.ceil(cursor + 0.2)
        rows.append(lesson)
        write_lesson_docs(lesson, durations)
        print(f"    duration {cursor:.1f}s", flush=True)
    out = ROOT / "remotion" / "src" / "lessons" / "algorithm-episodes.json"
    out.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {total} lesson bundles and {out}")


if __name__ == "__main__":
    main()
