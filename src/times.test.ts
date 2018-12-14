import find, { mutate, IDictionaryTimes } from './times';
import { START, END } from './network';
import { network } from './network.test';
import { activitiesParams } from './activities.test';

const times: IDictionaryTimes = {
  A: 0,
  B: 6,
};

test('mutate a dictionary', () => {
  expect(
    mutate({
      times,
      mutate: (n, i) => 1 + n + times[i],
    })
  ).toEqual({ A: 1, B: 13 });
});

export const earliestFinishTimes = {
  [START]: 0,
  A: 6,
  D: 8,
  I: 13,
  B: 3,
  E: 6,
  C: 4,
  F: 9,
  H: 14,
  G: 7,
  J: 17,
  [END]: 17,
};

export const latestStartTimes = {
  [END]: 17,
  I: 12,
  D: 10,
  A: 4,
  J: 14,
  H: 9,
  E: 6,
  B: 3,
  F: 4,
  G: 11,
  C: 0,
  [START]: 0,
};

test('find forward time serie', () => {
  expect(
    find({
      network,
      currentNode: END,
      foundTimes: { [START]: 0 },
      activitiesParams,
      type: 'forward',
    })
  ).toEqual(earliestFinishTimes);
});

test('find backward time serie', () => {
  expect(
    find({
      network,
      currentNode: START,
      foundTimes: { [END]: earliestFinishTimes[END] },
      activitiesParams,
      type: 'backward',
    })
  ).toEqual(latestStartTimes);
});
