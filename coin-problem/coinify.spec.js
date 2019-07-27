const { coinify } = require('./coinify')

describe("coinify fn test suite", function() {
  it("split amount of money on coins correctly", () => {
    expect(coinify(2.34)).toEqual([2, 0.2, 0.1, 0.02, 0.02])

    expect(coinify(0.01)).toEqual([0.01])

    expect(coinify(0.0199)).toEqual([0.01])

    expect(coinify(11.111)).toEqual([2, 2, 2, 2, 2, 1, 0.1, 0.01])
  });

  it('ignores too small values', () => {
    expect(coinify(0.001)).toEqual([])
  })

  it("handles 0", () => {
    expect(coinify(0)).toEqual([])
  });

  it('throws TypeError if negatives passed', () => {
    expect(() => coinify(-1)).toThrow(TypeError)
    expect(() => coinify('10')).toThrow(TypeError)
  })
});
