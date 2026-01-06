# @capgo/capacitor-intent-launcher
 <a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png' alt='Capgo - Instant updates for capacitor'/></a>

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

## Install

```bash
npm install @capgo/capacitor-intent-launcher
npx cap sync
```

## Android

Works out of the box. No additional configuration required.

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
