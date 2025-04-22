// Export trained model to a JSON file (can be shared or loaded later)
function exportModel(model) {
    const modelJSON = model.toJSON();
    const fs = require('fs');

    fs.writeFile('trained_model.json', JSON.stringify(modelJSON), (err) => {
        if (err) {
            console.error("Error exporting model:", err);
        } else {
            document.getElementById('console-text').innerHTML += "Model exported successfully!<br/>";
        }
    });
}
