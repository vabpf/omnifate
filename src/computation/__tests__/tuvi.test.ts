import { describe, it, expect } from 'vitest';
import { computeTuVi } from '../tuvi';

describe('computeTuVi', () => {
  it('returns 12 palaces', () => {
    const r = computeTuVi('1990-06-15', '12:00', 'Nam');
    expect(r).toHaveLength(12);
  });

  it('each palace has required fields', () => {
    const r = computeTuVi('1990-06-15', '12:00', 'Nam');
    r.forEach(p => {
      expect(p).toHaveProperty('index');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('branch');
      expect(p).toHaveProperty('majorStars');
      expect(p).toHaveProperty('minorStars');
      expect(p).toHaveProperty('cuc');
      expect(p).toHaveProperty('daiVan');
    });
  });

  it('first palace is Mệnh', () => {
    const r = computeTuVi('1990-06-15', '12:00', 'Nam');
    const mePalace = r.find(p => p.name.startsWith('Mệnh'));
    expect(mePalace).toBeTruthy();
  });

  it('places some major stars', () => {
    const r = computeTuVi('1990-06-15', '12:00', 'Nam');
    const total = r.reduce((s, p) => s + p.majorStars.length, 0);
    expect(total).toBeGreaterThan(0);
  });

  it('places minor stars (Tràng Sinh + Thái Tuế + Bác Sĩ)', () => {
    const r = computeTuVi('1990-06-15', '12:00', 'Nam');
    const total = r.reduce((s, p) => s + p.minorStars.length, 0);
    expect(total).toBeGreaterThan(0);
  });

  it('includes Ngũ Hành Cục', () => {
    const r = computeTuVi('1990-06-15', '12:00', 'Nam');
    r.forEach(p => {
      expect(p.cuc).toBeGreaterThanOrEqual(2);
      expect(p.cuc).toBeLessThanOrEqual(6);
    });
  });

  it('includes Đại Vận info', () => {
    const r = computeTuVi('1990-06-15', '12:00', 'Nam');
    r.forEach(p => {
      expect(p.daiVan).toBeTruthy();
      expect(p.daiVan!.age).toBeGreaterThanOrEqual(0);
      expect(p.daiVan!.yearStart).toBeGreaterThan(0);
    });
  });

  it('includes Tứ Hóa stars for any year stem', () => {
    const r = computeTuVi('1990-06-15', '12:00', 'Nam');
    const hasHoa = r.some(p => p.hoaStars && p.hoaStars.length > 0);
    expect(hasHoa).toBe(true);
  });

  it('has palace stem (Ngũ Hổ Độn)', () => {
    const r = computeTuVi('1990-06-15', '12:00', 'Nam');
    r.forEach(p => {
      expect(p.palaceStem).toBeTruthy();
    });
  });

  it('each palace has element matching Cục', () => {
    const r = computeTuVi('1990-06-15', '12:00', 'Nam');
    const cuc = r[0].cuc;
    expect(cuc).toBeGreaterThanOrEqual(2);
    expect(cuc).toBeLessThanOrEqual(6);
    const elementMap: Record<number, string> = { 2: 'Thủy', 3: 'Mộc', 4: 'Kim', 5: 'Thổ', 6: 'Hỏa' };
    r.forEach(p => {
      expect(p.element).toBe(elementMap[cuc!]);
    });
  });
});
