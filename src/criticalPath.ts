import { INetwork, START, END } from './network';
import { IDictionaryTimes } from './times';

const getCriticalPath = (
  network: INetwork,
  slack: IDictionaryTimes
): string[] => {
  let currentNode = START;
  const criticalPath = [];
  while (currentNode !== END && currentNode !== undefined) {
    const newNode = network[currentNode]
      ? network[currentNode].successors.find(node => slack[node] === 0)
      : undefined;
    if (!!newNode) {
      currentNode = newNode;
      if (currentNode !== END) {
        criticalPath.push(currentNode);
      }
    } else {
      throw 'No critical path found';
    }
  }
  return criticalPath;
};

export default getCriticalPath;
