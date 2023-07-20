const fs = require('fs');
const process = require('process');

function cat(path) {
    fs.readFile(path, function (er, data) {
        if (er) {
            console.error(`Error reading ${path}: ${er}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

cat(process.argv[2]);