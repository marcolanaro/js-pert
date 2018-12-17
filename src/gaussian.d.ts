// Type definitions for gaussian 1.1
// Project: https://github.com/errcw/gaussian
// Definitions by: Marco Lanaro <https://github.com/marcolanaro>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'gaussian' {
  interface Gaussian {
    mean: number;
    variance: number;
    standardDeviation: number;
    pdf: (x: number) => number;
    cdf: (x: number) => number;
    ppf: (x: number) => number;
    mul: (d: Gaussian) => Gaussian;
    div: (d: Gaussian) => Gaussian;
    add: (d: Gaussian) => Gaussian;
    sub: (d: Gaussian) => Gaussian;
    scale: (c: number) => Gaussian;
    random: (x: number) => number[];
  }

  export default function gaussian(mean: number, variance: number): Gaussian;
}
