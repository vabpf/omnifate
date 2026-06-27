import { NumerologyData } from '../types';
import { removeVietnameseTones, reduceNum } from './shared';

const N_MAP: { [key: string]: number } = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

export function computeNumerology(name: string, dob: string): NumerologyData {
  const normName = removeVietnameseTones(name).replace(/[^a-z]/g, '');
  const dobDigits = dob.replace(/[^0-9]/g, '').split('').map(Number);

  const totalDob = dobDigits.reduce((acc, curr) => acc + curr, 0);
  const lifePath = reduceNum(totalDob, true);

  let nameSum = 0;
  for (const char of normName) {
    if (N_MAP[char]) nameSum += N_MAP[char];
  }
  const destiny = reduceNum(nameSum, true);

  const vowels = ['a', 'e', 'i', 'o', 'u'];
  let soulSum = 0;
  for (const char of normName) {
    if (vowels.includes(char)) {
      soulSum += N_MAP[char] || 0;
    }
  }
  const soul = reduceNum(soulSum === 0 ? 9 : soulSum, true);

  const birthGrid: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  dobDigits.forEach(d => {
    if (d >= 1 && d <= 9) {
      birthGrid[d] = (birthGrid[d] || 0) + 1;
    }
  });

  return {
    lifePath,
    destiny,
    soul,
    birthDigits: dobDigits,
    birthGrid
  };
}
