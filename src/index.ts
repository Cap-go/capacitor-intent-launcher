import { registerPlugin } from '@capacitor/core';

import type { IntentLauncherPlugin } from './definitions';

const IntentLauncher = registerPlugin<IntentLauncherPlugin>('IntentLauncher', {
  web: () => import('./web').then((m) => new m.IntentLauncherWeb()),
});

export * from './definitions';
export { IntentLauncher };
