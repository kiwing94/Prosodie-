// Initialize Monaco Editor
require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
    var editor = monaco.editor.create(document.getElementById('editor'), {
        value: 'write "Hello World";', // Example default code
        language: 'prosodie', // Custom language name (You can define this later)
    });

    // Define custom language rules (if any)
    monaco.languages.register({ id: 'prosodie' });
    monaco.languages.setMonarchTokensProvider('prosodie', {
        tokenizer: {
            root: [
                [/\b(write|print|execute)\b/, 'keyword'],
                [/\b"[^"]*"/, 'string'],
                [/\d+/, 'number'],
                [/;|,|\./, 'delimiter'],
                [/[a-zA-Z_][a-zA-Z0-9_]*/, 'identifier'],
            ]
        }
    });

    // Run Code Button Logic
    document.getElementById('run-code').onclick = function() {
        const code = editor.getValue(); // Get the code from the editor
        runProsodieCode(code); // Pass code to interpreter
    };

    // Clear Console Button Logic
    document.getElementById('clear-console').onclick = function() {
        document.getElementById('console-text').innerText = ''; // Clear console output
    };

    // Function to interpret Prosodie++ code
    function runProsodieCode(code) {
        let output = '';
        try {
            output = executeProsodieCommands(code); // Your custom execution logic
        } catch (e) {
            output = 'Error: ' + e.message;
        }
        document.getElementById('console-text').innerText = output;
    }

    // Example command handler (you'll define more commands here)
    function executeProsodieCommands(code) {
        if (code.includes('write')) {
            return handleWriteCommand(code);
        } else {
            return 'Unknown Command';
        }
    }

    // Example 'write' command handler
    function handleWriteCommand(code) {
        const message = code.match(/write\s+"([^"]+)";/);
        if (message && message[1]) {
            return 'Printed: ' + message[1];
        }
        return 'Invalid write command syntax.';
    }
});

