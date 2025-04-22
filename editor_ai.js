document.getElementById('run-code').addEventListener('click', function () {
    const code = editor.getValue(); // Get the code from Monaco editor
    executeCode(code); // Send code to execute and handle ML tasks
});

// Execute code with support for AI models
function executeCode(code) {
    if (code.toLowerCase().includes('generate ai model')) {
        const modelName = code.match(/"([^"]+)"/)[1]; // Extract model name
        document.getElementById('console-text').innerHTML += `Generating AI model: ${modelName}<br/>`;
        handleMLModel("train", "image_data.csv");
    }
    else if (code.toLowerCase().includes('predict from')) {
        const imagePath = code.match(/"([^"]+)"/)[1]; // Extract image path
        document.getElementById('console-text').innerHTML += `Predicting from image: ${imagePath}<br/>`;
        handleMLModel("predict", imagePath);
    }
    else {
        document.getElementById('console-text').innerHTML += `Command not recognized: ${code}<br/>`;
    }
}
