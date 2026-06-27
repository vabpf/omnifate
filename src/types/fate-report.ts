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
