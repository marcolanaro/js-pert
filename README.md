<a href="https://npmjs.com/package/js-pert">
  <img src="https://img.shields.io/npm/v/js-pert.svg">
</a>

<a href="https://github.com/marcolanaro/js-pert/blob/master/LICENSE.md">
  <img src="https://img.shields.io/github/license/marcolanaro/js-pert.svg">
</a>
  
# js-pert

## Program evaluation and review technique

Given a set of activities with pessimistic, optimistic, probable times and the set of dependencies, will provide:

- `expected time` for every activity
- `variance` for every activity
- the description of the activity on node `[AON]` network diagram with `predecessors` and `successors`
- earliest start `[ES]` times for every node
- earliest finish `[EF]` times for every node
- latest start `[LS]` times for every node
- latest finish `[LF]` times for every node
- `slack` for every node
- `critical path` description

With the pert description will also provide a function to calculate the probability to complete the project in `x` days.

## Install

```bash
npm install js-pert --save
```

## Example

Please look at [this example](./examples/src/index.ts).

## Documentation

### jsPERT

The default exported function allow you to retrieve the description of the PERT network.

Given `activities`:

```bash
{
  [key: string]: {
    id: string;
    optimisticTime: number;
    mostLikelyTime: number;
    pessimisticTime: number;
    predecessors: string[];
  };
}
```

You can use jsPERT as follow:

```bash
import jsPERT from 'js-pert';

const pert = jsPERT(activities);

console.log('PERT', pert);

```

Should log the PERT description in following shape:

```bash
{
  activitiesParams: {
    [key: string]: {
      expectedTime: number;
      variance: number;
    };
  };
  network: {
    [key: string]: {
      successors: string[];
      predecessors: string[];
    };
  };
  earliestFinishTimes: {
    [key: string]: number;
  };
  latestStartTimes: {
    [key: string]: number;
  };
  earliestStartTimes: {
    [key: string]: number;
  };
  latestFinishTimes: {
    [key: string]: number;
  };
  slack: {
    [key: string]: number;
  };
  criticalPath: string[];
}
```

### pertProbability

You can get the probability of completing the project in less than `x` days submitting the `PERT description` and `x` in the `pertProbability` ancillary function.

```bash
import { pertProbability } from 'js-pert';

const Pz = pertProbability(pert, 22);

console.log('P(x<22):', Pz);
```

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
