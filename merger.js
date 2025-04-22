const fs = require('fs');
const path = require('path');

// Function to merge all .prs files in a directory into one file
function mergePrsFiles(inputDir, outputFile) {
    // Get all files in the directory
    fs.readdir(inputDir, (err, files) => {
        if (err) {
            console.error('Error reading the directory:', err);
            return;
        }

        // Filter to only include .prs files
        const prsFiles = files.filter(file => file.endsWith('.prs'));

        if (prsFiles.length === 0) {
            console.log('No .prs files found in the directory.');
            return;
        }

        let mergedContent = '';

        // Read each .prs file and append its content
        prsFiles.forEach((file, index) => {
            const filePath = path.join(inputDir, file);

            fs.readFile(filePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    console.error('Error reading file:', file, readErr);
                    return;
                }

                // Add a header to each file content for separation
                mergedContent += `\n// --- Start of ${file} ---\n`;
                mergedContent += data;
                mergedContent += `\n// --- End of ${file} ---\n`;

                // After reading the last file, write the merged content to the output file
                if (index === prsFiles.length - 1) {
                    fs.writeFile(outputFile, mergedContent, 'utf8', (writeErr) => {
                        if (writeErr) {
                            console.error('Error writing to the output file:', writeErr);
                        } else {
                            console.log(`Successfully merged ${prsFiles.length} .prs files into ${outputFile}`);
                        }
                    });
                }
            });
        });
    });
}

// Example usage: merging all .prs files from a folder into a single file
const inputDirectory = 'C:/Users/kiwing/prosodie-ide'; //  Path to your directory
const outputFile = 'merged_output.prs'; // Output merged file

mergePrsFiles(inputDirectory, outputFile);
