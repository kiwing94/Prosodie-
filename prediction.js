async function loadAndPredictImage(modelPath, imagePath) {
    const model = await tf.loadLayersModel(modelPath);  // Load the pre-trained model
    const image = await loadImage(imagePath);  // Process image for prediction

    const prediction = await model.predict(image);
    console.log("Prediction: ", prediction);
    document.getElementById('console-text').innerHTML += `Prediction: ${prediction}<br/>`;
}
