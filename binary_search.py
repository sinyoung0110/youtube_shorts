from pathlib import Path

from manim import *


config.pixel_width = 1080
config.pixel_height = 1920
config.frame_width = 9
config.frame_height = 16
config.frame_rate = 30
config.background_color = "#0b0d12"
config.media_dir = str(Path(__file__).resolve().parent / "media")

FONT = "Apple SD Gothic Neo"
CODE_FONT = "Menlo"


def label(text, **kwargs):
    return Text(text, font=FONT, **kwargs)


class BinarySearchShorts(Scene):
    def construct(self):
        audio_candidates = [
            Path(__file__).resolve().parent / "remotion/public/audio/narration.wav",
            Path(__file__).resolve().parents[1] / "remotion/public/audio/narration.wav",
        ]
        narration = next(path for path in audio_candidates if path.exists())
        self.add_sound(str(narration))

        values = [-1, 0, 3, 5, 9, 12]
        title = label("이진 탐색", font_size=56, weight=BOLD, color=TEAL_A)
        title.move_to(UP * 6.35)
        subtitle = label("정렬 배열에서 9 찾기", font_size=33, color=WHITE)
        subtitle.next_to(title, DOWN, buff=0.28)

        array_note = label("target = 9", font_size=28, color=GRAY_A)
        array_note.move_to(UP * 4.15)

        cells = VGroup()
        for value in values:
            box = RoundedRectangle(
                width=1.15,
                height=1.0,
                corner_radius=0.13,
                stroke_color="#51536d",
                stroke_width=2,
                fill_color="#191a28",
                fill_opacity=1,
            )
            value_label = label(str(value), font_size=31, color=WHITE)
            cells.add(VGroup(box, value_label))
        cells.arrange(RIGHT, buff=0.13).move_to(UP * 2.05)

        indices = VGroup(*[label(str(i), font_size=22, color=GRAY_A) for i in range(len(values))])
        for index, cell in zip(indices, cells):
            index.move_to(cell.get_center() + DOWN * 0.7)

        markers = {}
        for name, index, color in [("lo", 0, BLUE_B), ("mid", 2, YELLOW), ("hi", 5, PINK)]:
            marker = VGroup(
                label(name, font_size=23, color=color, weight=BOLD),
                Triangle(fill_color=color, fill_opacity=1, stroke_width=0).rotate(PI).scale(0.09),
            ).arrange(DOWN, buff=0.05)
            marker.move_to(cells[index].get_center() + UP * 1.0)
            markers[name] = marker

        detail = label("lo = 0     mid = 2     hi = 5", font_size=27, color=GRAY_A)
        detail.move_to(DOWN * 0.15)
        step = label("첫 mid: A[2] = 3 < 9  →  lo = mid + 1 = 3", font_size=26, color=YELLOW)
        step.move_to(DOWN * 1.25)
        result = label("두 번째 mid: A[4] = 9  →  return 4", font_size=27, color=GREEN_A)
        result.move_to(DOWN * 1.25)

        self.play(Write(title), FadeIn(subtitle), run_time=1.4)
        self.add(array_note, cells, indices, *markers.values())
        self.wait(2.6)

        self.play(
            cells[2][0].animate.set_stroke(YELLOW, width=4).set_fill(YELLOW, opacity=0.18),
            cells[2][1].animate.set_color(YELLOW),
            FadeIn(detail), FadeIn(step), run_time=0.8,
        )
        self.wait(8.2)

        new_lo = VGroup(
            label("lo", font_size=23, color=BLUE_B, weight=BOLD),
            Triangle(fill_color=BLUE_B, fill_opacity=1, stroke_width=0).rotate(PI).scale(0.09),
        ).arrange(DOWN, buff=0.05).move_to(cells[3].get_center() + UP * 1.0)
        new_mid = VGroup(
            label("mid", font_size=23, color=YELLOW, weight=BOLD),
            Triangle(fill_color=YELLOW, fill_opacity=1, stroke_width=0).rotate(PI).scale(0.09),
        ).arrange(DOWN, buff=0.05).move_to(cells[4].get_center() + UP * 1.0)
        self.play(
            cells[0][0].animate.set_opacity(0.2), cells[0][1].animate.set_opacity(0.2),
            cells[1][0].animate.set_opacity(0.2), cells[1][1].animate.set_opacity(0.2),
            cells[2][0].animate.set_opacity(0.2), cells[2][1].animate.set_opacity(0.2),
            Transform(markers["lo"], new_lo), Transform(markers["mid"], new_mid),
            Transform(detail, label("lo = 3     mid = 4     hi = 5", font_size=27, color=GRAY_A)),
            cells[4][0].animate.set_stroke(YELLOW, width=4).set_fill(YELLOW, opacity=0.18),
            run_time=0.8,
        )
        self.play(cells[4][0].animate.set_stroke(GREEN_A, width=5).set_fill(GREEN, opacity=0.32), FadeIn(result), run_time=0.8)
        self.wait(6.4)

        array_group = VGroup(array_note, cells, indices, *markers.values(), detail, step, result)
        code_title = label("같은 판단을 반복문으로", font_size=39, color=WHITE, weight=BOLD)
        code_title.move_to(UP * 4.6)
        code_lines = [
            "def binary_search(A, x):",
            "    lo, hi = 0, len(A) - 1",
            "    while lo <= hi:",
            "        mid = (lo + hi) // 2",
            "        if A[mid] == x: return mid",
            "        if A[mid] < x: lo = mid + 1",
            "        else: hi = mid - 1",
            "    return -1",
        ]
        code_rows = VGroup(*[
            Text(line, font=CODE_FONT, font_size=20, color=GRAY_A)
            for line in code_lines
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.19)
        code_rows.move_to(UP * 0.65)
        code_box = RoundedRectangle(width=8.15, height=5.1, corner_radius=0.16, stroke_color="#41435a", fill_color="#141722", fill_opacity=1)
        code_box.move_to(UP * 0.65)
        code_rows.set_z_index(1)
        code_help = label("같으면 반환  ·  작으면 lo ↑  ·  크면 hi ↓", font_size=25, color=TEAL_A)
        code_help.move_to(DOWN * 3.0)
        code_footer = label("lo: 왼쪽 경계     hi: 오른쪽 경계     //: 몫의 내림", font_size=21, color=GRAY_A)
        code_footer.move_to(DOWN * 4.0)

        self.play(FadeOut(array_group), FadeOut(subtitle), FadeIn(code_title), FadeIn(code_box), FadeIn(code_rows), FadeIn(code_help), FadeIn(code_footer), run_time=1.0)
        for index in range(len(code_rows)):
            code_rows[index].set_color(YELLOW)
            self.wait(1.65)
            code_rows[index].set_color(GRAY_A)
        self.wait(1.8)

        big_title = label("왜 O(log n)일까?", font_size=48, color=WHITE, weight=BOLD)
        big_title.move_to(UP * 4.7)
        counts = [16, 8, 4, 2, 1]
        count_boxes = VGroup()
        for count in counts:
            box = RoundedRectangle(width=1.18, height=0.9, corner_radius=0.13, stroke_color="#41435a", fill_color="#191a28", fill_opacity=1)
            number = Text(str(count), font=CODE_FONT, font_size=27, color=WHITE)
            count_boxes.add(VGroup(box, number))
        count_boxes.arrange(RIGHT, buff=0.25).move_to(UP * 2.3)
        arrows = VGroup(*[label("→", font_size=29, color=YELLOW) for _ in range(4)])
        for i, arrow in enumerate(arrows):
            arrow.move_to((count_boxes[i].get_right() + count_boxes[i + 1].get_left()) / 2)
        formula = Text("n → n/2 → n/4 → ... → 1", font=CODE_FONT, font_size=27, color=GRAY_A)
        formula.move_to(UP * 1.1)
        max_cost = label("최선 O(1)    평균 · 최악 O(log₂ n)", font_size=31, color=YELLOW, weight=BOLD)
        max_cost.move_to(DOWN * 0.5)
        example = label("n = 16이면 최악에도 mid 확인 최대 5회", font_size=26, color=WHITE)
        example.move_to(DOWN * 1.45)
        big_note = label("Big O는 정확한 횟수가 아니라 증가율을 나타냅니다.", font_size=23, color=GRAY_A)
        big_note.move_to(DOWN * 2.5)

        code_group = VGroup(code_title, code_box, code_rows, code_help, code_footer)
        self.play(FadeOut(code_group), FadeIn(big_title), FadeIn(count_boxes), FadeIn(arrows), FadeIn(formula), FadeIn(max_cost), FadeIn(example), FadeIn(big_note), run_time=1.0)
        self.wait(10.0)

        recap_title = label("이진 탐색의 세 가지", font_size=46, color=WHITE, weight=BOLD)
        recap_title.move_to(UP * 4.7)
        recaps = VGroup(
            label("1  정렬되어 있어야 해요", font_size=30, color=TEAL_A),
            label("2  가운데 값과 목표를 비교", font_size=30, color=YELLOW),
            label("3  반대쪽 절반을 버려요", font_size=30, color=GREEN_A),
        ).arrange(DOWN, buff=0.75).move_to(UP * 1.7)
        distinction = label("배열은 lo/hi 인덱스 · BST는 left/right 자식", font_size=23, color=GRAY_A)
        distinction.move_to(DOWN * 1.25)
        final_o = Text("O(log n)", font=CODE_FONT, font_size=42, color=YELLOW, weight=BOLD)
        final_o.move_to(DOWN * 2.5)
        final_group = VGroup(big_title, count_boxes, arrows, formula, max_cost, example, big_note)
        self.play(FadeOut(final_group), FadeIn(recap_title), FadeIn(recaps), FadeIn(distinction), Write(final_o), run_time=0.8)
        self.wait(6.2)
