/**
 * Capacitor Intent Launcher Plugin for launching Android intents and opening system settings.
 *
 * @since 1.0.0
 */
export interface IntentLauncherPlugin {
  /**
   * Starts an Android activity for the given action.
   *
   * @param options - The intent launch options including action and optional parameters
   * @returns Promise that resolves with the result from the activity
   * @throws Error if the activity cannot be started or is not available
   * @platform Android
   * @since 1.0.0
   * @example
   * ```typescript
   * // Open location settings
   * const result = await IntentLauncher.startActivityAsync({
   *   action: ActivityAction.LOCATION_SOURCE_SETTINGS
   * });
   *
   * // Open a specific app settings
   * const result = await IntentLauncher.startActivityAsync({
   *   action: ActivityAction.APPLICATION_DETAILS_SETTINGS,
   *   data: 'package:com.example.app'
   * });
   * ```
   */
  startActivityAsync(options: IntentLauncherParams): Promise<IntentLauncherResult>;

  /**
   * Opens an application by its package name.
   *
   * @param options - The package name of the application to open
   * @throws Error if the application is not installed or cannot be opened
   * @platform Android
   * @since 1.0.0
   * @example
   * ```typescript
   * // Open Gmail app
   * await IntentLauncher.openApplication({ packageName: 'com.google.android.gm' });
   * ```
   */
  openApplication(options: OpenApplicationOptions): Promise<void>;

  /**
   * Gets the application icon as a base64-encoded PNG string.
   *
   * @param options - The package name of the application
   * @returns Promise that resolves with the base64 icon data or empty string if unavailable
   * @platform Android
   * @since 1.0.0
   * @example
   * ```typescript
   * const { icon } = await IntentLauncher.getApplicationIconAsync({
   *   packageName: 'com.google.android.gm'
   * });
   * if (icon) {
   *   const img = document.createElement('img');
   *   img.src = icon;
   * }
   * ```
   */
  getApplicationIconAsync(options: GetApplicationIconOptions): Promise<GetApplicationIconResult>;

  /**
   * Get the native Capacitor plugin version.
   *
   * @returns Promise that resolves with the plugin version
   * @throws Error if getting the version fails
   * @since 1.0.0
   * @example
   * ```typescript
   * const { version } = await IntentLauncher.getPluginVersion();
   * console.log('Plugin version:', version);
   * ```
   */
  getPluginVersion(): Promise<{ version: string }>;
}

/**
 * Options for starting an activity.
 *
 * @since 1.0.0
 */
export interface IntentLauncherParams {
  /**
   * The action to perform. Use values from `ActivityAction` enum.
   *
   * @since 1.0.0
   */
  action: string;

  /**
   * Optional category to add to the intent.
   *
   * @since 1.0.0
   */
  category?: string;

  /**
   * Optional class name for the component to launch.
   *
   * @since 1.0.0
   */
  className?: string;

  /**
   * Optional URI data for the intent. Must be a valid URI.
   *
   * @since 1.0.0
   */
  data?: string;

  /**
   * Optional extra data to pass to the intent as key-value pairs.
   *
   * @since 1.0.0
   */
  extra?: Record<string, unknown>;

  /**
   * Optional intent flags as a bitmask.
   *
   * @since 1.0.0
   */
  flags?: number;

  /**
   * Optional package name for the component.
   *
   * @since 1.0.0
   */
  packageName?: string;

  /**
   * Optional MIME type for the intent data.
   *
   * @since 1.0.0
   */
  type?: string;
}

/**
 * Result from starting an activity.
 *
 * @since 1.0.0
 */
export interface IntentLauncherResult {
  /**
   * The result code returned by the activity.
   *
   * @since 1.0.0
   */
  resultCode: ResultCode;

  /**
   * Optional data URI returned by the activity.
   *
   * @since 1.0.0
   */
  data?: string;

  /**
   * Optional extra data returned by the activity.
   *
   * @since 1.0.0
   */
  extra?: Record<string, unknown>;
}

/**
 * Options for opening an application.
 *
 * @since 1.0.0
 */
export interface OpenApplicationOptions {
  /**
   * The package name of the application to open.
   *
   * @since 1.0.0
   */
  packageName: string;
}

/**
 * Options for getting an application icon.
 *
 * @since 1.0.0
 */
export interface GetApplicationIconOptions {
  /**
   * The package name of the application.
   *
   * @since 1.0.0
   */
  packageName: string;
}

/**
 * Result from getting an application icon.
 *
 * @since 1.0.0
 */
export interface GetApplicationIconResult {
  /**
   * The application icon as a base64-encoded PNG string prefixed with 'data:image/png;base64,'.
   * Empty string if the icon is not available.
   *
   * @since 1.0.0
   */
  icon: string;
}

/**
 * Result codes returned by activities.
 *
 * @since 1.0.0
 */
export enum ResultCode {
  /**
   * The activity completed successfully.
   */
  Success = -1,

  /**
   * The activity was canceled by the user.
   */
  Canceled = 0,

  /**
   * First custom user-defined result code.
   */
  FirstUser = 1,
}

/**
 * Android activity actions for use with `startActivityAsync`.
 * These map to Android's `android.provider.Settings` and `android.content.Intent` action constants.
 *
 * @since 1.0.0
 */
export enum ActivityAction {
  /**
   * Opens accessibility settings.
   */
  ACCESSIBILITY_SETTINGS = 'android.settings.ACCESSIBILITY_SETTINGS',

  /**
   * Opens the add account screen.
   */
  ADD_ACCOUNT = 'android.settings.ADD_ACCOUNT_SETTINGS',

  /**
   * Opens airplane mode settings.
   */
  AIRPLANE_MODE_SETTINGS = 'android.settings.AIRPLANE_MODE_SETTINGS',

  /**
   * Opens APN settings.
   */
  APN_SETTINGS = 'android.settings.APN_SETTINGS',

  /**
   * Opens app notification settings.
   */
  APP_NOTIFICATION_SETTINGS = 'android.settings.APP_NOTIFICATION_SETTINGS',

  /**
   * Opens application details settings.
   */
  APPLICATION_DETAILS_SETTINGS = 'android.settings.APPLICATION_DETAILS_SETTINGS',

  /**
   * Opens application development settings.
   */
  APPLICATION_DEVELOPMENT_SETTINGS = 'android.settings.APPLICATION_DEVELOPMENT_SETTINGS',

  /**
   * Opens application settings.
   */
  APPLICATION_SETTINGS = 'android.settings.APPLICATION_SETTINGS',

  /**
   * Opens battery saver settings.
   */
  BATTERY_SAVER_SETTINGS = 'android.settings.BATTERY_SAVER_SETTINGS',

  /**
   * Opens Bluetooth settings.
   */
  BLUETOOTH_SETTINGS = 'android.settings.BLUETOOTH_SETTINGS',

  /**
   * Opens captioning settings.
   */
  CAPTIONING_SETTINGS = 'android.settings.CAPTIONING_SETTINGS',

  /**
   * Opens cast settings.
   */
  CAST_SETTINGS = 'android.settings.CAST_SETTINGS',

  /**
   * Opens data roaming settings.
   */
  DATA_ROAMING_SETTINGS = 'android.settings.DATA_ROAMING_SETTINGS',

  /**
   * Opens date settings.
   */
  DATE_SETTINGS = 'android.settings.DATE_SETTINGS',

  /**
   * Opens device info settings.
   */
  DEVICE_INFO_SETTINGS = 'android.settings.DEVICE_INFO_SETTINGS',

  /**
   * Opens display settings.
   */
  DISPLAY_SETTINGS = 'android.settings.DISPLAY_SETTINGS',

  /**
   * Opens dream settings (screen saver).
   */
  DREAM_SETTINGS = 'android.settings.DREAM_SETTINGS',

  /**
   * Opens hard keyboard settings.
   */
  HARD_KEYBOARD_SETTINGS = 'android.settings.HARD_KEYBOARD_SETTINGS',

  /**
   * Opens home settings.
   */
  HOME_SETTINGS = 'android.settings.HOME_SETTINGS',

  /**
   * Opens ignore battery optimization settings.
   */
  IGNORE_BATTERY_OPTIMIZATION_SETTINGS = 'android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS',

  /**
   * Opens input method settings.
   */
  INPUT_METHOD_SETTINGS = 'android.settings.INPUT_METHOD_SETTINGS',

  /**
   * Opens input method subtype settings.
   */
  INPUT_METHOD_SUBTYPE_SETTINGS = 'android.settings.INPUT_METHOD_SUBTYPE_SETTINGS',

  /**
   * Opens internal storage settings.
   */
  INTERNAL_STORAGE_SETTINGS = 'android.settings.INTERNAL_STORAGE_SETTINGS',

  /**
   * Opens locale settings.
   */
  LOCALE_SETTINGS = 'android.settings.LOCALE_SETTINGS',

  /**
   * Opens location source settings.
   */
  LOCATION_SOURCE_SETTINGS = 'android.settings.LOCATION_SOURCE_SETTINGS',

  /**
   * Opens managed profile settings.
   */
  MANAGED_PROFILE_SETTINGS = 'android.settings.MANAGED_PROFILE_SETTINGS',

  /**
   * Opens manage all applications settings.
   */
  MANAGE_ALL_APPLICATIONS_SETTINGS = 'android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS',

  /**
   * Opens manage applications settings.
   */
  MANAGE_APPLICATIONS_SETTINGS = 'android.settings.MANAGE_APPLICATIONS_SETTINGS',

  /**
   * Opens manage default apps settings.
   */
  MANAGE_DEFAULT_APPS_SETTINGS = 'android.settings.MANAGE_DEFAULT_APPS_SETTINGS',

  /**
   * Opens memory card settings.
   */
  MEMORY_CARD_SETTINGS = 'android.settings.MEMORY_CARD_SETTINGS',

  /**
   * Opens network operator settings.
   */
  NETWORK_OPERATOR_SETTINGS = 'android.settings.NETWORK_OPERATOR_SETTINGS',

  /**
   * Opens NFC payment settings.
   */
  NFC_PAYMENT_SETTINGS = 'android.settings.NFC_PAYMENT_SETTINGS',

  /**
   * Opens NFC settings.
   */
  NFC_SETTINGS = 'android.settings.NFC_SETTINGS',

  /**
   * Opens night display settings.
   */
  NIGHT_DISPLAY_SETTINGS = 'android.settings.NIGHT_DISPLAY_SETTINGS',

  /**
   * Opens notification listener settings.
   */
  NOTIFICATION_LISTENER_SETTINGS = 'android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS',

  /**
   * Opens notification policy access settings.
   */
  NOTIFICATION_POLICY_ACCESS_SETTINGS = 'android.settings.NOTIFICATION_POLICY_ACCESS_SETTINGS',

  /**
   * Opens print settings.
   */
  PRINT_SETTINGS = 'android.settings.ACTION_PRINT_SETTINGS',

  /**
   * Opens privacy settings.
   */
  PRIVACY_SETTINGS = 'android.settings.PRIVACY_SETTINGS',

  /**
   * Opens quick launch settings.
   */
  QUICK_LAUNCH_SETTINGS = 'android.settings.QUICK_LAUNCH_SETTINGS',

  /**
   * Opens request ignore battery optimizations.
   */
  REQUEST_IGNORE_BATTERY_OPTIMIZATIONS = 'android.settings.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',

  /**
   * Opens search settings.
   */
  SEARCH_SETTINGS = 'android.search.action.SEARCH_SETTINGS',

  /**
   * Opens security settings.
   */
  SECURITY_SETTINGS = 'android.settings.SECURITY_SETTINGS',

  /**
   * Opens main settings screen.
   */
  SETTINGS = 'android.settings.SETTINGS',

  /**
   * Opens show regulatory info.
   */
  SHOW_REGULATORY_INFO = 'android.settings.SHOW_REGULATORY_INFO',

  /**
   * Opens sound settings.
   */
  SOUND_SETTINGS = 'android.settings.SOUND_SETTINGS',

  /**
   * Opens sync settings.
   */
  SYNC_SETTINGS = 'android.settings.SYNC_SETTINGS',

  /**
   * Opens usage access settings.
   */
  USAGE_ACCESS_SETTINGS = 'android.settings.USAGE_ACCESS_SETTINGS',

  /**
   * Opens user dictionary settings.
   */
  USER_DICTIONARY_SETTINGS = 'android.settings.USER_DICTIONARY_SETTINGS',

  /**
   * Opens voice input settings.
   */
  VOICE_INPUT_SETTINGS = 'android.settings.VOICE_INPUT_SETTINGS',

  /**
   * Opens VPN settings.
   */
  VPN_SETTINGS = 'android.settings.VPN_SETTINGS',

  /**
   * Opens VR listener settings.
   */
  VR_LISTENER_SETTINGS = 'android.settings.VR_LISTENER_SETTINGS',

  /**
   * Opens webview settings.
   */
  WEBVIEW_SETTINGS = 'android.settings.WEBVIEW_SETTINGS',

  /**
   * Opens WiFi IP settings.
   */
  WIFI_IP_SETTINGS = 'android.settings.WIFI_IP_SETTINGS',

  /**
   * Opens WiFi settings.
   */
  WIFI_SETTINGS = 'android.settings.WIFI_SETTINGS',

  /**
   * Opens wireless settings.
   */
  WIRELESS_SETTINGS = 'android.settings.WIRELESS_SETTINGS',

  /**
   * Opens ZEN mode priority settings.
   */
  ZEN_MODE_PRIORITY_SETTINGS = 'android.settings.ZEN_MODE_PRIORITY_SETTINGS',

  // Intent actions

  /**
   * View action for viewing data.
   */
  VIEW = 'android.intent.action.VIEW',

  /**
   * Call action for making phone calls.
   */
  CALL = 'android.intent.action.CALL',

  /**
   * Dial action for opening the dialer.
   */
  DIAL = 'android.intent.action.DIAL',

  /**
   * Send action for sending data.
   */
  SEND = 'android.intent.action.SEND',

  /**
   * Send multiple action for sending multiple items.
   */
  SEND_MULTIPLE = 'android.intent.action.SEND_MULTIPLE',

  /**
   * Pick action for picking data.
   */
  PICK = 'android.intent.action.PICK',

  /**
   * Edit action for editing data.
   */
  EDIT = 'android.intent.action.EDIT',

  /**
   * Delete action for deleting data.
   */
  DELETE = 'android.intent.action.DELETE',

  /**
   * Get content action for retrieving content.
   */
  GET_CONTENT = 'android.intent.action.GET_CONTENT',

  /**
   * Create shortcut action.
   */
  CREATE_SHORTCUT = 'android.intent.action.CREATE_SHORTCUT',

  /**
   * Insert action for inserting data.
   */
  INSERT = 'android.intent.action.INSERT',

  /**
   * Search action.
   */
  SEARCH = 'android.intent.action.SEARCH',

  /**
   * Web search action.
   */
  WEB_SEARCH = 'android.intent.action.WEB_SEARCH',

  /**
   * Sendto action for sending to a specific recipient.
   */
  SENDTO = 'android.intent.action.SENDTO',

  /**
   * Answer action for answering calls.
   */
  ANSWER = 'android.intent.action.ANSWER',

  /**
   * Attach data action.
   */
  ATTACH_DATA = 'android.intent.action.ATTACH_DATA',

  /**
   * Bug report action.
   */
  BUG_REPORT = 'android.intent.action.BUG_REPORT',

  /**
   * Chooser action.
   */
  CHOOSER = 'android.intent.action.CHOOSER',

  /**
   * Create document action.
   */
  CREATE_DOCUMENT = 'android.intent.action.CREATE_DOCUMENT',

  /**
   * Main action.
   */
  MAIN = 'android.intent.action.MAIN',

  /**
   * Manage network usage action.
   */
  MANAGE_NETWORK_USAGE = 'android.intent.action.MANAGE_NETWORK_USAGE',

  /**
   * Open document action.
   */
  OPEN_DOCUMENT = 'android.intent.action.OPEN_DOCUMENT',

  /**
   * Open document tree action.
   */
  OPEN_DOCUMENT_TREE = 'android.intent.action.OPEN_DOCUMENT_TREE',

  /**
   * Power usage summary action.
   */
  POWER_USAGE_SUMMARY = 'android.intent.action.POWER_USAGE_SUMMARY',

  /**
   * Process text action.
   */
  PROCESS_TEXT = 'android.intent.action.PROCESS_TEXT',

  /**
   * Quick view action.
   */
  QUICK_VIEW = 'android.intent.action.QUICK_VIEW',

  /**
   * Run action.
   */
  RUN = 'android.intent.action.RUN',

  /**
   * Screen off action.
   */
  SCREEN_OFF = 'android.intent.action.SCREEN_OFF',

  /**
   * Screen on action.
   */
  SCREEN_ON = 'android.intent.action.SCREEN_ON',

  /**
   * Set alarm action.
   */
  SET_ALARM = 'android.intent.action.SET_ALARM',

  /**
   * Set timer action.
   */
  SET_TIMER = 'android.intent.action.SET_TIMER',

  /**
   * Set wallpaper action.
   */
  SET_WALLPAPER = 'android.intent.action.SET_WALLPAPER',

  /**
   * Show alarms action.
   */
  SHOW_ALARMS = 'android.intent.action.SHOW_ALARMS',

  /**
   * Snooze alarm action.
   */
  SNOOZE_ALARM = 'android.intent.action.SNOOZE_ALARM',

  /**
   * Dismiss alarm action.
   */
  DISMISS_ALARM = 'android.intent.action.DISMISS_ALARM',

  /**
   * Dismiss timer action.
   */
  DISMISS_TIMER = 'android.intent.action.DISMISS_TIMER',

  /**
   * Sync action.
   */
  SYNC = 'android.intent.action.SYNC',

  /**
   * System tutorial action.
   */
  SYSTEM_TUTORIAL = 'android.intent.action.SYSTEM_TUTORIAL',

  /**
   * Uninstall package action.
   */
  UNINSTALL_PACKAGE = 'android.intent.action.UNINSTALL_PACKAGE',

  /**
   * Voice command action.
   */
  VOICE_COMMAND = 'android.intent.action.VOICE_COMMAND',
}
