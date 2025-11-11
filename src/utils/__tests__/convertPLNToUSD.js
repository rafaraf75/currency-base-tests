import { convertPLNToUSD } from '../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN when input is a text', () => {
    expect(convertPLNToUSD('abc')).toBeNaN();
  });
  it('should throw an error when input type is invalid', () => {
    expect(() => convertPLNToUSD(null)).toThrow('Invalid input type');
    expect(() => convertPLNToUSD({})).toThrow('Invalid input type');
    expect(() => convertPLNToUSD([])).toThrow('Invalid input type');
    expect(() => convertPLNToUSD(true)).toThrow('Invalid input type');
  });
  it('should return "$0.00" when input value is below zero', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-100)).toBe('$0.00');
  });
  it('should return NaN when no argument is provided', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

});
