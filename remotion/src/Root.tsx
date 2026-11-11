import { Composition } from "remotion";
import { BinarySearch } from "./BinarySearch";
import { BinarySearchExam2025Q14 } from "./lessons/BinarySearchExam2025Q14";
import { BinarySearchMidpoint12 } from "./lessons/BinarySearchMidpoint12";
import { BinarySearchMidpointOverflow } from "./lessons/BinarySearchMidpointOverflow";
import algorithmEpisodes from "./lessons/algorithm-episodes.json";
import { AlgorithmEpisode, type Episode } from "./lessons/AlgorithmEpisode";

const batchEpisodes = algorithmEpisodes as Episode[];

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
    {batchEpisodes.map((episode) => (
      <Composition
        key={episode.slug}
        id={episode.slug}
        component={AlgorithmEpisode}
        durationInFrames={episode.totalSeconds * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ episode }}
      />
    ))}
    <Composition
      id="BinarySearchExam2025Q14"
      component={BinarySearchExam2025Q14}
      durationInFrames={3120}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="BinarySearchMidpoint12"
      component={BinarySearchMidpoint12}
      durationInFrames={1800}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="BinarySearchMidpointOverflow"
      component={BinarySearchMidpointOverflow}
      durationInFrames={1800}
      fps={30}
      width={1080}
      height={1920}
    />
  </>
);
