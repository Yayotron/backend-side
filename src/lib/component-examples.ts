import type { BudgetSegment } from './budget';
import type { DiagramEdge, DiagramNode } from './diagram';

// Fixed reference geometry, not a claim about a delivered system.
export const gatewayNodes: readonly DiagramNode[] = [
  { id: 'clients', label: 'Clients', x: 20, y: 120, width: 100, height: 50 },
  {
    id: 'gateway',
    label: 'Gateway',
    x: 170,
    y: 120,
    width: 110,
    height: 50,
    highlight: true,
  },
  { id: 'router', label: 'Router', x: 330, y: 120, width: 100, height: 50 },
  { id: 'vllm', label: 'vLLM pool', x: 490, y: 40, width: 130, height: 50 },
  {
    id: 'ollama',
    label: 'Ollama pool',
    x: 490,
    y: 120,
    width: 130,
    height: 50,
  },
  {
    id: 'hosted',
    label: 'Hosted fallback',
    x: 490,
    y: 210,
    width: 130,
    height: 50,
  },
  {
    id: 'collector',
    label: 'OTel Collector',
    x: 150,
    y: 228,
    width: 150,
    height: 44,
  },
  { id: 'lgtm', label: 'LGTM stack', x: 330, y: 228, width: 110, height: 44 },
];

export const gatewayEdges: readonly DiagramEdge[] = [
  {
    from: 'clients',
    to: 'gateway',
    points: [
      { x: 120, y: 145 },
      { x: 166, y: 145 },
    ],
  },
  {
    from: 'gateway',
    to: 'router',
    points: [
      { x: 280, y: 145 },
      { x: 326, y: 145 },
    ],
  },
  {
    from: 'router',
    to: 'ollama',
    points: [
      { x: 430, y: 145 },
      { x: 488, y: 145 },
    ],
  },
  {
    from: 'router',
    to: 'vllm',
    points: [
      { x: 430, y: 145 },
      { x: 460, y: 145 },
      { x: 460, y: 65 },
      { x: 488, y: 65 },
    ],
  },
  {
    from: 'router',
    to: 'hosted',
    points: [
      { x: 430, y: 145 },
      { x: 460, y: 145 },
      { x: 460, y: 235 },
      { x: 488, y: 235 },
    ],
  },
  {
    from: 'gateway',
    to: 'collector',
    points: [
      { x: 225, y: 170 },
      { x: 225, y: 226 },
    ],
  },
  {
    from: 'collector',
    to: 'lgtm',
    points: [
      { x: 300, y: 250 },
      { x: 326, y: 250 },
    ],
  },
];

export const gatewayDescription =
  'Illustrative architecture: clients call a gateway, then a router selects a vLLM, Ollama, or hosted model pool. The gateway sends telemetry to an OpenTelemetry collector and the LGTM stack. TODO: Confirm the project architecture.';

export const budgetSegments: readonly BudgetSegment[] = [
  { label: 'Network in', value: 1.5 },
  { label: 'Parse', value: 0.5 },
  { label: 'Validate', value: 0.5 },
  { label: 'Business rule', value: 2 },
  { label: 'Publish', value: 3 },
  { label: 'Network out', value: 1.5 },
  { label: 'Headroom', value: 1, kind: 'headroom' },
];
