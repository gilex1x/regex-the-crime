import { ALL_LEVELS, TIERS } from '../data/FullLevelsData.js';

/**
 * UI del Inventario de Evidencias Forenses y Casos Solucionados
 */
export class InventoryUI {
  constructor(levelManager, audio) {
    this.levelManager = levelManager;
    this.audio = audio;

    this.modal = document.getElementById('inventory-modal');
    this.grid = document.getElementById('inventory-evidence-grid');
    this.counterBadge = document.getElementById('inventory-total-counter');
    this.filterBar = document.getElementById('inventory-filter-bar');
    this.closeBtn = document.getElementById('inventory-close-btn');

    this.activeFilterTier = 'ALL';
    this.isOpen = false;
    this.onOpenEvidence = null;

    this.initEvents();
  }

  initEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Atajo KeyI para abrir/cerrar
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyI' && !this.isTextInputFocused()) {
        e.preventDefault();
        this.toggle();
      } else if (e.code === 'Escape' && this.isOpen) {
        e.preventDefault();
        this.close();
      }
    });
  }

  isTextInputFocused() {
    const el = document.activeElement;
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA');
  }

  open() {
    this.isOpen = true;
    if (this.audio?.playTypewriterClick) this.audio.playTypewriterClick();
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    this.renderFilters();
    this.renderInventory();
    if (this.modal) this.modal.classList.add('active');
  }

  close() {
    this.isOpen = false;
    if (this.audio?.playTypewriterClick) this.audio.playTypewriterClick();
    if (this.modal) this.modal.classList.remove('active');
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  renderFilters() {
    if (!this.filterBar) return;
    this.filterBar.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = `inventory-filter-btn ${this.activeFilterTier === 'ALL' ? 'active' : ''}`;
    allBtn.textContent = 'Todas las Evidencias';
    allBtn.addEventListener('click', () => {
      this.activeFilterTier = 'ALL';
      this.renderFilters();
      this.renderInventory();
    });
    this.filterBar.appendChild(allBtn);

    TIERS.forEach(t => {
      const btn = document.createElement('button');
      btn.className = `inventory-filter-btn ${this.activeFilterTier === t.id ? 'active' : ''}`;
      btn.textContent = `Tier ${t.id}`;
      btn.addEventListener('click', () => {
        this.activeFilterTier = t.id;
        this.renderFilters();
        this.renderInventory();
      });
      this.filterBar.appendChild(btn);
    });
  }

  renderInventory() {
    if (!this.grid) return;
    this.grid.innerHTML = '';

    const solvedClues = this.levelManager.solvedClues;
    const solvedLevels = ALL_LEVELS.filter(lvl => 
      solvedClues.has(`clue_case_${lvl.id}`) || solvedClues.has(lvl.id)
    );

    if (this.counterBadge) {
      this.counterBadge.textContent = `${solvedLevels.length} / ${ALL_LEVELS.length} Pruebas Confiscadas`;
    }

    const filteredLevels = this.activeFilterTier === 'ALL' 
      ? solvedLevels 
      : solvedLevels.filter(lvl => lvl.tier === this.activeFilterTier);

    if (filteredLevels.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'inventory-empty-state';
      empty.innerHTML = `
        <h3>💼 Maletín de Evidencias Vacío</h3>
        <p>Aún no has resuelto casos en este sector. Abre el <strong>Mapa [M]</strong> para investigar escenas activas y recolectar pruebas forenses.</p>
      `;
      this.grid.appendChild(empty);
      return;
    }

    // Iconos temáticos según el tier
    const tierIcons = {
      1: "📜", 2: "🧳", 3: "⚓", 4: "🍷", 5: "🏦",
      6: "🩸", 7: "🧨", 8: "📟", 9: "🕯️", 10: "🗝️"
    };

    filteredLevels.forEach(lvl => {
      const card = document.createElement('div');
      card.className = 'evidence-card';
      const icon = tierIcons[lvl.tier] || "📑";

      const userSolution = this.levelManager.userSolutions[lvl.id] || this.levelManager.userSolutions[`clue_case_${lvl.id}`];
      
      let solutionHTML = '';
      if (userSolution && userSolution.type === 'cipher') {
        solutionHTML = `<div class="evidence-regex-box" style="margin-top: 8px;">
          <span class="regex-label">Tu Deducción:</span>
          <span class="regex-code" style="color:#059669">${userSolution.answer}</span>
        </div>`;
      } else if (userSolution && userSolution.type === 'construction') {
        solutionHTML = `<div class="evidence-regex-box" style="margin-top: 8px;">
          <span class="regex-label">Tu Fórmula:</span>
          <span class="regex-code" style="color:#059669">/${userSolution.regex}/${userSolution.flags}</span>
        </div>`;
      } else {
        solutionHTML = `<div class="evidence-regex-box" style="margin-top: 8px;">
          <span class="regex-label">Fórmula Sugerida:</span>
          <span class="regex-code">/${lvl.recommendedRegex || lvl.criminalRegex}/${lvl.recommendedFlags || lvl.criminalFlags || 'g'}</span>
        </div>`;
      }

      const puzzleText = lvl.type === 'criminal_cipher' ? lvl.question : lvl.task;

      card.innerHTML = `
        <div class="evidence-card-header">
          <span class="evidence-tier-pill">Tier ${lvl.tier} • ${lvl.sceneType.toUpperCase()}</span>
          <span class="evidence-case-id">CASO #${lvl.id.toString().padStart(2, '0')}</span>
        </div>
        <div class="evidence-title">${icon} ${lvl.title}</div>
        <div class="evidence-doc-title">Documento: "${lvl.documentTitle}"</div>
        <p class="evidence-lore-text" style="margin-bottom: 8px;">${lvl.description}</p>
        <div style="background: rgba(0,0,0,0.05); padding: 8px; border-left: 3px solid #b91c1c; font-size: 0.85rem; font-style: italic; color: #4b5563;">
          <strong>Acertijo:</strong> ${puzzleText}
        </div>
        ${solutionHTML}
      `;

      card.style.cursor = 'pointer';
      card.title = 'Haz clic para revisar el caso en el terminal forense';
      card.addEventListener('click', () => {
        if (this.onOpenEvidence) {
          const clueData = {
            id: lvl.id,
            documentTitle: lvl.documentTitle,
            taskInstructions: lvl.task || lvl.question,
            sourceText: lvl.sourceText,
            expectedMatches: lvl.expectedMatches,
            levelData: lvl
          };
          this.close();
          this.onOpenEvidence(clueData);
        }
      });

      this.grid.appendChild(card);
    });
  }
}
