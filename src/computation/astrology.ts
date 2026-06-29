import { Engine } from 'caelus';
import type { Body } from 'caelus';
import { embeddedData } from 'caelus/data-embedded';
import { AstrologyData, PlanetPosition, HistoricalAspect } from '../types';

const COLORS: Record<string, string> = {
  conjunction: '#EAB308', opposition: '#EF4444', trine: '#10B981',
  square: '#F97316', sextile: '#3B82F6',
};

const BODY_META: Record<string, { name: string; symbol: string }> = {
  sun: { name: 'Mặt Trời', symbol: '☉' },
  moon: { name: 'Mặt Trăng', symbol: '☽' },
  mercury: { name: 'Sao Thủy', symbol: '☿' },
  venus: { name: 'Sao Kim', symbol: '♀' },
  mars: { name: 'Sao Hỏa', symbol: '♂' },
  jupiter: { name: 'Sao Mộc', symbol: '♃' },
  saturn: { name: 'Sao Thổ', symbol: '♄' },
  uranus: { name: 'Sao Thiên Vương', symbol: '♅' },
  neptune: { name: 'Sao Hải Vương', symbol: '♆' },
  pluto: { name: 'Sao Diêm Vương', symbol: '♇' },
};

const BODIES: Body[] = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

const EN_SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

const VI_SIGNS = ['Bạch Dương', 'Kim Ngưu', 'Song Tử', 'Cự Giải', 'Sư Tử', 'Xử Nữ', 'Thiên Bình', 'Thiên Yết', 'Nhân Mã', 'Ma Kết', 'Bảo Bình', 'Song Ngư'];

const SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

const ASPECT_MAP: Record<string, string> = {
  conjunction: 'Conjunction', opposition: 'Opposition', trine: 'Trine',
  square: 'Square', sextile: 'Sextile',
};

let engine: Engine | null = null;

function getEngine(): Engine {
  if (!engine) engine = new Engine(embeddedData);
  return engine;
}

function sIdx(sign: string): number {
  const i = EN_SIGNS.indexOf(sign);
  return i >= 0 ? i : 0;
}

export function computeAstrology(
  dob: string, time: string,
  lat = 21.0285, lonEast = 105.8542,
): AstrologyData {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  // Convert local (Vietnam UTC+7) to UT
  const utc = new Date(Date.UTC(year, month - 1, day, hour - 7, minute, 0));
  const chart = getEngine().chart(
    utc.getUTCFullYear(), utc.getUTCMonth() + 1, utc.getUTCDate(),
    utc.getUTCHours(), utc.getUTCMinutes(), 0,
    lat, lonEast, { houseSystem: 'placidus' },
  );

  const bodies = chart.bodies;
  const planets: PlanetPosition[] = [];
  for (const id of BODIES) {
    const b = bodies[id];
    if (!b) continue;
    const meta = BODY_META[id] || { name: id, symbol: '' };
    planets.push({
      name: meta.name,
      symbol: meta.symbol,
      sign: VI_SIGNS[sIdx(b.sign)],
      signSymbol: SYMBOLS[sIdx(b.sign)],
      degree: Math.floor(b.signDeg),
      house: b.house,
      retrograde: b.retrograde,
    });
  }

  const aspects: HistoricalAspect[] = [];
  for (const asp of chart.aspects) {
    const n1 = BODY_META[asp.a]?.name || asp.a;
    const n2 = BODY_META[asp.b]?.name || asp.b;
    const t = ASPECT_MAP[asp.aspect];
    if (!t) continue;
    aspects.push({
      planet1: n1,
      planet2: n2,
      type: t as HistoricalAspect['type'],
      angle: Math.round(asp.orb >= 0 ? 0 : 0),
      color: COLORS[asp.aspect] || '#AAA',
    });
  }

  const sunSign = VI_SIGNS[sIdx(bodies.sun.sign)];
  const moonBody = bodies.moon;
  const moonSign = moonBody ? VI_SIGNS[sIdx(moonBody.sign)] : sunSign;
  const ascSign = VI_SIGNS[Math.floor(chart.angles.asc / 30) % 12];

  aspects.forEach((a, i) => {
    const p1 = planets.find(p => p.name === a.planet1);
    const p2 = planets.find(p => p.name === a.planet2);
    if (!p1 || !p2) return;
    const deg1 = sIdx(p1.sign) * 30 + p1.degree;
    const deg2 = sIdx(p2.sign) * 30 + p2.degree;
    const diff = Math.abs(deg1 - deg2);
    const angle = Math.min(diff, 360 - diff);
    aspects[i] = { ...a, angle };
  });

  return {
    sunSign: sunSign,
    sunSymbol: SYMBOLS[sIdx(bodies.sun.sign)],
    moonSign: moonSign,
    moonSymbol: moonBody ? SYMBOLS[sIdx(moonBody.sign)] : '',
    ascendant: ascSign,
    ascendantSymbol: SYMBOLS[Math.floor(chart.angles.asc / 30) % 12],
    planets,
    aspects,
  };
}
