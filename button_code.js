document.getElementById('save-code').addEventListener('click', function() {
    const code = editor.getValue();
    // Save code as .html or .exe file
    exportAppAsFile(code, 'html');  // 'html' or 'exe'
});

function exportAppAsFile(code, type) {
    const fs = require('fs');
    const filePath = type === 'html' ? 'prosodie_app.html' : 'prosodie_app.exe';

    if (type === 'html') {
        // Export the code as HTML
        const htmlContent = `
            <html>
            <head><title>Prosodie App</title></head>
            <body>${code}</body>
            </html>`;
        fs.writeFile(filePath, htmlContent, err => {
            if (err) {
                console.log("Error saving HTML: ", err);
            } else {
                console.log("HTML saved successfully.");
            }
        });
    } else {
        // For EXE, we'd need to use Electron packaging (done in build scripts)
        console.log('Exporting as EXE (Electron build process)');
    }
}
