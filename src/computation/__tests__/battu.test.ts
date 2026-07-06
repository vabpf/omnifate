import { describe, it, expect } from 'vitest';
import { computeBattu } from '../battu';

describe('computeBattu', () => {
  it('returns all required fields', () => {
    const r = computeBattu('1990-06-15', '12:00');
    expect(r).toHaveProperty('pillars');
    expect(r).toHaveProperty('elementsPercentage');
    expect(r).toHaveProperty('dayMaster');
    expect(r).toHaveProperty('hiddenStems');
    expect(r).toHaveProperty('nayin');
    expect(r).toHaveProperty('mingGong');
    expect(r).toHaveProperty('shenGong');
  });

  it('returns 4 pillars', () => {
    const r = computeBattu('1990-06-15', '12:00');
    expect(r.pillars.year).toBeTruthy();
    expect(r.pillars.month).toBeTruthy();
    expect(r.pillars.day).toBeTruthy();
    expect(r.pillars.hour).toBeTruthy();
  });

  it('returns dayMaster', () => {
    const r = computeBattu('1990-06-15', '12:00');
    expect(r.dayMaster.length).toBeGreaterThan(0);
  });

  it('elementsPercentage has 5 elements summing to ~100', () => {
    const r = computeBattu('1990-06-15', '12:00');
    const keys = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
    keys.forEach(k => {
      expect(r.elementsPercentage[k]).toBeGreaterThanOrEqual(0);
    });
    const sum = keys.reduce((s, k) => s + r.elementsPercentage[k], 0);
    expect(sum).toBeGreaterThanOrEqual(98);
    expect(sum).toBeLessThanOrEqual(102);
  });

  it('returns 4 hidden stem arrays', () => {
    const r = computeBattu('1990-06-15', '12:00');
    expect(Array.isArray(r.hiddenStems.year)).toBe(true);
    expect(Array.isArray(r.hiddenStems.month)).toBe(true);
    expect(Array.isArray(r.hiddenStems.day)).toBe(true);
    expect(Array.isArray(r.hiddenStems.hour)).toBe(true);
  });

  it('returns nayin for all 4 pillars', () => {
    const r = computeBattu('1990-06-15', '12:00');
    expect(typeof r.nayin.year).toBe('string');
    expect(typeof r.nayin.month).toBe('string');
    expect(typeof r.nayin.day).toBe('string');
    expect(typeof r.nayin.hour).toBe('string');
  });

  it('returns mingGong and shenGong as strings', () => {
    const r = computeBattu('1990-06-15', '12:00');
    expect(typeof r.mingGong).toBe('string');
    expect(typeof r.shenGong).toBe('string');
  });
});
