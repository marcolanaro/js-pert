export type TActivity = {
  id: string;
  optimisticTime: number;
  mostLikelyTime: number;
  pessimisticTime: number;
  predecessors: string[];
};

export interface IActivities {
  [key: string]: TActivity;
}

interface IActivityInferred {
  expectedTime: number;
  variance: number;
}

export interface IActivitiesInferred {
  [key: string]: IActivityInferred;
}

const getExpectedTime = ({
  optimisticTime,
  mostLikelyTime,
  pessimisticTime,
}: TActivity) => (optimisticTime + 4 * mostLikelyTime + pessimisticTime) / 6;

const getVariance = ({ optimisticTime, pessimisticTime }: TActivity) =>
  Math.pow((pessimisticTime - optimisticTime) / 6, 2);

const getActivitiesParams = (activities: IActivities): IActivitiesInferred =>
  Object.keys(activities).reduce((prev: IActivitiesInferred, activityId) => {
    prev[activityId] = {
      expectedTime: getExpectedTime(activities[activityId]),
      variance: getVariance(activities[activityId]),
    };
    return prev;
  }, {});

export const getExpectedTimeByNode = (
  currentNode: string,
  activitiesParams: IActivitiesInferred
) => {
  if (activitiesParams[currentNode]) {
    return activitiesParams[currentNode].expectedTime;
  }
  return 0;
};

export default getActivitiesParams;
