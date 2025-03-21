/**
 * Helper script to convert JSX files to TSX with proper type annotations
 * 
 * Usage: 
 * - Run with node: npx ts-node src/scripts/convertToTs.ts
 */

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Extensions to process
const extensions = ['.js', '.jsx'];
// Directories to exclude
const excludeDirs = ['node_modules', 'dist', 'build'];

// Convert a single file
async function convertFile(filePath: string): Promise<void> {
  console.log(`Converting ${filePath}`);
  
  try {
    const content = await readFile(filePath, 'utf-8');
    
    // Create the new file path with .ts or .tsx extension
    const newExtension = filePath.endsWith('x') ? '.tsx' : '.ts';
    const newFilePath = filePath.replace(/\.(js|jsx)$/, newExtension);
    
    // Don't overwrite existing TypeScript files
    if (fs.existsSync(newFilePath)) {
      console.log(`Skipping ${filePath}, ${newFilePath} already exists`);
      return;
    }
    
    // Write to the new file
    await writeFile(newFilePath, content);
    console.log(`Created ${newFilePath}`);
    
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
  }
}

// Process a directory recursively
async function processDirectory(dirPath: string): Promise<void> {
  try {
    const entries = await readdir(dirPath);
    
    for (const entry of entries) {
      // Skip excluded directories
      if (excludeDirs.includes(entry)) continue;
      
      const entryPath = path.join(dirPath, entry);
      const entryStat = await stat(entryPath);
      
      if (entryStat.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(entryPath);
      } else if (entryStat.isFile() && extensions.some(ext => entryPath.endsWith(ext))) {
        // Convert JavaScript files
        await convertFile(entryPath);
      }
    }
    
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}

// Main function
async function main(): Promise<void> {
  const rootDir = path.resolve(process.cwd(), 'src');
  console.log(`Starting conversion from ${rootDir}`);
  await processDirectory(rootDir);
  console.log('Conversion complete');
}

// Run the script if invoked directly
if (require.main === module) {
  main().catch(console.error);
}

export default main; 