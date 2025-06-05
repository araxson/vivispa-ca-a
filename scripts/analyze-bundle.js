#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Bundle Analysis Script for Next.js 15+ with Turbopack
 * Analyzes build output and provides optimization recommendations
 */

const COLORS = {
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  RED: '\x1b[31m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m',
};

const THRESHOLDS = {
  GOOD: { js: 200 * 1024, total: 500 * 1024 },
  WARNING: { js: 500 * 1024, total: 1024 * 1024 },
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getColorBySize(size, threshold) {
  if (size <= threshold.GOOD) return COLORS.GREEN;
  if (size <= threshold.WARNING) return COLORS.YELLOW;
  return COLORS.RED;
}

function analyzeBuild() {
  console.log(`${COLORS.BLUE}${COLORS.BOLD}📊 Bundle Analysis Report${COLORS.RESET}\n`);

  try {
    // Check if build exists
    const buildDir = path.join(process.cwd(), '.next');
    if (!fs.existsSync(buildDir)) {
      console.log(`${COLORS.RED}❌ No build found. Run 'npm run build' first.${COLORS.RESET}`);
      process.exit(1);
    }

    // Run build analysis
    console.log(`${COLORS.BLUE}🔍 Analyzing bundle sizes...${COLORS.RESET}\n`);

    // Get static folder analysis
    const staticDir = path.join(buildDir, 'static');
    if (fs.existsSync(staticDir)) {
      analyzeStaticFiles(staticDir);
    }

    // Analyze chunks
    const chunksDir = path.join(staticDir, 'chunks');
    if (fs.existsSync(chunksDir)) {
      analyzeChunks(chunksDir);
    }

    // Get page analysis
    analyzePages();

    // Performance recommendations
    console.log(`\n${COLORS.BLUE}${COLORS.BOLD}💡 Performance Recommendations${COLORS.RESET}\n`);
    showRecommendations();

  } catch (error) {
    console.error(`${COLORS.RED}❌ Error analyzing build:${COLORS.RESET}`, error.message);
    process.exit(1);
  }
}

function analyzeStaticFiles(staticDir) {
  const stats = getDirectoryStats(staticDir);
  
  console.log(`${COLORS.BOLD}📁 Static Assets Summary${COLORS.RESET}`);
  console.log(`Total Size: ${getColorBySize(stats.totalSize, THRESHOLDS.WARNING)}${formatBytes(stats.totalSize)}${COLORS.RESET}`);
  console.log(`File Count: ${stats.fileCount}`);
  console.log(`JS Size: ${getColorBySize(stats.jsSize, THRESHOLDS.WARNING)}${formatBytes(stats.jsSize)}${COLORS.RESET}`);
  console.log(`CSS Size: ${formatBytes(stats.cssSize)}`);
  console.log();
}

function analyzeChunks(chunksDir) {
  const chunks = fs.readdirSync(chunksDir)
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const filePath = path.join(chunksDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        path: filePath,
      };
    })
    .sort((a, b) => b.size - a.size);

  console.log(`${COLORS.BOLD}📦 Largest JavaScript Chunks${COLORS.RESET}`);
  
  const topChunks = chunks.slice(0, 10);
  topChunks.forEach((chunk, index) => {
    const color = getColorBySize(chunk.size, { GOOD: 50 * 1024, WARNING: 100 * 1024 });
    console.log(`${index + 1}. ${chunk.name}: ${color}${formatBytes(chunk.size)}${COLORS.RESET}`);
  });

  if (chunks.length > 10) {
    console.log(`... and ${chunks.length - 10} more chunks`);
  }
  console.log();
}

function analyzePages() {
  try {
    // This would need to be enhanced based on actual Next.js build output
    console.log(`${COLORS.BOLD}📄 Page Analysis${COLORS.RESET}`);
    console.log('Use Next.js bundle analyzer for detailed page analysis:');
    console.log(`${COLORS.BLUE}npm install --save-dev @next/bundle-analyzer${COLORS.RESET}`);
    console.log();
  } catch (error) {
    console.log(`${COLORS.YELLOW}⚠️ Could not analyze pages${COLORS.RESET}`);
  }
}

function getDirectoryStats(dir) {
  let totalSize = 0;
  let fileCount = 0;
  let jsSize = 0;
  let cssSize = 0;

  function walkDir(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        walkDir(filePath);
      } else {
        totalSize += stats.size;
        fileCount++;
        
        if (file.endsWith('.js')) {
          jsSize += stats.size;
        } else if (file.endsWith('.css')) {
          cssSize += stats.size;
        }
      }
    });
  }

  walkDir(dir);
  return { totalSize, fileCount, jsSize, cssSize };
}

function showRecommendations() {
  const recommendations = [
    {
      icon: '🚀',
      title: 'Code Splitting',
      description: 'Use dynamic imports for non-critical components',
      action: 'const Component = dynamic(() => import("./Component"))',
    },
    {
      icon: '🖼️',
      title: 'Image Optimization',
      description: 'Ensure all images use Next.js Image component with WebP/AVIF',
      action: 'Convert remaining images to WebP format',
    },
    {
      icon: '📦',
      title: 'Bundle Analysis',
      description: 'Regularly check for duplicate dependencies',
      action: 'npm run analyze (with @next/bundle-analyzer)',
    },
    {
      icon: '⚡',
      title: 'Tree Shaking',
      description: 'Import only what you need from libraries',
      action: 'import { specific } from "library" instead of import * as library',
    },
    {
      icon: '🎯',
      title: 'Prefetching',
      description: 'Use Next.js Link prefetching strategically',
      action: 'Add prefetch={false} for non-critical routes',
    },
  ];

  recommendations.forEach(rec => {
    console.log(`${rec.icon} ${COLORS.BOLD}${rec.title}${COLORS.RESET}`);
    console.log(`  ${rec.description}`);
    console.log(`  ${COLORS.BLUE}→ ${rec.action}${COLORS.RESET}\n`);
  });
}

// Performance check
function checkPerformance() {
  console.log(`${COLORS.BLUE}${COLORS.BOLD}⚡ Performance Checklist${COLORS.RESET}\n`);

  const checks = [
    {
      name: 'Next.js Image optimization',
      check: () => fs.existsSync(path.join(process.cwd(), 'next.config.ts')),
      tip: 'Ensure images.formats includes AVIF and WebP',
    },
    {
      name: 'Font optimization',
      check: () => {
        const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
        if (fs.existsSync(layoutPath)) {
          const content = fs.readFileSync(layoutPath, 'utf8');
          return content.includes('next/font');
        }
        return false;
      },
      tip: 'Use next/font for Google Fonts optimization',
    },
    {
      name: 'Turbopack configuration',
      check: () => {
        const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
        return packageJson.scripts?.dev?.includes('--turbo');
      },
      tip: 'Add --turbo flag to dev script for faster builds',
    },
  ];

  checks.forEach(check => {
    const passed = check.check();
    const icon = passed ? '✅' : '❌';
    const status = passed ? `${COLORS.GREEN}PASS${COLORS.RESET}` : `${COLORS.RED}FAIL${COLORS.RESET}`;
    
    console.log(`${icon} ${check.name}: ${status}`);
    if (!passed) {
      console.log(`   ${COLORS.YELLOW}💡 ${check.tip}${COLORS.RESET}`);
    }
  });
}

// Main execution
function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'analyze':
    case undefined:
      analyzeBuild();
      break;
    case 'check':
      checkPerformance();
      break;
    case 'help':
      console.log(`${COLORS.BLUE}${COLORS.BOLD}Bundle Analyzer Usage${COLORS.RESET}\n`);
      console.log('node scripts/analyze-bundle.js [command]\n');
      console.log('Commands:');
      console.log('  analyze (default) - Analyze build bundle');
      console.log('  check            - Run performance checklist');
      console.log('  help             - Show this help');
      break;
    default:
      console.log(`${COLORS.RED}Unknown command: ${command}${COLORS.RESET}`);
      console.log('Use "help" for available commands');
      process.exit(1);
  }
}

if (require.main === module) {
  main();
} 