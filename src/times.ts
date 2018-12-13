import { getExpectedTimeByNode, IActivitiesInferred } from './activities';
import round, { PRECISION } from './round';
import { INetwork } from './network';

interface IMutateTimes {
  times: IDictionaryTimes;
  mutate: (number: number, nodeId: string) => number;
}

interface IFind {
  network: INetwork;
  currentNode: string;
  foundTimes: IDictionaryTimes;
  activitiesParams: IActivitiesInferred;
  type: 'forward' | 'backward';
}

export interface IDictionaryTimes {
  [key: string]: number;
}

export const mutate = ({ times, mutate }: IMutateTimes): IDictionaryTimes =>
  Object.keys(times).reduce((prev: IDictionaryTimes, nodeId) => {
    prev[nodeId] = mutate(times[nodeId], nodeId);
    return prev;
  }, {});

const find = ({
  network,
  currentNode,
  foundTimes,
  activitiesParams,
  type,
}: IFind): IDictionaryTimes => {
  const relativesType = type === 'forward' ? 'predecessors' : 'successors';
  const takeRelative = type === 'forward' ? Math.max : Math.min;
  const combine = (accumulated: number, expectedTime: number) =>
    type === 'forward'
      ? round(accumulated + expectedTime, PRECISION)
      : round(accumulated - expectedTime, PRECISION);
  if (foundTimes[currentNode]) {
    return foundTimes;
  }
  network[currentNode][relativesType].forEach(relative => {
    foundTimes = find({
      network,
      currentNode: relative,
      foundTimes,
      activitiesParams,
      type,
    });
  });
  const time = network[currentNode][relativesType].length
    ? takeRelative(
        ...network[currentNode][relativesType].map(
          relative => foundTimes[relative]
        )
      )
    : 0;
  return {
    ...foundTimes,
    [currentNode]: combine(
      time,
      getExpectedTimeByNode(currentNode, activitiesParams)
    ),
  };
};

export default find;
