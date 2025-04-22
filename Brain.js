// Import Brain.js for neural networks
const brain = require('brain.js');

// Create a simple neural network
const net = new brain.NeuralNetwork();

// Train the network (using example data)
net.train([
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }
]);

// Function to predict the output
function predictWithBrainJS(inputData) {
    const output = net.run(inputData);  // Predict based on input
    console.log("Prediction:", output);
    return output;
}

// Example input and prediction
const prediction = predictWithBrainJS([1, 0]);  // Example: XOR
console.log(prediction);
