import { TIERS, ALL_LEVELS } from '../data/FullLevelsData.js';
import { GameConfig } from '../config/GameConfig.js';

/**
 * UI del Plano Policial de New Haven (Mapa de Ubicaciones por Tier)
 */
export class CityMapUI {
  constructor(levelManager, audio) {
    this.levelManager = levelManager;
    this.audio = audio;

    this.modal = document.getElementById('city-map-modal');
    this.locationsGrid = document.getElementById('city-map-locations-grid');
    this.dossierPanel = document.getElementById('city-map-dossier-content');
    this.modeBadge = document.getElementById('city-map-mode-badge');
    this.progressSummary = document.getElementById('city-map-progress-summary');
    this.closeBtn = document.getElementById('city-map-close-btn');

    this.selectedTierId = 1;
    this.isOpen = false;

    // Metadatos temáticos de las 10 Ubicaciones de New Haven
    this.locationMetadata = {
      1: { name: "El Callejón Lluvioso", district: "Distrito Industrial", icon: "🏙️", x: 35, y: 35, desc: "Callejones oscuros donde se concentran los primeros homicidios de vagabundos y se incautó el misterioso Tratado de los Ecos." },
      2: { name: "Hotel Noir (Hab. 404)", district: "Distrito Hotelero", icon: "🏨", x: 50, y: 55, desc: "Refugio temporal de corredores de apuestas, cerrajeros cómplices y correspondencia privada dirigida a cirujanos." },
      3: { name: "Muelles de Carga", district: "Bahía y Dársenas", icon: "⚓", x: 85, y: 90, desc: "Punto de salida nocturna de camiones frigoríficos clandestinos y contenedores refrigerados con tejidos biológicos." },
      4: { name: "Club Privado", district: "Colina Alta", icon: "🏛️", x: 15, y: 15, desc: "Suntuoso salón victoriano donde magnates y senadores celebran sus cirugías de rejuvenecimiento y pactos de sangre." },
      5: { name: "Banco Central", district: "Distrito Financiero", icon: "🏦", x: 75, y: 35, desc: "El centro neurálgico de las transferencias corporativas hacia la mafia y las órdenes de captura judicial." },
      6: { name: "La Morgue", district: "Complejo Médico", icon: "🏥", x: 92, y: 70, desc: "Sala de disección de acero inoxidable donde se extirpan órganos humanos con compatibilidad antinatural." },
      7: { name: "Sala de Calderas", district: "Subsuelo del Hospital", icon: "🏭", x: 66, y: 48, desc: "Laberinto de tuberías oxidadas a presión donde Carmine Falcone ocultó cargas de dinamita y detonadores." },
      8: { name: "Central de Relés", district: "Búnker Telecom.", icon: "📟", x: 40, y: 80, desc: "Centro de conmutación electromecánica donde se originó el sabotaje ReDoS y el colapso de las líneas de la ciudad." },
      9: { name: "Las Catacumbas", district: "Subsuelo Oculto", icon: "🕯️", x: 87, y: 20, desc: "Cripta gótica milenaria donde yacen los contratos pergaminados sellados con sangre y el círculo ritual de invocación." },
      10: { name: "Bóveda del Abismo", district: "La Grieta Dimensional", icon: "🌀", x: 25, y: 90, desc: "El vórtice final de energía espectral donde arde el contrato primigenio y se lleva a cabo el gran exorcismo forense." }
    };

    this.initEvents();
  }

  initEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Cerrar con Escape o tecla M
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyM' && !this.isTextInputFocused()) {
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

  open(tierToSelect = null) {
    this.isOpen = true;
    if (this.audio?.playTypewriterClick) this.audio.playTypewriterClick();
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }

    const currentCase = this.levelManager.getCurrentCase();
    this.selectedTierId = tierToSelect || currentCase.tier || 1;

    this.renderMap();
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

  renderMap() {
    if (!this.locationsGrid) return;
    this.locationsGrid.innerHTML = '';


    const solvedClues = this.levelManager.solvedClues;
    if (this.progressSummary) {
      this.progressSummary.textContent = `Casos Resueltos: ${solvedClues.size} / ${ALL_LEVELS.length}`;
    }

    const mapWrapper = document.createElement('div');
    mapWrapper.className = 'map-image-wrapper';

    TIERS.forEach(tier => {
      const meta = this.locationMetadata[tier.id] || { name: tier.name, district: "Distrito Desconocido", icon: "📍" };
      const isUnlocked = GameConfig.isTierUnlocked(tier.id, solvedClues, ALL_LEVELS);

      const tierCases = ALL_LEVELS.filter(l => l.tier === tier.id);
      const solvedInTier = tierCases.filter(l =>
        solvedClues.has(`clue_case_${l.id}`) || solvedClues.has(l.id)
      ).length;
      const allSolved = solvedInTier === tierCases.length;
      const hasPending = isUnlocked && !allSolved;

      const card = document.createElement('div');
      card.className = `location-pin ${isUnlocked ? '' : 'locked'} ${tier.id === this.selectedTierId ? 'selected' : ''}`;
      card.style.left = `${meta.x}%`;
      card.style.top = `${meta.y}%`;

      // Alerta (!) si tiene misiones disponibles pendientes
      const alertBadge = hasPending
        ? `<div class="location-alert-badge" title="¡Nuevos casos disponibles en esta ubicación!">!</div>`
        : '';

      const lockIcon = isUnlocked ? '' : '🔒';

      card.innerHTML = `
        ${alertBadge}
        <div class="pin-icon">${isUnlocked ? meta.icon : lockIcon}</div>
        <div class="pin-label">
          <span class="pin-tier">Tier ${tier.id}</span>
          <span class="pin-name">${meta.name}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        if (!isUnlocked) {
          if (this.audio?.playErrorBuzz) this.audio.playErrorBuzz();
          return;
        }
        if (this.audio?.playTypewriterClick) this.audio.playTypewriterClick();

        const tierCases = ALL_LEVELS.filter(l => l.tier === tier.id);
        const currentCase = this.levelManager.getCurrentCase();

        let targetCase = tierCases.find(c => c.id === currentCase.id);

        if (!targetCase) {
          targetCase = tierCases.find(c => !solvedClues.has(`clue_case_${c.id}`) && !solvedClues.has(c.id));
        }

        if (!targetCase && tierCases.length > 0) {
          targetCase = tierCases[0];
        }

        if (targetCase) {
          const caseIndex = ALL_LEVELS.findIndex(l => l.id === targetCase.id);
          this.levelManager.loadCase(caseIndex);
          this.close();
        }
      });

      mapWrapper.appendChild(card);
    });

    this.locationsGrid.appendChild(mapWrapper);
  }
}
