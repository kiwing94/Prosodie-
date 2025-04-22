// Function to execute and parse code with error handling
function executeCode(code) {
    try {
        // Example of valid command parsing
        if (code.toLowerCase().includes('generate app')) {
            const appName = code.match(/"([^"]+)"/)[1];
            createApp(appName);
        } else {
            throw new Error("Invalid command format"); // Throw an error if command is invalid
        }
    } catch (error) {
        document.getElementById('console-text').innerHTML += `<span style="color: red;">Error: ${error.message}</span><br/>`;
    }
}
