import { defineConfig } from 'tsup';
import { execSync } from 'child_process';
import { existsSync } from 'fs';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/providers/theme/ThemeProvider.tsx',
    'src/types/index.ts',
    'src/utils/index.ts'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
  treeshake: true,
  minify: true,
  outDir: 'build/dist',
  preserveModules: true,
  preserveModulesRoot: 'src',
  bundle: true,
  onSuccess: async () => {
    console.log('📦 Preparing package for publishing...');
    
    try {
      // Copy docs folder to build/docs
      if (existsSync('docs')) {
        console.log('📁 Copying docs...');
        execSync('xcopy docs build\\docs\\ /E /I /Y', { stdio: 'inherit' });
      }
      
      // Copy README.md to build/
      if (existsSync('README.md')) {
        console.log('📄 Copying README...');
        execSync('copy README.md build\\', { stdio: 'inherit' });
      }
      
      // Copy LICENSE to build/
      if (existsSync('LICENSE')) {
        console.log('⚖️ Copying LICENSE...');
        execSync('copy LICENSE build\\', { stdio: 'inherit' });
      }
      
      // Copy package.json to build/ (for npm publish)
      console.log('📋 Copying package.json...');
      execSync('copy package.json build\\', { stdio: 'inherit' });
      
      
      console.log('✅ Package ready for publishing!');
      console.log('📁 Build folder contains:');
      console.log('   - dist/ (compiled code + source maps)');
      console.log('   - docs/ (documentation)');
      console.log('   - README.md');
      console.log('   - LICENSE');
      console.log('   - package.json');
      console.log('');
      console.log('🚀 Run: cd build && npm publish');
      
    } catch (error) {
      console.warn('⚠️ Failed to prepare package:', error);
    }
  },
});
