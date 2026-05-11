# @capgo/capacitor-intent-launcher
<a href="https://capgo.app/"><img src="https://capgo.app/readme-banner.svg?repo=Cap-go/capacitor-intent-launcher" alt="Capgo - Instant updates for Capacitor" /></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_intent_launcher"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_intent_launcher"> Missing a feature? We'll build the plugin for you 💪</a></h2>
</div>

Launch Android intents and open system settings screens on Android and iOS from your Capacitor app.

## Why Capacitor Intent Launcher?

A simple, **free**, and **lightweight** intent launcher plugin for both Android and iOS:

- **System settings access** - Open any Android settings screen (WiFi, Bluetooth, Location, etc.) or iOS settings screens
- **iOS settings support** - Open iOS settings screens including app settings, WiFi, Bluetooth, notifications, and more
- **App launching** - Open any installed application by package name (Android)
- **App icon retrieval** - Get application icons as base64-encoded images (Android)
- **Full intent support** - Pass extras, flags, data URIs, and MIME types (Android)
- **Activity results** - Receive result codes and data from launched activities (Android)
- **Zero dependencies** - Minimal footprint, no bloat

Perfect for apps that need to guide users to system settings on both platforms.

## Documentation

The most complete doc is available here: https://capgo.app/docs/plugins/intent-launcher/

## Compatibility

| Plugin version | Capacitor compatibility | Maintained |
| -------------- | ----------------------- | ---------- |
| v8.\*.\*       | v8.\*.\*                | ✅          |
| v7.\*.\*       | v7.\*.\*                | On demand   |
| v6.\*.\*       | v6.\*.\*                | ❌          |
| v5.\*.\*       | v5.\*.\*                | ❌          |

> **Note:** The major version of this plugin follows the major version of Capacitor. Use the version that matches your Capacitor installation (e.g., plugin v8 for Capacitor 8). Only the latest major version is actively maintained.

## Install

```bash
npm install @capgo/capacitor-intent-launcher
npx cap sync
```

## Android

Works out of the box. No additional configuration required.

### Opening Android Settings Screens

The plugin provides access to all Android system settings screens through the `ActivityAction` enum. Here are common examples:

```typescript
import { IntentLauncher, ActivityAction } from '@capgo/capacitor-intent-launcher';

// Open main settings screen
await IntentLauncher.startActivityAsync({
  action: ActivityAction.SETTINGS
});

// Open WiFi settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.WIFI_SETTINGS
});

// Open Bluetooth settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.BLUETOOTH_SETTINGS
});

// Open Location settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.LOCATION_SOURCE_SETTINGS
});

// Open Display settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.DISPLAY_SETTINGS
});

// Open Sound settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.SOUND_SETTINGS
});

// Open Notification settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.NOTIFICATION_SETTINGS
});
```

### Opening App-Specific Settings

You can open settings for a specific app by passing the package name:

```typescript
// Open your app's settings page
await IntentLauncher.startActivityAsync({
  action: ActivityAction.APPLICATION_DETAILS_SETTINGS,
  data: 'package:com.yourapp.package'
});

// Open notification settings for your app
await IntentLauncher.startActivityAsync({
  action: ActivityAction.APP_NOTIFICATION_SETTINGS,
  extra: {
    'android.provider.extra.APP_PACKAGE': 'com.yourapp.package'
  }
});
```

### Launching Other Apps

```typescript
// Open an app by package name
await IntentLauncher.openApplication({
  packageName: 'com.google.android.gm' // Gmail
});

// Get an app's icon
const { icon } = await IntentLauncher.getApplicationIconAsync({
  packageName: 'com.google.android.gm'
});
// icon is a base64-encoded PNG: 'data:image/png;base64,...'
```

### Advanced Intent Options

You can pass additional options like extras, flags, and MIME types:

```typescript
// Open a content picker
await IntentLauncher.startActivityAsync({
  action: ActivityAction.GET_CONTENT,
  type: 'image/*',  // MIME type
  category: 'android.intent.category.OPENABLE'
});

// Open a URL in the browser
await IntentLauncher.startActivityAsync({
  action: ActivityAction.VIEW,
  data: 'https://example.com'
});

// Send text to another app
await IntentLauncher.startActivityAsync({
  action: ActivityAction.SEND,
  type: 'text/plain',
  extra: {
    'android.intent.extra.TEXT': 'Hello World!'
  }
});

// Make a phone call (requires CALL_PHONE permission)
await IntentLauncher.startActivityAsync({
  action: ActivityAction.CALL,
  data: 'tel:+1234567890'
});

// Open the dialer with a number (no permission required)
await IntentLauncher.startActivityAsync({
  action: ActivityAction.DIAL,
  data: 'tel:+1234567890'
});
```

### Handling Activity Results

The `startActivityAsync` method returns a result with status information:

```typescript
const result = await IntentLauncher.startActivityAsync({
  action: ActivityAction.LOCATION_SOURCE_SETTINGS
});

console.log('Result code:', result.resultCode);
// resultCode: -1 = Success, 0 = Canceled, 1+ = Custom user codes

if (result.data) {
  console.log('Data URI:', result.data);
}

if (result.extra) {
  console.log('Extra data:', result.extra);
}
```

### Common Use Cases

**Guide users to enable permissions:**

```typescript
// Location permission
await IntentLauncher.startActivityAsync({
  action: ActivityAction.LOCATION_SOURCE_SETTINGS
});

// Battery optimization settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.IGNORE_BATTERY_OPTIMIZATION_SETTINGS
});

// Overlay permission (draw over other apps)
await IntentLauncher.startActivityAsync({
  action: ActivityAction.MANAGE_OVERLAY_PERMISSION,
  data: 'package:com.yourapp.package'
});
```

**Network settings:**

```typescript
// WiFi settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.WIFI_SETTINGS
});

// Mobile data settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.DATA_USAGE_SETTINGS
});

// Airplane mode settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.AIRPLANE_MODE_SETTINGS
});
```

**Security settings:**

```typescript
// Biometric enrollment
await IntentLauncher.startActivityAsync({
  action: ActivityAction.BIOMETRIC_ENROLL
});

// Fingerprint settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.FINGERPRINT_SETTINGS
});

// Security settings
await IntentLauncher.startActivityAsync({
  action: ActivityAction.SECURITY_SETTINGS
});
```

### Android Version Compatibility

Some settings actions are only available on specific Android versions. The plugin includes platform version information in the `ActivityAction` enum comments (e.g., `@platform Android 12+`). If you use an action that's not available on the device's Android version, the intent may fail or fall back to a general settings screen.

### Error Handling

Always wrap intent calls in try-catch blocks:

```typescript
try {
  await IntentLauncher.startActivityAsync({
    action: ActivityAction.WIFI_SETTINGS
  });
} catch (error) {
  console.error('Failed to open settings:', error);
  // Handle error - e.g., show a message to the user
}
```

## iOS

Works out of the box. Use the `openIOSSettings()` method to open iOS settings screens.

**Important:** The only officially supported option by Apple is `IOSSettings.App` which opens your app's settings page. Other options use undocumented URL schemes (`App-prefs:`) that may break in future iOS versions or could potentially cause App Store rejection.

**Note:** The iOS Simulator will sometimes only open the Settings app, instead of the specified option. Test on a real device for accurate behavior.

```typescript
import { IntentLauncher, IOSSettings } from '@capgo/capacitor-intent-launcher';

// Open app settings (officially supported by Apple)
await IntentLauncher.openIOSSettings({ option: IOSSettings.App });

// Open WiFi settings (may not work in all iOS versions)
await IntentLauncher.openIOSSettings({ option: IOSSettings.WiFi });
```

## Web

Not supported. This plugin uses native platform APIs.

## API

<docgen-index>

* [`startActivityAsync(...)`](#startactivityasync)
* [`openIOSSettings(...)`](#openiossettings)
* [`openApplication(...)`](#openapplication)
* [`getApplicationIconAsync(...)`](#getapplicationiconasync)
* [`getPluginVersion()`](#getpluginversion)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

Capacitor Intent Launcher Plugin for launching Android intents and opening system settings on both Android and iOS.

### startActivityAsync(...)

```typescript
startActivityAsync(options: IntentLauncherParams) => Promise<IntentLauncherResult>
```

Starts an Android activity for the given action.

| Param         | Type                                                                  | Description                                                          |
| ------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **`options`** | <code><a href="#intentlauncherparams">IntentLauncherParams</a></code> | - The intent launch options including action and optional parameters |

**Returns:** <code>Promise&lt;<a href="#intentlauncherresult">IntentLauncherResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### openIOSSettings(...)

```typescript
openIOSSettings(options: IOSSettingsParams) => Promise<IOSSettingsResult>
```

Opens iOS settings screen.

Note: The only officially supported option by Apple is `App` which opens your app's settings page.
Other options may work but are not guaranteed and could break in future iOS versions or cause App Store rejection.

Also note that the iOS Simulator will sometimes only open the Settings app,
instead of the specified option.

| Param         | Type                                                            | Description                       |
| ------------- | --------------------------------------------------------------- | --------------------------------- |
| **`options`** | <code><a href="#iossettingsparams">IOSSettingsParams</a></code> | - The iOS settings option to open |

**Returns:** <code>Promise&lt;<a href="#iossettingsresult">IOSSettingsResult</a>&gt;</code>

**Since:** 8.2.0

--------------------


### openApplication(...)

```typescript
openApplication(options: OpenApplicationOptions) => Promise<void>
```

Opens an application by its package name.

| Param         | Type                                                                      | Description                                   |
| ------------- | ------------------------------------------------------------------------- | --------------------------------------------- |
| **`options`** | <code><a href="#openapplicationoptions">OpenApplicationOptions</a></code> | - The package name of the application to open |

**Since:** 1.0.0

--------------------


### getApplicationIconAsync(...)

```typescript
getApplicationIconAsync(options: GetApplicationIconOptions) => Promise<GetApplicationIconResult>
```

Gets the application icon as a base64-encoded PNG string.

| Param         | Type                                                                            | Description                           |
| ------------- | ------------------------------------------------------------------------------- | ------------------------------------- |
| **`options`** | <code><a href="#getapplicationiconoptions">GetApplicationIconOptions</a></code> | - The package name of the application |

**Returns:** <code>Promise&lt;<a href="#getapplicationiconresult">GetApplicationIconResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getPluginVersion()

```typescript
getPluginVersion() => Promise<{ version: string; }>
```

Get the native Capacitor plugin version.

**Returns:** <code>Promise&lt;{ version: string; }&gt;</code>

**Since:** 1.0.0

--------------------


### Interfaces


#### IntentLauncherResult

Result from starting an activity.

| Prop             | Type                                                             | Description                                   | Since |
| ---------------- | ---------------------------------------------------------------- | --------------------------------------------- | ----- |
| **`resultCode`** | <code><a href="#resultcode">ResultCode</a></code>                | The result code returned by the activity.     | 1.0.0 |
| **`data`**       | <code>string</code>                                              | Optional data URI returned by the activity.   | 1.0.0 |
| **`extra`**      | <code><a href="#record">Record</a>&lt;string, unknown&gt;</code> | Optional extra data returned by the activity. | 1.0.0 |


#### IntentLauncherParams

Options for starting an activity.

| Prop              | Type                                                             | Description                                                   | Since |
| ----------------- | ---------------------------------------------------------------- | ------------------------------------------------------------- | ----- |
| **`action`**      | <code>string</code>                                              | The action to perform. Use values from `ActivityAction` enum. | 1.0.0 |
| **`category`**    | <code>string</code>                                              | Optional category to add to the intent.                       | 1.0.0 |
| **`className`**   | <code>string</code>                                              | Optional class name for the component to launch.              | 1.0.0 |
| **`data`**        | <code>string</code>                                              | Optional URI data for the intent. Must be a valid URI.        | 1.0.0 |
| **`extra`**       | <code><a href="#record">Record</a>&lt;string, unknown&gt;</code> | Optional extra data to pass to the intent as key-value pairs. | 1.0.0 |
| **`flags`**       | <code>number</code>                                              | Optional intent flags as a bitmask.                           | 1.0.0 |
| **`packageName`** | <code>string</code>                                              | Optional package name for the component.                      | 1.0.0 |
| **`type`**        | <code>string</code>                                              | Optional MIME type for the intent data.                       | 1.0.0 |


#### IOSSettingsResult

Result from opening iOS settings.

| Prop          | Type                 | Description                                          | Since |
| ------------- | -------------------- | ---------------------------------------------------- | ----- |
| **`success`** | <code>boolean</code> | Whether the settings screen was successfully opened. | 8.2.0 |


#### IOSSettingsParams

Options for opening iOS settings.

| Prop         | Type                | Description                                                          | Since |
| ------------ | ------------------- | -------------------------------------------------------------------- | ----- |
| **`option`** | <code>string</code> | The iOS settings screen to open. Use values from `IOSSettings` enum. | 8.2.0 |


#### OpenApplicationOptions

Options for opening an application.

| Prop              | Type                | Description                                  | Since |
| ----------------- | ------------------- | -------------------------------------------- | ----- |
| **`packageName`** | <code>string</code> | The package name of the application to open. | 1.0.0 |


#### GetApplicationIconResult

Result from getting an application icon.

| Prop       | Type                | Description                                                                                                                            | Since |
| ---------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`icon`** | <code>string</code> | The application icon as a base64-encoded PNG string prefixed with 'data:image/png;base64,'. Empty string if the icon is not available. | 1.0.0 |


#### GetApplicationIconOptions

Options for getting an application icon.

| Prop              | Type                | Description                          | Since |
| ----------------- | ------------------- | ------------------------------------ | ----- |
| **`packageName`** | <code>string</code> | The package name of the application. | 1.0.0 |


### Type Aliases


#### Record

Construct a type with a set of properties K of type T

<code>{ [P in K]: T; }</code>


### Enums


#### ResultCode

| Members         | Value           | Description                            |
| --------------- | --------------- | -------------------------------------- |
| **`Success`**   | <code>-1</code> | The activity completed successfully.   |
| **`Canceled`**  | <code>0</code>  | The activity was canceled by the user. |
| **`FirstUser`** | <code>1</code>  | First custom user-defined result code. |

</docgen-api>

# Credit

Based on the (Expo plugin)[https://docs.expo.dev/versions/latest/sdk/intent-launcher/]
