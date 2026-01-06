import { WebPlugin } from '@capacitor/core';

import type {
  IntentLauncherPlugin,
  IntentLauncherParams,
  IntentLauncherResult,
  OpenApplicationOptions,
  GetApplicationIconOptions,
  GetApplicationIconResult,
  IOSSettingsParams,
  IOSSettingsResult,
} from './definitions';

export class IntentLauncherWeb extends WebPlugin implements IntentLauncherPlugin {
  async startActivityAsync(_options: IntentLauncherParams): Promise<IntentLauncherResult> {
    throw this.unavailable('Intent Launcher is not available on web. This feature only works on Android.');
  }

  async openIOSSettings(_options: IOSSettingsParams): Promise<IOSSettingsResult> {
    throw this.unavailable('iOS Settings is not available on web. This feature only works on iOS.');
  }

  async openApplication(_options: OpenApplicationOptions): Promise<void> {
    throw this.unavailable('Opening applications is not available on web. This feature only works on Android.');
  }

  async getApplicationIconAsync(_options: GetApplicationIconOptions): Promise<GetApplicationIconResult> {
    throw this.unavailable('Getting application icons is not available on web. This feature only works on Android.');
  }

  async getPluginVersion(): Promise<{ version: string }> {
    return { version: 'web' };
  }
}
