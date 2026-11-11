import { Composition } from "remotion";
import { BinarySearch } from "./BinarySearch";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="BinarySearchShorts"
    component={BinarySearch}
    durationInFrames={1740}
    fps={30}
    width={1080}
    height={1920}
  />
);
