import { AstrologyData, PlanetPosition, HistoricalAspect } from '../types';

export const ZODIAC_SIGNS = [
  { name: 'Bạch Dương', symbol: '♈', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: 'Kim Ngưu', symbol: '♉', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: 'Song Tử', symbol: '♊', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { name: 'Cự Giải', symbol: '♋', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { name: 'Sư Tử', symbol: '♌', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: 'Xử Nữ', symbol: '♍', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: 'Thiên Bình', symbol: '♎', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { name: 'Thiên Yết', symbol: '♏', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { name: 'Nhân Mã', symbol: '♐', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  { name: 'Ma Kết', symbol: '♑', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: 'Bảo Bình', symbol: '♒', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: 'Song Ngư', symbol: '♓', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
];

const aspectColors = {
  Conjunction: '#EAB308',
  Opposition: '#EF4444',
  Trine: '#10B981',
  Square: '#F97316',
  Sextile: '#3B82F6',
};

export function computeAstrology(dob: string, time: string): AstrologyData {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  let sunSignObj = ZODIAC_SIGNS[11];
  for (const sign of ZODIAC_SIGNS) {
    if (
      (month === sign.startMonth && day >= sign.startDay) ||
      (month === sign.endMonth && day <= sign.endDay)
    ) {
      sunSignObj = sign;
      break;
    }
  }

  const sunSignIndex = ZODIAC_SIGNS.findIndex(z => z.name === sunSignObj.name);

  const hoursSinceSunrise = (hour + minute / 60 - 6 + 24) % 24;
  const ascendantOffset = Math.floor(hoursSinceSunrise / 2);
  const ascendantIndex = (sunSignIndex + ascendantOffset) % 12;
  const ascendantObj = ZODIAC_SIGNS[ascendantIndex];

  const anchorTime = new Date('1970-01-01').getTime();
  const birthTimeMs = new Date(`${dob}T${time}:00`).getTime();
  const daysDiff = (birthTimeMs - anchorTime) / (1000 * 60 * 60 * 24);
  const moonRotations = daysDiff / 27.32166;
  const moonDegreeOffset = (moonRotations * 360) % 360;
  const moonIndex = Math.floor(moonDegreeOffset / 30) % 12;
  const moonObj = ZODIAC_SIGNS[moonIndex];

  const planetNames = [
    { name: 'Mặt Trời', symbol: '☉', baseOffset: 0 },
    { name: 'Mặt Trăng', symbol: '☽', baseOffset: 120 },
    { name: 'Sao Thủy', symbol: '☿', baseOffset: 45 },
    { name: 'Sao Kim', symbol: '♀', baseOffset: 95 },
    { name: 'Sao Hỏa', symbol: '♂', baseOffset: 240 },
    { name: 'Sao Mộc', symbol: '♃', baseOffset: 160 },
    { name: 'Sao Thổ', symbol: '♄', baseOffset: 310 },
  ];

  const planets: PlanetPosition[] = planetNames.map((p, idx) => {
    const seed = (year + month * 31 + day * 12 + hour * 5) % 360;
    const currentDeg = (p.baseOffset + seed + idx * 72) % 360;
    const signIdx = Math.floor(currentDeg / 30) % 12;
    const signObj = ZODIAC_SIGNS[signIdx];
    const house = (Math.floor((currentDeg + (12 - ascendantIndex) * 30) / 30) % 12) + 1;

    return {
      name: p.name,
      symbol: p.symbol,
      sign: signObj.name,
      signSymbol: signObj.symbol,
      degree: Math.floor(currentDeg % 30),
      house
    };
  });

  const aspects: HistoricalAspect[] = [];
  planets.forEach((p1, idx1) => {
    planets.forEach((p2, idx2) => {
      if (idx1 >= idx2) return;
      const deg1 = (ZODIAC_SIGNS.findIndex(z => z.name === p1.sign) * 30) + p1.degree;
      const deg2 = (ZODIAC_SIGNS.findIndex(z => z.name === p2.sign) * 30) + p2.degree;
      const diff = Math.abs(deg1 - deg2);
      const angle = Math.min(diff, 360 - diff);

      if (aspects.length >= 6) return;

      if (angle < 8) {
        aspects.push({ planet1: p1.name, planet2: p2.name, type: 'Conjunction', angle: 0, color: aspectColors.Conjunction });
      } else if (Math.abs(angle - 180) < 8) {
        aspects.push({ planet1: p1.name, planet2: p2.name, type: 'Opposition', angle: 180, color: aspectColors.Opposition });
      } else if (Math.abs(angle - 120) < 8) {
        aspects.push({ planet1: p1.name, planet2: p2.name, type: 'Trine', angle: 120, color: aspectColors.Trine });
      } else if (Math.abs(angle - 90) < 8) {
        aspects.push({ planet1: p1.name, planet2: p2.name, type: 'Square', angle: 90, color: aspectColors.Square });
      } else if (Math.abs(angle - 60) < 6) {
        aspects.push({ planet1: p1.name, planet2: p2.name, type: 'Sextile', angle: 60, color: aspectColors.Sextile });
      }
    });
  });

  if (aspects.length === 0) {
    aspects.push({ planet1: 'Mặt Trời', planet2: 'Mặt Trăng', type: 'Trine', angle: 120, color: aspectColors.Trine });
    aspects.push({ planet1: 'Mặt Trời', planet2: 'Sao Thủy', type: 'Conjunction', angle: 0, color: aspectColors.Conjunction });
    aspects.push({ planet1: 'Sao Hỏa', planet2: 'Sao Mộc', type: 'Square', angle: 90, color: aspectColors.Square });
    aspects.push({ planet1: 'Sao Kim', planet2: 'Sao Thổ', type: 'Opposition', angle: 180, color: aspectColors.Opposition });
  }

  return {
    sunSign: sunSignObj.name,
    sunSymbol: sunSignObj.symbol,
    moonSign: moonObj.name,
    moonSymbol: moonObj.symbol,
    ascendant: ascendantObj.name,
    ascendantSymbol: ascendantObj.symbol,
    planets,
    aspects
  };
}
