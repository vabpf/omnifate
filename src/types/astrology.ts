export interface HistoricalAspect {
  planet1: string;
  planet2: string;
  type: 'Conjunction' | 'Opposition' | 'Trine' | 'Square' | 'Sextile';
  angle: number;
  color: string;
  strength?: number;
}

export interface PlanetPosition {
  name: string;
  symbol: string;
  sign: string;
  signSymbol: string;
  degree: number;
  house: number;
  retrograde?: boolean;
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
