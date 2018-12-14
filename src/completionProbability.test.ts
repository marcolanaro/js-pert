import getCompletionProbability from './completionProbability';
import { END } from './network';
import { network } from './network.test';
import { activitiesParams } from './activities.test';
import { criticalPath } from './criticalPath.test';

const pert = {
  activitiesParams,
  network,
  earliestFinishTimes: {},
  latestStartTimes: {},
  earliestStartTimes: {},
  latestFinishTimes: { [END]: 20 },
  slack: {},
  criticalPath,
};

test('get completion probability on half of normal distribution', () => {
  expect(getCompletionProbability(pert, 20)).toBe(0.5);
});

test('get completion probability', () => {
  expect(getCompletionProbability(pert, 15)).toBe(0.011083952876494404);
});
