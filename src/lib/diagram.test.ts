import { describe, expect, it } from 'vitest';

import { getDiagramPaths } from './diagram';
import type { DiagramNode } from './diagram';

const nodes: readonly DiagramNode[] = [
  { id: 'source', label: 'Source', x: 0, y: 0, width: 50, height: 50 },
  { id: 'target', label: 'Target', x: 100, y: 0, width: 50, height: 50 },
];

describe('getDiagramPaths', () => {
  it('preserves explicit bends and direction', () => {
    expect(
      getDiagramPaths(nodes, [
        {
          from: 'source',
          to: 'target',
          points: [
            { x: 50, y: 25 },
            { x: 75, y: 25 },
            { x: 75, y: 0 },
            { x: 100, y: 0 },
          ],
        },
      ]),
    ).toEqual([
      {
        from: 'source',
        to: 'target',
        path: 'M50 25 L75 25 L75 0 L100 0',
      },
    ]);
  });

  it('rejects missing edge endpoints instead of drawing a disconnected edge', () => {
    expect(() =>
      getDiagramPaths(nodes, [
        {
          from: 'source',
          to: 'missing',
          points: [
            { x: 50, y: 25 },
            { x: 100, y: 25 },
          ],
        },
      ]),
    ).toThrow('unknown node');
  });

  it('rejects duplicate nodes, invalid geometry, and non-finite edge points', () => {
    expect(() => getDiagramPaths([...nodes, ...nodes], [])).toThrow(
      'duplicate',
    );
    expect(() =>
      getDiagramPaths(
        [{ id: 'bad', label: 'Bad', x: 0, y: 0, width: 0, height: 50 }],
        [],
      ),
    ).toThrow('Invalid');
    expect(() =>
      getDiagramPaths(nodes, [
        {
          from: 'source',
          to: 'target',
          points: [
            { x: NaN, y: 25 },
            { x: 100, y: 25 },
          ],
        },
      ]),
    ).toThrow('coordinates must be finite');
  });
});
