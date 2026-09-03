import { ALL_LEVELS, TIERS } from '../data/FullLevelsData.js';
import { Level1_Alley } from './levels/Level1_Alley.js';
import { Level2_Hotel } from './levels/Level2_Hotel.js';
import { Level3_Office } from './levels/Level3_Office.js';
import { Level4_Morgue } from './levels/Level4_Morgue.js';
import { Level5_Docks } from './levels/Level5_Docks.js';
import { Level6_Sanctuary } from './levels/Level6_Sanctuary.js';

/**
 * Administrador de niveles (100 casos con 10 Tiers de dificultad y 6 escenarios)
 */
export class LevelManager {
  constructor(engine, controls, interaction, audio) {
    this.engine = engine;
    this.controls = controls;
    this.interaction = interaction;
    this.audio = audio;

    this.levels = ALL_LEVELS;
    this.currentCaseIndex = 0;
    this.currentLevelInstance = null;
    this.currentClue = null;
    this.solvedClues = new Set();
    this.onCaseCompleted = null;

    this.loadProgress();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('regex_crime_solved_levels');
      if (saved) {
        const arr = JSON.parse(saved);
        this.solvedClues = new Set(arr);
      }
    } catch (e) {
      console.warn('No se pudo cargar el progreso de niveles guardado', e);
    }
  }

  saveProgress() {
    try {
      localStorage.setItem('regex_crime_solved_levels', JSON.stringify([...this.solvedClues]));
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

  loadCase(index) {
    if (index < 0 || index >= this.levels.length) return;

    // Limpiar nivel anterior
    if (this.currentLevelInstance) {
      this.currentLevelInstance.destroy();
      this.currentLevelInstance = null;
    }

    this.currentCaseIndex = index;
    const caseData = this.levels[index];

    // Posición conveniente de la pista según el escenario 3D
    let cluePos = [0.3, 0.85, -2.0];
    if (caseData.sceneType === 'hotel') {
      cluePos = [1.1, 0.85, -1.6];
    } else if (caseData.sceneType === 'office') {
      cluePos = [0.0, 0.85, -1.2];
    } else if (caseData.sceneType === 'morgue') {
      cluePos = [0.0, 0.95, -2.0];
    } else if (caseData.sceneType === 'docks') {
      cluePos = [0.0, 0.92, -2.5];
    } else if (caseData.sceneType === 'sanctuary') {
      cluePos = [0.0, 0.95, -2.2];
    }

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

    // Reiniciar posición de la cámara y crear instancia según la escena 3D
    if (caseData.sceneType === 'alley') {
      this.engine.camera.position.set(0, 1.7, 4);
      this.controls.euler.set(0, 0, 0, 'YXZ');
      this.audio.startRainAmbience();
      this.currentLevelInstance = new Level1_Alley(this.engine.scene, [clue]);
    } else if (caseData.sceneType === 'hotel') {
      this.engine.camera.position.set(0, 1.7, 4);
      this.controls.euler.set(0, 0, 0, 'YXZ');
      this.audio.stopRainAmbience();
      this.currentLevelInstance = new Level2_Hotel(this.engine.scene, [clue]);
    } else if (caseData.sceneType === 'office') {
      this.engine.camera.position.set(0, 1.7, 4.5);
      this.controls.euler.set(0, 0, 0, 'YXZ');
      this.audio.stopRainAmbience();
      this.currentLevelInstance = new Level3_Office(this.engine.scene, [clue]);
    } else if (caseData.sceneType === 'morgue') {
      this.engine.camera.position.set(0, 1.7, 3.8);
      this.controls.euler.set(0, 0, 0, 'YXZ');
      this.audio.stopRainAmbience();
      this.currentLevelInstance = new Level4_Morgue(this.engine.scene, [clue]);
    } else if (caseData.sceneType === 'docks') {
      this.engine.camera.position.set(0, 1.7, 4.0);
      this.controls.euler.set(0, 0, 0, 'YXZ');
      this.audio.startRainAmbience();
      this.currentLevelInstance = new Level5_Docks(this.engine.scene, [clue]);
    } else if (caseData.sceneType === 'sanctuary') {
      this.engine.camera.position.set(0, 1.7, 4.2);
      this.controls.euler.set(0, 0, 0, 'YXZ');
      this.audio.stopRainAmbience();
      this.currentLevelInstance = new Level6_Sanctuary(this.engine.scene, [clue]);
    }

    this.currentLevelInstance.build();
    this.controls.setColliders(this.currentLevelInstance.colliders);
    this.interaction.setInteractiveObjects(this.currentLevelInstance.interactiveObjects);

    this.updateHUDCaseInfo();
  }

  markClueSolved(clueId) {
    this.solvedClues.add(clueId);
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
