import pert from './pert';
import { network, activities } from './network.test';
import { activitiesParams } from './activities.test';
import { criticalPath } from './criticalPath.test';
import { earliestFinishTimes, latestStartTimes } from './times.test';

test('generate pert serie', () => {
  expect(pert(activities)).toEqual({
    activitiesParams,
    network,
    earliestFinishTimes,
    latestStartTimes,
    earliestStartTimes: {
      __start: 0,
      A: 0,
      D: 6,
      I: 8,
      B: 0,
      E: 3,
      C: 0,
      F: 4,
      H: 9,
      G: 4,
      J: 14,
      __end: 17,
    },
    latestFinishTimes: {
      __end: 17,
      I: 17,
      D: 12,
      A: 10,
      J: 17,
      H: 14,
      E: 9,
      B: 6,
      F: 9,
      G: 14,
      C: 4,
      __start: 0,
    },
    slack: {
      __end: 0,
      I: 4,
      D: 4,
      A: 4,
      J: 0,
      H: 0,
      E: 3,
      B: 3,
      F: 0,
      G: 7,
      C: 0,
      __start: 0,
    },
    criticalPath,
  });
});
