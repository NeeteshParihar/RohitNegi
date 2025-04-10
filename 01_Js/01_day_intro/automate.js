const fs = require('fs');
const { exec } = require('child_process');

const fileToWatch = './temp.js'; // Change this to your actual JS file

console.log(`Watching for changes in ${fileToWatch}...`);

let lastRun = 0;

fs.watch(fileToWatch, (eventType, filename) => {
	if (eventType === 'change') {
		const now = Date.now();

		// Prevent duplicate triggers due to rapid changes
		if (now - lastRun > 1000) {
			

			exec(`node ${fileToWatch}`, (error, stdout, stderr) => {
				if (error) {
					console.error(`Error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.error(`stderr: ${stderr}`);
				}
				console.log(stdout);
			});

			lastRun = now;
		}
	}
});
