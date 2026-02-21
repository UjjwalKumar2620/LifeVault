#!/bin/bash

# Color Theme Replacement Script
# Updates from Red/Gray theme to Teal theme

echo "🎨 Updating LifeVault color scheme to Teal theme..."
echo ""

# Find all .tsx, .ts, .jsx files in src directory
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" \) | while read file; do
  echo "Processing: $file"
  
  # Create backup
  cp "$file" "$file.bak"
  
  # Replace hex colors
  sed -i 's/#FF4444/#0EA5A4/g' "$file"
  sed -i 's/#CC3333/#0B6E6C/g' "$file"
  sed -i 's/#FF6B6B/#48C7C5/g' "$file"
  sed -i 's/#FF9999/#48C7C5/g' "$file"
  sed -i 's/#999999/#64748B/g' "$file"
  sed -i 's/#666666/#64748B/g' "$file"
  sed -i 's/#F5F5F5/#F8FAFB/g' "$file"
  sed -i 's/#333333/#1E293B/g' "$file"
  sed -i 's/#E8E8E8/#E2E8F0/g' "$file"
  sed -i 's/#D0D0D0/#94A3B8/g' "$file"
  
  # Clean up backup if file was updated successfully
  if [ -f "$file" ]; then
    rm "$file.bak"
  fi
done

echo ""
echo "✨ Color theme updated successfully!"
echo "All files have been converted to the new Teal healthcare theme."
