package app.capgo.capacitor.intentlauncher;

import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.ByteArrayOutputStream;
import java.util.Iterator;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@CapacitorPlugin(name = "IntentLauncher")
public class IntentLauncherPlugin extends Plugin {

    private final String pluginVersion = "8.3.26";

    @PluginMethod
    public void startActivityAsync(PluginCall call) {
        String action = call.getString("action");
        if (action == null || action.isEmpty()) {
            call.reject("Action is required");
            return;
        }

        try {
            Intent intent = new Intent(action);

            // Set category
            String category = call.getString("category");
            if (category != null && !category.isEmpty()) {
                intent.addCategory(category);
            }

            // Set data URI
            String data = call.getString("data");
            String type = call.getString("type");

            if (data != null && !data.isEmpty() && type != null && !type.isEmpty()) {
                intent.setDataAndType(Uri.parse(data), type);
            } else if (data != null && !data.isEmpty()) {
                intent.setData(Uri.parse(data));
            } else if (type != null && !type.isEmpty()) {
                intent.setType(type);
            }

            // Set component (package + class)
            String packageName = call.getString("packageName");
            String className = call.getString("className");
            if (packageName != null && !packageName.isEmpty() && className != null && !className.isEmpty()) {
                intent.setComponent(new ComponentName(packageName, className));
            } else if (packageName != null && !packageName.isEmpty()) {
                intent.setPackage(packageName);
            }

            // Set flags
            Integer flags = call.getInt("flags");
            if (flags != null) {
                intent.setFlags(flags);
            }

            // Set extras
            JSObject extra = call.getObject("extra");
            if (extra != null) {
                Bundle bundle = jsonToBundle(extra);
                intent.putExtras(bundle);
            }

            // Start activity for result
            startActivityForResult(call, intent, "handleActivityResult");
        } catch (Exception e) {
            call.reject("Failed to start activity: " + e.getMessage(), e);
        }
    }

    @ActivityCallback
    private void handleActivityResult(PluginCall call, ActivityResult result) {
        if (call == null) {
            return;
        }

        JSObject ret = new JSObject();
        ret.put("resultCode", result.getResultCode());

        Intent data = result.getData();
        if (data != null) {
            if (data.getData() != null) {
                ret.put("data", data.getData().toString());
            }

            // Convert extras to JSON
            Bundle extras = data.getExtras();
            if (extras != null) {
                JSObject extraObject = bundleToJson(extras);
                ret.put("extra", extraObject);
            }
        }

        call.resolve(ret);
    }

    @PluginMethod
    public void openApplication(PluginCall call) {
        String packageName = call.getString("packageName");
        if (packageName == null || packageName.isEmpty()) {
            call.reject("Package name is required");
            return;
        }

        try {
            PackageManager pm = getContext().getPackageManager();
            Intent intent = pm.getLaunchIntentForPackage(packageName);

            if (intent == null) {
                call.reject("Application not found: " + packageName);
                return;
            }

            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(intent);
            call.resolve();
        } catch (Exception e) {
            call.reject("Failed to open application: " + e.getMessage(), e);
        }
    }

    @PluginMethod
    public void getApplicationIconAsync(PluginCall call) {
        String packageName = call.getString("packageName");
        if (packageName == null || packageName.isEmpty()) {
            call.reject("Package name is required");
            return;
        }

        try {
            PackageManager pm = getContext().getPackageManager();
            Drawable drawable = pm.getApplicationIcon(packageName);

            Bitmap bitmap = drawableToBitmap(drawable);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, baos);
            byte[] bytes = baos.toByteArray();
            String base64 = Base64.encodeToString(bytes, Base64.NO_WRAP);

            JSObject ret = new JSObject();
            ret.put("icon", "data:image/png;base64," + base64);
            call.resolve(ret);
        } catch (PackageManager.NameNotFoundException e) {
            JSObject ret = new JSObject();
            ret.put("icon", "");
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Failed to get application icon: " + e.getMessage(), e);
        }
    }

    @PluginMethod
    public void getPluginVersion(final PluginCall call) {
        try {
            final JSObject ret = new JSObject();
            ret.put("version", this.pluginVersion);
            call.resolve(ret);
        } catch (final Exception e) {
            call.reject("Could not get plugin version", e);
        }
    }

    private Bitmap drawableToBitmap(Drawable drawable) {
        if (drawable instanceof BitmapDrawable) {
            return ((BitmapDrawable) drawable).getBitmap();
        }

        int width = drawable.getIntrinsicWidth();
        int height = drawable.getIntrinsicHeight();

        if (width <= 0) width = 1;
        if (height <= 0) height = 1;

        Bitmap bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
        drawable.draw(canvas);
        return bitmap;
    }

    private Bundle jsonToBundle(JSObject json) {
        Bundle bundle = new Bundle();
        Iterator<String> keys = json.keys();

        while (keys.hasNext()) {
            String key = keys.next();
            try {
                Object value = json.get(key);

                if (value instanceof String) {
                    bundle.putString(key, (String) value);
                } else if (value instanceof Integer) {
                    bundle.putInt(key, (Integer) value);
                } else if (value instanceof Long) {
                    bundle.putLong(key, (Long) value);
                } else if (value instanceof Double) {
                    bundle.putDouble(key, (Double) value);
                } else if (value instanceof Boolean) {
                    bundle.putBoolean(key, (Boolean) value);
                } else if (value instanceof JSONArray) {
                    JSONArray array = (JSONArray) value;
                    if (array.length() > 0) {
                        Object first = array.get(0);
                        if (first instanceof String) {
                            String[] stringArray = new String[array.length()];
                            for (int i = 0; i < array.length(); i++) {
                                stringArray[i] = array.getString(i);
                            }
                            bundle.putStringArray(key, stringArray);
                        } else if (first instanceof Integer) {
                            int[] intArray = new int[array.length()];
                            for (int i = 0; i < array.length(); i++) {
                                intArray[i] = array.getInt(i);
                            }
                            bundle.putIntArray(key, intArray);
                        }
                    }
                } else if (value instanceof JSONObject) {
                    bundle.putBundle(key, jsonToBundle(JSObject.fromJSONObject((JSONObject) value)));
                }
            } catch (JSONException e) {
                // Skip this key
            }
        }

        return bundle;
    }

    private JSObject bundleToJson(Bundle bundle) {
        JSObject json = new JSObject();

        for (String key : bundle.keySet()) {
            Object value = bundle.get(key);

            if (value instanceof String) {
                json.put(key, (String) value);
            } else if (value instanceof Integer) {
                json.put(key, (Integer) value);
            } else if (value instanceof Long) {
                json.put(key, (Long) value);
            } else if (value instanceof Double) {
                json.put(key, (Double) value);
            } else if (value instanceof Boolean) {
                json.put(key, (Boolean) value);
            } else if (value instanceof Bundle) {
                json.put(key, bundleToJson((Bundle) value));
            } else if (value instanceof String[]) {
                JSONArray array = new JSONArray();
                for (String s : (String[]) value) {
                    array.put(s);
                }
                json.put(key, array);
            } else if (value instanceof int[]) {
                JSONArray array = new JSONArray();
                for (int i : (int[]) value) {
                    array.put(i);
                }
                json.put(key, array);
            } else if (value != null) {
                json.put(key, value.toString());
            }
        }

        return json;
    }
}
