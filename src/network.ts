import { TActivity, IActivities } from './activities';

export const START = '__start';
export const END = '__end';

interface INetworkNode {
  successors: string[];
  predecessors: string[];
}

export interface INetwork {
  [key: string]: INetworkNode;
}

const isStartingActivity = (activity: TActivity): boolean =>
  activity.predecessors.length === 0;

const isFinalActivity = (
  activity: TActivity,
  activities: IActivities
): boolean =>
  Object.values(activities).reduce((prev, currentActivity) => {
    if (currentActivity.predecessors.indexOf(activity.id) !== -1) {
      return false;
    }
    return prev;
  }, true);

const initNetworkNode = (ref?: INetworkNode) => {
  if (ref) {
    return ref;
  }
  return { predecessors: [], successors: [] };
};

const getNetworkDiagram = (activities: IActivities): INetwork =>
  Object.values(activities).reduce(
    (prev: INetwork, activity) => {
      prev[activity.id] = initNetworkNode(prev[activity.id]);
      activity.predecessors.forEach(predecessor => {
        prev[predecessor] = initNetworkNode(prev[predecessor]);
        prev[predecessor].successors.push(activity.id);
      });
      prev[activity.id].predecessors = [...activity.predecessors];
      if (isStartingActivity(activity)) {
        prev[START].successors.push(activity.id);
        prev[activity.id].predecessors.push(START);
      }
      if (isFinalActivity(activity, activities)) {
        prev[END].predecessors.push(activity.id);
        prev[activity.id].successors.push(END);
      }
      return prev;
    },
    { [START]: initNetworkNode(), [END]: initNetworkNode() }
  );

export default getNetworkDiagram;
