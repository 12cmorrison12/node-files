import { readFile, writeFile } from 'fs';
import { exit, argv } from 'process';
import { get } from 'axios';

function output(text, out) {
    if(out) {
        writeFile(out, text, function(er) {
            if (er) {
                console.error(`Couldn't print ${out}: ${er}`);
                exit(1);
            } 
        });
    } else {
        console.log(text);
    }
}

function cat(path, out) {
    readFile(path, function (er, data) {
        if (er) {
            console.error(`Error reading ${path}: ${er}`);
            exit(1);
        } else {
            output(data, out);
        }
    });
}

async function webCat(url, out) {
    try {
        let response = await get(url);
        output(response.data, out);
    } catch (er) {
        console.error(`Error getting ${url}: ${er}`);
        exit(1);
    } 
}

let path;
let out;

if(argv[2] === '--out') {
    out = argv[3];
    path = argv[4]
} else {
    path = argv[2];
}

if (path.slice(0,4) === 'http') {
    webCat(path);
} else {
    cat(path);
}