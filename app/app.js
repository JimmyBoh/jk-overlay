import { ipcRenderer } from 'electron';
import { OVERLAYS, OVERLAY_CHANGED_EVENT } from './overlays/overlays'; // code authored by you in this project
import env from './env';

console.log('Loaded environment variables:', env);

// Set the current overlay to a dummy instance...
let currentOverlay = {
  name: '',
  start: function () { },
  stop: function () { }
};

ipcRenderer.on(OVERLAY_CHANGED_EVENT, (event, name) => {
  switchOverlays(name);
});

function switchOverlays(name) {
  if (currentOverlay.name === name) return;

  currentOverlay.stop();
  for (let i = 0; i < OVERLAYS.length; i++) {
    if (OVERLAYS[i].name === name) {
      currentOverlay = OVERLAYS[i];
      break;
    }
  }
  currentOverlay.start();
}