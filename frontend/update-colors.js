#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Color mappings from red/gray to teal theme
const colorReplacements = [
  // Direct hex colors
  ['#FF4444', '#0EA5A4'],
  ['#CC3333', '#0B6E6C'],
  ['#FF6B6B', '#48C7C5'],
  ['#FF9999', '#48C7C5'],
  ['#999999', '#64748B'],
  ['#666666', '#64748B'],
  ['#F5F5F5', '#F8FAFB'],
  ['#333333', '#1E293B'],
  ['#E8E8E8', '#E2E8F0'],
  
  // Tailwind text classes
  ['text-[#FF4444]', 'text-[#0EA5A4]'],
  ['text-[#CC3333]', 'text-[#0B6E6C]'],
  ['text-[#FF6B6B]', 'text-[#48C7C5]'],
  ['text-[#999999]', 'text-[#64748B]'],
  ['text-[#666666]', 'text-[#64748B]'],
  ['text-[#333333]', 'text-[#1E293B]'],
  
  // Background classes
  ['bg-[#FF4444]', 'bg-[#0EA5A4]'],
  ['bg-[#CC3333]', 'bg-[#0B6E6C]'],
  ['bg-[#F5F5F5]', 'bg-[#F8FAFB]'],
  ['bg-[#E8E8E8]', 'bg-[#E2E8F0]'],
  
  // Gradient classes
  ['from-[#FF4444]', 'from-[#0EA5A4]'],
  ['to-[#CC3333]', 'to-[#0B6E6C]'],
  ['via-[#FF4444]', 'via-[#0EA5A4]'],
  ['from-[#FF6B6B]', 'from-[#48C7C5]'],
  ['to-[#FF4444]', 'to-[#0EA5A4]'],
  ['from-[#999999]', 'from-[#64748B]'],
  ['to-[#666666]', 'to-[#1E293B]'],
  ['to-[#999999]', 'to-[#64748B]'],
  
  // Border classes
  ['border-[#999999]', 'border-[#E2E8F0]'],
  ['border-[#FF4444]', 'border-[#0EA5A4]'],
  
  // Hover states
  ['hover:text-[#FF4444]', 'hover:text-[#0EA5A4]'],
  ['hover:text-[#CC3333]', 'hover:text-[#0B6E6C]'],
  ['hover:bg-[#E8E8E8]', 'hover:bg-[#E2E8F0]'],
  ['hover:border-[#FF4444]', 'hover:border-[#0EA5A4]'],
  
  // Shadow classes
  ['shadow-[#FF4444]', 'shadow-[#0EA5A4]'],
  ['shadow-[#CC3333]', 'shadow-[#0B6E6C]'],
  ['shadow-[#999999]', 'shadow-[#E2E8F0]'],
  ['shadow-[#FF6B6B]', 'shadow-[#48C7C5]'],
  
  // Group hover states
  ['group-hover:text-[#FF4444]', 'group-hover:text-[#0EA5A4]'],
  ['group-hover:bg-[#FF4444]', 'group-hover:bg-[#0EA5A4]'],
];

function replaceColors(content) {
  let result = content;
  for (const [oldColor, newColor] of colorReplacements) {
    result = result.split(oldColor).join(newColor);
  }
  return result;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const newContent = replaceColors(content);
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✓ Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  let filesUpdated = 0;
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      filesUpdated += processDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.jsx'))) {
      if (processFile(fullPath)) {
        filesUpdated++;
      }
    }
  }
  
  return filesUpdated;
}

// Start processing
console.log('🎨 Updating color scheme to teal theme...\n');

const srcPath = path.join(__dirname, 'src');
const filesUpdated = processDirectory(srcPath);

console.log(`\n✨ Complete! Updated ${filesUpdated} files with new teal theme.`);
