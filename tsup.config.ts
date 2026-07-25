import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/api/index.ts',
    types: 'src/api/exports/types.ts',
    constants: 'src/api/exports/constants.ts',
    api: 'src/api/exports/api.ts',
    datasets: 'src/api/exports/datasets.ts'
  },  
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
});