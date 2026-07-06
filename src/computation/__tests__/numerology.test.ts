import { describe, it, expect } from 'vitest';
import { computeNumerology } from '../numerology';

describe('computeNumerology', () => {
  it('returns all required fields', () => {
    const r = computeNumerology('Test', '1990-06-15');
    expect(r).toHaveProperty('lifePath');
    expect(r).toHaveProperty('destiny');
    expect(r).toHaveProperty('soul');
    expect(r).toHaveProperty('personality');
    expect(r).toHaveProperty('attitude');
    expect(r).toHaveProperty('maturity');
    expect(r).toHaveProperty('personalYear');
    expect(r).toHaveProperty('personalMonth');
    expect(r).toHaveProperty('pinnacleChallenge');
    expect(r).toHaveProperty('birthGrid');
    expect(r).toHaveProperty('karmicDebts');
  });

  it('computes life path correctly (1990-06-15)', () => {
    // 06 → 6, 15 → 6, 1990 → 1+9+9+0=19→1, 6+6+1=13→4
    expect(computeNumerology('Test', '1990-06-15').lifePath).toBe(4);
  });

  it('computes life path for 1982-11-29 (master number)', () => {
    // 11 → 11 (master), 29 → 11 (master), 1982 → 2
    // 11 + 11 + 2 = 24 → 6
    const r = computeNumerology('Test', '1982-11-29');
    expect(r.lifePath).toBe(6);
  });

  it('computes destiny from name (Pythagorean)', () => {
    // T=2, E=5, S=1, T=2 → sum=10→1
    expect(computeNumerology('Test', '2000-01-01').destiny).toBe(1);
  });

  it('handles Y as vowel when appropriate (Mary)', () => {
    // M=4, A=1, R=9, Y=7
    // Vowels: A(1) + Y(7) = 8; Consonants: M(4)+R(9)=13→4
    const r = computeNumerology('Mary', '2000-01-01');
    expect(r.soul).toBe(8);
    expect(r.personality).toBe(4);
  });

  it('computes pinnacle/challenge cycles', () => {
    const r = computeNumerology('Test', '1990-06-15');
    expect(r.pinnacleChallenge).toHaveLength(4);
    r.pinnacleChallenge.forEach(pc => {
      expect(pc).toHaveProperty('pinnacle');
      expect(pc).toHaveProperty('challenge');
      expect(pc).toHaveProperty('ageRange');
    });
  });

  it('detects karmic debts', () => {
    const r = computeNumerology('ProfoundPro', '1990-06-15');
    expect(r.karmicDebts).toContain(14);
  });

  it('builds birth grid from dob digits', () => {
    const r = computeNumerology('Test', '1990-06-15');
    expect(r.birthGrid[1]).toBe(2); // two 1s in 1990-06-15
    expect(r.birthGrid[9]).toBe(2); // two 9s in 1990
    expect(r.birthGrid[7]).toBe(0); // no 7
  });

  it('computes attitude = day + month reduced', () => {
    // 06-15: day=6, month=15→6, 6+6=12→3
    expect(computeNumerology('Test', '1990-06-15').attitude).toBe(3);
  });

  it('computes maturity = lifePath + destiny reduced', () => {
    const r = computeNumerology('Test', '1990-06-15');
    expect(r.maturity).toBe(r.lifePath + r.destiny <= 9 ? r.lifePath + r.destiny : expect.any(Number));
  });
});
