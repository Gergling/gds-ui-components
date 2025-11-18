import { useMemo } from "react";


type ProgressTier = 0 | 1 | 2;
type Tier = ProgressTier | 3;
const getTier = (
  countGreaterThanUncategorised: number,
  sumCategorised: number,
  sumUncategorised: number,
): Tier => {
  if (countGreaterThanUncategorised === 0) return 0;
  if (sumUncategorised === 0) return 3;
  if (sumCategorised >= sumUncategorised) return 2;
  return 1;
};

// const getProgress = (tier: number) => {
//   if (tier === 0) 
// }

type SegmentProps<T extends string> = { key: T, value: number };
type AnalysisProps = {
  countGreaterThanUncategorised: number;
  smallest: number;
  sumCategorised: number;
};
const summarise = <T extends string>(
  uncategorised: T,
  sumUncategorised: number
) => (
  analysis: AnalysisProps,
  { key, value }: SegmentProps<T>
) => {
  if (key === uncategorised) return analysis;

  return {
    countGreaterThanUncategorised: value >= sumUncategorised
      ? analysis.countGreaterThanUncategorised + 1
      : analysis.countGreaterThanUncategorised,
    smallest: Math.min(analysis.smallest, value),
    sumCategorised: analysis.sumCategorised + value,
  };
};

const getTier2Progress = <T extends string,>(
  items: SegmentProps<T>[],
  uncategorised: T,
  sumCategorised: number
): number => {
  // Tier 1->2 progress is between largest category smaller than sum categorised and smallest category larger than sum categorised.
  // Find the categories (key) that apply based on the comparable values.
  const { next, previous } = items.reduce((acc, { key, value }) => {
    // We can skip anything uncategorised.
    if (key === uncategorised) return acc;

    // If the category is larger than the sum categorised
    if (value > sumCategorised) return {
      ...acc,
      next: Math.min(acc.next, value),
    };

    return {
      ...acc,
      previous: Math.max(acc.previous, value),
    };
  }, { next: Infinity, previous: 0 });
  const progress = (sumCategorised - previous) / (next - previous);
  return progress;
};
const getTier2Segments = <T extends string,>(
  countGreaterThanUncategorised: number,
  items: SegmentProps<T>[],
  uncategorised: T,
  sumCategorised: number,
): number[] => {
  const progress = getTier2Progress(items, uncategorised, sumCategorised);
  return items.map(({ value }, idx) => {
    if (idx === countGreaterThanUncategorised) return progress;

    if (value > sumCategorised) return 0;

    return 1;
  });
};

type TierSegment = {
  tier: Tier;
  progress: number[];
};

type TierSegmentMapping = {
  [K in Tier]: TierSegment;
};

const reduceTierMapping = (
  progress: number[],
) => (
  acc: TierSegmentMapping, 
  _: unknown,
  idx: number
) => {
  const tier = idx as Tier;
  return {
    ...acc,
    [tier]: {
      progress: [0],
      tier: 0,
    },
  };
};
type ReducedTierMapping = {
  [K in ProgressTier]: TierSegment['progress'];
};
const reduceSegment = (
  acc: TierSegmentMapping,
  tier: ProgressTier,
  progress: number[]
): TierSegmentMapping => ({
  ...acc,
  [tier]: {
    progress,
    tier,
  },
});
const getBaseTierSegments = (
  currentTier: Tier,
  progress: number[],
): TierSegment[] => Array.from({ length: 3 }).map(
  (_, idx): TierSegment => {
    const tier = idx as ProgressTier;
    if (tier === currentTier) return {
      progress,
      tier,
    };
    if (tier < currentTier) return {
      progress: [1],
      tier,
    };
    return {
      progress: [0],
      tier,
    };
  }
);

// If tier 1, it has multiple segments, otherwise it's one segment and it's full or empty.
const getSegments = <T extends string,>(
  items: SegmentProps<T>[],
  uncategorised: T,
  sumUncategorised: number
): TierSegment[] => {
  const {
    countGreaterThanUncategorised,
    smallest,
    sumCategorised
  } = items.reduce(summarise(uncategorised, sumUncategorised), {
    countGreaterThanUncategorised: 0,
    smallest: Infinity,
    sumCategorised: 0,
  });

  const tier = getTier(countGreaterThanUncategorised, sumCategorised, sumUncategorised);

  const tierMappings: {
    [K in Tier]: () => TierSegment['progress'];
  } = {
    0: () => [sumCategorised / sumUncategorised],
    1: () => getTier2Segments(countGreaterThanUncategorised, items, uncategorised, sumCategorised),
    2: () => [smallest / (smallest + sumUncategorised)],
    3: () => [1],
  };

  return getBaseTierSegments(tier, tierMappings[tier]());
};

type DataQualityIndicatorProps<T extends string> = {
  data: {
    [K in T]: number;
  };
  uncategorised: T;
};

const ProgressBar = ({
  progress,
  style,
}: {
  progress: number;
  style?: React.CSSProperties;
}) => {
  return (
    <div style={{
      padding: '1px',
      position: 'relative',
      ...style,
    }}>
      <div style={{ padding: 'inherit', position: 'absolute' }}></div>
      <div style={{ padding: 'inherit', position: 'absolute', width: `${progress * 100}%`}}></div>
    </div>
  );
};


export const DataQualityIndicator = <T extends string,>({
  data,
  uncategorised,
}: DataQualityIndicatorProps<T>) => {
  const sumUncategorised = useMemo(() => data[uncategorised], [data, uncategorised]);
  const items = useMemo(() => Object.entries<number>(data).map(([key, value]) => ({ key: key as T, value })), [data]);
  const analysis = useMemo(
    () => getSegments(items, uncategorised, sumUncategorised),
    [items, uncategorised, sumUncategorised]
  );

  return (
    <div style={{ display: 'flex' }}>
      {analysis.map(({
    </div>
  );
};
