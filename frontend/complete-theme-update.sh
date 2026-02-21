#!/bin/bash

# Complete Blue & White Theme Converter for LifeVault
# This script converts ALL color references to the new blue and white scheme

echo "🎨 LifeVault Complete Theme Conversion to Blue & White"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Counter
count=0

# Find all relevant files
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.css" \) | while read file; do
  # Skip if file doesn't exist
  [ ! -f "$file" ] && continue
  
  # Create temporary file
  temp_file="${file}.tmp"
  cp "$file" "$temp_file"
  
  # Teal/Green to Blue conversions
  sed -i 's/#0EA5A4/#2563EB/g' "$temp_file"  # Primary teal -> Blue 600
  sed -i 's/#0B6E6C/#1E40AF/g' "$temp_file"  # Dark teal -> Blue 700  
  sed -i 's/#48C7C5/#3B82F6/g' "$temp_file"  # Light teal -> Blue 500
  sed -i 's/#10B981/#2563EB/g' "$temp_file"  # Success green -> Blue
  
  # Red to Blue conversions (for non-emergency elements)
  sed -i 's/from-red-500/from-blue-500/g' "$temp_file"
  sed -i 's/to-red-600/to-blue-600/g' "$temp_file"
  sed -i 's/via-red-500/via-blue-500/g' "$temp_file"
  
  # Background updates
  sed -i 's/#F8FAFB/#FFFFFF/g' "$temp_file"  # Background to white
  sed -i 's/bg-\[#F8FAFB\]/bg-white/g' "$temp_file"
  
  # Text color updates
  sed -i 's/#1E293B/#0F172A/g' "$temp_file"  # Darker text
  sed -i 's/#64748B/#64748B/g' "$temp_file"  # Keep gray text
  
  # Border updates
  sed -i 's/#E2E8F0/#E2E8F0/g' "$temp_file"  # Keep border color
  
  # Tailwind class conversions
  sed -i 's/from-teal-/from-blue-/g' "$temp_file"
  sed -i 's/to-teal-/to-blue-/g' "$temp_file"
  sed -i 's/via-teal-/via-blue-/g' "$temp_file"
  sed -i 's/bg-teal-/bg-blue-/g' "$temp_file"
  sed -i 's/text-teal-/text-blue-/g' "$temp_file"
  sed -i 's/border-teal-/border-blue-/g' "$temp_file"
  sed -i 's/shadow-teal-/shadow-blue-/g' "$temp_file"
  sed -i 's/hover:bg-teal-/hover:bg-blue-/g' "$temp_file"
  sed -i 's/hover:text-teal-/hover:text-blue-/g' "$temp_file"
  sed -i 's/ring-teal-/ring-blue-/g' "$temp_file"
  
  # RGBA color conversions
  sed -i 's/rgba(14, 165, 164/rgba(37, 99, 235/g' "$temp_file"
  sed -i 's/rgba(11, 110, 108/rgba(30, 64, 175/g' "$temp_file"
  sed -i 's/rgba(72, 199, 197/rgba(59, 130, 246/g' "$temp_file"
  
  # Move temp file to original if changes were made
  if ! cmp -s "$file" "$temp_file"; then
    mv "$temp_file" "$file"
    echo "✓ Updated: $file"
    ((count++))
  else
    rm "$temp_file"
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Conversion Complete!"
echo "📊 Updated $count files"
echo "🎨 LifeVault now uses a beautiful Blue & White theme"
echo ""
