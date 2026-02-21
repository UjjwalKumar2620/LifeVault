import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const COLOR_MAP = {
  '#FF4444': '#0EA5A4',
  '#CC3333': '#0B6E6C',
  '#FF6B6B': '#48C7C5',
  '#FF9999': '#48C7C5',
  '#999999': '#64748B',
  '#666666': '#64748B',
  '#F5F5F5': '#F8FAFB',
  '#333333': '#1E293B',
  '#E8E8E8': '#E2E8F0',
  '#D0D0D0': '#94A3B8',
  'rgba(255, 68, 68': 'rgba(14, 165, 164',
  'rgba(153, 153, 153': 'rgba(100, 116, 139',
};

async function* walkDirectory(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const path = join(dir, file.name);
    if (file.isDirectory()) {
      yield* walkDirectory(path);
    } else if (file.name.match(/\.(tsx?|jsx?)$/)) {
      yield path;
    }
  }
}

function replaceColors(content) {
  let result = content;
  for (const [oldColor, newColor] of Object.entries(COLOR_MAP)) {
    result = result.replaceAll(oldColor, newColor);
  }
  return result;
}

async function updateFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const updated = replaceColors(content);
    
    if (content !== updated) {
      await writeFile(filePath, updated, 'utf8');
      console.log(`✓ Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🎨 LifeVault Theme Updater\n');
  console.log('Converting from Red/Gray to Teal theme...\n');
  
  let count = 0;
  for await (const filePath of walkDirectory('src')) {
    if (await updateFile(filePath)) {
      count++;
    }
  }
  
  console.log(`\n✨ Complete! Updated ${count} files.`);
}

main().catch(console.error);
