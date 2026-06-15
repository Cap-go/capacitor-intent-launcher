import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { Capacitor } from '@capacitor/core';
import './style.css';
import { IntentLauncher, ActivityAction } from '@capgo/capacitor-intent-launcher';

const plugin = IntentLauncher;

const actions = [
  {
    id: 'open-settings',
    label: 'Open Settings',
    description: 'Opens the main Android settings screen.',
    inputs: [],
    run: async () => {
      return await plugin.startActivityAsync({
        action: ActivityAction.SETTINGS,
      });
    },
  },
  {
    id: 'open-wifi-settings',
    label: 'Open WiFi Settings',
    description: 'Opens the WiFi settings screen.',
    inputs: [],
    run: async () => {
      return await plugin.startActivityAsync({
        action: ActivityAction.WIFI_SETTINGS,
      });
    },
  },
  {
    id: 'open-bluetooth-settings',
    label: 'Open Bluetooth Settings',
    description: 'Opens the Bluetooth settings screen.',
    inputs: [],
    run: async () => {
      return await plugin.startActivityAsync({
        action: ActivityAction.BLUETOOTH_SETTINGS,
      });
    },
  },
  {
    id: 'open-location-settings',
    label: 'Open Location Settings',
    description: 'Opens the location source settings screen.',
    inputs: [],
    run: async () => {
      return await plugin.startActivityAsync({
        action: ActivityAction.LOCATION_SOURCE_SETTINGS,
      });
    },
  },
  {
    id: 'open-display-settings',
    label: 'Open Display Settings',
    description: 'Opens the display settings screen.',
    inputs: [],
    run: async () => {
      return await plugin.startActivityAsync({
        action: ActivityAction.DISPLAY_SETTINGS,
      });
    },
  },
  {
    id: 'open-app-details',
    label: 'Open App Details',
    description: 'Opens the application details screen for a specific app.',
    inputs: [
      {
        name: 'packageName',
        label: 'Package Name',
        type: 'text',
        value: 'com.android.settings',
        placeholder: 'e.g., com.google.android.gm',
      },
    ],
    run: async (values) => {
      return await plugin.startActivityAsync({
        action: ActivityAction.APPLICATION_DETAILS_SETTINGS,
        data: `package:${values.packageName}`,
      });
    },
  },
  {
    id: 'open-application',
    label: 'Open Application',
    description: 'Opens an installed application by its package name.',
    inputs: [
      {
        name: 'packageName',
        label: 'Package Name',
        type: 'text',
        value: 'com.android.settings',
        placeholder: 'e.g., com.google.android.gm',
      },
    ],
    run: async (values) => {
      await plugin.openApplication({ packageName: values.packageName });
      return { success: true };
    },
  },
  {
    id: 'get-app-icon',
    label: 'Get Application Icon',
    description: 'Gets the application icon as a base64-encoded PNG.',
    inputs: [
      {
        name: 'packageName',
        label: 'Package Name',
        type: 'text',
        value: 'com.android.settings',
        placeholder: 'e.g., com.google.android.gm',
      },
    ],
    run: async (values) => {
      const result = await plugin.getApplicationIconAsync({
        packageName: values.packageName,
      });
      if (result.icon) {
        return `Icon retrieved! Preview:\n[Base64 data starts with: ${result.icon.substring(0, 50)}...]`;
      }
      return { icon: 'Not found' };
    },
  },
  {
    id: 'get-plugin-version',
    label: 'Get Plugin Version',
    description: 'Gets the native plugin version.',
    inputs: [],
    run: async () => {
      return await plugin.getPluginVersion();
    },
  },
  {
    id: 'custom-intent',
    label: 'Custom Intent',
    description: 'Launch a custom intent action.',
    inputs: [
      {
        name: 'action',
        label: 'Action',
        type: 'text',
        value: 'android.settings.SOUND_SETTINGS',
        placeholder: 'e.g., android.settings.SOUND_SETTINGS',
      },
      {
        name: 'data',
        label: 'Data URI (optional)',
        type: 'text',
        value: '',
        placeholder: 'e.g., package:com.example.app',
      },
    ],
    run: async (values) => {
      const options = { action: values.action };
      if (values.data) {
        options.data = values.data;
      }
      return await plugin.startActivityAsync(options);
    },
  },
];

const actionSelect = document.getElementById('action-select');
const formContainer = document.getElementById('action-form');
const descriptionBox = document.getElementById('action-description');
const runButton = document.getElementById('run-action');
const output = document.getElementById('plugin-output');

function buildForm(action) {
  formContainer.innerHTML = '';
  if (!action.inputs || !action.inputs.length) {
    const note = document.createElement('p');
    note.className = 'no-input-note';
    note.textContent = 'This action does not require any inputs.';
    formContainer.appendChild(note);
    return;
  }
  action.inputs.forEach((input) => {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.className = input.type === 'checkbox' ? 'form-field inline' : 'form-field';

    const label = document.createElement('label');
    label.textContent = input.label;
    label.htmlFor = `field-${input.name}`;

    let field;
    switch (input.type) {
      case 'textarea': {
        field = document.createElement('textarea');
        field.rows = input.rows || 4;
        break;
      }
      case 'select': {
        field = document.createElement('select');
        (input.options || []).forEach((option) => {
          const opt = document.createElement('option');
          opt.value = option.value;
          opt.textContent = option.label;
          if (input.value !== undefined && option.value === input.value) {
            opt.selected = true;
          }
          field.appendChild(opt);
        });
        break;
      }
      case 'checkbox': {
        field = document.createElement('input');
        field.type = 'checkbox';
        field.checked = Boolean(input.value);
        break;
      }
      case 'number': {
        field = document.createElement('input');
        field.type = 'number';
        if (input.value !== undefined && input.value !== null) {
          field.value = String(input.value);
        }
        break;
      }
      default: {
        field = document.createElement('input');
        field.type = 'text';
        if (input.value !== undefined && input.value !== null) {
          field.value = String(input.value);
        }
      }
    }

    field.id = `field-${input.name}`;
    field.name = input.name;
    field.dataset.type = input.type || 'text';

    if (input.placeholder && input.type !== 'checkbox') {
      field.placeholder = input.placeholder;
    }

    if (input.type === 'checkbox') {
      fieldWrapper.appendChild(field);
      fieldWrapper.appendChild(label);
    } else {
      fieldWrapper.appendChild(label);
      fieldWrapper.appendChild(field);
    }

    formContainer.appendChild(fieldWrapper);
  });
}

function getFormValues(action) {
  const values = {};
  (action.inputs || []).forEach((input) => {
    const field = document.getElementById(`field-${input.name}`);
    if (!field) return;
    switch (input.type) {
      case 'number': {
        values[input.name] = field.value === '' ? null : Number(field.value);
        break;
      }
      case 'checkbox': {
        values[input.name] = field.checked;
        break;
      }
      default: {
        values[input.name] = field.value;
      }
    }
  });
  return values;
}

function setAction(action) {
  descriptionBox.textContent = action.description || '';
  buildForm(action);
  output.textContent = 'Ready to run the selected action.';
}

function populateActions() {
  actionSelect.innerHTML = '';
  actions.forEach((action) => {
    const option = document.createElement('option');
    option.value = action.id;
    option.textContent = action.label;
    actionSelect.appendChild(option);
  });
  setAction(actions[0]);
}

actionSelect.addEventListener('change', () => {
  const action = actions.find((item) => item.id === actionSelect.value);
  if (action) {
    setAction(action);
  }
});

runButton.addEventListener('click', async () => {
  const action = actions.find((item) => item.id === actionSelect.value);
  if (!action) return;
  const values = getFormValues(action);
  try {
    const result = await action.run(values);
    if (result === undefined) {
      output.textContent = 'Action completed.';
    } else if (typeof result === 'string') {
      output.textContent = result;
    } else {
      output.textContent = JSON.stringify(result, null, 2);
    }
  } catch (error) {
    output.textContent = `Error: ${error?.message ?? error}`;
  }
});

populateActions();

if (Capacitor.isNativePlatform()) {
  CapacitorUpdater.notifyAppReady().catch((error) => {
    console.error('Capgo notifyAppReady failed', error);
  });
}
