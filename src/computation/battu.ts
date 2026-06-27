import { BattuData } from '../types';
import { EARTHLY_BRANCHES, HEAVENLY_STEMS } from './tuvi';

export function computeBattu(dob: string, time: string): BattuData {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour] = time.split(':').map(Number);

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

  let elementsPercentage = { Kim: 20, Mộc: 20, Thủy: 20, Hỏa: 20, Thổ: 20 };

  if (month >= 3 && month <= 5) {
    elementsPercentage = { Mộc: 38, Hỏa: 22, Thổ: 14, Kim: 12, Thủy: 14 };
  } else if (month >= 6 && month <= 8) {
    elementsPercentage = { Mộc: 12, Hỏa: 40, Thổ: 22, Kim: 10, Thủy: 16 };
  } else if (month >= 9 && month <= 11) {
    elementsPercentage = { Mộc: 14, Hỏa: 10, Thổ: 18, Kim: 38, Thủy: 20 };
  } else {
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
