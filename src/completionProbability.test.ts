import getCompletionProbability from './completionProbability';
import round from './round';
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
  expect(round(getCompletionProbability(pert, 20), 1)).toBe(0.5);
});

test('get completion probability', () => {
  expect(round(getCompletionProbability(pert, 15), 6)).toBe(0.011084);
});
