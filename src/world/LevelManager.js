import { ALL_LEVELS, TIERS } from '../data/FullLevelsData.js';

// Mapa de importaciones dinámicas para code-splitting individual por escenario
const LEVEL_LOADERS = {
  alley: () => import('./levels/Level1_Alley.js').then(m => m.Level1_Alley),
  hotel: () => import('./levels/Level2_Hotel.js').then(m => m.Level2_Hotel),
  office: () => import('./levels/Level3_Office.js').then(m => m.Level3_Office),
  morgue: () => import('./levels/Level4_Morgue.js').then(m => m.Level4_Morgue),
  docks: () => import('./levels/Level5_Docks.js').then(m => m.Level5_Docks),
  sanctuary: () => import('./levels/Level6_Sanctuary.js').then(m => m.Level6_Sanctuary),
  mansion: () => import('./levels/Level7_Mansion.js').then(m => m.Level7_Mansion),
  boiler_room: () => import('./levels/Level8_BoilerRoom.js').then(m => m.Level8_BoilerRoom),
  server_room: () => import('./levels/Level9_ServerRoom.js').then(m => m.Level9_ServerRoom),
  abyss: () => import('./levels/Level10_Abyss.js').then(m => m.Level10_Abyss)
};

const SCENE_CONFIGS = {
  alley: { camPos: [0, 1.7, 4], rain: true },
  hotel: { camPos: [0, 1.7, 4], rain: false },
  office: { camPos: [0, 1.7, 4.5], rain: false },
  morgue: { camPos: [0, 1.7, 3.8], rain: false },
  docks: { camPos: [0, 1.7, 4.0], rain: true },
  sanctuary: { camPos: [0, 1.7, 4.2], rain: false },
  mansion: { camPos: [0, 1.7, 4.0], rain: false },
  boiler_room: { camPos: [0, 1.7, 4.0], rain: false },
  server_room: { camPos: [0, 1.7, 4.0], rain: false },
  abyss: { camPos: [0, 1.7, 4.2], rain: false }
};

/**
 * Administrador de niveles (100 casos con 10 Tiers de dificultad y 10 escenarios: 1 por Tier)
 */
export class LevelManager {
  constructor(engine, controls, interaction, audio, loadingScreenUI = null) {
    this.engine = engine;
    this.controls = controls;
    this.interaction = interaction;
    this.audio = audio;
    this.loadingScreenUI = loadingScreenUI;

    this.levels = ALL_LEVELS;
    this.currentCaseIndex = 0;
    this.currentLevelInstance = null;
    this.currentClue = null;
    this.solvedClues = new Set();
    this.userSolutions = {};
    this.onCaseCompleted = null;
    this.isLoadingCase = false;

    this.loadProgress();
  }

  setLoadingScreenUI(loadingScreenUI) {
    this.loadingScreenUI = loadingScreenUI;
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('regex_crime_solved_levels');
      if (saved) {
        const arr = JSON.parse(saved);
        this.solvedClues = new Set(arr);
      }
      const savedSolutions = localStorage.getItem('regex_crime_user_solutions');
      if (savedSolutions) {
        this.userSolutions = JSON.parse(savedSolutions);
      }
    } catch (e) {
      console.warn('No se pudo cargar el progreso de niveles guardado', e);
    }
  }

  saveProgress() {
    try {
      localStorage.setItem('regex_crime_solved_levels', JSON.stringify([...this.solvedClues]));
      localStorage.setItem('regex_crime_user_solutions', JSON.stringify(this.userSolutions));
    } catch (e) {
      console.warn('No se pudo guardar el progreso', e);
    }
  }

  getCurrentCase() {
    return this.levels[this.currentCaseIndex] || this.levels[0];
  }

  getCurrentTier() {
    const c = this.getCurrentCase();
    return TIERS.find(t => t.id === c.tier) || TIERS[0];
  }

  async loadCase(index) {
    if (index < 0 || index >= this.levels.length) return;
    if (this.isLoadingCase) return;
    this.isLoadingCase = true;

    this.currentCaseIndex = index;
    const caseData = this.levels[index];
    const tierData = TIERS.find(t => t.id === caseData.tier) || TIERS[0];

    // 1. Mostrar pantalla de carga con tips REGEX
    const startTime = Date.now();
    const minDisplayDuration = 1400; // ms mínimos para visualización cómoda y sin parpadeos

    if (this.loadingScreenUI) {
      await this.loadingScreenUI.show(caseData, tierData);
    }

    // 2. Limpiar nivel anterior
    if (this.currentLevelInstance) {
      this.currentLevelInstance.destroy();
      this.currentLevelInstance = null;
    }

    // 3. Posición de la pista según el escenario 3D (con aleatorización)
    const clueSpawnPoints = {
      alley: [ [0.3, 0.85, -2.0], [-2.0, 0.85, -4.0], [2.5, 0.85, -1.0], [0.0, 0.85, -6.0] ],
      hotel: [ [1.1, 0.85, -1.6], [-1.5, 0.85, -2.5], [2.0, 0.85, -0.5], [-0.5, 0.85, -3.0] ],
      office: [ [0.0, 0.85, -1.2], [-1.8, 0.85, -2.0], [1.5, 0.85, -2.5], [-1.0, 0.85, -0.5] ],
      morgue: [ [0.0, 0.95, -2.0], [-1.5, 0.95, -3.5], [1.5, 0.95, -1.5], [2.0, 0.95, -3.0] ],
      docks: [ [0.0, 0.92, -2.5], [-2.5, 0.92, -4.0], [2.0, 0.92, -2.0], [1.5, 0.92, -5.0] ],
      sanctuary: [ [0.0, 0.95, -2.2], [-2.0, 0.95, -3.0], [2.0, 0.95, -3.0], [0.0, 0.95, -4.5] ],
      mansion: [ [0.0, 0.85, -2.2], [-1.5, 0.85, -3.0], [1.5, 0.85, -1.5], [-2.5, 0.85, -2.0] ],
      boiler_room: [ [0.0, 0.85, -2.0], [-2.0, 0.85, -3.5], [1.5, 0.85, -2.5], [2.5, 0.85, -1.0] ],
      server_room: [ [0.0, 0.85, -2.0], [-1.5, 0.85, -3.0], [1.5, 0.85, -3.0], [-2.5, 0.85, -1.5] ],
      abyss: [ [0.0, 1.05, -2.2], [-2.0, 1.05, -3.5], [2.0, 1.05, -3.5], [0.0, 1.05, -5.0] ]
    };
    
    const spawns = clueSpawnPoints[caseData.sceneType] || [[0, 0.85, -2.0]];
    const cluePos = spawns[Math.floor(Math.random() * spawns.length)];

    const clue = {
      id: `clue_case_${caseData.id}`,
      levelId: caseData.id,
      name: caseData.title,
      type: caseData.type === 'criminal_cipher' ? 'cipher' : 'note',
      position: cluePos,
      documentTitle: caseData.documentTitle,
      taskInstructions: caseData.task || caseData.question,
      regexHint: caseData.hint || "Analiza la expresión regular del criminal.",
      syntaxCheat: caseData.recommendedRegex || caseData.criminalRegex,
      sourceText: caseData.sourceText,
      expectedMatches: caseData.expectedMatches,
      levelData: caseData
    };
    this.currentClue = clue;

    // 4. Descargar dinámicamente el chunk del escenario correspondiente
    try {
      const loader = LEVEL_LOADERS[caseData.sceneType] || LEVEL_LOADERS.alley;
      const LevelClass = await loader();

      const config = SCENE_CONFIGS[caseData.sceneType] || { camPos: [0, 1.7, 4], rain: false };
      this.engine.camera.position.set(...config.camPos);
      this.controls.euler.set(0, 0, 0, 'YXZ');

      if (config.rain) {
        this.audio.startRainAmbience();
      } else {
        this.audio.stopRainAmbience();
      }

      this.currentLevelInstance = new LevelClass(this.engine.scene, [clue]);
      this.currentLevelInstance.build();
      this.controls.setColliders(this.currentLevelInstance.colliders);
      this.interaction.setInteractiveObjects(this.currentLevelInstance.interactiveObjects);

      this.updateHUDCaseInfo();
    } catch (err) {
      console.error("Error al cargar escenario dinámicamente:", err);
    }

    // 5. Garantizar tiempo mínimo para lectura del tip y evitar parpadeos
    const elapsed = Date.now() - startTime;
    const remainingWait = Math.max(0, minDisplayDuration - elapsed);
    if (remainingWait > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingWait));
    }

    // 6. Ocultar pantalla de carga
    if (this.loadingScreenUI) {
      await this.loadingScreenUI.hide();
    }

    if (this.controls) {
      this.controls.isEnabled = true;
    }

    this.isLoadingCase = false;
  }

  markClueSolved(clueId, solutionData = null) {
    this.solvedClues.add(clueId);
    if (solutionData) {
      this.userSolutions[clueId] = solutionData;
    }
    this.saveProgress();
    this.updateHUDCaseInfo();

    const currentCase = this.getCurrentCase();
    if (this.onCaseCompleted) {
      this.audio.playSuccessBell();
      this.onCaseCompleted(currentCase);
    }
  }

  isCaseSolved(caseId) {
    return this.solvedClues.has(`clue_case_${caseId}`);
  }

  isClueSolved(clueId) {
    return this.solvedClues.has(clueId);
  }

  nextCase() {
    if (this.currentCaseIndex < this.levels.length - 1) {
      this.loadCase(this.currentCaseIndex + 1);
    }
  }

  restartCurrentCase() {
    this.loadCase(this.currentCaseIndex);
  }

  update(time, delta) {
    if (this.currentLevelInstance && this.currentLevelInstance.update) {
      this.currentLevelInstance.update(time, delta);
    }
  }

  updateHUDCaseInfo() {
    const currentCase = this.getCurrentCase();
    const tier = this.getCurrentTier();

    const titleEl = document.getElementById('hud-case-title');
    const subtitleEl = document.getElementById('hud-case-subtitle');
    const tierEl = document.getElementById('hud-tier-badge');
    const progressEl = document.getElementById('hud-clues-progress');
    const selectEl = document.getElementById('case-select');

    if (titleEl) titleEl.textContent = currentCase.title;
    if (subtitleEl) subtitleEl.textContent = currentCase.subtitle;
    if (tierEl) tierEl.textContent = `${tier.badge} ${tier.name}`;

    if (progressEl) {
      const totalSolved = this.levels.filter(l => this.isCaseSolved(l.id)).length;
      progressEl.innerHTML = `Resueltos: <strong>${totalSolved} / ${this.levels.length}</strong>`;
    }

    if (selectEl && selectEl.value !== String(this.currentCaseIndex)) {
      selectEl.value = String(this.currentCaseIndex);
    }
  }
}
