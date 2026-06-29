export interface DaiVan {
  age: number;
  yearStart: number;
  yearEnd: number;
}

export interface TuViPalace {
  index: number;
  name: string;
  branch: string;
  majorStars: string[];
  minorStars: string[];
  element: string;
  cuc?: number;
  mingGong?: string;
  thienPhuPos?: number;
  hoaStars?: string[];
  yearStem?: string;
  yearBranch?: string;
  bodyBranchIdx?: number;
  palaceStem?: string;
  daiVan?: DaiVan | null;
}
