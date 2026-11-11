from manim import *


# Vertical 9:16 YouTube Shorts canvas, rendered at 1080 x 1920.
config.pixel_width = 1080
config.pixel_height = 1920
config.frame_width = 9
config.frame_height = 16
config.frame_rate = 30
config.background_color = "#101827"


class BinarySearchShorts(Scene):
    def construct(self):
        values = [4, 9, 13, 18, 23, 27, 31, 36, 42]
        target = 27

        title = Text("이진 탐색", font_size=56, weight=BOLD, color=BLUE_B)
        title.move_to(UP * 6.35)
        subtitle = Text("정렬된 숫자에서 27 찾기", font_size=34, color=WHITE)
        subtitle.next_to(title, DOWN, buff=0.32)

        self.play(Write(title), FadeIn(subtitle, shift=DOWN * 0.15), run_time=1.4)
        self.wait(2.3)

        cells = VGroup()
        for value in values:
            box = RoundedRectangle(
                width=0.78,
                height=0.92,
                corner_radius=0.12,
                stroke_color=BLUE_B,
                stroke_width=2,
                fill_color=BLUE_E,
                fill_opacity=0.24,
            )
            label = Text(str(value), font_size=27, color=WHITE)
            cells.add(VGroup(box, label))
        cells.arrange(RIGHT, buff=0.08).move_to(UP * 1.25)

        indices = VGroup(
            *[Text(str(i), font_size=22, color=GRAY_B) for i in range(len(values))]
        )
        for index, cell in zip(indices, cells):
            index.move_to(cell.get_center() + DOWN * 0.82)

        intro = Text("가운데를 확인하고, 절반씩 좁혀요.", font_size=31, color=TEAL_A)
        intro.move_to(UP * 3.15)
        self.play(FadeIn(intro), LaggedStart(*[FadeIn(c) for c in cells], lag_ratio=0.08), FadeIn(indices), run_time=2.2)
        self.wait(2.5)

        caption = Text("1단계  가운데 값은 23", font_size=32, color=YELLOW)
        caption.move_to(DOWN * 1.55)
        detail = Text("27은 23보다 큽니다 → 왼쪽 절반 제외", font_size=27)
        detail.move_to(DOWN * 2.35)
        self.play(
            cells[4][0].animate.set_fill(YELLOW, opacity=0.38).set_stroke(YELLOW, width=4),
            cells[4][1].animate.set_color(YELLOW),
            FadeIn(caption),
            FadeIn(detail),
            run_time=1.1,
        )
        self.wait(2.8)
        self.play(*[c.animate.set_opacity(0.18) for c in cells[:5]], *[i.animate.set_opacity(0.18) for i in indices[:5]], run_time=0.9)
        self.wait(1.0)

        next_caption = Text("2단계  남은 가운데 값은 31", font_size=31, color=YELLOW)
        next_caption.move_to(caption)
        next_detail = Text("27은 31보다 작습니다 → 오른쪽 절반 제외", font_size=27)
        next_detail.move_to(detail)
        self.play(
            cells[6][0].animate.set_fill(YELLOW, opacity=0.38).set_stroke(YELLOW, width=4),
            cells[6][1].animate.set_color(YELLOW),
            Transform(caption, next_caption),
            Transform(detail, next_detail),
            run_time=1.0,
        )
        self.wait(2.5)
        self.play(*[c.animate.set_opacity(0.18) for c in cells[6:]], *[i.animate.set_opacity(0.18) for i in indices[6:]], run_time=0.9)
        self.wait(1.5)

        found_caption = Text("3단계  찾았다! 27", font_size=38, color=GREEN_A, weight=BOLD)
        found_caption.move_to(caption)
        found_detail = Text("확인한 횟수: 3번", font_size=29, color=WHITE)
        found_detail.move_to(detail)
        self.play(
            cells[5][0].animate.set_fill(GREEN, opacity=0.6).set_stroke(GREEN_A, width=5),
            cells[5][1].animate.set_color(GREEN_A),
            Transform(caption, found_caption),
            Transform(detail, found_detail),
            run_time=1.0,
        )
        self.wait(3.0)

        takeaway = Text("매번 탐색 범위를 절반 가까이 줄여요.", font_size=29, color=TEAL_A)
        takeaway.move_to(DOWN * 3.65)
        complexity = Text("시간 복잡도  O(log n)", font_size=38, color=YELLOW, weight=BOLD)
        complexity.move_to(DOWN * 4.55)
        explanation = Text("데이터가 커져도 확인 횟수는 천천히 늘어납니다.", font_size=24, color=GRAY_A)
        explanation.move_to(DOWN * 5.25)
        self.play(FadeIn(takeaway), Write(complexity), FadeIn(explanation), run_time=1.3)
        self.wait(6.2)
