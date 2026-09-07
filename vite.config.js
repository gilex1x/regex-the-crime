import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: false
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('node_modules\\three')) {
            return 'vendor-three';
          }
          if (id.includes('PropsBuilder')) return 'props-builder';
          if (id.includes('Level1_Alley')) return 'level-alley';
          if (id.includes('Level2_Hotel')) return 'level-hotel';
          if (id.includes('Level3_Office')) return 'level-office';
          if (id.includes('Level4_Morgue')) return 'level-morgue';
          if (id.includes('Level5_Docks')) return 'level-docks';
          if (id.includes('Level6_Sanctuary')) return 'level-sanctuary';
          if (id.includes('Level7_Mansion')) return 'level-mansion';
          if (id.includes('Level8_BoilerRoom')) return 'level-boiler-room';
          if (id.includes('Level9_ServerRoom')) return 'level-server-room';
          if (id.includes('Level10_Abyss')) return 'level-abyss';
        }
      }
    }
  }
});
