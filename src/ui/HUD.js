import { TIERS, ALL_LEVELS } from '../data/FullLevelsData.js';
import { GameConfig } from '../config/GameConfig.js';

/**
 * Gestor del HUD (retícula, audio, selector de mapa de ciudad, inventario de evidencias y modal de victoria)
 */
export class HUD {
  constructor(engine, levelManager, audioManager, academyUI, notebookUI, cutsceneUI, cityMapUI, inventoryUI) {
    this.engine = engine;
    this.levelManager = levelManager;
    this.audio = audioManager;
    this.academyUI = academyUI;
    this.notebookUI = notebookUI;
    this.cutsceneUI = cutsceneUI;
    this.cityMapUI = cityMapUI;
    this.inventoryUI = inventoryUI;

    this.victoryModal = document.getElementById('case-completed-modal');
    this.victoryTitle = document.getElementById('victory-case-title');
    this.victoryMessage = document.getElementById('victory-case-message');
    this.btnNextCase = document.getElementById('btn-next-case');

    this.initControls();
    this.updateMapAlertBadge();
  }

  initControls() {
    // Botón abrir Plano Policial / Mapa de la Ciudad
    const openMapBtn = document.getElementById('btn-open-city-map');
    if (openMapBtn) {
      openMapBtn.addEventListener('click', () => {
        if (this.cityMapUI) {
          this.cityMapUI.open();
        }
      });
    }

    // Botón abrir Inventario de Evidencias
    const openInventoryBtn = document.getElementById('btn-open-inventory');
    if (openInventoryBtn) {
      openInventoryBtn.addEventListener('click', () => {
        if (this.inventoryUI) {
          this.inventoryUI.open();
        }
      });
    }

    // Botón abrir Cuaderno de Evidencias directamente
    const openNotebookBtn = document.getElementById('btn-open-notebook');
    if (openNotebookBtn) {
      openNotebookBtn.addEventListener('click', () => {
        if (this.notebookUI && this.levelManager.currentClue) {
          this.notebookUI.open(this.levelManager.currentClue);
        }
      });
    }

    // Botón ver cinemática del Tier actual
    const replayCutsceneBtn = document.getElementById('btn-replay-cutscene');
    if (replayCutsceneBtn) {
      replayCutsceneBtn.addEventListener('click', () => {
        const currentTier = this.levelManager.getCurrentTier();
        const cutsceneKey = this.getCutsceneForTier(currentTier.id);
        if (this.cutsceneUI && cutsceneKey) {
          this.cutsceneUI.play(cutsceneKey);
        }
      });
    }

    // Botón abrir Academia
    const academyBtn = document.getElementById('btn-open-academy');
    if (academyBtn) {
      academyBtn.addEventListener('click', () => {
        if (this.academyUI) this.academyUI.open();
      });
    }

    // Mute toggle
    const muteBtn = document.getElementById('btn-toggle-sound');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = this.audio.toggleMute();
        muteBtn.textContent = isMuted ? '🔇 Silenciado' : '🔊 Audio';
        muteBtn.classList.toggle('muted', isMuted);
      });
    }

    // Selector de resolución / pixelado (x2, x3, x4)
    const scaleSelect = document.getElementById('pixel-scale-select');
    if (scaleSelect) {
      scaleSelect.addEventListener('change', (e) => {
        this.engine.setPixelScale(parseInt(e.target.value, 10));
      });
    }

    // Selector de los 50 casos agrupados por Tier
    const caseSelect = document.getElementById('case-select');
    if (caseSelect) {
      let optgroupsHTML = '';
      TIERS.forEach(tier => {
        optgroupsHTML += `<optgroup label="${tier.badge} ${tier.name}">`;
        tier.levels.forEach(lvlNum => {
          const lvl = this.levelManager.levels[lvlNum - 1];
          if (lvl) {
            const isSolved = this.levelManager.isCaseSolved(lvl.id) ? '✓ ' : '';
            optgroupsHTML += `<option value="${lvlNum - 1}">${isSolved}Nivel ${lvl.id}: ${lvl.title}</option>`;
          }
        });
        optgroupsHTML += `</optgroup>`;
      });
      caseSelect.innerHTML = optgroupsHTML;

      caseSelect.addEventListener('change', (e) => {
        this.levelManager.loadCase(parseInt(e.target.value, 10));
      });
    }

    // Botón continuar caso resuelto con chequeo de cinemáticas inter-tier
    if (this.btnNextCase) {
      this.btnNextCase.addEventListener('click', () => {
        this.victoryModal.classList.remove('active');
        const completedCase = this.levelManager.getCurrentCase();
        const cutsceneKey = this.getCutsceneForCompletedCase(completedCase.id);

        if (this.cutsceneUI && cutsceneKey) {
          this.cutsceneUI.play(cutsceneKey, () => {
            this.advanceToNextCase(caseSelect);
          });
        } else {
          this.advanceToNextCase(caseSelect);
        }
      });
    }

    // Conectar callback de caso resuelto
    this.levelManager.onCaseCompleted = (caseData) => {
      this.showCaseCompleted(caseData);
    };
  }

  getCutsceneForCompletedCase(caseId) {
    const transitions = {
      10: 'tier_1_to_2',
      20: 'tier_2_to_3',
      30: 'tier_3_to_4',
      40: 'tier_4_to_5',
      50: 'tier_5_to_6',
      60: 'tier_6_to_7',
      70: 'tier_7_to_8',
      80: 'tier_8_to_9',
      90: 'tier_9_to_10',
      100: 'epilogue'
    };
    return transitions[caseId] || null;
  }

  getCutsceneForTier(tierId) {
    const tierScenes = {
      1: 'prologue',
      2: 'tier_1_to_2',
      3: 'tier_2_to_3',
      4: 'tier_3_to_4',
      5: 'tier_4_to_5',
      6: 'tier_5_to_6',
      7: 'tier_6_to_7',
      8: 'tier_7_to_8',
      9: 'tier_8_to_9',
      10: 'tier_9_to_10'
    };
    return tierScenes[tierId] || 'prologue';
  }

  advanceToNextCase(caseSelect) {
    if (this.levelManager.currentCaseIndex < this.levelManager.levels.length - 1) {
      this.levelManager.nextCase();
      if (caseSelect) {
        caseSelect.value = String(this.levelManager.currentCaseIndex);
      }
    } else {
      alert("🏆 ¡ENHORABUENA COMISIONADO! Has resuelto con éxito los 100 casos de Regex: The Crime y desterrado al demonio Malphas.");
    }
    this.updateMapAlertBadge();
  }

  showCaseCompleted(caseData) {
    if (this.victoryTitle) {
      this.victoryTitle.textContent = `¡${caseData.title.toUpperCase()} RESUELTO!`;
    }
    if (this.victoryMessage) {
      this.victoryMessage.textContent = `Has descifrado la evidencia del caso con éxito. Las autoridades han asegurado el perímetro y el expediente ha sido archivado.`;
    }

    if (this.victoryModal) {
      this.victoryModal.classList.add('active');
    }

    this.updateMapAlertBadge();
    if (this.cityMapUI && this.cityMapUI.isOpen) {
      this.cityMapUI.renderMap();
      this.cityMapUI.renderDossier();
    }
    if (this.inventoryUI && this.inventoryUI.isOpen) {
      this.inventoryUI.renderInventory();
    }
  }

  updateMapAlertBadge() {
    const alertDot = document.getElementById('hud-map-alert-dot');
    if (!alertDot) return;
    const solvedClues = this.levelManager.solvedClues;
    let hasAnyPending = false;
    for (const tier of TIERS) {
      if (GameConfig.isTierUnlocked(tier.id, solvedClues, this.levelManager.levels)) {
        const tierLevels = this.levelManager.levels.filter(l => l.tier === tier.id);
        const solvedInTier = tierLevels.filter(l => solvedClues.has(`clue_case_${l.id}`) || solvedClues.has(l.id)).length;
        if (solvedInTier < tierLevels.length) {
          hasAnyPending = true;
          break;
        }
      }
    }
    alertDot.classList.toggle('hidden', !hasAnyPending);
  }
}
