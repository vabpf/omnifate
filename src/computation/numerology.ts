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

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

function isVowel(char: string, index: number, str: string): boolean {
  if (VOWELS.includes(char)) return true;
  if (char !== 'y') return false;
  if (index === 0) {
    const next = str[index + 1];
    return !next || VOWELS.includes(next) ? false : true;
  }
  return true;
}

function detectKarmicDebts(n: number): number[] {
  const debts: number[] = [];
  const intermediate = n;
  while (n >= 10 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').map(Number).reduce((a, b) => a + b, 0);
    if ([13, 14, 16, 19].includes(n)) debts.push(n);
  }
  return debts;
}

export function computeNumerology(name: string, dob: string, currentYear = new Date().getFullYear()): NumerologyData {
  const normName = removeVietnameseTones(name).replace(/[^a-z]/g, '');
  const [yearStr, monthStr, dayStr] = dob.split('-');
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);
  const day = parseInt(dayStr);

  const reducedMonth = reduceNum(month, true);
  const reducedDay = reduceNum(day, true);
  const reducedYear = reduceNum(year, true);
  const lifePath = reduceNum(reducedMonth + reducedDay + reducedYear, true);

  let nameSum = 0;
  let soulSum = 0;
  let consSum = 0;
  for (let i = 0; i < normName.length; i++) {
    const char = normName[i];
    const val = N_MAP[char] || 0;
    nameSum += val;
    if (isVowel(char, i, normName)) {
      soulSum += val;
    } else {
      consSum += val;
    }
  }
  const destiny = reduceNum(nameSum, true);
  const soul = reduceNum(soulSum === 0 ? 9 : soulSum, true);
  const personality = reduceNum(consSum, true);

  const attitude = reduceNum(day + month, false);
  const maturity = reduceNum(lifePath + destiny, true);

  const pDay = reduceNum(day, false);
  const pMonth = reduceNum(month, false);
  const pYear = reduceNum(currentYear, false);
  const personalYear = reduceNum(pDay + pMonth + pYear, false);
  const currentReducedMonth = reduceNum(new Date().getMonth() + 1, false);
  const personalMonth = reduceNum(personalYear + currentReducedMonth, false);

  // Pinnacle / Challenge cycles
  const d = reduceNum(day, true);
  const m = reduceNum(month, true);
  const y = reduceNum(year, true);
  const pinnacleChallenge = [
    { pinnacle: reduceNum(d + m, true), challenge: Math.abs(d - m), ageRange: 'Sơ sinh → 27 tuổi' },
    { pinnacle: reduceNum(d + y, true), challenge: Math.abs(d - y), ageRange: '28 → 36 tuổi' },
    { pinnacle: reduceNum(reduceNum(d + m, true) + reduceNum(d + y, true), true), challenge: Math.abs(Math.abs(d - y) - Math.abs(d - m)), ageRange: '37 → 45 tuổi' },
    { pinnacle: reduceNum(m + y, true), challenge: Math.abs(m - y), ageRange: '46 tuổi → cuối đời' },
  ];

  const allKarmic = [
    ...detectKarmicDebts(month + day + year),
    ...detectKarmicDebts(nameSum),
    ...detectKarmicDebts(soulSum),
    ...detectKarmicDebts(consSum),
  ];
  const karmicDebts = [...new Set(allKarmic)].sort();

  const dobDigits = dob.replace(/[^0-9]/g, '').split('').map(Number);
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
    personality,
    attitude,
    maturity,
    personalYear,
    personalMonth,
    pinnacleChallenge,
    birthDigits: dobDigits,
    birthGrid,
    karmicDebts,
  };
}
