import { describe, expect, it } from 'vitest';

import { getBudgetLayout } from './budget';

describe('getBudgetLayout', () => {
  it('sizes blocks by value, highlights the largest step, and preserves headroom', () => {
    const { blocks, description } = getBudgetLayout(
      [
        { label: 'Parse', value: 0.5 },
        { label: 'Publish', value: 3 },
        { label: 'Headroom', value: 1.5, kind: 'headroom' },
      ],
      'ms',
    );

    expect(blocks.map(({ percentage }) => percentage)).toEqual([10, 60, 30]);
    expect(blocks.map(({ tone }) => tone)).toEqual([
      'primary',
      'accent',
      'support',
    ]);
    expect(description).toBe(
      'Parse: 0.5 ms; Publish: 3.0 ms; Headroom: 1.5 ms',
    );
  });

  it('does not highlight headroom as a step or round fractional values', () => {
    const { blocks } = getBudgetLayout(
      [
        { label: 'Parse', value: 0.125 },
        { label: 'Validate', value: 0.125 },
        { label: 'Headroom', value: 0.75, kind: 'headroom' },
      ],
      'ms',
    );

    expect(blocks.map(({ tone }) => tone)).toEqual([
      'accent',
      'accent',
      'support',
    ]);
    expect(blocks[0]?.displayValue).toBe('0.125');
  });

  it.each([0, -1, NaN, Infinity])('rejects invalid values (%s)', (value) => {
    expect(() => getBudgetLayout([{ label: 'Parse', value }], 'ms')).toThrow(
      'finite positive values',
    );
  });

  it('rejects an empty budget, missing labels, and an overflowing total', () => {
    expect(() => getBudgetLayout([], 'ms')).toThrow('named segments');
    expect(() => getBudgetLayout([{ label: ' ', value: 1 }], 'ms')).toThrow(
      'named segments',
    );
    expect(() =>
      getBudgetLayout(
        [
          { label: 'First', value: Number.MAX_VALUE },
          { label: 'Second', value: Number.MAX_VALUE },
        ],
        'ms',
      ),
    ).toThrow('total must be finite');
  });
});
