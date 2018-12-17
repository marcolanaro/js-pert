import getNetworkDiagram, { INetwork, START, END } from './network';
import find, { mutate, IDictionaryTimes } from './times';
import getActivitiesParams, {
  getExpectedTimeByNode,
  IActivities,
  IActivitiesInferred,
} from './activities';
import round, { PRECISION } from './round';
import getCriticalPath from './criticalPath';

export interface Pert {
  activitiesParams: IActivitiesInferred;
  network: INetwork;
  earliestFinishTimes: IDictionaryTimes;
  latestStartTimes: IDictionaryTimes;
  earliestStartTimes: IDictionaryTimes;
  latestFinishTimes: IDictionaryTimes;
  slack: IDictionaryTimes;
  criticalPath: string[];
}

const getPERT = (activities: IActivities): Pert => {
  const activitiesParams = getActivitiesParams(activities);
  const network = getNetworkDiagram(activities);
  const earliestFinishTimes = find({
    network,
    currentNode: END,
    foundTimes: { [START]: 0 },
    activitiesParams,
    type: 'forward',
  });
  const latestStartTimes = find({
    network,
    currentNode: START,
    foundTimes: { [END]: earliestFinishTimes[END] },
    activitiesParams,
    type: 'backward',
  });
  const earliestStartTimes = mutate({
    times: earliestFinishTimes,
    mutate: (time, nodeId) =>
      round(time - getExpectedTimeByNode(nodeId, activitiesParams), PRECISION),
  });
  const latestFinishTimes = mutate({
    times: latestStartTimes,
    mutate: (time, nodeId) =>
      round(time + getExpectedTimeByNode(nodeId, activitiesParams), PRECISION),
  });
  const slack = mutate({
    times: latestStartTimes,
    mutate: (time, nodeId) =>
      round(time - earliestStartTimes[nodeId], PRECISION),
  });
  const criticalPath = getCriticalPath(network, slack);

  return {
    activitiesParams,
    network,
    earliestFinishTimes,
    earliestStartTimes,
    latestStartTimes,
    latestFinishTimes,
    slack,
    criticalPath,
  };
};

export default getPERT;
