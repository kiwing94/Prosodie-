const { app, BrowserWindow } = require('electron');  // Import Electron modules
const path = require('path');

// Declare the window variable
let win;

// Create a new window when the app is ready
function createWindow() {
  // Create a new window with the specified dimensions
  win = new BrowserWindow({
    width: 1024,  // Window width
    height: 768,  // Window height
    webPreferences: {
      nodeIntegration: true  // This allows Node.js to be used in the renderer process (your HTML)
    }
  });

  // Load the HTML file
  win.loadFile('index.html');  // This should be your front-end HTML file

  // Open the DevTools for debugging
  // win.webContents.openDevTools();

  // Listen for the 'closed' event to clean up
  win.on('closed', () => {
    win = null;
  });
}

// Create the window when Electron has finished initializing
app.whenReady().then(createWindow);

// Quit the app when all windows are closed
app.on('window-all-closed', () => {
  // On macOS, it's common to keep the app running until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS, recreate the window when clicking the dock icon if there are no windows
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
