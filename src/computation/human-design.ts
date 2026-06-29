import { Engine } from 'caelus';
import { embeddedData } from 'caelus/data-embedded';
import { HumanDesignData, HumanDesignCenter } from '../types';

export const CENTER_CONFIG = [
  { id: 'head', name: 'Trung Tâm Đầu (Head)', type: 'Head', color: '#A855F7' },
  { id: 'ajna', name: 'Trung Tâm Ajna (Mind)', type: 'Ajna', color: '#3B82F6' },
  { id: 'throat', name: 'Trung Tâm Cổ Họng (Throat)', type: 'Throat', color: '#06B6D4' },
  { id: 'g_center', name: 'Trung Tâm Bản Ngã (G)', type: 'G-Center', color: '#10B981' },
  { id: 'heart', name: 'Trung Tâm Tim (Ego)', type: 'Heart', color: '#EAB308' },
  { id: 'sacral', name: 'Trung Tâm Xương Cùng (Sacral)', type: 'Sacral', color: '#F97316' },
  { id: 'root', name: 'Trung Tâm Gốc (Root)', type: 'Root', color: '#EF4444' },
  { id: 'spleen', name: 'Trung Tâm Lách (Spleen)', type: 'Spleen', color: '#EC4899' },
  { id: 'solar_plexus', name: 'Trung Tâm Đám Rối (Solar Plexus)', type: 'Solar Plexus', color: '#6366F1' },
];

// Rave Mandala gate sequence (ecliptic order, 0° = gate 41)
const GATES = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3,
  27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
  31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50,
  28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60,
];

const GATE_TO_CENTER: Record<number, string> = {
  61: 'head', 63: 'head', 64: 'head',
  4: 'ajna', 11: 'ajna', 17: 'ajna', 24: 'ajna', 43: 'ajna', 47: 'ajna',
  8: 'throat', 12: 'throat', 16: 'throat', 20: 'throat', 23: 'throat',
  31: 'throat', 33: 'throat', 35: 'throat', 45: 'throat', 56: 'throat', 62: 'throat',
  1: 'g_center', 2: 'g_center', 7: 'g_center', 10: 'g_center', 13: 'g_center',
  15: 'g_center', 25: 'g_center', 46: 'g_center',
  21: 'heart', 26: 'heart', 40: 'heart', 51: 'heart',
  18: 'spleen', 28: 'spleen', 32: 'spleen', 44: 'spleen', 48: 'spleen', 50: 'spleen', 57: 'spleen',
  3: 'sacral', 5: 'sacral', 9: 'sacral', 14: 'sacral', 27: 'sacral', 29: 'sacral', 34: 'sacral', 42: 'sacral', 59: 'sacral',
  6: 'solar_plexus', 22: 'solar_plexus', 30: 'solar_plexus', 36: 'solar_plexus',
  37: 'solar_plexus', 49: 'solar_plexus', 55: 'solar_plexus',
  38: 'root', 39: 'root', 41: 'root', 52: 'root', 53: 'root', 54: 'root', 58: 'root', 60: 'root',
};

// Channels: pairs of gates that form a connection
const CHANNELS: [number, number][] = [
  [1, 8], [2, 14], [3, 60], [4, 63], [5, 15], [6, 59], [7, 31], [9, 52],
  [10, 20], [11, 56], [12, 22], [13, 33], [16, 48], [17, 62], [18, 58],
  [19, 49], [20, 34], [20, 57], [21, 45], [23, 43], [24, 61], [25, 51],
  [26, 44], [27, 50], [28, 38], [29, 46], [30, 41], [32, 54], [35, 36],
  [37, 40], [39, 55], [42, 53], [47, 64],
];

const WHEEL_OFFSET = 58;

function lonToGateOnly(lon: number): number {
  return GATES[Math.floor(((lon + WHEEL_OFFSET) % 360) / 5.625) % 64];
}

function lineOf(lon: number): number {
  return Math.floor(((lon + WHEEL_OFFSET) % 360) % 5.625 / 0.9375) + 1;
}

const MOTORS = ['heart', 'sacral', 'solar_plexus', 'root'];

const BODIES_FOR_GATES = ['sun', 'earth', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

const PROFILE_NAMES: Record<string, string> = {
  '1/3': '1/3 (Nhà Điều Tra / Nhà Thực Nghiệm)', '1/4': '1/4 (Nhà Điều Tra / Nhà Cơ Hội)',
  '2/4': '2/4 (Ẩn Dật / Cơ Hội)', '2/5': '2/5 (Ẩn Dật / Dị Chủng)',
  '3/5': '3/5 (Thực Nghiệm / Dị Chủng)', '3/6': '3/6 (Thực Nghiệm / Hình Mẫu)',
  '4/1': '4/1 (Cơ Hội / Nhà Điều Tra)', '4/6': '4/6 (Cơ Hội / Hình Mẫu)',
  '5/1': '5/1 (Dị Chủng / Nhà Điều Tra)', '5/2': '5/2 (Dị Chủng / Ẩn Dật)',
  '6/2': '6/2 (Hình Mẫu / Ẩn Dật)', '6/3': '6/3 (Hình Mẫu / Thực Nghiệm)',
};

function profileKey(a: number, b: number): string {
  const k = `${a}/${b}`;
  return PROFILE_NAMES[k] || k;
}

let engine: Engine | null = null;
function getEngine(): Engine {
  if (!engine) engine = new Engine(embeddedData);
  return engine;
}

export function computeHumanDesign(dob: string, time: string): HumanDesignData {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour] = time.split(':').map(Number);

  const utc = new Date(Date.UTC(year, month - 1, day, hour - 7, 0, 0));
  const e = getEngine();

  const jdUt = (jd(utc.getUTCFullYear(), utc.getUTCMonth() + 1, utc.getUTCDate(),
    utc.getUTCHours(), utc.getUTCMinutes(), 0));

  // Personality chart — birth moment
  const persLons: Record<string, number> = {};
  for (const id of BODIES_FOR_GATES) {
    persLons[id] = e.longitude(id as any, jdUt);
  }

  // Design chart — 88° solar arc before birth
  const birthSunLon = persLons['sun'];
  const targetLon = (birthSunLon - 88 + 360) % 360;
  let lo = jdUt - 95, hi = jdUt - 80;
  for (let iter = 0; iter < 50; iter++) {
    const mid = (lo + hi) / 2;
    const pos = e.longitude('sun' as any, mid);
    if (pos >= targetLon) hi = mid; else lo = mid;
  }
  const designJD = (lo + hi) / 2;

  const desLons: Record<string, number> = {};
  for (const id of BODIES_FOR_GATES) {
    desLons[id] = e.longitude(id as any, designJD);
  }

  // Map longitudes to gates
  const activeGates = new Set<number>();
  for (const id of BODIES_FOR_GATES) {
    activeGates.add(lonToGateOnly(persLons[id]));
    activeGates.add(lonToGateOnly(desLons[id]));
  }

  // Detect defined channels and centers
  const channelSet = new Set<string>();
  const centerGateCount: Record<string, number> = {};
  for (const g of activeGates) {
    const c = GATE_TO_CENTER[g];
    if (c) centerGateCount[c] = (centerGateCount[c] || 0) + 1;
  }
  const definedChannels: string[] = [];
  for (const [a, b] of CHANNELS) {
    if (activeGates.has(a) && activeGates.has(b)) {
      definedChannels.push(`${a}-${b}`);
      const ca = GATE_TO_CENTER[a];
      const cb = GATE_TO_CENTER[b];
      if (ca) channelSet.add(ca);
      if (cb) channelSet.add(cb);
    }
  }

  // Centers
  const centers: HumanDesignCenter[] = CENTER_CONFIG.map(c => ({
    ...c,
    defined: channelSet.has(c.id),
  }));

  // Type
  const hasSacral = channelSet.has('sacral');
  const motorToThroat = ['heart', 'sacral', 'solar_plexus', 'root'].some(
    m => channelSet.has(m) && channelSet.has('throat')
  );
  const definedCount = centers.filter(c => c.defined).length;

  let type: string;
  if (definedCount === 0) type = 'Reflector';
  else if (hasSacral && motorToThroat) type = 'Manifesting Generator';
  else if (hasSacral) type = 'Generator';
  else if (motorToThroat) type = 'Manifestor';
  else type = 'Projector';

  // Authority
  let authority: string;
  const sp = channelSet.has('solar_plexus');
  const sac = channelSet.has('sacral');
  const spl = channelSet.has('spleen');
  if (sp) authority = 'Emotional (Cảm xúc Linh cảm)';
  else if (sac) authority = 'Sacral (Xương cùng / Trực giác)';
  else if (spl) authority = 'Splenic (Lá lách / Trực giác nhạy bén)';
  else if (channelSet.has('heart')) authority = 'Ego (Ý chí / Bản ngã)';
  else if (type === 'Reflector') authority = 'Mặt Trăng (Lunar Cycle)';
  else authority = 'Mental / Self-Projected (Lý trí / Tự phản chiếu)';

  // Strategy
  const strategies: Record<string, string> = {
    Generator: 'Chờ đợi để Phản hồi (To Respond)',
    'Manifesting Generator': 'Phản hồi + Thông báo (Respond + Inform)',
    Manifestor: 'Thông báo và Hành động (Inform and Initiate)',
    Projector: 'Chờ đợi lời Mời gọi (Wait for the Invitation)',
    Reflector: 'Chờ đợi 28 ngày chu kỳ Mặt Trăng (Wait a Lunar Cycle)',
  };
  const strategy = strategies[type] || '';

  // Profile
  const pGate = lonToGateOnly(persLons['sun']);
  const dGate = lonToGateOnly(desLons['sun']);
  const pLine = lineOf(persLons['sun']);
  const dLine = lineOf(desLons['sun']);
  const profile = profileKey(pLine, dLine);

  return {
    type,
    profile,
    strategy,
    authority,
    centers,
    activeGates: Array.from(activeGates).sort((a, b) => a - b),
    definedChannels,
  };
}

function jd(y: number, m: number, d: number, h: number, mi: number, s: number): number {
  const date = new Date(Date.UTC(y, m - 1, d, h, mi, s));
  const ut = date.getTime() / 86400000 + 2440587.5;
  return ut;
}
