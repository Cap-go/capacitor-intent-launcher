import Foundation
import Capacitor

@objc(IntentLauncherPlugin)
public class IntentLauncherPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "IntentLauncherPlugin"
    public let jsName = "IntentLauncher"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "startActivityAsync", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "openApplication", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getApplicationIconAsync", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPluginVersion", returnType: CAPPluginReturnPromise)
    ]

    private let pluginVersion = "8.0.0"

    @objc func startActivityAsync(_ call: CAPPluginCall) {
        call.reject("Intent Launcher is not available on iOS. This plugin only works on Android.")
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
