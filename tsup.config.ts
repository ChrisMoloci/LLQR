import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    types: 'src/exports/types.ts',
    constants: 'src/exports/constants.ts',
    api: 'src/exports/api.ts',
    datasets: 'src/exports/datasets.ts'
  },  
  // ['src/index.ts', 'src/exports/types.ts', 'src/exports/api.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
});