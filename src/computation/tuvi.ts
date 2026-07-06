import { Solar, EightChar } from 'lunar-typescript';
import { TuViPalace } from '../types';
import { getUtcOffset } from './shared';

export const PALACE_NAMES = [
  'Mệnh (Bản Thân)', 'Phụ Mẫu (Cha Mẹ)', 'Phúc Đức (Gia Tiên)',
  'Điền Trạch (Đất Đai)', 'Quan Lộc (Sự Nghiệp)', 'Nô Bộc (Bạn Bè)',
  'Thiên Di (Đi Xa)', 'Tật Ách (Sức Khỏe)', 'Tài Bạch (Tiền Tệ)',
  'Tử Tức (Con Cái)', 'Phu Thê (Tình Duyên)', 'Huynh Đệ (Anh Chị Em)',
];

export const EARTHLY_BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
export const HEAVENLY_STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];

const STEMS_CN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES_CN = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const DƯƠNG_STEMS = new Set(['Giáp', 'Bính', 'Mậu', 'Canh', 'Nhâm']);
const ÂM_STEMS = new Set(['Ất', 'Đinh', 'Kỷ', 'Tân', 'Quý']);

const CUC_ELEMENTS: Record<number, string> = { 2: 'Thủy', 3: 'Mộc', 4: 'Kim', 5: 'Thổ', 6: 'Hỏa' };

// 14 Chính Tinh — Tử Vi system (counterclockwise from Tử Vi)
const TUVI_STARS: [string, number][] = [
  ['Tử Vi', 0], ['Thiên Cơ', -1], ['Thái Dương', -3], ['Vũ Khúc', -4],
  ['Thiên Đồng', -5], ['Liêm Trinh', -8],
];
// Thiên Phủ system (clockwise from Thiên Phủ)
const THIENPHU_STARS: [string, number][] = [
  ['Thiên Phủ', 0], ['Thái Âm', 1], ['Tham Lang', 2], ['Cự Môn', 3],
  ['Thiên Tướng', 4], ['Thiên Lương', 5], ['Thất Sát', 6], ['Phá Quân', 10],
];

// Tứ Hóa: year stem → [Lộc, Quyền, Khoa, Kỵ]
const TU_HOA: Record<string, [string, string, string, string]> = {
  'Giáp': ['Liêm Trinh', 'Phá Quân', 'Vũ Khúc', 'Thái Dương'],
  'Ất': ['Thiên Cơ', 'Thiên Lương', 'Tử Vi', 'Thái Âm'],
  'Bính': ['Thiên Đồng', 'Thiên Cơ', 'Văn Xương', 'Liêm Trinh'],
  'Đinh': ['Thái Âm', 'Thiên Đồng', 'Thiên Cơ', 'Cự Môn'],
  'Mậu': ['Tham Lang', 'Thái Âm', 'Hữu Bật', 'Thiên Cơ'],
  'Kỷ': ['Vũ Khúc', 'Tham Lang', 'Thiên Lương', 'Văn Khúc'],
  'Canh': ['Thái Dương', 'Vũ Khúc', 'Thái Âm', 'Thiên Đồng'],
  'Tân': ['Cự Môn', 'Thái Dương', 'Văn Khúc', 'Văn Xương'],
  'Nhâm': ['Thiên Lương', 'Tử Vi', 'Tả Phụ', 'Vũ Khúc'],
  'Quý': ['Phá Quân', 'Cự Môn', 'Thái Âm', 'Tham Lang'],
};

// Tràng Sinh 12 sao
const TRANG_SINH_STARS = ['Tràng Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy', 'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng'];

// Bác Sĩ 12 sao (Dương year → clockwise, Âm year → counter-clockwise, always start at Dần)
const BAC_SI_STARS = ['Bác Sĩ', 'Lực Sĩ', 'Thanh Long', 'Tiểu Hao', 'Tướng Quân', 'Tấu Thư', 'Phi Liêm', 'Hỷ Thần', 'Bệnh Phù', 'Đại Hao', 'Phục Binh', 'Quan Phủ'];

// Thái Tuế 12 sao (offset from year branch, counterclockwise)
const THAI_TUE_STARS: [string, number][] = [
  ['Thái Tuế', 0], ['Thiếu Dương', -1], ['Tang Môn', -2], ['Thái Âm', -3],
  ['Quan Phù', -4], ['Tử Phù', -5], ['Tuế Phá', 6], ['Long Đức', 7],
  ['Bạch Hổ', 8], ['Phúc Đức', 9], ['Điếu Khách', 10], ['Quốc Ấn', 11],
];

// Ngũ Hổ Độn: year stem → stem index at Dần
const NGU_HO_DON: Record<string, number> = {
  'Giáp': 2, 'Kỷ': 2,
  'Ất': 4, 'Canh': 4,
  'Bính': 6, 'Tân': 6,
  'Đinh': 8, 'Nhâm': 8,
  'Mậu': 0, 'Quý': 0,
};

function naYinToCuc(naYin: string): number {
  const last = naYin.charAt(naYin.length - 1);
  if (last === '金') return 4;
  if (last === '木') return 3;
  if (last === '水') return 2;
  if (last === '火') return 6;
  if (last === '土') return 5;
  return 4;
}

function findTuViPosition(lunarDay: number, cuc: number): number {
  let a = 0;
  while (a <= 5 && (lunarDay + a) % cuc !== 0) a++;
  const q = (lunarDay + a) / cuc;
  let base = (2 + q - 1) % 12;
  if (a === 0) return base;
  if (a % 2 === 1) return (base - a + 12) % 12;
  return (base + a) % 12;
}

function trangSinhStart(cuc: number): number {
  // cuc → element type → starting branch for Tràng Sinh (clockwise)
  if (cuc === 4) return 5;  // Kim → Tỵ
  if (cuc === 3) return 11; // Mộc → Hợi
  if (cuc === 2) return 8;  // Thủy → Thân
  return 2;                  // Hỏa(6)/Thổ(5) → Dần
}

export function computeTuVi(dob: string, time: string, gender: 'Nam' | 'Nữ', timezone = 'Asia/Ho_Chi_Minh'): TuViPalace[] {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour] = time.split(':').map(Number);

  // Convert local time → UTC → UTC+7 (Vietnamese reference for lunar calendar)
  const localOffset = getUtcOffset(year, month, day, hour, timezone);
  const utcMs = Date.UTC(year, month - 1, day, hour - localOffset, 0, 0);
  const refDate = new Date(utcMs + 7 * 3600000);
  const refYear = refDate.getUTCFullYear();
  const refMonth = refDate.getUTCMonth() + 1;
  const refDay = refDate.getUTCDate();
  const refHour = refDate.getUTCHours();

  // Tý hour: 23:00-23:59 is Late Tý → belongs to next solar day
  const adjustedHour = refHour === 23 ? -1 : refHour;
  const useDay = refHour === 23 ? refDay + 1 : refDay;
  const solar = Solar.fromYmdHms(refYear, refMonth, useDay, adjustedHour < 0 ? 0 : adjustedHour, 0, 0);
  const lunar = solar.getLunar();
  const ec = EightChar.fromLunar(lunar);

  const lMonth = lunar.getMonth();
  const lDay = lunar.getDay();
  const hourIdx = Math.floor((adjustedHour + 1) / 2) % 12;

  // Mệnh cung from EightChar
  const mingGongStr = ec.getMingGong();
  const mingBranchCn = mingGongStr.charAt(1);
  const mingBranchIdx = BRANCHES_CN.indexOf(mingBranchCn);

  // Thân cung: from Dần, count forward by hour branch index
  // Thân branch = (Dần index (2) + hourIdx) % 12
  const bodyBranchIdx = (2 + hourIdx) % 12;

  // Ngũ Hành Cục
  const mingNaYin = ec.getMingGongNaYin();
  const cuc = naYinToCuc(mingNaYin);

  // Tử Vi position
  const tuViPos = findTuViPosition(lDay, cuc);
  const thienPhuPos = (10 - tuViPos + 12) % 12;

  // Place 14 major stars
  const majorStars: string[][] = Array.from({ length: 12 }, () => []);
  for (const [name, offset] of TUVI_STARS) {
    majorStars[(tuViPos + offset + 12) % 12].push(name);
  }
  for (const [name, offset] of THIENPHU_STARS) {
    majorStars[(thienPhuPos + offset) % 12].push(name);
  }

  // Tứ Hóa
  const yearStem = HEAVENLY_STEMS[lunar.getYearGanIndex()];
  const yearBranch = EARTHLY_BRANCHES[lunar.getYearZhiIndex()];
  const hoa = TU_HOA[yearStem];
  const hoaStars: string[] = [];
  if (hoa) {
    const [loc, quyen, khoa, ky] = hoa;
    hoaStars.push(`${loc} (Hóa Lộc)`, `${quyen} (Hóa Quyền)`, `${khoa} (Hóa Khoa)`, `${ky} (Hóa Kỵ)`);
    for (const star of [loc, quyen, khoa, ky]) {
      for (const arr of majorStars) {
        const idx = arr.indexOf(star);
        if (idx >= 0) {
          const label = star === loc ? 'Hóa Lộc' : star === quyen ? 'Hóa Quyền' : star === khoa ? 'Hóa Khoa' : 'Hóa Kỵ';
          arr[idx] = `${star} (${label})`;
        }
      }
    }
  }

  // Ngũ Hổ Độn — assign stem to each palace
  const dJStem = NGU_HO_DON[yearStem] ?? 2;
  const palaceStems: string[] = [];
  for (let i = 0; i < 12; i++) {
    const stemIdx = (dJStem + (i - 2 + 12) % 12) % 10;
    palaceStems.push(HEAVENLY_STEMS[stemIdx]);
  }

  // Tràng Sinh 12 sao
  const tsStart = trangSinhStart(cuc);
  const trangSinhByBranch: string[][] = Array.from({ length: 12 }, () => []);
  for (let i = 0; i < 12; i++) {
    const branchIdx = (tsStart + i) % 12;
    trangSinhByBranch[branchIdx].push(TRANG_SINH_STARS[i]);
  }

  // Thái Tuế 12 sao
  const yearBranchIdx = lunar.getYearZhiIndex();
  const thaiTueByBranch: string[][] = Array.from({ length: 12 }, () => []);
  for (const [name, offset] of THAI_TUE_STARS) {
    const idx = (yearBranchIdx + offset + 12) % 12;
    thaiTueByBranch[idx].push(name);
  }

  // Bác Sĩ 12 sao (Dương → clockwise, Âm → counter-clockwise, start at Dần)
  const _isDuong = DƯƠNG_STEMS.has(yearStem);
  const bacSiByBranch: string[][] = Array.from({ length: 12 }, () => []);
  const bacSiDir = _isDuong ? 1 : -1;
  for (let i = 0; i < 12; i++) {
    const idx = (2 + i * bacSiDir + 12) % 12;
    bacSiByBranch[idx].push(BAC_SI_STARS[i]);
  }

  // Đại Vận
  const thuan = (_isDuong && gender === 'Nam') || (!_isDuong && gender === 'Nữ');
  const daiVanDir = thuan ? 1 : -1;
  const daiVanStartAge = cuc;

  // Build 12 palaces
  const palaces: TuViPalace[] = [];
  for (let i = 0; i < 12; i++) {
    const palaceNameOffset = (i - mingBranchIdx + 12) % 12;
    const pName = PALACE_NAMES[palaceNameOffset];

    // Phụ Tinh: Tràng Sinh + Thái Tuế + Bác Sĩ (merged, deduped)
    const phuTinh = [...new Set([...trangSinhByBranch[i], ...thaiTueByBranch[i], ...bacSiByBranch[i]])];

    // Đại Vận for this palace
    let daiVan: { age: number; yearStart: number; yearEnd: number } | null = null;
    {
      const offset = thuan ? (i - mingBranchIdx + 12) % 12 : (mingBranchIdx - i + 12) % 12;
      const age = daiVanStartAge + offset * 10;
      daiVan = {
        age,
        yearStart: year + age,
        yearEnd: year + age + 9,
      };
    }

    palaces.push({
      index: i,
      name: pName,
      branch: `${palaceStems[i]} ${EARTHLY_BRANCHES[i]}`,
      majorStars: majorStars[i] || [],
      minorStars: phuTinh,
      element: CUC_ELEMENTS[cuc] || '',
      cuc,
      mingGong: mingGongStr,
      thienPhuPos,
      hoaStars,
      yearStem,
      yearBranch,
      bodyBranchIdx,
      palaceStem: palaceStems[i],
      daiVan,
    });
  }

  return palaces;
}
