// Function to train a model and display progress
async function trainModelWithProgress(data) {
    const model = createModel();
    let epoch = 0;

    // Train the model with progress feedback
    while (epoch < 10) {
        await model.fit(data.xTrain, data.yTrain, { epochs: 1 });

        epoch++;
        document.getElementById('console-text').innerHTML += `Epoch ${epoch}/10 completed...<br/>`;
        await new Promise(resolve => setTimeout(resolve, 1000));  // Simulate wait time
    }

    document.getElementById('console-text').innerHTML += "Model training complete!<br/>";
}
