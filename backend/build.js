const esbuild = require('esbuild');

esbuild.buildSync({
  entryPoints: ['index.ts'],
  bundle: true,
  minify: true,
  sourcemap: 'inline',
  platform: 'node',
  target: 'es2022',
  external: ['@aws-sdk/*'],
  outfile: './dist/index.js',
});
