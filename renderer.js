const fs = require('fs');
const path = require('path');

// Get elements from the DOM
const codeEditor = document.getElementById('code-editor');
const consoleText = document.getElementById('console-text');
const runCodeButton = document.getElementById('run-code');
const clearConsoleButton = document.getElementById('clear-console');

// Function to execute Prosodie++ commands from the editor
function executeCode() {
    const code = codeEditor.value.trim();
    consoleText.innerHTML += `> ${code}<br/>`;

    // Simulate handling of Prosodie++ commands
    if (code.toLowerCase().includes('generate app')) {
        const appName = code.match(/"([^"]+)"/)[1]; // Extract app name
        createApp(appName);
    } else if (code.toLowerCase().includes('create button')) {
        const buttonLabel = code.match(/"([^"]+)"/)[1]; // Extract button label
        createButton(buttonLabel);
    } else {
        consoleText.innerHTML += 'Command not recognized.<br/>';
    }
}

// Function to create an app
function createApp(appName) {
    const app = document.createElement('div');
    app.id = appName;
    app.innerHTML = `<h2>${appName} Created!</h2>`;
    document.body.appendChild(app);
    consoleText.innerHTML += `App "${appName}" created successfully!<br/>`;
}

// Function to create a button
function createButton(buttonLabel) {
    const button = document.createElement('button');
    button.innerText = buttonLabel;
    document.body.appendChild(button);
    consoleText.innerHTML += `Button "${buttonLabel}" created successfully!<br/>`;
}

// Handle the "Run Code" button click
runCodeButton.addEventListener('click', executeCode);

// Handle the "Clear Console" button click
clearConsoleButton.addEventListener('click', () => {
    consoleText.innerHTML = ''; // Clear the console output
});
