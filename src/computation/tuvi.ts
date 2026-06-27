import { TuViPalace } from '../types';

export const PALACE_NAMES = [
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

export const EARTHLY_BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
export const HEAVENLY_STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];

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
  const [hour] = time.split(':').map(Number);

  const hourIdx = Math.floor((hour + 1) / 2) % 12;
  const startMệnhIdx = (12 + (month - 1) - hourIdx) % 12;

  const palaces: TuViPalace[] = [];

  for (let i = 0; i < 12; i++) {
    const cellBranchIdx = i;
    const branchName = EARTHLY_BRANCHES[cellBranchIdx];

    const palaceNameOffset = (cellBranchIdx - startMệnhIdx + 12) % 12;
    const palaceName = PALACE_NAMES[palaceNameOffset];

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
