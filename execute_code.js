if (code.toLowerCase().includes('generate ai model')) {
    const modelName = code.match(/"([^"]+)"/)[1];
    document.getElementById('console-text').innerHTML += `Generating AI model: ${modelName}<br/>`;
    handleMLModel("train", "xor_data.csv");
}
else if (code.toLowerCase().includes('predict from')) {
    const inputData = code.match(/"([^"]+)"/)[1];
    document.getElementById('console-text').innerHTML += `Predicting from input: ${inputData}<br/>`;
    handleMLModel("predict", inputData);
}
