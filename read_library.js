// This script will read the 'Library.prs' file, parse it, and expose commands for use in the IDE

const fs = require('fs');
const path = require('path');

// Path to the Library.prs file
const libraryPath = path.join(__dirname, 'Library.prs');

// Function to read the Library.prs file and extract commands
function readLibraryCommands() {
    fs.readFile(libraryPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading Library.prs:', err);
            return;
        }

        // Parse the commands in the Library.prs file
        const commands = [];

        // Regular expressions to match the various command patterns
        const commandPatterns = [
            /Generate prosodie "([^"]+)"/g, // Match "Generate prosodie" commands
            /Add section called "([^"]+)"/g, // Match "Add section" commands
            /Add button: "([^"]+)"/g        // Match "Add button" commands
        ];

        commandPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(data)) !== null) {
                commands.push(match[1]); // Capture the command name
            }
        });

        // Log all available commands to the console (or pass them to the IDE for suggestions)
        console.log('Available commands from Library.prs:', commands);

        // Return the commands for use in the IDE
        addCommandsToIDE(commands);
    });
}

// Function to add commands to the IDE for quick suggestions
function addCommandsToIDE(commands) {
    // Assuming you have a global editor instance (from Monaco or another editor)
    const editor = monaco.editor.create(document.getElementById('editor'), {
        value: '',
        language: 'javascript',
        theme: 'vs-dark',
        minimap: { enabled: false },
        automaticLayout: true,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        readOnly: false
    });

    // Create autocomplete suggestions for the editor based on the Library commands
    monaco.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems: function(model, position) {
            const suggestions = commands.map(command => ({
                label: command,
                kind: monaco.languages.CompletionItemKind.Text,
                insertText: command,
                detail: 'Prosodie++ Command'
            }));

            return { suggestions: suggestions };
        }
    });
}

// Call the function to parse the Library and add commands to the IDE
readLibraryCommands();

