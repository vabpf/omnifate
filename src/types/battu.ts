export interface BattuData {
  pillars: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  elementsPercentage: {
    Kim: number;
    Mộc: number;
    Thủy: number;
    Hỏa: number;
    Thổ: number;
  };
  dayMaster: string;
  hiddenStems: {
    year: string[];
    month: string[];
    day: string[];
    hour: string[];
  };
  nayin: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  mingGong: string;
  shenGong: string;
}
