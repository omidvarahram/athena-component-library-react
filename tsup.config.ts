import { defineConfig } from 'tsup';
import { existsSync, cpSync, mkdirSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/providers/theme/ThemeProvider.tsx',
    'src/types/index.ts',
    'src/utils/index.ts',
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
      // Ensure build directory exists
      if (!existsSync('build')) {
        mkdirSync('build', { recursive: true });
      }

      // Copy docs folder to build/docs
      if (existsSync('docs')) {
        console.log('📁 Copying docs...');
        cpSync('docs', join('build', 'docs'), { recursive: true });
      }

      // Copy README.md to build/
      if (existsSync('README.md')) {
        console.log('📄 Copying README...');
        cpSync('README.md', join('build', 'README.md'));
      }

      // Copy LICENSE to build/
      if (existsSync('LICENSE')) {
        console.log('⚖️ Copying LICENSE...');
        cpSync('LICENSE', join('build', 'LICENSE'));
      }

      // Copy package.json to build/ (for npm publish)
      console.log('📋 Copying package.json...');
      cpSync('package.json', join('build', 'package.json'));

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
