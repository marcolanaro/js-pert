import jsPERT, { pertProbability } from '../../';
import activities from './activities.json';

const pert = jsPERT(activities);
const Pz = pertProbability(pert, 22);

console.log('PERT data:', JSON.stringify(pert, null, 2));
console.log('P(x<22):', Pz);
