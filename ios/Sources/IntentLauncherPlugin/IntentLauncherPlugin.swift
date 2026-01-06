import Foundation
import Capacitor
import UIKit

@objc(IntentLauncherPlugin)
public class IntentLauncherPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "IntentLauncherPlugin"
    public let jsName = "IntentLauncher"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "startActivityAsync", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openIOSSettings", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openApplication", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getApplicationIconAsync", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPluginVersion", returnType: CAPPluginReturnPromise)
    ]

    private let pluginVersion = "8.1.1"

    // iOS Settings URL paths mapping
    // Note: Only "app" is officially supported by Apple. Other paths may break in future iOS versions.
    private let settingsPaths: [String: String] = [
        "about": "App-prefs:General&path=About",
        "accessibility": "App-prefs:ACCESSIBILITY",
        "autoLock": "App-prefs:General&path=AUTOLOCK",
        "bluetooth": "App-prefs:Bluetooth",
        "dateTime": "App-prefs:General&path=DATE_AND_TIME",
        "doNotDisturb": "App-prefs:DO_NOT_DISTURB",
        "facetime": "App-prefs:FACETIME",
        "general": "App-prefs:General",
        "iCloud": "App-prefs:CASTLE",
        "iCloudStorageBackup": "App-prefs:CASTLE&path=STORAGE_AND_BACKUP",
        "international": "App-prefs:General&path=INTERNATIONAL",
        "keyboard": "App-prefs:General&path=Keyboard",
        "locationServices": "App-prefs:Privacy&path=LOCATION",
        "managedConfigurationList": "App-prefs:General&path=ManagedConfigurationList",
        "music": "App-prefs:MUSIC",
        "notes": "App-prefs:NOTES",
        "notifications": "App-prefs:NOTIFICATIONS_ID",
        "phone": "App-prefs:Phone",
        "photos": "App-prefs:Photos",
        "reset": "App-prefs:General&path=Reset",
        "ringtone": "App-prefs:Sounds&path=Ringtone",
        "screenTime": "App-prefs:SCREEN_TIME",
        "sounds": "App-prefs:Sounds",
        "softwareUpdate": "App-prefs:General&path=SOFTWARE_UPDATE_LINK",
        "store": "App-prefs:STORE",
        "tethering": "App-prefs:INTERNET_TETHERING",
        "touchIdPasscode": "App-prefs:TOUCHID_PASSCODE",
        "tracking": "App-prefs:Privacy&path=USER_TRACKING",
        "vpn": "App-prefs:VPN",
        "wallpaper": "App-prefs:Wallpaper",
        "wifi": "App-prefs:WIFI"
    ]

    @objc func startActivityAsync(_ call: CAPPluginCall) {
        call.reject("Intent Launcher is not available on iOS. Use openIOSSettings() instead for iOS settings.")
    }

    @objc func openIOSSettings(_ call: CAPPluginCall) {
        guard let option = call.getString("option") else {
            call.reject("Missing required parameter: option")
            return
        }

        var urlString: String?

        // Handle special cases that use system constants
        if option == "app" {
            urlString = UIApplication.openSettingsURLString
        } else if option == "appNotification" {
            if #available(iOS 16.0, *) {
                urlString = UIApplication.openNotificationSettingsURLString
            } else {
                // Fallback for older iOS versions - open app settings
                urlString = UIApplication.openSettingsURLString
            }
        } else {
            // Look up the URL path from our dictionary
            urlString = settingsPaths[option]
        }

        guard let finalUrlString = urlString else {
            call.reject("Unknown settings option: \(option)")
            return
        }

        guard let url = URL(string: finalUrlString) else {
            call.reject("Invalid URL for settings option: \(option)")
            return
        }

        DispatchQueue.main.async {
            if UIApplication.shared.canOpenURL(url) {
                UIApplication.shared.open(url, options: [:]) { success in
                    if success {
                        call.resolve(["success": true])
                    } else {
                        call.reject("Failed to open settings: \(option)")
                    }
                }
            } else {
                // Try opening without canOpenURL check (some App-prefs URLs may not pass canOpenURL)
                UIApplication.shared.open(url, options: [:]) { success in
                    if success {
                        call.resolve(["success": true])
                    } else {
                        call.reject("Cannot open settings URL for option: \(option)")
                    }
                }
            }
        }
    }

    @objc func openApplication(_ call: CAPPluginCall) {
        call.reject("Opening applications by package name is not available on iOS. This plugin only works on Android.")
    }

    @objc func getApplicationIconAsync(_ call: CAPPluginCall) {
        call.reject("Getting application icons is not available on iOS. This plugin only works on Android.")
    }

    @objc func getPluginVersion(_ call: CAPPluginCall) {
        call.resolve(["version": pluginVersion])
    }
}
