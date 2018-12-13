import distributions from 'distributions';

import { IOutput } from './pert';
import { END } from './network';
import { IActivitiesInferred } from './activities';

const normal = distributions.Normal();

const getVariance = (
  criticalPath: string[],
  activitiesParams: IActivitiesInferred
) =>
  criticalPath
    .map(nodeId => activitiesParams[nodeId].variance)
    .reduce((prev, curr) => prev + curr, 0);

const getCompletionProbability = (
  { criticalPath, activitiesParams, latestFinishTimes }: IOutput,
  days: number
) => {
  const variance = getVariance(criticalPath, activitiesParams);
  const Z0 = (days - latestFinishTimes[END]) / Math.sqrt(variance);
  return normal.cdf(Z0);
};

export default getCompletionProbability;
