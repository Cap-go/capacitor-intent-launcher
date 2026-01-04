# @capgo/capacitor-intent-launcher
 <a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png' alt='Capgo - Instant updates for capacitor'/></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_intent_launcher"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_intent_launcher"> Missing a feature? We'll build the plugin for you 💪</a></h2>
</div>

Launch Android intents and open system settings screens from your Capacitor app.

## Why Capacitor Intent Launcher?

A simple, **free**, and **lightweight** Android intent launcher plugin:

- **System settings access** - Open any Android settings screen (WiFi, Bluetooth, Location, etc.)
- **App launching** - Open any installed application by package name
- **App icon retrieval** - Get application icons as base64-encoded images
- **Full intent support** - Pass extras, flags, data URIs, and MIME types
- **Activity results** - Receive result codes and data from launched activities
- **Zero dependencies** - Minimal footprint, no bloat

Perfect for apps that need to guide users to system settings, launch external apps, or integrate with Android's intent system.

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

This plugin is **Android only**. iOS does not support launching arbitrary intents or opening system settings programmatically in the same way Android does.

## Web

Not supported. This plugin uses Android-specific APIs.

## API

<docgen-index>

* [`startActivityAsync(...)`](#startactivityasync)
* [`openApplication(...)`](#openapplication)
* [`getApplicationIconAsync(...)`](#getapplicationiconasync)
* [`getPluginVersion()`](#getpluginversion)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

Capacitor Intent Launcher Plugin for launching Android intents and opening system settings.

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
