const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
console.log('Project root:', rootDir);

// 1. Read existing files to preserve all detailed components
const indexHtmlPath = path.join(rootDir, 'index.html');
const stylesCssPath = path.join(rootDir, 'styles.css');
const appJsPath = path.join(rootDir, 'app.js');

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
let stylesCss = fs.readFileSync(stylesCssPath, 'utf8');
let appJs = fs.readFileSync(appJsPath, 'utf8');

console.log('Existing index.html length:', indexHtml.length);
console.log('Existing styles.css length:', stylesCss.length);
console.log('Existing app.js length:', appJs.length);
