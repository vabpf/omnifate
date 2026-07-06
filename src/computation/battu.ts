import { Solar, EightChar } from 'lunar-typescript';
import type { BattuData } from '../types';
import { getUtcOffset } from './shared';

const STEM_ELEMENT: Record<string, { vi: string; element: string }> = {
  '甲': { vi: 'Giáp', element: 'Mộc' }, '乙': { vi: 'Ất', element: 'Mộc' },
  '丙': { vi: 'Bính', element: 'Hỏa' }, '丁': { vi: 'Đinh', element: 'Hỏa' },
  '戊': { vi: 'Mậu', element: 'Thổ' }, '己': { vi: 'Kỷ', element: 'Thổ' },
  '庚': { vi: 'Canh', element: 'Kim' }, '辛': { vi: 'Tân', element: 'Kim' },
  '壬': { vi: 'Nhâm', element: 'Thủy' }, '癸': { vi: 'Quý', element: 'Thủy' },
};

const VI_STEMS: Record<string, string> = {
  '甲': 'Giáp', '乙': 'Ất', '丙': 'Bính', '丁': 'Đinh', '戊': 'Mậu',
  '己': 'Kỷ', '庚': 'Canh', '辛': 'Tân', '壬': 'Nhâm', '癸': 'Quý',
};

const VI_BRANCHES: Record<string, string> = {
  '子': 'Tý', '丑': 'Sửu', '寅': 'Dần', '卯': 'Mão', '辰': 'Thìn', '巳': 'Tỵ',
  '午': 'Ngọ', '未': 'Mùi', '申': 'Thân', '酉': 'Dậu', '戌': 'Tuất', '亥': 'Hợi',
};

function toVi(gz: string): string {
  return gz.split('').map(c => VI_STEMS[c] || VI_BRANCHES[c] || c).join(' ');
}

function stemElement(cn: string): string {
  return STEM_ELEMENT[cn]?.element || '';
}

export function computeBattu(dob: string, time: string, timezone = 'Asia/Ho_Chi_Minh'): BattuData {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour] = time.split(':').map(Number);

  // Convert local time → UTC → UTC+7 (Vietnamese reference for lunar calendar)
  const localOffset = getUtcOffset(year, month, day, hour, timezone);
  const utcMs = Date.UTC(year, month - 1, day, hour - localOffset, 0, 0);
  const refDate = new Date(utcMs + 7 * 3600000);
  const solar = Solar.fromYmdHms(refDate.getUTCFullYear(), refDate.getUTCMonth() + 1, refDate.getUTCDate(), refDate.getUTCHours(), 0, 0);
  const lunar = solar.getLunar();
  const ec = EightChar.fromLunar(lunar);

  const pillars = {
    year: toVi(ec.getYear()),
    month: toVi(ec.getMonth()),
    day: toVi(ec.getDay()),
    hour: toVi(ec.getTime()),
  };

  const hiddenStems = {
    year: ec.getYearHideGan(),
    month: ec.getMonthHideGan(),
    day: ec.getDayHideGan(),
    hour: ec.getTimeHideGan(),
  };

  const nayin = {
    year: ec.getYearNaYin(),
    month: ec.getMonthNaYin(),
    day: ec.getDayNaYin(),
    hour: ec.getTimeNaYin(),
  };

  const dayMaster = VI_STEMS[ec.getDayGan()] || ec.getDayGan();

  const elementScores: Record<string, number> = { Kim: 0, Mộc: 0, Thủy: 0, Hỏa: 0, Thổ: 0 };

  // Score from 4 pillar stems (1 point each)
  const pillarGans = [ec.getYearGan(), ec.getMonthGan(), ec.getDayGan(), ec.getTimeGan()];
  for (const g of pillarGans) {
    const el = stemElement(g);
    if (el) elementScores[el] += 2;
  }

  // Score from hidden stems (weighted)
  const allHidden = [
    ...ec.getYearHideGan(),
    ...ec.getMonthHideGan(),
    ...ec.getDayHideGan(),
    ...ec.getTimeHideGan(),
  ];
  const weightMap: Record<string, number> = {};
  for (const h of allHidden) {
    weightMap[h] = (weightMap[h] || 0) + 1;
  }
  for (const [stem, count] of Object.entries(weightMap)) {
    const el = stemElement(stem);
    if (el) elementScores[el] += count * 0.5;
  }

  const total = Object.values(elementScores).reduce((a, b) => a + b, 0);
  const raw: Record<string, number> = {};
  if (total > 0) {
    for (const [k, v] of Object.entries(elementScores)) {
      raw[k] = Math.round((v / total) * 100);
    }
  } else {
    raw.Kim = 25; raw.Mộc = 25; raw.Thủy = 25; raw.Hỏa = 25; raw.Thổ = 0;
  }
  const elementsPercentage: { Kim: number; Mộc: number; Thủy: number; Hỏa: number; Thổ: number } = {
    Kim: raw.Kim ?? 0, Mộc: raw.Mộc ?? 0, Thủy: raw.Thủy ?? 0, Hỏa: raw.Hỏa ?? 0, Thổ: raw.Thổ ?? 0,
  };

  return {
    pillars,
    elementsPercentage,
    dayMaster,
    hiddenStems,
    nayin,
    mingGong: ec.getMingGong(),
    shenGong: ec.getShenGong(),
  };
}
