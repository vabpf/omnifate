import { describe, it, expect } from 'vitest';
import { removeVietnameseTones, reduceNum, getUtcOffset } from '../shared';

describe('removeVietnameseTones', () => {
  it('removes all Vietnamese diacritics', () => {
    expect(removeVietnameseTones('Nguyễn Văn An')).toBe('nguyen van an');
  });

  it('handles uppercase with diacritics', () => {
    expect(removeVietnameseTones('TRẦN THỊ MAI')).toBe('tran thi mai');
  });

  it('leaves ASCII unchanged', () => {
    expect(removeVietnameseTones('hello world')).toBe('hello world');
  });

  it('handles đ/Đ', () => {
    expect(removeVietnameseTones('Đặng')).toBe('dang');
  });
});

describe('reduceNum', () => {
  it('reduces a number to a single digit', () => {
    expect(reduceNum(38, false)).toBe(2);
    expect(reduceNum(123, false)).toBe(6);
  });

  it('preserves master numbers when keepMaster is true', () => {
    expect(reduceNum(11, true)).toBe(11);
    expect(reduceNum(22, true)).toBe(22);
    expect(reduceNum(33, true)).toBe(33);
  });

  it('reduces master numbers when keepMaster is false', () => {
    expect(reduceNum(11, false)).toBe(2);
    expect(reduceNum(22, false)).toBe(4);
  });

  it('returns single digits as-is', () => {
    expect(reduceNum(5)).toBe(5);
    expect(reduceNum(9)).toBe(9);
  });
});

describe('getUtcOffset', () => {
  it('returns 7 for Asia/Ho_Chi_Minh', () => {
    expect(getUtcOffset(2024, 6, 15, 12, 'Asia/Ho_Chi_Minh')).toBe(7);
  });

  it('returns 9 for Asia/Tokyo', () => {
    expect(getUtcOffset(2024, 6, 15, 12, 'Asia/Tokyo')).toBe(9);
  });

  it('returns 0 for UTC', () => {
    expect(getUtcOffset(2024, 6, 15, 12, 'UTC')).toBe(0);
  });

  it('falls back to 7 for invalid timezone', () => {
    expect(getUtcOffset(2024, 6, 15, 12, 'BAD/TIMEZONE')).toBe(7);
  });
});
