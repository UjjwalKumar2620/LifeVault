#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

console.log('🎨 LifeVault Complete Color Update to Blue & White Theme');
console.log('━'.repeat(60));
console.log('');

// Color mappings
const colorMappings = [
  // Hex colors
  { from: /#0EA5A4/gi, to: '#2563EB', name: 'Primary Teal → Blue' },
  { from: /#0B6E6C/gi, to: '#1E40AF', name: 'Dark Teal → Dark Blue' },
  { from: /#48C7C5/gi, to: '#3B82F6', name: 'Light Teal → Light Blue' },
  { from: /#10B981/gi, to: '#10B981', name: 'Success Green (keep)' },
  
  // Gray colors (some need updating)
  { from: /#999999/gi, to: '#64748B', name: 'Gray → Slate Gray' },
  { from: /#666666/gi, to: '#64748B', name: 'Dark Gray → Slate Gray' },
  { from: /#333333/gi, to: '#1E293B', name: 'Very Dark Gray → Slate' },
  { from: /#F5F5F5/gi, to: '#F8FAFC', name: 'Light Gray → Blue Gray' },
  { from: /#E8E8E8/gi, to: '#E2E8F0', name: 'Border Gray → Slate Border' },
  
  // Keep red colors for emergency/important elements
  // { from: /#FF4444/gi, to: '#FF4444', name: 'Red (keep for emergency)' },
  // { from: /#CC3333/gi, to: '#CC3333', name: 'Dark Red (keep)' },
  // { from: /#FF6B6B/gi, to: '#FF6B6B', name: 'Light Red (keep)' },
  
  // Tailwind class conversions
  { from: /from-teal-/g, to: 'from-blue-', name: 'Gradient from-teal → from-blue' },
  { from: /to-teal-/g, to: 'to-blue-', name: 'Gradient to-teal → to-blue' },
  { from: /via-teal-/g, to: 'via-blue-', name: 'Gradient via-teal → via-blue' },
  { from: /bg-teal-/g, to: 'bg-blue-', name: 'Background teal → blue' },
  { from: /text-teal-/g, to: 'text-blue-', name: 'Text teal → blue' },
  { from: /border-teal-/g, to: 'border-blue-', name: 'Border teal → blue' },
  { from: /shadow-teal-/g, to: 'shadow-blue-', name: 'Shadow teal → blue' },
  { from: /ring-teal-/g, to: 'ring-blue-', name: 'Ring teal → blue' },
  { from: /hover:bg-teal-/g, to: 'hover:bg-blue-', name: 'Hover bg teal → blue' },
  { from: /hover:text-teal-/g, to: 'hover:text-blue-', name: 'Hover text teal → blue' },
  { from: /focus:ring-teal-/g, to: 'focus:ring-blue-', name: 'Focus ring teal → blue' },
  
  // RGBA color conversions
  { from: /rgba\(14,\s*165,\s*164/gi, to: 'rgba(37, 99, 235', name: 'RGBA Teal → Blue' },
  { from: /rgba\(11,\s*110,\s*108/gi, to: 'rgba(30, 64, 175', name: 'RGBA Dark Teal → Dark Blue' },
  { from: /rgba\(72,\s*199,\s*197/gi, to: 'rgba(59, 130, 246', name: 'RGBA Light Teal → Light Blue' },
  { from: /rgba\(153,\s*153,\s*153/gi, to: 'rgba(100, 116, 139', name: 'RGBA Gray → Slate' },
];

// Function to recursively find all files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = join(dirPath, file);
    
    if (statSync(fullPath).isDirectory()) {
      // Skip node_modules and other build directories
      if (!['node_modules', '.git', 'dist', 'build', '.next'].includes(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      // Only process tsx, ts, jsx, js, and css files
      if (/\.(tsx|ts|jsx|js|css)$/.test(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

// Get all files from src directory
const srcDir = join(process.cwd(), 'src');
let allFiles = [];

try {
  allFiles = getAllFiles(srcDir);
} catch (error) {
  console.error('❌ Error: Could not find src directory');
  console.error('Make sure you run this script from the project root');
  process.exit(1);
}

console.log(`📁 Found ${allFiles.length} files to process`);
console.log('');

let filesUpdated = 0;
let totalChanges = 0;

// Process each file
allFiles.forEach((filePath) => {
  try {
    let content = readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fileChanges = 0;

    // Apply all color mappings
    colorMappings.forEach((mapping) => {
      const matches = content.match(mapping.from);
      if (matches) {
        content = content.replace(mapping.from, mapping.to);
        fileChanges += matches.length;
      }
    });

    // Only write if changes were made
    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf8');
      filesUpdated++;
      totalChanges += fileChanges;
      console.log(`✓ ${filePath.replace(process.cwd(), '.')} (${fileChanges} changes)`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log('');
console.log('━'.repeat(60));
console.log('✨ Color Update Complete!');
console.log(`📊 Updated ${filesUpdated} files with ${totalChanges} total changes`);
console.log('🎨 LifeVault now uses a beautiful Blue & White theme');
console.log('');
console.log('Color Palette:');
console.log('  Primary Blue:  #2563EB');
console.log('  Dark Blue:     #1E40AF');
console.log('  Light Blue:    #3B82F6');
console.log('  Background:    #FFFFFF / #F8FAFC');
console.log('  Text:          #1E293B / #64748B');
console.log('');
