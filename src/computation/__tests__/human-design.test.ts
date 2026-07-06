import { describe, it, expect } from 'vitest';
import { computeHumanDesign } from '../human-design';

describe('computeHumanDesign', () => {
  it('returns all required fields', () => {
    const r = computeHumanDesign('1990-06-15', '12:00');
    expect(r).toHaveProperty('type');
    expect(r).toHaveProperty('profile');
    expect(r).toHaveProperty('strategy');
    expect(r).toHaveProperty('authority');
    expect(r).toHaveProperty('centers');
    expect(r).toHaveProperty('activeGates');
    expect(r).toHaveProperty('definedChannels');
    expect(r).toHaveProperty('incarnationCross');
  });

  it('returns valid Type', () => {
    const valid = ['Generator', 'Manifesting Generator', 'Manifestor', 'Projector', 'Reflector'];
    const r = computeHumanDesign('1990-06-15', '12:00');
    expect(valid).toContain(r.type);
  });

  it('returns valid Authority', () => {
    const r = computeHumanDesign('1990-06-15', '12:00');
    expect(r.authority.length).toBeGreaterThan(0);
  });

  it('returns 9 centers', () => {
    const r = computeHumanDesign('1990-06-15', '12:00');
    expect(r.centers).toHaveLength(9);
  });

  it('each center has required fields', () => {
    const r = computeHumanDesign('1990-06-15', '12:00');
    r.centers.forEach(c => {
      expect(c).toHaveProperty('id');
      expect(c).toHaveProperty('name');
      expect(c).toHaveProperty('defined');
      expect(c).toHaveProperty('type');
      expect(c).toHaveProperty('color');
    });
  });

  it('profile matches format "X/Y (Label)"', () => {
    const r = computeHumanDesign('1990-06-15', '12:00');
    expect(r.profile).toMatch(/^\d\/\d \(.+\)$/);
  });

  it('strategy matches type', () => {
    const r = computeHumanDesign('1990-06-15', '12:00');
    expect(r.strategy.length).toBeGreaterThan(0);
  });

  it('returns incarnation cross with gate/line info', () => {
    const r = computeHumanDesign('1990-06-15', '12:00');
    expect(r.incarnationCross).toHaveProperty('type');
    expect(r.incarnationCross!.personalitySun).toHaveProperty('gate');
    expect(r.incarnationCross!.personalitySun).toHaveProperty('line');
    expect(r.incarnationCross!.personalityEarth).toHaveProperty('gate');
    expect(r.incarnationCross!.designSun).toHaveProperty('gate');
  });
});
