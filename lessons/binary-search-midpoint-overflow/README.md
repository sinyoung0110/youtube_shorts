# 이진 탐색 mid 계산과 정수 오버플로우

큰 인덱스를 다룰 때 `(low + high) / 2`가 왜 위험할 수 있는지 보여주는 60초 세로 영상입니다. Java 32비트 `int` 예에서 두 경계는 각각 표현 가능해도 합이 표현 범위를 넘어 음수가 될 수 있습니다. `low + (high - low) / 2`로 합 오버플로우를 피하는 방법과 Python 정수의 차이도 함께 설명합니다.

- [완성 영상](../../remotion/out/binary-search-midpoint-overflow.mp4)
- [대본과 계산 검증](script.md)
- [장면표](scene-plan.md)
- [실행 가능한 Java 예제](solution.java)

실행: `javac solution.java && java MidpointOverflow`

주의: C에서 signed 정수 오버플로우는 Java처럼 정해진 방식으로 wrap 되지 않습니다. C에서는 결과가 정의되지 않으므로, 아래 Java 출력값을 C에도 그대로 적용하면 안 됩니다.
