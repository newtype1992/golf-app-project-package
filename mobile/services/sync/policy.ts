export type SyncStatus = 'idle' | 'local-only' | 'syncing' | 'synced' | 'error';

export const syncGuardrails = [
  'Never discard unsynced hole scores silently.',
  'Prefer local round continuity over instant network confirmation.',
  'Merge by round and hole identity before applying remote updates.'
] as const;
