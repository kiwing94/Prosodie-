const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let win;

// Create the main window
function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,  // Allow Node.js integration
            contextIsolation: false,  // Disable context isolation to use ipcRenderer directly
        }
    });

    win.loadFile('index.html');

    win.on('closed', () => {
        win = null;
    });
}

// Listen for console command execution
ipcMain.on('run-console-command', (event, command) => {
    const result = executeConsoleCommand(command);  // Execute the command
    event.reply('code-executed', result);  // Send result back to renderer
});

// Simulated command execution (for now, just output the command)
function executeConsoleCommand(command) {
    try {
        // Here, you can implement a real interpreter for Prosodie++ commands
        console.log("Executing command: ", command);
        return `Executed Command: ${command}`;  // Simulate success
    } catch (err) {
        return `Error: ${err.message}`;
    }
}

app.whenReady().then(createWindow);

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
