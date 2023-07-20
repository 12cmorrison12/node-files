import { readFile } from 'fs';
import { exit, argv } from 'process';
import { get } from 'axios';

function cat(path) {
    readFile(path, function (er, data) {
        if (er) {
            console.error(`Error reading ${path}: ${er}`);
            exit(1);
        } else {
            console.log(data);
        }
    });
}

cat(argv[2]);

async function webCat(url) {
    try {
        let response = await get(url);
        console.log(response.data);
    } catch (er) {
        console.error(`Error getting ${url}: ${er}`);
        exit(1);
    } 
}

let path = process.argv[2];

if (path.slice(0,4) === 'http') {
    webCat(path);
} else {
    cat(path);
}