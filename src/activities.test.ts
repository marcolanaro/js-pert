import getActivitiesParams, { getExpectedTimeByNode } from './activities';
import { activities } from './network.test';

export const activitiesParams = {
  A: {
    expectedTime: 6,
    variance: 0.1111111111111111,
  },
  B: {
    expectedTime: 3,
    variance: 0.4444444444444444,
  },
  C: {
    expectedTime: 4,
    variance: 1,
  },
  D: {
    expectedTime: 2,
    variance: 0.1111111111111111,
  },
  E: {
    expectedTime: 3,
    variance: 1.7777777777777777,
  },
  F: {
    expectedTime: 5,
    variance: 1.7777777777777777,
  },
  G: {
    expectedTime: 3,
    variance: 1,
  },
  H: {
    expectedTime: 5,
    variance: 1,
  },
  I: {
    expectedTime: 5,
    variance: 1,
  },
  J: {
    expectedTime: 3,
    variance: 1,
  },
};

test('get expectedTime and variance', () => {
  expect(getActivitiesParams(activities)).toEqual(activitiesParams);
});

test('given an existing node, return the expectedTime', () => {
  expect(getExpectedTimeByNode('A', activitiesParams)).toBe(6);
});

test('given a non existing node, return 0', () => {
  expect(getExpectedTimeByNode('wrongActivity', activitiesParams)).toBe(0);
});
