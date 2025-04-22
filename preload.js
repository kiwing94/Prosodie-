const { ipcRenderer } = require('electron');

// Expose ipcRenderer to the renderer process (frontend)
window.ipcRenderer = ipcRenderer;
