import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputFile = path.join(rootDir, 'codebase-dump.txt');

const BINARY_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.otf',
  '.mp4',
  '.webm',
  '.zip',
  '.tar',
  '.gz',
  '.pdf',
]);

const SKIP_NAMES = new Set([
  'node_modules',
  'dist',
  'dist-ssr',
  '.git',
  'package-lock.json',
  'codebase-dump.txt',
  '.DS_Store',
]);

function isBinaryFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.has(ext);
}

function walkDir(dirPath, fileList = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP_NAMES.has(entry.name)) continue;
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, fileList);
    } else if (entry.isFile()) {
      if (!isBinaryFile(fullPath)) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

function dumpCodebase() {
  const filesToDump = [];

  // 1. Specified root files
  const rootSpecificFiles = [
    'package.json',
    'index.html',
    'tailwind.config.js',
    'vite.config.ts',
    'postcss.config.js',
    'tsconfig.json',
    'tsconfig.app.json',
    'tsconfig.node.json',
    '.gitignore',
  ];

  for (const relFile of rootSpecificFiles) {
    const full = path.join(rootDir, relFile);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) {
      filesToDump.push(full);
    }
  }

  // 2. Walk src/ directory
  const srcDir = path.join(rootDir, 'src');
  if (fs.existsSync(srcDir)) {
    const srcFiles = walkDir(srcDir);
    srcFiles.sort();
    filesToDump.push(...srcFiles);
  }

  // 3. Walk scripts/ directory (excluding output file if inside)
  const scriptsDir = path.join(rootDir, 'scripts');
  if (fs.existsSync(scriptsDir)) {
    const scriptFiles = walkDir(scriptsDir);
    scriptFiles.sort();
    for (const sf of scriptFiles) {
      if (!filesToDump.includes(sf)) {
        filesToDump.push(sf);
      }
    }
  }

  let totalFiles = 0;
  let totalBytes = 0;
  const outStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });

  outStream.write(`=== CODEBASE DUMP: ${new Date().toISOString()} ===\n\n`);

  for (const fullPath of filesToDump) {
    const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
    const content = fs.readFileSync(fullPath, 'utf8');

    outStream.write(`=== FILE: ${relPath} ===\n`);
    outStream.write(content);
    outStream.write('\n\n');

    totalFiles++;
    totalBytes += Buffer.byteLength(content, 'utf8');
  }

  outStream.end(() => {
    console.log(`✓ Dumped ${totalFiles} files (${(totalBytes / 1024).toFixed(1)} KB) into ${path.basename(outputFile)}`);
  });
}

dumpCodebase();
