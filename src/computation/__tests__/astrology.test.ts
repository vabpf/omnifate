import { describe, it, expect } from 'vitest';
import { computeAstrology } from '../astrology';

describe('computeAstrology', () => {
  it('returns all required fields', () => {
    const r = computeAstrology('1990-06-15', '12:00');
    expect(r).toHaveProperty('sunSign');
    expect(r).toHaveProperty('sunSymbol');
    expect(r).toHaveProperty('moonSign');
    expect(r).toHaveProperty('moonSymbol');
    expect(r).toHaveProperty('ascendant');
    expect(r).toHaveProperty('ascendantSymbol');
    expect(r).toHaveProperty('planets');
    expect(r).toHaveProperty('aspects');
  });

  it('returns 10 planets', () => {
    const r = computeAstrology('1990-06-15', '12:00');
    expect(r.planets).toHaveLength(10);
  });

  it('each planet has required fields', () => {
    const r = computeAstrology('1990-06-15', '12:00');
    r.planets.forEach(p => {
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('sign');
      expect(p).toHaveProperty('symbol');
      expect(typeof p.degree).toBe('number');
      expect(typeof p.house).toBe('number');
      expect(p.degree).toBeGreaterThanOrEqual(0);
      expect(p.degree).toBeLessThan(30);
    });
  });

  it('finds at least 5 aspects', () => {
    const r = computeAstrology('1990-06-15', '12:00');
    expect(r.aspects.length).toBeGreaterThanOrEqual(5);
  });

  it('sun sign changes by date', () => {
    const aries = computeAstrology('2024-04-10', '12:00');
    const libra = computeAstrology('2024-10-10', '12:00');
    expect(aries.sunSign).not.toBe(libra.sunSign);
  });
});
