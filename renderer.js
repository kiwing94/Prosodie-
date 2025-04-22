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

    // Handle Writing Tab Logic
    const poemTextarea = document.getElementById('poem-textarea');
    const savePoemButton = document.getElementById('save-poem');
    const clearPoemButton = document.getElementById('clear-poem');
    const savedPoemsContainer = document.getElementById('saved-poems');

    // Function to display saved poems
    function displaySavedPoems() {
        const savedPoems = JSON.parse(localStorage.getItem('savedPoems')) || [];
        savedPoemsContainer.innerHTML = '';
        savedPoems.forEach((poem, index) => {
            const poemElement = document.createElement('div');
            poemElement.classList.add('saved-poem');
            poemElement.innerHTML = `
                <p><strong>Poem ${index + 1}:</strong><br>${poem}</p>
            `;
            savedPoemsContainer.appendChild(poemElement);
        });
    }

    // Display saved poems on page load
    window.onload = function() {
        displaySavedPoems();
    };

    // Handle saving poem
    savePoemButton.onclick = function() {
        const poemContent = poemTextarea.value;
        if (poemContent.trim()) {
            // Retrieve existing poems from localStorage
            const savedPoems = JSON.parse(localStorage.getItem('savedPoems')) || [];
            // Add new poem to the list
            savedPoems.push(poemContent);
            // Save updated poems back to localStorage
            localStorage.setItem('savedPoems', JSON.stringify(savedPoems));
            alert('Poem Saved!');
            // Refresh displayed saved poems
            displaySavedPoems();
            poemTextarea.value = ''; // Clear textarea after saving
        } else {
            alert('Please write something before saving!');
        }
    };

    // Handle clearing poem
    clearPoemButton.onclick = function() {
        poemTextarea.value = ''; // Clear the textarea
    };

    // Function to interpret Prosodie++ code
    function runProsodieCode(code) {
        let output = '';
        try {
            output = executeProsodieCommands(code); // Your custom execution logic
        } catch (e) {
            output = 'Error: ' + e.message;
        }
        document.getElementById('console-text').innerHTML = applyRainbowColors(output); // Apply rainbow colors
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

    // Function to apply rainbow colors to console output
    function applyRainbowColors(text) {
        const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
        let coloredText = '';
        let colorIndex = 0;

        // Split text by spaces to colorize each word separately
        const words = text.split(' ');
        words.forEach(word => {
            coloredText += `<span class="rainbow-text" style="color: ${rainbowColors[colorIndex % rainbowColors.length]}">${word}</span> `;
            colorIndex++;
        });

        return coloredText.trim(); // Return the colorized output
    }
});
