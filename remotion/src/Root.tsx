import { Composition } from "remotion";
import { BinarySearch } from "./BinarySearch";
import { BinarySearchExam2025Q14 } from "./lessons/BinarySearchExam2025Q14";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="BinarySearchShorts"
      component={BinarySearch}
      durationInFrames={1740}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="BinarySearchExam2025Q14"
      component={BinarySearchExam2025Q14}
      durationInFrames={3120}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
