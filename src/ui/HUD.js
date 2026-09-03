import { TIERS } from '../data/FullLevelsData.js';

/**
 * Gestor del HUD (retícula, audio, selector de 50 casos por Tier y modal de victoria)
 */
export class HUD {
  constructor(engine, levelManager, audioManager, academyUI, notebookUI) {
    this.engine = engine;
    this.levelManager = levelManager;
    this.audio = audioManager;
    this.academyUI = academyUI;
    this.notebookUI = notebookUI;

    this.victoryModal = document.getElementById('case-completed-modal');
    this.victoryTitle = document.getElementById('victory-case-title');
    this.victoryMessage = document.getElementById('victory-case-message');
    this.btnNextCase = document.getElementById('btn-next-case');

    this.initControls();
  }

  initControls() {
    // Botón abrir Cuaderno de Evidencias directamente
    const openNotebookBtn = document.getElementById('btn-open-notebook');
    if (openNotebookBtn) {
      openNotebookBtn.addEventListener('click', () => {
        if (this.notebookUI && this.levelManager.currentClue) {
          this.notebookUI.open(this.levelManager.currentClue);
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

    // Botón continuar caso resuelto
    if (this.btnNextCase) {
      this.btnNextCase.addEventListener('click', () => {
        this.victoryModal.classList.remove('active');
        if (this.levelManager.currentCaseIndex < this.levelManager.levels.length - 1) {
          this.levelManager.nextCase();
          if (caseSelect) {
            caseSelect.value = String(this.levelManager.currentCaseIndex);
          }
        } else {
          alert("🏆 ¡ENHORABUENA COMISIONADO! Has resuelto con éxito los 50 casos de Regex: The Crime.");
        }
      });
    }

    // Conectar callback de caso resuelto
    this.levelManager.onCaseCompleted = (caseData) => {
      this.showCaseCompleted(caseData);
    };
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
  }
}
