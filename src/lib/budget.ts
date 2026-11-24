export interface BudgetSegment {
  label: string;
  value: number;
  kind?: 'step' | 'headroom';
}

interface BudgetBlock extends BudgetSegment {
  percentage: number;
  displayValue: string;
  tone: 'primary' | 'accent' | 'support';
}

interface BudgetLayout {
  blocks: BudgetBlock[];
  description: string;
}

export function getBudgetLayout(
  segments: readonly BudgetSegment[],
  unit: string,
): BudgetLayout {
  if (
    segments.length === 0 ||
    segments.some(
      (segment) =>
        !segment.label.trim() ||
        !Number.isFinite(segment.value) ||
        segment.value <= 0,
    )
  ) {
    throw new Error(
      'A budget needs named segments with finite positive values.',
    );
  }

  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  if (!Number.isFinite(total)) {
    throw new Error('The budget total must be finite.');
  }

  const largestStep = segments.reduce(
    (largest, segment) =>
      segment.kind === 'headroom' ? largest : Math.max(largest, segment.value),
    0,
  );
  const blocks = segments.map((segment): BudgetBlock => ({
    ...segment,
    percentage: (segment.value / total) * 100,
    displayValue: Number.isInteger(segment.value)
      ? segment.value.toFixed(1)
      : String(segment.value),
    tone:
      segment.kind === 'headroom'
        ? 'support'
        : segment.value === largestStep
          ? 'accent'
          : 'primary',
  }));

  return {
    blocks,
    description: blocks
      .map((block) => `${block.label}: ${block.displayValue} ${unit}`)
      .join('; '),
  };
}
