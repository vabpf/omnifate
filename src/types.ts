export interface UserProfile {
  name: string;
  dob: string; // YYYY-MM-DD
  time: string; // HH:MM
  place: string;
  gender: 'Nam' | 'Nữ';
}

export interface NumerologyData {
  lifePath: number;
  destiny: number;
  soul: number;
  birthDigits: number[];
  birthGrid: { [key: number]: number }; // Maps digit 1-9 to occurrences count
}

export interface HistoricalAspect {
  planet1: string;
  planet2: string;
  type: 'Conjunction' | 'Opposition' | 'Trine' | 'Square' | 'Sextile';
  angle: number;
  color: string;
}

export interface PlanetPosition {
  name: string;
  symbol: string;
  sign: string;
  signSymbol: string;
  degree: number;
  house: number;
}

export interface AstrologyData {
  sunSign: string;
  sunSymbol: string;
  moonSign: string;
  moonSymbol: string;
  ascendant: string;
  ascendantSymbol: string;
  planets: PlanetPosition[];
  aspects: HistoricalAspect[];
}

export interface TuViPalace {
  index: number; // 0-11
  name: string; // Cung Mệnh, Phụ Mẫu...
  branch: string; // Tý, Sửu...
  majorStars: string[];
  minorStars: string[];
  element: string; // Kim, Mộc, Thủy, Hỏa, Thổ
}

export interface BattuData {
  pillars: {
    year: string;  // e.g., "Ất Hợi"
    month: string; // e.g., "Bính Tuất"
    day: string;   // e.g., "Quý Sửu"
    hour: string;  // e.g., "Kỷ Mùi"
  };
  elementsPercentage: {
    Kim: number;
    Mộc: number;
    Thủy: number;
    Hỏa: number;
    Thổ: number;
  };
  dayMaster: string; // Can ngày, e.g. "Quý"
}

export interface HumanDesignCenter {
  id: string;
  name: string;
  defined: boolean;
  type: string; // e.g., "Head", "Ajna"
  color: string;
}

export interface HumanDesignData {
  type: string; // Generator, Mani-Gen, Projector, Reflector, Manifestor
  authority: string; // Emotional, Sacral, Splenic, Ego, Self, Mental, None
  strategy: string; // To Respond, Wait for Invitation, Inform & Initiate, etc.
  profile: string; // 1/3, 2/4, 3/5, 4/6, 5/1, 6/2
  centers: HumanDesignCenter[];
}

export interface FateAnalysisReport {
  overview: string;
  numerology: {
    lifePathInterpretation: string;
    destinyInterpretation: string;
    soulInterpretation: string;
    birthChartInterpretation: string;
    partA_Overview: string;
    partB_LifePath: string;
    partC_Destiny: string;
    partD_Ability: string;
  };
  astrology: {
    sunSignInterpretation: string;
    moonSignInterpretation: string;
    ascendantInterpretation: string;
    natalChartSynthesis: string;
  };
  tuvi: {
    personality: string;
    career: string;
    wealth: string;
    love: string;
  };
  battu: {
    elementAnalysis: string;
    favourableElements: string;
    unfavourableElements: string;
    advice: string;
  };
  humanDesign: {
    typeInterpretation: string;
    authorityInterpretation: string;
    strategyInterpretation: string;
  };
  yearlyForecast: {
    outlook: string;
    opportunities: string;
    challenges: string;
  };
  remediation: {
    colors: string;
    numbers: string;
    mindsetShift: string;
  };
}
