/**
 * Capacitor Intent Launcher Plugin for launching Android intents and opening system settings on both Android and iOS.
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
   * Opens iOS settings screen.
   *
   * Note: The only officially supported option by Apple is `App` which opens your app's settings page.
   * Other options may work but are not guaranteed and could break in future iOS versions or cause App Store rejection.
   *
   * @param options - The iOS settings option to open
   * @returns Promise that resolves with success status
   * @throws Error if the settings screen cannot be opened
   * @platform iOS
   * @since 8.2.0
   * @example
   * ```typescript
   * // Open app settings (recommended - officially supported by Apple)
   * await IntentLauncher.openIOSSettings({ option: IOSSettings.App });
   *
   * // Open WiFi settings (may not work in all iOS versions)
   * await IntentLauncher.openIOSSettings({ option: IOSSettings.WiFi });
   * ```
   */
  openIOSSettings(options: IOSSettingsParams): Promise<IOSSettingsResult>;

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
 * Options for opening iOS settings.
 *
 * @since 8.2.0
 */
export interface IOSSettingsParams {
  /**
   * The iOS settings screen to open. Use values from `IOSSettings` enum.
   *
   * @since 8.2.0
   */
  option: string;
}

/**
 * Result from opening iOS settings.
 *
 * @since 8.2.0
 */
export interface IOSSettingsResult {
  /**
   * Whether the settings screen was successfully opened.
   *
   * @since 8.2.0
   */
  success: boolean;
}

/**
 * iOS settings screens for use with `openIOSSettings`.
 *
 * Note: The only officially supported option by Apple is `App`.
 * Other options use undocumented URL schemes that may break in future iOS versions
 * or cause App Store rejection.
 *
 * @since 8.2.0
 */
export enum IOSSettings {
  /**
   * Opens the About screen in Settings.
   * @platform iOS
   */
  About = 'about',

  /**
   * Opens the Accessibility settings.
   * @platform iOS
   */
  Accessibility = 'accessibility',

  /**
   * Opens your app's settings page. This is the only officially supported option by Apple.
   * @platform iOS
   */
  App = 'app',

  /**
   * Opens the app's notification settings.
   * @platform iOS 16+
   */
  AppNotification = 'appNotification',

  /**
   * Opens the Auto-Lock settings.
   * @platform iOS
   */
  AutoLock = 'autoLock',

  /**
   * Opens the Bluetooth settings.
   * @platform iOS
   */
  Bluetooth = 'bluetooth',

  /**
   * Opens the Date & Time settings.
   * @platform iOS
   */
  DateTime = 'dateTime',

  /**
   * Opens the Do Not Disturb settings.
   * @platform iOS
   */
  DoNotDisturb = 'doNotDisturb',

  /**
   * Opens the FaceTime settings.
   * @platform iOS
   */
  FaceTime = 'facetime',

  /**
   * Opens the General settings.
   * @platform iOS
   */
  General = 'general',

  /**
   * Opens the iCloud settings.
   * @platform iOS
   */
  ICloud = 'iCloud',

  /**
   * Opens the iCloud Storage & Backup settings.
   * @platform iOS
   */
  ICloudStorageBackup = 'iCloudStorageBackup',

  /**
   * Opens the Language & Region settings.
   * @platform iOS
   */
  International = 'international',

  /**
   * Opens the Keyboard settings.
   * @platform iOS
   */
  Keyboard = 'keyboard',

  /**
   * Opens the Location Services settings.
   * @platform iOS
   */
  LocationServices = 'locationServices',

  /**
   * Opens the Managed Configuration List (MDM profiles).
   * @platform iOS
   */
  ManagedConfigurationList = 'managedConfigurationList',

  /**
   * Opens the Music settings.
   * @platform iOS
   */
  Music = 'music',

  /**
   * Opens the Notes settings.
   * @platform iOS
   */
  Notes = 'notes',

  /**
   * Opens the Notifications settings.
   * @platform iOS
   */
  Notifications = 'notifications',

  /**
   * Opens the Phone settings.
   * @platform iOS
   */
  Phone = 'phone',

  /**
   * Opens the Photos settings.
   * @platform iOS
   */
  Photos = 'photos',

  /**
   * Opens the Reset settings (Transfer or Reset iPhone).
   * @platform iOS
   */
  Reset = 'reset',

  /**
   * Opens the Ringtone settings.
   * @platform iOS
   */
  Ringtone = 'ringtone',

  /**
   * Opens the Screen Time settings.
   * @platform iOS 12+
   */
  ScreenTime = 'screenTime',

  /**
   * Opens the Sounds & Haptics settings.
   * @platform iOS
   */
  Sounds = 'sounds',

  /**
   * Opens the Software Update settings.
   * @platform iOS
   */
  SoftwareUpdate = 'softwareUpdate',

  /**
   * Opens the App Store settings (iTunes & App Store).
   * @platform iOS
   */
  Store = 'store',

  /**
   * Opens the Personal Hotspot (Tethering) settings.
   * @platform iOS
   */
  Tethering = 'tethering',

  /**
   * Opens the Touch ID & Passcode / Face ID & Passcode settings.
   * @platform iOS
   */
  TouchIdPasscode = 'touchIdPasscode',

  /**
   * Opens the App Tracking Transparency settings.
   * @platform iOS 14+
   */
  Tracking = 'tracking',

  /**
   * Opens the VPN settings.
   * @platform iOS
   */
  VPN = 'vpn',

  /**
   * Opens the Wallpaper settings.
   * @platform iOS
   */
  Wallpaper = 'wallpaper',

  /**
   * Opens the WiFi settings.
   * @platform iOS
   */
  WiFi = 'wifi',
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
 * Constants are from the source code of Settings provider.
 *
 * @since 1.0.0
 */
export enum ActivityAction {
  // ============================================
  // Settings Actions (android.settings.*)
  // ============================================

  /**
   * Opens accessibility color contrast settings.
   * @platform Android 14+
   */
  ACCESSIBILITY_COLOR_CONTRAST_SETTINGS = 'android.settings.ACCESSIBILITY_COLOR_CONTRAST_SETTINGS',

  /**
   * Opens accessibility color and motion settings.
   * @platform Android 14+
   */
  ACCESSIBILITY_COLOR_MOTION_SETTINGS = 'android.settings.ACCESSIBILITY_COLOR_MOTION_SETTINGS',

  /**
   * Opens accessibility color space settings.
   */
  ACCESSIBILITY_COLOR_SPACE_SETTINGS = 'com.android.settings.ACCESSIBILITY_COLOR_SPACE_SETTINGS',

  /**
   * Opens accessibility details settings for a specific service.
   * @platform Android 12+
   */
  ACCESSIBILITY_DETAILS_SETTINGS = 'android.settings.ACCESSIBILITY_DETAILS_SETTINGS',

  /**
   * Opens accessibility settings.
   */
  ACCESSIBILITY_SETTINGS = 'android.settings.ACCESSIBILITY_SETTINGS',

  /**
   * Opens accessibility settings for setup wizard.
   */
  ACCESSIBILITY_SETTINGS_FOR_SUW = 'android.settings.ACCESSIBILITY_SETTINGS_FOR_SUW',

  /**
   * Opens accessibility shortcut settings.
   * @platform Android 8.0+
   */
  ACCESSIBILITY_SHORTCUT_SETTINGS = 'android.settings.ACCESSIBILITY_SHORTCUT_SETTINGS',

  /**
   * Opens account sync settings.
   */
  ACCOUNT_SYNC_SETTINGS = 'android.settings.ACCOUNT_SYNC_SETTINGS',

  /**
   * Opens adaptive brightness settings.
   */
  ADAPTIVE_BRIGHTNESS_SETTINGS = 'android.settings.ADAPTIVE_BRIGHTNESS_SETTINGS',

  /**
   * Opens the add account screen.
   */
  ADD_ACCOUNT_SETTINGS = 'android.settings.ADD_ACCOUNT_SETTINGS',

  /**
   * Opens advanced connected device settings.
   */
  ADVANCED_CONNECTED_DEVICE_SETTINGS = 'com.android.settings.ADVANCED_CONNECTED_DEVICE_SETTINGS',

  /**
   * Opens advanced memory protection settings.
   * @platform Android 14+
   */
  ADVANCED_MEMORY_PROTECTION_SETTINGS = 'android.settings.ADVANCED_MEMORY_PROTECTION_SETTINGS',

  /**
   * Opens airplane mode settings.
   */
  AIRPLANE_MODE_SETTINGS = 'android.settings.AIRPLANE_MODE_SETTINGS',

  /**
   * Opens all apps notification settings.
   * @platform Android 12+
   */
  ALL_APPS_NOTIFICATION_SETTINGS = 'android.settings.ALL_APPS_NOTIFICATION_SETTINGS',

  /**
   * Opens all apps notification settings for review.
   */
  ALL_APPS_NOTIFICATION_SETTINGS_FOR_REVIEW = 'android.settings.ALL_APPS_NOTIFICATION_SETTINGS_FOR_REVIEW',

  /**
   * Opens APN settings.
   */
  APN_SETTINGS = 'android.settings.APN_SETTINGS',

  /**
   * Opens app locale settings.
   * @platform Android 13+
   */
  APP_LOCALE_SETTINGS = 'android.settings.APP_LOCALE_SETTINGS',

  /**
   * Opens app memory usage settings.
   */
  APP_MEMORY_USAGE = 'android.settings.APP_MEMORY_USAGE',

  /**
   * Opens app notification bubble settings.
   * @platform Android 11+
   */
  APP_NOTIFICATION_BUBBLE_SETTINGS = 'android.settings.APP_NOTIFICATION_BUBBLE_SETTINGS',

  /**
   * Opens app notification redaction settings.
   */
  APP_NOTIFICATION_REDACTION = 'android.settings.ACTION_APP_NOTIFICATION_REDACTION',

  /**
   * Opens app notification settings.
   */
  APP_NOTIFICATION_SETTINGS = 'android.settings.APP_NOTIFICATION_SETTINGS',

  /**
   * Opens app open by default settings.
   * @platform Android 12+
   */
  APP_OPEN_BY_DEFAULT_SETTINGS = 'android.settings.APP_OPEN_BY_DEFAULT_SETTINGS',

  /**
   * Opens app storage settings.
   */
  APP_STORAGE_SETTINGS = 'com.android.settings.APP_STORAGE_SETTINGS',

  /**
   * Opens application details settings.
   */
  APPLICATION_DETAILS_SETTINGS = 'android.settings.APPLICATION_DETAILS_SETTINGS',

  /**
   * Opens application development settings (developer options).
   */
  APPLICATION_DEVELOPMENT_SETTINGS = 'android.settings.APPLICATION_DEVELOPMENT_SETTINGS',

  /**
   * Opens application settings.
   */
  APPLICATION_SETTINGS = 'android.settings.APPLICATION_SETTINGS',

  /**
   * Opens audio stream dialog.
   */
  AUDIO_STREAM_DIALOG = 'android.settings.AUDIO_STREAM_DIALOG',

  /**
   * Opens auto rotate settings.
   * @platform Android 11+
   */
  AUTO_ROTATE_SETTINGS = 'android.settings.AUTO_ROTATE_SETTINGS',

  /**
   * Opens automatic zen rule settings.
   */
  AUTOMATIC_ZEN_RULE_SETTINGS = 'android.settings.AUTOMATIC_ZEN_RULE_SETTINGS',

  /**
   * Opens backup settings.
   */
  BACKUP_SETTINGS = 'com.android.settings.BACKUP_SETTINGS',

  /**
   * Opens advanced battery power usage settings.
   */
  BATTERY_POWER_USAGE_ADVANCED = 'com.android.settings.battery.action.POWER_USAGE_ADVANCED',

  /**
   * Opens battery saver schedule settings.
   */
  BATTERY_SAVER_SCHEDULE_SETTINGS = 'com.android.settings.BATTERY_SAVER_SCHEDULE_SETTINGS',

  /**
   * Opens battery saver settings.
   */
  BATTERY_SAVER_SETTINGS = 'android.settings.BATTERY_SAVER_SETTINGS',

  /**
   * Opens biometric enrollment settings.
   * @platform Android 11+
   */
  BIOMETRIC_ENROLL = 'android.settings.BIOMETRIC_ENROLL',

  /**
   * Opens biometric settings provider.
   */
  BIOMETRIC_SETTINGS_PROVIDER = 'com.android.settings.biometrics.BIOMETRIC_SETTINGS_PROVIDER',

  /**
   * Opens Bluetooth audio sharing settings.
   * @platform Android 15+
   */
  BLUETOOTH_AUDIO_SHARING_SETTINGS = 'com.android.settings.BLUETOOTH_AUDIO_SHARING_SETTINGS',

  /**
   * Opens Bluetooth dashboard settings.
   */
  BLUETOOTH_DASHBOARD_SETTINGS = 'android.settings.BLUETOOTH_DASHBOARD_SETTINGS',

  /**
   * Opens Bluetooth device detail settings.
   */
  BLUETOOTH_DEVICE_DETAIL_SETTINGS = 'com.android.settings.BLUETOOTH_DEVICE_DETAIL_SETTINGS',

  /**
   * Opens Bluetooth LE audio QR code scanner.
   */
  BLUETOOTH_LE_AUDIO_QR_CODE_SCANNER = 'android.settings.BLUETOOTH_LE_AUDIO_QR_CODE_SCANNER',

  /**
   * Opens Bluetooth pairing settings.
   */
  BLUETOOTH_PAIRING_SETTINGS = 'android.settings.BLUETOOTH_PAIRING_SETTINGS',

  /**
   * Opens Bluetooth settings.
   */
  BLUETOOTH_SETTINGS = 'android.settings.BLUETOOTH_SETTINGS',

  /**
   * Opens Bluetooth find broadcasts activity.
   */
  BLUETOOTH_FIND_BROADCASTS_ACTIVITY = 'android.settings.BLUTOOTH_FIND_BROADCASTS_ACTIVITY',

  /**
   * Opens bug report handler settings.
   * @platform Android 10+
   */
  BUGREPORT_HANDLER_SETTINGS = 'android.settings.BUGREPORT_HANDLER_SETTINGS',

  /**
   * Opens button navigation settings.
   */
  BUTTON_NAVIGATION_SETTINGS = 'com.android.settings.BUTTON_NAVIGATION_SETTINGS',

  /**
   * Opens captioning settings.
   */
  CAPTIONING_SETTINGS = 'android.settings.CAPTIONING_SETTINGS',

  /**
   * Opens cast settings.
   */
  CAST_SETTINGS = 'android.settings.CAST_SETTINGS',

  /**
   * Opens cellular network security settings.
   * @platform Android 15+
   */
  CELLULAR_NETWORK_SECURITY = 'android.settings.CELLULAR_NETWORK_SECURITY',

  /**
   * Opens channel notification settings.
   * @platform Android 8.0+
   */
  CHANNEL_NOTIFICATION_SETTINGS = 'android.settings.CHANNEL_NOTIFICATION_SETTINGS',

  /**
   * Opens color inversion settings.
   */
  COLOR_INVERSION_SETTINGS = 'android.settings.COLOR_INVERSION_SETTINGS',

  /**
   * Opens combined biometrics settings.
   */
  COMBINED_BIOMETRICS_SETTINGS = 'android.settings.COMBINED_BIOMETRICS_SETTINGS',

  /**
   * Opens communal settings.
   * @platform Android 15+
   */
  COMMUNAL_SETTINGS = 'android.settings.COMMUNAL_SETTINGS',

  /**
   * Opens condition provider settings (Do Not Disturb rules).
   */
  CONDITION_PROVIDER_SETTINGS = 'android.settings.ACTION_CONDITION_PROVIDER_SETTINGS',

  /**
   * Opens conversation settings.
   * @platform Android 11+
   */
  CONVERSATION_SETTINGS = 'android.settings.CONVERSATION_SETTINGS',

  /**
   * Opens credential provider settings.
   * @platform Android 14+
   */
  CREDENTIAL_PROVIDER = 'android.settings.CREDENTIAL_PROVIDER',

  /**
   * Opens dark theme settings.
   * @platform Android 10+
   */
  DARK_THEME_SETTINGS = 'android.settings.DARK_THEME_SETTINGS',

  /**
   * Opens data roaming settings.
   */
  DATA_ROAMING_SETTINGS = 'android.settings.DATA_ROAMING_SETTINGS',

  /**
   * Opens data saver settings.
   * @platform Android 7.0+
   */
  DATA_SAVER_SETTINGS = 'android.settings.DATA_SAVER_SETTINGS',

  /**
   * Opens data usage settings.
   */
  DATA_USAGE_SETTINGS = 'android.settings.DATA_USAGE_SETTINGS',

  /**
   * Opens date settings.
   */
  DATE_SETTINGS = 'android.settings.DATE_SETTINGS',

  /**
   * Starts DSU loader for development.
   */
  DEVELOPMENT_START_DSU_LOADER = 'android.settings.development.START_DSU_LOADER',

  /**
   * Opens device info settings.
   */
  DEVICE_INFO_SETTINGS = 'android.settings.DEVICE_INFO_SETTINGS',

  /**
   * Opens device name settings.
   */
  DEVICE_NAME = 'android.settings.DEVICE_NAME',

  /**
   * Opens display settings.
   */
  DISPLAY_SETTINGS = 'android.settings.DISPLAY_SETTINGS',

  /**
   * Opens dream settings (screen saver).
   */
  DREAM_SETTINGS = 'android.settings.DREAM_SETTINGS',

  /**
   * Opens enterprise privacy settings.
   * @platform Android 7.0+
   */
  ENTERPRISE_PRIVACY_SETTINGS = 'android.settings.ENTERPRISE_PRIVACY_SETTINGS',

  /**
   * Opens face enrollment settings.
   * @platform Android 11+
   */
  FACE_ENROLL = 'android.settings.FACE_ENROLL',

  /**
   * Opens face settings.
   * @platform Android 10+
   */
  FACE_SETTINGS = 'android.settings.FACE_SETTINGS',

  /**
   * Opens factory reset settings.
   */
  FACTORY_RESET = 'com.android.settings.action.FACTORY_RESET',

  /**
   * Opens fingerprint enrollment settings.
   */
  FINGERPRINT_ENROLL = 'android.settings.FINGERPRINT_ENROLL',

  /**
   * Opens fingerprint settings.
   */
  FINGERPRINT_SETTINGS = 'android.settings.FINGERPRINT_SETTINGS',

  /**
   * Opens fingerprint settings v2.
   */
  FINGERPRINT_SETTINGS_V2 = 'android.settings.FINGERPRINT_SETTINGS_V2',

  /**
   * Opens fingerprint setup.
   */
  FINGERPRINT_SETUP = 'android.settings.FINGERPRINT_SETUP',

  /**
   * Opens first day of week settings.
   * @platform Android 14+
   */
  FIRST_DAY_OF_WEEK_SETTINGS = 'android.settings.FIRST_DAY_OF_WEEK_SETTINGS',

  /**
   * Opens gesture navigation settings.
   */
  GESTURE_NAVIGATION_SETTINGS = 'com.android.settings.GESTURE_NAVIGATION_SETTINGS',

  /**
   * Opens hard keyboard layout picker settings.
   */
  HARD_KEYBOARD_LAYOUT_PICKER_SETTINGS = 'android.settings.HARD_KEYBOARD_LAYOUT_PICKER_SETTINGS',

  /**
   * Opens hard keyboard settings.
   */
  HARD_KEYBOARD_SETTINGS = 'android.settings.HARD_KEYBOARD_SETTINGS',

  /**
   * Opens hearing devices pairing settings.
   * @platform Android 13+
   */
  HEARING_DEVICES_PAIRING_SETTINGS = 'android.settings.HEARING_DEVICES_PAIRING_SETTINGS',

  /**
   * Opens hearing devices settings.
   * @platform Android 13+
   */
  HEARING_DEVICES_SETTINGS = 'android.settings.HEARING_DEVICES_SETTINGS',

  /**
   * Opens home settings.
   */
  HOME_SETTINGS = 'android.settings.HOME_SETTINGS',

  /**
   * Opens IA settings.
   */
  IA_SETTINGS = 'com.android.settings.action.IA_SETTINGS',

  /**
   * Opens ignore background data restrictions settings.
   * @platform Android 7.0+
   */
  IGNORE_BACKGROUND_DATA_RESTRICTIONS_SETTINGS = 'android.settings.IGNORE_BACKGROUND_DATA_RESTRICTIONS_SETTINGS',

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
   * Opens language settings.
   */
  LANGUAGE_SETTINGS = 'android.settings.LANGUAGE_SETTINGS',

  /**
   * Opens license information.
   */
  LICENSE = 'android.settings.LICENSE',

  /**
   * Opens locale settings.
   */
  LOCALE_SETTINGS = 'android.settings.LOCALE_SETTINGS',

  /**
   * Opens location scanning settings.
   */
  LOCATION_SCANNING_SETTINGS = 'android.settings.LOCATION_SCANNING_SETTINGS',

  /**
   * Opens location source settings.
   */
  LOCATION_SOURCE_SETTINGS = 'android.settings.LOCATION_SOURCE_SETTINGS',

  /**
   * Opens lock screen settings.
   * @platform Android 10+
   */
  LOCK_SCREEN_SETTINGS = 'android.settings.LOCK_SCREEN_SETTINGS',

  /**
   * Opens manage adaptive notifications settings.
   */
  MANAGE_ADAPTIVE_NOTIFICATIONS = 'android.settings.MANAGE_ADAPTIVE_NOTIFICATIONS',

  /**
   * Opens manage all applications settings.
   */
  MANAGE_ALL_APPLICATIONS_SETTINGS = 'android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS',

  /**
   * Opens manage all files access permission settings.
   * @platform Android 11+
   */
  MANAGE_ALL_FILES_ACCESS_PERMISSION = 'android.settings.MANAGE_ALL_FILES_ACCESS_PERMISSION',

  /**
   * Opens manage all SIM profiles settings.
   * @platform Android 12+
   */
  MANAGE_ALL_SIM_PROFILES_SETTINGS = 'android.settings.MANAGE_ALL_SIM_PROFILES_SETTINGS',

  /**
   * Opens manage app all files access permission settings.
   * @platform Android 11+
   */
  MANAGE_APP_ALL_FILES_ACCESS_PERMISSION = 'android.settings.MANAGE_APP_ALL_FILES_ACCESS_PERMISSION',

  /**
   * Opens manage app long running jobs settings.
   * @platform Android 14+
   */
  MANAGE_APP_LONG_RUNNING_JOBS = 'android.settings.MANAGE_APP_LONG_RUNNING_JOBS',

  /**
   * Opens manage app overlay permission settings.
   * @platform Android 11+
   */
  MANAGE_APP_OVERLAY_PERMISSION = 'android.settings.MANAGE_APP_OVERLAY_PERMISSION',

  /**
   * Opens manage app use full screen intent settings.
   * @platform Android 14+
   */
  MANAGE_APP_USE_FULL_SCREEN_INTENT = 'android.settings.MANAGE_APP_USE_FULL_SCREEN_INTENT',

  /**
   * Opens manage applications settings.
   */
  MANAGE_APPLICATIONS_SETTINGS = 'android.settings.MANAGE_APPLICATIONS_SETTINGS',

  /**
   * Opens manage cloned apps settings.
   * @platform Android 14+
   */
  MANAGE_CLONED_APPS_SETTINGS = 'android.settings.MANAGE_CLONED_APPS_SETTINGS',

  /**
   * Opens manage cross profile access settings.
   * @platform Android 11+
   */
  MANAGE_CROSS_PROFILE_ACCESS = 'android.settings.MANAGE_CROSS_PROFILE_ACCESS',

  /**
   * Opens manage default apps settings.
   */
  MANAGE_DEFAULT_APPS_SETTINGS = 'android.settings.MANAGE_DEFAULT_APPS_SETTINGS',

  /**
   * Opens manage domain URLs settings.
   * @platform Android 12+
   */
  MANAGE_DOMAIN_URLS = 'android.settings.MANAGE_DOMAIN_URLS',

  /**
   * Opens manage overlay permission settings.
   * @platform Android 6.0+
   */
  MANAGE_OVERLAY_PERMISSION = 'android.settings.action.MANAGE_OVERLAY_PERMISSION',

  /**
   * Opens manage unknown app sources settings.
   * @platform Android 8.0+
   */
  MANAGE_UNKNOWN_APP_SOURCES = 'android.settings.MANAGE_UNKNOWN_APP_SOURCES',

  /**
   * Opens manage user aspect ratio settings.
   * @platform Android 14+
   */
  MANAGE_USER_ASPECT_RATIO_SETTINGS = 'android.settings.MANAGE_USER_ASPECT_RATIO_SETTINGS',

  /**
   * Opens manage write settings.
   * @platform Android 6.0+
   */
  MANAGE_WRITE_SETTINGS = 'android.settings.action.MANAGE_WRITE_SETTINGS',

  /**
   * Opens managed profile settings.
   */
  MANAGED_PROFILE_SETTINGS = 'android.settings.MANAGED_PROFILE_SETTINGS',

  /**
   * Opens media broadcast dialog.
   */
  MEDIA_BROADCAST_DIALOG = 'android.settings.MEDIA_BROADCAST_DIALOG',

  /**
   * Opens media controls settings.
   * @platform Android 11+
   */
  MEDIA_CONTROLS_SETTINGS = 'android.settings.ACTION_MEDIA_CONTROLS_SETTINGS',

  /**
   * Opens memory card settings.
   */
  MEMORY_CARD_SETTINGS = 'android.settings.MEMORY_CARD_SETTINGS',

  /**
   * Opens MMS message settings.
   */
  MMS_MESSAGE_SETTING = 'android.settings.MMS_MESSAGE_SETTING',

  /**
   * Opens mobile data usage settings.
   */
  MOBILE_DATA_USAGE = 'android.settings.MOBILE_DATA_USAGE',

  /**
   * Opens mobile network list settings.
   */
  MOBILE_NETWORK_LIST = 'android.settings.MOBILE_NETWORK_LIST',

  /**
   * Opens module licenses.
   */
  MODULE_LICENSES = 'android.settings.MODULE_LICENSES',

  /**
   * Opens monitoring cert info.
   */
  MONITORING_CERT_INFO = 'com.android.settings.MONITORING_CERT_INFO',

  /**
   * Opens more security and privacy settings.
   */
  MORE_SECURITY_PRIVACY_SETTINGS = 'com.android.settings.MORE_SECURITY_PRIVACY_SETTINGS',

  /**
   * Opens navigation mode settings.
   */
  NAVIGATION_MODE_SETTINGS = 'com.android.settings.NAVIGATION_MODE_SETTINGS',

  /**
   * Opens network operator settings.
   */
  NETWORK_OPERATOR_SETTINGS = 'android.settings.NETWORK_OPERATOR_SETTINGS',

  /**
   * Opens network provider settings.
   */
  NETWORK_PROVIDER_SETTINGS = 'android.settings.NETWORK_PROVIDER_SETTINGS',

  /**
   * Opens NFC settings.
   */
  NFC_SETTINGS = 'android.settings.NFC_SETTINGS',

  /**
   * Opens night display settings (blue light filter).
   */
  NIGHT_DISPLAY_SETTINGS = 'android.settings.NIGHT_DISPLAY_SETTINGS',

  /**
   * Opens notification assistant settings.
   * @platform Android 10+
   */
  NOTIFICATION_ASSISTANT_SETTINGS = 'android.settings.NOTIFICATION_ASSISTANT_SETTINGS',

  /**
   * Opens notification history.
   * @platform Android 11+
   */
  NOTIFICATION_HISTORY = 'android.settings.NOTIFICATION_HISTORY',

  /**
   * Opens notification listener detail settings.
   */
  NOTIFICATION_LISTENER_DETAIL_SETTINGS = 'android.settings.NOTIFICATION_LISTENER_DETAIL_SETTINGS',

  /**
   * Opens notification listener settings.
   */
  NOTIFICATION_LISTENER_SETTINGS = 'android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS',

  /**
   * Opens notification policy access detail settings.
   */
  NOTIFICATION_POLICY_ACCESS_DETAIL_SETTINGS = 'android.settings.NOTIFICATION_POLICY_ACCESS_DETAIL_SETTINGS',

  /**
   * Opens notification policy access settings (Do Not Disturb access).
   */
  NOTIFICATION_POLICY_ACCESS_SETTINGS = 'android.settings.NOTIFICATION_POLICY_ACCESS_SETTINGS',

  /**
   * Opens notification settings.
   */
  NOTIFICATION_SETTINGS = 'android.settings.NOTIFICATION_SETTINGS',

  /**
   * Opens one-handed mode settings.
   * @platform Android 12+
   */
  ONE_HANDED_SETTINGS = 'android.settings.action.ONE_HANDED_SETTINGS',

  /**
   * Opens private space settings.
   * @platform Android 15+
   */
  OPEN_PRIVATE_SPACE_SETTINGS = 'com.android.settings.action.OPEN_PRIVATE_SPACE_SETTINGS',

  /**
   * Opens other sound settings.
   */
  OTHER_SOUND_SETTINGS = 'android.settings.ACTION_OTHER_SOUND_SETTINGS',

  /**
   * Opens internet connectivity panel.
   * @platform Android 10+
   */
  PANEL_INTERNET_CONNECTIVITY = 'android.settings.panel.action.INTERNET_CONNECTIVITY',

  /**
   * Opens NFC panel.
   * @platform Android 10+
   */
  PANEL_NFC = 'android.settings.panel.action.NFC',

  /**
   * Opens volume panel.
   * @platform Android 10+
   */
  PANEL_VOLUME = 'android.settings.panel.action.VOLUME',

  /**
   * Opens WiFi panel.
   * @platform Android 10+
   */
  PANEL_WIFI = 'android.settings.panel.action.WIFI',

  /**
   * Opens picture-in-picture settings.
   * @platform Android 8.0+
   */
  PICTURE_IN_PICTURE_SETTINGS = 'android.settings.PICTURE_IN_PICTURE_SETTINGS',

  /**
   * Opens power menu settings.
   * @platform Android 11+
   */
  POWER_MENU_SETTINGS = 'android.settings.ACTION_POWER_MENU_SETTINGS',

  /**
   * Opens premium SMS settings.
   */
  PREMIUM_SMS_SETTINGS = 'android.settings.PREMIUM_SMS_SETTINGS',

  /**
   * Opens previously connected device settings.
   */
  PREVIOUSLY_CONNECTED_DEVICE = 'com.android.settings.PREVIOUSLY_CONNECTED_DEVICE',

  /**
   * Opens print settings.
   */
  PRINT_SETTINGS = 'android.settings.ACTION_PRINT_SETTINGS',

  /**
   * Opens privacy advanced settings.
   */
  PRIVACY_ADVANCED_SETTINGS = 'android.settings.PRIVACY_ADVANCED_SETTINGS',

  /**
   * Opens privacy controls.
   * @platform Android 12+
   */
  PRIVACY_CONTROLS = 'android.settings.PRIVACY_CONTROLS',

  /**
   * Opens privacy settings.
   */
  PRIVACY_SETTINGS = 'android.settings.PRIVACY_SETTINGS',

  /**
   * Processes WiFi easy connect URI.
   * @platform Android 10+
   */
  PROCESS_WIFI_EASY_CONNECT_URI = 'android.settings.PROCESS_WIFI_EASY_CONNECT_URI',

  /**
   * Opens reduce bright colors settings.
   * @platform Android 12+
   */
  REDUCE_BRIGHT_COLORS_SETTINGS = 'android.settings.REDUCE_BRIGHT_COLORS_SETTINGS',

  /**
   * Opens regional preferences settings.
   * @platform Android 14+
   */
  REGIONAL_PREFERENCES_SETTINGS = 'android.settings.REGIONAL_PREFERENCES_SETTINGS',

  /**
   * Opens remote authenticator enrollment.
   */
  REMOTE_AUTHENTICATOR_ENROLL = 'android.settings.REMOTE_AUTHENTICATOR_ENROLL',

  /**
   * Requests enable content capture.
   */
  REQUEST_ENABLE_CONTENT_CAPTURE = 'android.settings.REQUEST_ENABLE_CONTENT_CAPTURE',

  /**
   * Requests ignore battery optimizations for a specific app.
   */
  REQUEST_IGNORE_BATTERY_OPTIMIZATIONS = 'android.settings.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',

  /**
   * Requests manage media permission.
   * @platform Android 12+
   */
  REQUEST_MANAGE_MEDIA = 'android.settings.REQUEST_MANAGE_MEDIA',

  /**
   * Requests media routing control.
   * @platform Android 14+
   */
  REQUEST_MEDIA_ROUTING_CONTROL = 'android.settings.REQUEST_MEDIA_ROUTING_CONTROL',

  /**
   * Requests schedule exact alarm permission.
   * @platform Android 12+
   */
  REQUEST_SCHEDULE_EXACT_ALARM = 'android.settings.REQUEST_SCHEDULE_EXACT_ALARM',

  /**
   * Requests set autofill service.
   * @platform Android 8.0+
   */
  REQUEST_SET_AUTOFILL_SERVICE = 'android.settings.REQUEST_SET_AUTOFILL_SERVICE',

  /**
   * Opens satellite settings.
   * @platform Android 15+
   */
  SATELLITE_SETTING = 'android.settings.SATELLITE_SETTING',

  /**
   * Opens screen timeout settings.
   */
  SCREEN_TIMEOUT_SETTINGS = 'android.settings.SCREEN_TIMEOUT_SETTINGS',

  /**
   * Opens search result trampoline.
   */
  SEARCH_RESULT_TRAMPOLINE = 'com.android.settings.SEARCH_RESULT_TRAMPOLINE',

  /**
   * Opens security advanced settings.
   */
  SECURITY_ADVANCED_SETTINGS = 'com.android.settings.security.SECURITY_ADVANCED_SETTINGS',

  /**
   * Opens security settings.
   */
  SECURITY_SETTINGS = 'android.settings.SECURITY_SETTINGS',

  /**
   * Opens main settings screen.
   */
  SETTINGS = 'android.settings.SETTINGS',

  /**
   * Opens settings embed deep link activity.
   */
  SETTINGS_EMBED_DEEP_LINK_ACTIVITY = 'android.settings.SETTINGS_EMBED_DEEP_LINK_ACTIVITY',

  /**
   * Opens setup lock screen.
   */
  SETUP_LOCK_SCREEN = 'com.android.settings.SETUP_LOCK_SCREEN',

  /**
   * Shows admin support details.
   */
  SHOW_ADMIN_SUPPORT_DETAILS = 'android.settings.SHOW_ADMIN_SUPPORT_DETAILS',

  /**
   * Shows device manual.
   */
  SHOW_MANUAL = 'android.settings.SHOW_MANUAL',

  /**
   * Shows regulatory info.
   */
  SHOW_REGULATORY_INFO = 'android.settings.SHOW_REGULATORY_INFO',

  /**
   * Shows remote bug report dialog.
   */
  SHOW_REMOTE_BUGREPORT_DIALOG = 'android.settings.SHOW_REMOTE_BUGREPORT_DIALOG',

  /**
   * Shows restricted setting dialog.
   * @platform Android 13+
   */
  SHOW_RESTRICTED_SETTING_DIALOG = 'android.settings.SHOW_RESTRICTED_SETTING_DIALOG',

  /**
   * Opens SIM preference settings.
   */
  SIM_PREFERENCE_SETTINGS = 'android.settings.SIM_PREFERENCE_SETTINGS',

  /**
   * Opens SIM subscription info settings.
   */
  SIM_SUB_INFO_SETTINGS = 'com.android.settings.sim.SIM_SUB_INFO_SETTINGS',

  /**
   * Opens sound settings.
   */
  SOUND_SETTINGS = 'android.settings.SOUND_SETTINGS',

  /**
   * Opens SPA search landing.
   */
  SPA_SEARCH_LANDING = 'android.settings.SPA_SEARCH_LANDING',

  /**
   * Opens storage manager settings.
   */
  STORAGE_MANAGER_SETTINGS = 'android.settings.STORAGE_MANAGER_SETTINGS',

  /**
   * Opens stylus USI details settings.
   */
  STYLUS_USI_DETAILS_SETTINGS = 'com.android.settings.STYLUS_USI_DETAILS_SETTINGS',

  /**
   * Opens suggestion state provider.
   */
  SUGGESTION_STATE_PROVIDER = 'com.android.settings.action.SUGGESTION_STATE_PROVIDER',

  /**
   * Opens support settings.
   */
  SUPPORT_SETTINGS = 'com.android.settings.action.SUPPORT_SETTINGS',

  /**
   * Opens sync settings.
   */
  SYNC_SETTINGS = 'android.settings.SYNC_SETTINGS',

  /**
   * Opens temperature unit settings.
   * @platform Android 14+
   */
  TEMPERATURE_UNIT_SETTINGS = 'android.settings.TEMPERATURE_UNIT_SETTINGS',

  /**
   * Opens tether provisioning UI.
   */
  TETHER_PROVISIONING_UI = 'android.settings.TETHER_PROVISIONING_UI',

  /**
   * Opens tethering/hotspot settings.
   */
  TETHER_SETTINGS = 'android.settings.TETHER_SETTINGS',

  /**
   * Opens tether unsupported carrier UI.
   */
  TETHER_UNSUPPORTED_CARRIER_UI = 'android.settings.TETHER_UNSUPPORTED_CARRIER_UI',

  /**
   * Opens text reading settings.
   * @platform Android 13+
   */
  TEXT_READING_SETTINGS = 'android.settings.TEXT_READING_SETTINGS',

  /**
   * Opens trusted credentials.
   */
  TRUSTED_CREDENTIALS = 'com.android.settings.TRUSTED_CREDENTIALS',

  /**
   * Opens trusted credentials for user.
   */
  TRUSTED_CREDENTIALS_USER = 'com.android.settings.TRUSTED_CREDENTIALS_USER',

  /**
   * Opens text-to-speech settings.
   */
  TTS_SETTINGS = 'com.android.settings.TTS_SETTINGS',

  /**
   * Opens turn screen on settings.
   * @platform Android 12+
   */
  TURN_SCREEN_ON_SETTINGS = 'android.settings.TURN_SCREEN_ON_SETTINGS',

  /**
   * Opens usage access settings.
   */
  USAGE_ACCESS_SETTINGS = 'android.settings.USAGE_ACCESS_SETTINGS',

  /**
   * Opens user dictionary insert.
   */
  USER_DICTIONARY_INSERT = 'android.settings.USER_DICTIONARY_INSERT',

  /**
   * Opens user dictionary settings.
   */
  USER_DICTIONARY_SETTINGS = 'android.settings.USER_DICTIONARY_SETTINGS',

  /**
   * Opens user settings.
   */
  USER_SETTINGS = 'android.settings.USER_SETTINGS',

  /**
   * Opens advanced power usage detail.
   */
  VIEW_ADVANCED_POWER_USAGE_DETAIL = 'android.settings.VIEW_ADVANCED_POWER_USAGE_DETAIL',

  /**
   * Voice control for airplane mode.
   */
  VOICE_CONTROL_AIRPLANE_MODE = 'android.settings.VOICE_CONTROL_AIRPLANE_MODE',

  /**
   * Voice control for battery saver mode.
   */
  VOICE_CONTROL_BATTERY_SAVER_MODE = 'android.settings.VOICE_CONTROL_BATTERY_SAVER_MODE',

  /**
   * Voice control for do not disturb mode.
   */
  VOICE_CONTROL_DO_NOT_DISTURB_MODE = 'android.settings.VOICE_CONTROL_DO_NOT_DISTURB_MODE',

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
   * Opens wallpaper settings.
   */
  WALLPAPER_SETTINGS = 'android.settings.WALLPAPER_SETTINGS',

  /**
   * Opens WebView settings.
   */
  WEBVIEW_SETTINGS = 'android.settings.WEBVIEW_SETTINGS',

  /**
   * Opens WiFi add networks settings.
   * @platform Android 11+
   */
  WIFI_ADD_NETWORKS = 'android.settings.WIFI_ADD_NETWORKS',

  /**
   * Opens WiFi calling settings.
   */
  WIFI_CALLING_SETTINGS = 'android.settings.WIFI_CALLING_SETTINGS',

  /**
   * Opens WiFi details settings.
   */
  WIFI_DETAILS_SETTINGS = 'android.settings.WIFI_DETAILS_SETTINGS',

  /**
   * Opens WiFi dialog.
   */
  WIFI_DIALOG = 'com.android.settings.WIFI_DIALOG',

  /**
   * Opens WiFi DPP configurator auth QR code generator.
   */
  WIFI_DPP_CONFIGURATOR_AUTH_QR_CODE_GENERATOR = 'android.settings.WIFI_DPP_CONFIGURATOR_AUTH_QR_CODE_GENERATOR',

  /**
   * Opens WiFi DPP configurator QR code generator.
   * @platform Android 10+
   */
  WIFI_DPP_CONFIGURATOR_QR_CODE_GENERATOR = 'android.settings.WIFI_DPP_CONFIGURATOR_QR_CODE_GENERATOR',

  /**
   * Opens WiFi DPP configurator QR code scanner.
   * @platform Android 10+
   */
  WIFI_DPP_CONFIGURATOR_QR_CODE_SCANNER = 'android.settings.WIFI_DPP_CONFIGURATOR_QR_CODE_SCANNER',

  /**
   * Opens WiFi DPP enrollee QR code scanner.
   * @platform Android 10+
   */
  WIFI_DPP_ENROLLEE_QR_CODE_SCANNER = 'android.settings.WIFI_DPP_ENROLLEE_QR_CODE_SCANNER',

  /**
   * Opens WiFi IP settings.
   */
  WIFI_IP_SETTINGS = 'android.settings.WIFI_IP_SETTINGS',

  /**
   * Opens WiFi network request.
   */
  WIFI_NETWORK_REQUEST = 'com.android.settings.wifi.action.NETWORK_REQUEST',

  /**
   * Opens WiFi saved network settings.
   */
  WIFI_SAVED_NETWORK_SETTINGS = 'android.settings.WIFI_SAVED_NETWORK_SETTINGS',

  /**
   * Opens WiFi scanning settings.
   */
  WIFI_SCANNING_SETTINGS = 'android.settings.WIFI_SCANNING_SETTINGS',

  /**
   * Opens WiFi settings.
   */
  WIFI_SETTINGS = 'android.settings.WIFI_SETTINGS',

  /**
   * Opens WiFi tether settings.
   */
  WIFI_TETHER_SETTINGS = 'com.android.settings.WIFI_TETHER_SETTINGS',

  /**
   * Opens wireless settings.
   */
  WIRELESS_SETTINGS = 'android.settings.WIRELESS_SETTINGS',

  /**
   * Opens zen mode automation settings.
   */
  ZEN_MODE_AUTOMATION_SETTINGS = 'android.settings.ZEN_MODE_AUTOMATION_SETTINGS',

  /**
   * Opens zen mode event rule settings.
   */
  ZEN_MODE_EVENT_RULE_SETTINGS = 'android.settings.ZEN_MODE_EVENT_RULE_SETTINGS',

  /**
   * Opens zen mode priority settings.
   */
  ZEN_MODE_PRIORITY_SETTINGS = 'android.settings.ZEN_MODE_PRIORITY_SETTINGS',

  /**
   * Opens zen mode schedule rule settings.
   */
  ZEN_MODE_SCHEDULE_RULE_SETTINGS = 'android.settings.ZEN_MODE_SCHEDULE_RULE_SETTINGS',

  /**
   * Opens zen mode (Do Not Disturb) settings.
   */
  ZEN_MODE_SETTINGS = 'android.settings.ZEN_MODE_SETTINGS',

  // ============================================
  // Intent Actions (android.intent.action.*)
  // ============================================

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
   * Call action for making phone calls.
   * Requires CALL_PHONE permission.
   */
  CALL = 'android.intent.action.CALL',

  /**
   * Chooser action for showing an app chooser.
   */
  CHOOSER = 'android.intent.action.CHOOSER',

  /**
   * Create document action.
   */
  CREATE_DOCUMENT = 'android.intent.action.CREATE_DOCUMENT',

  /**
   * Create shortcut action.
   */
  CREATE_SHORTCUT = 'android.intent.action.CREATE_SHORTCUT',

  /**
   * Delete action for deleting data.
   */
  DELETE = 'android.intent.action.DELETE',

  /**
   * Dial action for opening the dialer with a number.
   */
  DIAL = 'android.intent.action.DIAL',

  /**
   * Dismiss alarm action.
   */
  DISMISS_ALARM = 'android.intent.action.DISMISS_ALARM',

  /**
   * Dismiss timer action.
   */
  DISMISS_TIMER = 'android.intent.action.DISMISS_TIMER',

  /**
   * Edit action for editing data.
   */
  EDIT = 'android.intent.action.EDIT',

  /**
   * Get content action for retrieving content.
   */
  GET_CONTENT = 'android.intent.action.GET_CONTENT',

  /**
   * Insert action for inserting data.
   */
  INSERT = 'android.intent.action.INSERT',

  /**
   * Main action for launching an app's main activity.
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
   * Pick action for picking data.
   */
  PICK = 'android.intent.action.PICK',

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
   * Search action.
   */
  SEARCH = 'android.intent.action.SEARCH',

  /**
   * Send action for sending data.
   */
  SEND = 'android.intent.action.SEND',

  /**
   * Send multiple action for sending multiple items.
   */
  SEND_MULTIPLE = 'android.intent.action.SEND_MULTIPLE',

  /**
   * Sendto action for sending to a specific recipient.
   */
  SENDTO = 'android.intent.action.SENDTO',

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
   * View action for viewing data (URLs, files, etc.).
   */
  VIEW = 'android.intent.action.VIEW',

  /**
   * Voice command action.
   */
  VOICE_COMMAND = 'android.intent.action.VOICE_COMMAND',

  /**
   * Web search action.
   */
  WEB_SEARCH = 'android.intent.action.WEB_SEARCH',

  // ============================================
  // Search Actions (android.search.action.*)
  // ============================================

  /**
   * Opens search settings.
   */
  SEARCH_SETTINGS = 'android.search.action.SEARCH_SETTINGS',

  // ============================================
  // Legacy/Deprecated Actions (kept for compatibility)
  // ============================================

  /**
   * Opens add account screen.
   * @deprecated Use ADD_ACCOUNT_SETTINGS instead.
   */
  ADD_ACCOUNT = 'android.settings.ADD_ACCOUNT_SETTINGS',

  /**
   * Opens NFC payment settings.
   * @deprecated NFC payment settings are now part of NFC_SETTINGS.
   */
  NFC_PAYMENT_SETTINGS = 'android.settings.NFC_PAYMENT_SETTINGS',

  /**
   * Opens quick launch settings.
   * @deprecated Quick launch is no longer available in modern Android.
   */
  QUICK_LAUNCH_SETTINGS = 'android.settings.QUICK_LAUNCH_SETTINGS',
}
