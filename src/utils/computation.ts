import {
  NumerologyData,
  AstrologyData,
  TuViPalace,
  BattuData,
  HumanDesignData,
  PlanetPosition,
  HistoricalAspect
} from '../types';

// PYTHAGOREAN ALPHABET MAP FOR NUMEROLOGY
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

const ZODIAC_SIGNS = [
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

function removeVietnameseTones(str: string): string {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|ã|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'a');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'e');
  str = str.replace(/Ì|Í|Ị|B|Ĩ/g, 'i');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'o');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'y');
  str = str.replace(/Đ/g, 'd');
  return str.toLowerCase();
}

// 1. CLEAR NUMEROLOGY COMPUTATIONS
export function computeNumerology(name: string, dob: string): NumerologyData {
  const normName = removeVietnameseTones(name).replace(/[^a-z]/g, '');
  const dobDigits = dob.replace(/[^0-9]/g, '').split('').map(Number);

  // Life Path (Con số chủ đạo)
  const totalDob = dobDigits.reduce((acc, curr) => acc + curr, 0);
  const reduceNum = (n: number, keepMaster = true): number => {
    if (keepMaster && (n === 11 || n === 22 || n === 33)) return n;
    if (n < 10) return n;
    const sum = String(n).split('').map(Number).reduce((a, b) => a + b, 0);
    return reduceNum(sum, keepMaster);
  };
  const lifePath = reduceNum(totalDob, true);

  // Destiny Number (Họ tên)
  let nameSum = 0;
  for (const char of normName) {
    if (N_MAP[char]) nameSum += N_MAP[char];
  }
  const destiny = reduceNum(nameSum, true);

  // Soul Urge (Linh hồn)
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  let soulSum = 0;
  for (const char of normName) {
    if (vowels.includes(char)) {
      soulSum += N_MAP[char] || 0;
    }
  }
  const soul = reduceNum(soulSum === 0 ? 9 : soulSum, true);

  // Birth Chart Matrix (1-9 Grid)
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
    birthDigits: dobDigits,
    birthGrid
  };
}

// 2. WESTERN ASTROLOGY COMPUTATION
export function computeAstrology(dob: string, time: string): AstrologyData {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  // SUN SIGN
  let sunSignObj = ZODIAC_SIGNS[11]; // default Pisces
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

  // ASCENDANT APPROXIMATION
  // The sun rises around 6:00 AM on average. At sunrise, Ascendant is closest to Sun Sign.
  // Every 2 hours, the alignment moves forward by 1 zodiac sign (30 degrees).
  const hoursSinceSunrise = (hour + minute / 60 - 6 + 24) % 24;
  const ascendantOffset = Math.floor(hoursSinceSunrise / 2);
  const ascendantIndex = (sunSignIndex + ascendantOffset) % 12;
  const ascendantObj = ZODIAC_SIGNS[ascendantIndex];

  // MOON SIGN APPROXIMATION
  // Moon travels around the entire zodiac once every 27.32 days (approx 13 degrees per day).
  // We can anchor from a standard seed date.
  const anchorTime = new Date('1970-01-01').getTime();
  const birthTimeMs = new Date(`${dob}T${time}:00`).getTime();
  const daysDiff = (birthTimeMs - anchorTime) / (1000 * 60 * 60 * 24);
  const moonRotations = daysDiff / 27.32166;
  const moonDegreeOffset = (moonRotations * 360) % 360;
  const moonIndex = Math.floor(moonDegreeOffset / 30) % 12;
  const moonObj = ZODIAC_SIGNS[moonIndex];

  // Generate 7 Planetary Positions (beautiful placement degrees inside the zodiac coordinates)
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
    // Distribute planets mathematically based on seed parameters
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

  // Aspects creation (Lines drawn at the core)
  const aspects: HistoricalAspect[] = [];
  const aspectColors = {
    Conjunction: '#EAB308', // Yellow (energy overlay)
    Opposition: '#EF4444',  // Red (stress friction)
    Trine: '#10B981',       // Green (harmony fluid)
    Square: '#F97316',      // Orange (dynamic action)
    Sextile: '#3B82F6',     // Blue (opportunity)
  };

  // Connect planetary pairs logically to render 5 amazing aspect indicators
  planets.forEach((p1, idx1) => {
    planets.forEach((p2, idx2) => {
      if (idx1 >= idx2) return;
      const deg1 = (ZODIAC_SIGNS.findIndex(z => z.name === p1.sign) * 30) + p1.degree;
      const deg2 = (ZODIAC_SIGNS.findIndex(z => z.name === p2.sign) * 30) + p2.degree;
      const diff = Math.abs(deg1 - deg2);
      const angle = Math.min(diff, 360 - diff);

      if (aspects.length >= 6) return; // Limit to maintain a clean display panel

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

  // Keep a minimum subset of aspects for beautiful drawing
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

// 3. TỬ VI ALGORITHM (AESTHETIC VIETNAMESE 12-PALACE GRID)
const PALACE_NAMES = [
  'Mệnh (Bản Thân)',
  'Phụ Mẫu (Cha Mẹ)',
  'Phúc Đức (Gia Tiên)',
  'Điền Trạch (Đất Đai)',
  'Quan Lộc (Sự Nghiệp)',
  'Nô Bộc (Bạn Bè)',
  'Thiên Di (Đi Xa)',
  'Tật Ách (Sức Khỏe)',
  'Tài Bạch (Tiền Tệ)',
  'Tử Tức (Con Cái)',
  'Phu Thê (Tình Duyên)',
  'Huynh Đệ (Anh Chị Em)'
];

const EARTHLY_BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
const HEAVENLY_STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];

const MAJOR_STAR_COLLECTIONS = [
  ['Tử Vi', 'Thái Dương', 'Thái Âm'],
  ['Thiên Phủ', 'Vũ Khúc', 'Liêm Trinh'],
  ['Thiên Đồng', 'Cự Môn', 'Thiên Cơ'],
  ['Thất Sát', 'Phá Quân', 'Tham Lang', 'Thiên Tướng']
];

const MINOR_STAR_COLLECTIONS = [
  'Văn Xương', 'Văn Khúc', 'Tả Phù', 'Hữu Bật', 'Thiên Khôi', 'Thiên Việt',
  'Hóa Lộc', 'Hóa Quyền', 'Hóa Khoa', 'Hóa Kỵ', 'Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh'
];

export function computeTuVi(dob: string, time: string, gender: 'Nam' | 'Nữ'): TuViPalace[] {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour, min] = time.split(':').map(Number);

  // Deterministic starting index of palace "Mệnh"
  // Traditional formula is based on Month and Hour
  const hourIdx = Math.floor((hour + 1) / 2) % 12; // convert 0-23 to 0-11 (Tý to Hợi)
  const startMệnhIdx = (12 + (month - 1) - hourIdx) % 12; 

  const palaces: TuViPalace[] = [];

  for (let i = 0; i < 12; i++) {
    // Outer frame cells index (0-11 in circular map)
    const cellBranchIdx = i; // Map circular
    const branchName = EARTHLY_BRANCHES[cellBranchIdx];

    // Find which palace goes to this cell branch
    const palaceNameOffset = (cellBranchIdx - startMệnhIdx + 12) % 12;
    const palaceName = PALACE_NAMES[palaceNameOffset];

    // Distribute stars dynamically depending on placement offsets
    const majorStarSet = MAJOR_STAR_COLLECTIONS[(cellBranchIdx + year) % 4];
    const minorStarsNum = 2 + (day % 3);
    const minorStars: string[] = [];
    for (let s = 0; s < minorStarsNum; s++) {
      const idx = (day + hourIdx + i * 3 + s) % MINOR_STAR_COLLECTIONS.length;
      const sName = MINOR_STAR_COLLECTIONS[idx];
      if (!minorStars.includes(sName)) {
        minorStars.push(sName);
      }
    }

    // Five elements of the palace
    const elements = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    const pElement = elements[(cellBranchIdx + month) % 5];

    palaces.push({
      index: cellBranchIdx,
      name: palaceName,
      branch: branchName,
      majorStars: majorStarSet,
      minorStars,
      element: pElement
    });
  }

  return palaces;
}

// 4. BÁT TỰ & FIVE ELEMENTS ESTIMATION
export function computeBattu(dob: string, time: string): BattuData {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  // Select stems & branches based on checksum cycles
  const yStem = HEAVENLY_STEMS[(year - 4) % 10];
  const yBranch = EARTHLY_BRANCHES[(year - 4) % 12];

  const mStem = HEAVENLY_STEMS[(month + year) % 10];
  const mBranch = EARTHLY_BRANCHES[(month + 2) % 12];

  const dStem = HEAVENLY_STEMS[(day + month * 7 + year) % 10];
  const dBranch = EARTHLY_BRANCHES[(day * 3 + month * 5) % 12];

  const hIdx = Math.floor((hour + 1) / 2) % 12;
  const hBranch = EARTHLY_BRANCHES[hIdx];
  const hStem = HEAVENLY_STEMS[(hIdx + day) % 10];

  const dayMaster = dStem;

  // Calculate five elements percentage based on the season of birth
  let elementsPercentage = { Kim: 20, Mộc: 20, Thủy: 20, Hỏa: 20, Thổ: 20 };
  
  if (month >= 3 && month <= 5) {
    // Spring - Wood (Mộc) dominant
    elementsPercentage = { Mộc: 38, Hỏa: 22, Thổ: 14, Kim: 12, Thủy: 14 };
  } else if (month >= 6 && month <= 8) {
    // Summer - Fire (Hỏa) dominant
    elementsPercentage = { Mộc: 12, Hỏa: 40, Thổ: 22, Kim: 10, Thủy: 16 };
  } else if (month >= 9 && month <= 11) {
    // Autumn - Metal (Kim) dominant
    elementsPercentage = { Mộc: 14, Hỏa: 10, Thổ: 18, Kim: 38, Thủy: 20 };
  } else {
    // Winter - Water (Thủy) dominant
    elementsPercentage = { Mộc: 20, Hỏa: 12, Thổ: 12, Kim: 16, Thủy: 40 };
  }

  return {
    pillars: {
      year: `${yStem} ${yBranch}`,
      month: `${mStem} ${mBranch}`,
      day: `${dStem} ${dBranch}`,
      hour: `${hStem} ${hBranch}`
    },
    elementsPercentage,
    dayMaster
  };
}

// 5. HUMAN DESIGN BODYGRAPH ESTIMATION
export function computeHumanDesign(dob: string, time: string): HumanDesignData {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour, min] = time.split(':').map(Number);

  const seed = (year * 13 + month * 7 + day * 3 + hour * 9) % 100;

  // 1. Determine Type
  const types = ['Generator', 'Manifesting Generator', 'Projector', 'Manifestor', 'Reflector'];
  // Keep standard Generator & Manifesting Generator dominant (as in real world populations)
  let type = types[0]; // Generator
  if (seed < 35) type = 'Generator';
  else if (seed < 68) type = 'Manifesting Generator';
  else if (seed < 85) type = 'Projector';
  else if (seed < 95) type = 'Manifestor';
  else type = 'Reflector';

  // 2. Determine Profile
  const profiles = ['1/3 (Nhà Điều Tra / Người Trực Nghiệm)', '2/4 (Kẻ Ẩn Dật / Cơ Hội)', '3/5 (Kẻ Phiêu Lưu / Hướng Dẫn)', '4/6 (Cơ Hội / Hình Mẫu)', '5/1 (Người Hướng Dẫn / Nhà Điều Tra)', '6/2 (Hình Mẫu / Kẻ Ẩn Dật)'];
  const profile = profiles[seed % 6];

  // 3. Determine Strategy
  let strategy = 'Chờ đợi cơ hội để Phản hồi (To Respond)';
  if (type === 'Generator' || type === 'Manifesting Generator') {
    strategy = 'Chờ đợi để Phản hồi (To Respond)';
  } else if (type === 'Projector') {
    strategy = 'Chờ đợi lời Mời gọi (Wait for the Invitation)';
  } else if (type === 'Manifestor') {
    strategy = 'Thông báo và Hành động (Inform and Initiate)';
  } else {
    strategy = 'Chờ đợi trọn vẹn 1 chu kỳ Mặt Trăng 28.5 ngày (Wait a Lunar Cycle)';
  }

  // 4. Determine Authority
  let authority = 'Sacral (Xương chậu / Trực giác Tức thời)';
  if (type === 'Reflector') {
    authority = 'Mặt Trăng (Lunar Cycle / Không có quyền nội tại)';
  } else if (seed % 3 === 0) {
    authority = 'Emotional (Cảm xúc Linh cảm)';
  } else if (seed % 3 === 1) {
    authority = 'Splenic (Lá lách / Trực giác Sát sườn)';
  } else if (type === 'Projector' && seed % 3 === 2) {
    authority = 'Self-Projected (Bản thân truyền giọng)';
  }

  // 5. Build 9 centers
  // Head, Ajna, Throat, G-Center, Heart, Sacral, Root, Spleen, Solar Plexus
  const centerConfig = [
    { id: 'head', name: 'Trí Huệ (Head/Crown)', type: 'Head', color: '#A855F7' },
    { id: 'ajna', name: 'Nhận Thức (Ajna)', type: 'Ajna', color: '#3B82F6' },
    { id: 'throat', name: 'Biểu Đạt (Throat)', type: 'Throat', color: '#06B6D4' },
    { id: 'g_center', name: 'Bản Ngã (G-Center/Self)', type: 'G-Center', color: '#10B981' },
    { id: 'heart', name: 'Ý Chí (Heart/Ego)', type: 'Heart', color: '#EAB308' },
    { id: 'sacral', name: 'Xương Chậu (Sacral)', type: 'Sacral', color: '#F97316' },
    { id: 'root', name: 'Nền Móng (Root)', type: 'Root', color: '#EF4444' },
    { id: 'spleen', name: 'Bảo Vệ (Spleen)', type: 'Spleen', color: '#EC4899' },
    { id: 'solar_plexus', name: 'Cảm Xúc (Solar Plexus)', type: 'Solar Plexus', color: '#6366F1' },
  ];

  const centers = centerConfig.map((c, i) => {
    // Reflectors have all centers undefined
    const defined = type === 'Reflector' ? false : ((seed + i * 11) % 5 >= 2);
    return {
      ...c,
      defined
    };
  });

  return {
    type,
    profile,
    strategy,
    authority,
    centers
  };
}
