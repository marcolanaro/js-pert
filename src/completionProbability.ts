import gaussian from 'gaussian';

import { Pert } from './pert';
import { END } from './network';
import { IActivitiesInferred } from './activities';

const distribution = gaussian(0, 1);

const getVariance = (
  criticalPath: string[],
  activitiesParams: IActivitiesInferred
) =>
  criticalPath
    .map(nodeId => activitiesParams[nodeId].variance)
    .reduce((prev, curr) => prev + curr, 0);

const getCompletionProbability = (
  { criticalPath, activitiesParams, latestFinishTimes }: Pert,
  days: number
) => {
  const variance = getVariance(criticalPath, activitiesParams);
  const Z0 = (days - latestFinishTimes[END]) / Math.sqrt(variance);
  return distribution.cdf(Z0);
};

export default getCompletionProbability;
