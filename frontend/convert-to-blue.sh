#!/bin/bash

# LifeVault Blue Theme Converter
# Converts all teal colors to blue and white theme

echo "🎨 Converting LifeVault to Blue & White Theme..."
echo ""

find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.css" \) | while read file; do
  # Skip if file doesn't exist
  [ ! -f "$file" ] && continue
  
  # Teal to Blue conversions
  sed -i 's/#0EA5A4/#2563EB/g' "$file"  # Primary teal -> Primary blue
  sed -i 's/#0B6E6C/#1E40AF/g' "$file"  # Dark teal -> Dark blue
  sed -i 's/#48C7C5/#3B82F6/g' "$file"  # Light teal -> Light blue
  sed -i 's/#F8FAFB/#FFFFFF/g' "$file"  # Light background -> White
  
  # Additional color updates
  sed -i 's/from-teal-/from-blue-/g' "$file"
  sed -i 's/to-teal-/to-blue-/g' "$file"
  sed -i 's/via-teal-/via-blue-/g' "$file"
  sed -i 's/bg-teal-/bg-blue-/g' "$file"
  sed -i 's/text-teal-/text-blue-/g' "$file"
  sed -i 's/border-teal-/border-blue-/g' "$file"
  sed -i 's/shadow-teal-/shadow-blue-/g' "$file"
  sed -i 's/hover:bg-teal-/hover:bg-blue-/g' "$file"
  sed -i 's/hover:text-teal-/hover:text-blue-/g' "$file"
  
  echo "✓ Updated: $file"
done

echo ""
echo "✨ Blue & White theme conversion complete!"
echo "All files have been updated with the new color scheme."
