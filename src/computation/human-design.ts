import { HumanDesignData, HumanDesignCenter } from '../types';

export const CENTER_CONFIG = [
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

export function computeHumanDesign(dob: string, time: string): HumanDesignData {
  const [year, month, day] = dob.split('-').map(Number);
  const [hour] = time.split(':').map(Number);

  const seed = (year * 13 + month * 7 + day * 3 + hour * 9) % 100;

  const types = ['Generator', 'Manifesting Generator', 'Projector', 'Manifestor', 'Reflector'];
  let type = types[0];
  if (seed < 35) type = 'Generator';
  else if (seed < 68) type = 'Manifesting Generator';
  else if (seed < 85) type = 'Projector';
  else if (seed < 95) type = 'Manifestor';
  else type = 'Reflector';

  const profiles = ['1/3 (Nhà Điều Tra / Người Trực Nghiệm)', '2/4 (Kẻ Ẩn Dật / Cơ Hội)', '3/5 (Kẻ Phiêu Lưu / Hướng Dẫn)', '4/6 (Cơ Hội / Hình Mẫu)', '5/1 (Người Hướng Dẫn / Nhà Điều Tra)', '6/2 (Hình Mẫu / Kẻ Ẩn Dật)'];
  const profile = profiles[seed % 6];

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

  const centers: HumanDesignCenter[] = CENTER_CONFIG.map((c, i) => ({
    ...c,
    defined: type === 'Reflector' ? false : ((seed + i * 11) % 5 >= 2)
  }));

  return {
    type,
    profile,
    strategy,
    authority,
    centers
  };
}
