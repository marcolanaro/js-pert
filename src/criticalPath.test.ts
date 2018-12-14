import getCriticalPath from './criticalPath';

const slack = {
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
};

const network = {
  __start: {
    predecessors: [],
    successors: ['A', 'B', 'C'],
  },
  __end: {
    predecessors: ['I', 'J'],
    successors: [],
  },
  A: {
    predecessors: ['__start'],
    successors: ['D'],
  },
  B: {
    predecessors: ['__start'],
    successors: ['E'],
  },
  C: {
    predecessors: ['__start'],
    successors: ['F', 'G'],
  },
  D: {
    predecessors: ['A'],
    successors: ['I'],
  },
  E: {
    predecessors: ['B'],
    successors: ['H'],
  },
  F: {
    predecessors: ['C'],
    successors: ['H'],
  },
  G: {
    predecessors: ['C'],
    successors: ['J'],
  },
  H: {
    predecessors: ['E', 'F'],
    successors: ['J'],
  },
  I: {
    predecessors: ['D'],
    successors: ['__end'],
  },
  J: {
    predecessors: ['H', 'G'],
    successors: ['__end'],
  },
};

const unhealtyNetwork = {
  __start: {
    predecessors: [],
    successors: ['A', 'B', 'C'],
  },
  __end: {
    predecessors: ['I', 'J'],
    successors: [],
  },
  A: {
    predecessors: ['__start'],
    successors: ['D'],
  },
};

test('get critical path of healthy network', () => {
  expect(getCriticalPath(network, slack)).toEqual(['C', 'F', 'H', 'J']);
});

test('fail critical path of unhealthy network', () => {
  expect(() => {
    getCriticalPath(unhealtyNetwork, slack);
  }).toThrow('No critical path found');
});
