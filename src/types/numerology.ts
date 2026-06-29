export interface PinnacleChallenge {
  pinnacle: number;
  challenge: number;
  ageRange: string;
}

export interface NumerologyData {
  lifePath: number;
  destiny: number;
  soul: number;
  personality: number;
  attitude: number;
  maturity: number;
  personalYear: number;
  personalMonth: number;
  pinnacleChallenge: PinnacleChallenge[];
  birthDigits: number[];
  birthGrid: { [key: number]: number };
  karmicDebts: number[];
}
