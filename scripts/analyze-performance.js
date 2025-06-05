#!/usr/bin/env node

/**
 * Performance Analysis Script for Next.js Build
 * Analyzes bundle size, build time, and provides optimization recommendations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PerformanceAnalyzer {
  constructor() {
    this.buildDir = path.join(process.cwd(), '.next');
    this.results = {
      buildTime: 0,
      bundleSize: {},
      recommendations: [],
      metrics: {}
    };
  }

  /**
   * Run complete performance analysis
   */
  async analyze() {
    console.log('🚀 Starting Next.js Performance Analysis...\n');

    // Check if build exists
    if (!fs.existsSync(this.buildDir)) {
      console.log('❌ No build found. Running build first...');
      await this.runBuild();
    }

    // Analyze bundle sizes
    this.analyzeBundleSize();

    // Analyze build manifest
    this.analyzeBuildManifest();

    // Generate recommendations
    this.generateRecommendations();

    // Display results
    this.displayResults();

    return this.results;
  }

  /**
   * Run Next.js build with timing
   */
  async runBuild() {
    const startTime = Date.now();
    
    try {
      execSync('npm run build', { stdio: 'inherit' });
      this.results.buildTime = Date.now() - startTime;
      console.log(`✅ Build completed in ${this.results.buildTime}ms\n`);
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Analyze bundle sizes
   */
  analyzeBundleSize() {
    const staticDir = path.join(this.buildDir, 'static');
    
    if (!fs.existsSync(staticDir)) {
      console.log('⚠️  Static directory not found');
      return;
    }

    const chunks = this.getChunkSizes();
    const pages = this.getPageSizes();

    this.results.bundleSize = {
      chunks,
      pages,
      total: this.calculateTotalSize(chunks, pages)
    };
  }

  /**
   * Get JavaScript chunk sizes
   */
  getChunkSizes() {
    const chunksDir = path.join(this.buildDir, 'static', 'chunks');
    const chunks = {};

    if (!fs.existsSync(chunksDir)) return chunks;

    const files = fs.readdirSync(chunksDir);
    
    files.forEach(file => {
      if (file.endsWith('.js')) {
        const filePath = path.join(chunksDir, file);
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        
        if (file.includes('framework')) {
          chunks.framework = sizeKB;
        } else if (file.includes('main')) {
          chunks.main = sizeKB;
        } else if (file.includes('webpack')) {
          chunks.webpack = sizeKB;
        } else {
          chunks[file] = sizeKB;
        }
      }
    });

    return chunks;
  }

  /**
   * Get page sizes
   */
  getPageSizes() {
    const pagesDir = path.join(this.buildDir, 'static', 'chunks', 'pages');
    const pages = {};

    if (!fs.existsSync(pagesDir)) return pages;

    const files = fs.readdirSync(pagesDir);
    
    files.forEach(file => {
      if (file.endsWith('.js')) {
        const filePath = path.join(pagesDir, file);
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        pages[file.replace('.js', '')] = sizeKB;
      }
    });

    return pages;
  }

  /**
   * Calculate total bundle size
   */
  calculateTotalSize(chunks, pages) {
    const chunkTotal = Object.values(chunks).reduce((sum, size) => sum + size, 0);
    const pageTotal = Object.values(pages).reduce((sum, size) => sum + size, 0);
    return chunkTotal + pageTotal;
  }

  /**
   * Analyze build manifest
   */
  analyzeBuildManifest() {
    const manifestPath = path.join(this.buildDir, 'build-manifest.json');
    
    if (!fs.existsSync(manifestPath)) {
      console.log('⚠️  Build manifest not found');
      return;
    }

    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      
      this.results.metrics = {
        totalPages: Object.keys(manifest.pages || {}).length,
        sharedChunks: manifest.sortedPages?.length || 0,
        lowPriorityFiles: manifest.lowPriorityFiles?.length || 0
      };
    } catch (error) {
      console.log('⚠️  Could not parse build manifest');
    }
  }

  /**
   * Generate optimization recommendations
   */
  generateRecommendations() {
    const { bundleSize, metrics } = this.results;
    const recommendations = [];

    // Bundle size recommendations
    if (bundleSize.total > 1000) { // > 1MB
      recommendations.push({
        type: 'Bundle Size',
        severity: 'high',
        message: `Total bundle size (${bundleSize.total}KB) is large. Consider code splitting and tree shaking.`
      });
    }

    if (bundleSize.chunks.framework > 300) { // > 300KB
      recommendations.push({
        type: 'Framework Bundle',
        severity: 'medium',
        message: `Framework bundle (${bundleSize.chunks.framework}KB) is large. Ensure you're only importing used components.`
      });
    }

    // Page-specific recommendations
    Object.entries(bundleSize.pages).forEach(([page, size]) => {
      if (size > 200) { // > 200KB per page
        recommendations.push({
          type: 'Page Bundle',
          severity: 'medium',
          message: `Page "${page}" (${size}KB) is large. Consider lazy loading components.`
        });
      }
    });

    // Build time recommendations
    if (this.results.buildTime > 60000) { // > 1 minute
      recommendations.push({
        type: 'Build Time',
        severity: 'medium',
        message: `Build time (${Math.round(this.results.buildTime / 1000)}s) is slow. Consider optimizing dependencies.`
      });
    }

    // General optimizations
    recommendations.push({
      type: 'SSG Optimization',
      severity: 'info',
      message: 'Ensure generateStaticParams is used for dynamic routes to enable SSG.'
    });

    recommendations.push({
      type: 'Image Optimization',
      severity: 'info',
      message: 'Use Next.js Image component with proper sizing and formats (WebP/AVIF).'
    });

    recommendations.push({
      type: 'Metadata Optimization',
      severity: 'info',
      message: 'Ensure all pages have proper metadata and structured data for SEO.'
    });

    this.results.recommendations = recommendations;
  }

  /**
   * Display analysis results
   */
  displayResults() {
    console.log('📊 Performance Analysis Results\n');
    console.log('================================\n');

    // Build metrics
    if (this.results.buildTime) {
      console.log(`⏱️  Build Time: ${Math.round(this.results.buildTime / 1000)}s`);
    }
    
    console.log(`📦 Total Bundle Size: ${this.results.bundleSize.total}KB`);
    console.log(`📄 Total Pages: ${this.results.metrics.totalPages || 'Unknown'}\n`);

    // Bundle breakdown
    console.log('📦 Bundle Breakdown:');
    Object.entries(this.results.bundleSize.chunks).forEach(([name, size]) => {
      const indicator = size > 200 ? '🔴' : size > 100 ? '🟡' : '🟢';
      console.log(`   ${indicator} ${name}: ${size}KB`);
    });
    console.log('');

    // Top 5 largest pages
    const sortedPages = Object.entries(this.results.bundleSize.pages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    if (sortedPages.length > 0) {
      console.log('📄 Largest Pages:');
      sortedPages.forEach(([page, size]) => {
        const indicator = size > 200 ? '🔴' : size > 100 ? '🟡' : '🟢';
        console.log(`   ${indicator} ${page}: ${size}KB`);
      });
      console.log('');
    }

    // Recommendations
    if (this.results.recommendations.length > 0) {
      console.log('💡 Recommendations:\n');
      
      this.results.recommendations.forEach((rec, index) => {
        const icon = rec.severity === 'high' ? '🔴' : 
                    rec.severity === 'medium' ? '🟡' : '🔵';
        console.log(`${index + 1}. ${icon} [${rec.type}] ${rec.message}`);
      });
      console.log('');
    }

    // Performance score
    const score = this.calculatePerformanceScore();
    const scoreIcon = score >= 90 ? '🟢' : score >= 70 ? '🟡' : '🔴';
    console.log(`${scoreIcon} Performance Score: ${score}/100\n`);

    // Next steps
    console.log('🚀 Next Steps:');
    console.log('   1. Address high-priority recommendations');
    console.log('   2. Monitor Core Web Vitals in production');
    console.log('   3. Implement performance monitoring');
    console.log('   4. Run lighthouse audits on key pages\n');
  }

  /**
   * Calculate overall performance score
   */
  calculatePerformanceScore() {
    let score = 100;
    
    // Deduct points for large bundles
    if (this.results.bundleSize.total > 1000) score -= 20;
    else if (this.results.bundleSize.total > 500) score -= 10;
    
    // Deduct points for slow build
    if (this.results.buildTime > 120000) score -= 15; // > 2 minutes
    else if (this.results.buildTime > 60000) score -= 10; // > 1 minute
    
    // Deduct points for large pages
    const largePages = Object.values(this.results.bundleSize.pages)
      .filter(size => size > 200).length;
    score -= largePages * 5;

    // Deduct points for high-severity recommendations
    const highSeverityCount = this.results.recommendations
      .filter(rec => rec.severity === 'high').length;
    score -= highSeverityCount * 10;

    return Math.max(0, Math.min(100, score));
  }
}

// CLI interface
if (require.main === module) {
  const analyzer = new PerformanceAnalyzer();
  
  analyzer.analyze().catch(error => {
    console.error('❌ Analysis failed:', error.message);
    process.exit(1);
  });
}

module.exports = PerformanceAnalyzer; 