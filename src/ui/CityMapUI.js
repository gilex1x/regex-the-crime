import { TIERS, ALL_LEVELS } from '../data/FullLevelsData.js';
import { GameConfig } from '../config/GameConfig.js';
import * as THREE from 'three';

/**
 * UI del Plano Policial de New Haven (Mapa de Ubicaciones por Tier)
 * Implementado con Three.js para la representación 2D pixel art.
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
    this.animationFrameId = null;

    // Crear tooltip dinámico
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'map-tooltip';
    document.body.appendChild(this.tooltip);

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

  initThreeJS() {
    if (this.scene) return; // Evitar inicializar doble

    this.scene = new THREE.Scene();

    const width = this.locationsGrid.clientWidth || 800;
    const height = this.locationsGrid.clientHeight || 600;
    const aspect = width / height;

    this.camera = new THREE.OrthographicCamera(-50, 50, 50, -50, 0.1, 100);
    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0); // Fondo transparente
    this.locationsGrid.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.intersected = null;

    // Cargar textura pixel art para el fondo
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/map_pixel.jpg', (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      // Creamos un plano cuadrado de 100x100
      const planeGeo = new THREE.PlaneGeometry(100, 100);
      const planeMat = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      this.scene.add(plane);
    });

    this.markers = [];
    
    // Generar marcadores
    Object.keys(this.locationMetadata).forEach(key => {
      const tierId = parseInt(key);
      const meta = this.locationMetadata[tierId];
      
      const geo = new THREE.CircleGeometry(2, 32);
      const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const marker = new THREE.Mesh(geo, mat);
      
      // Mapear coordenadas de 0-100 a unidades WebGL (-50 a 50) exactas en el cuadrado
      const posX = (meta.x - 50);
      const posY = -(meta.y - 50);
      
      marker.position.set(posX, posY, 1);
      marker.userData = { tierId: tierId, meta: meta, isUnlocked: false };
      
      this.scene.add(marker);
      this.markers.push(marker);
      
      // Agregamos un anillo exterior estético
      const ringGeo = new THREE.RingGeometry(2.2, 2.5, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.5, transparent: true });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      marker.add(ring);
    });

    window.addEventListener('resize', () => {
      if (!this.isOpen) return;
      this.resize();
    });

    this.renderer.domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.renderer.domElement.addEventListener('click', () => this.onClick());
  }

  resize() {
    if (!this.renderer) return;
    const width = this.locationsGrid.clientWidth;
    const height = this.locationsGrid.clientHeight;
    
    if (width === 0 || height === 0) return;
    
    this.renderer.setSize(width, height);
    
    const aspect = width / height;
    
    // Lógica tipo "contain": asegurar que el cuadrado 100x100 siempre quepa en la vista.
    if (aspect > 1) {
      // Pantalla más ancha que alta
      this.camera.left = -50 * aspect;
      this.camera.right = 50 * aspect;
      this.camera.top = 50;
      this.camera.bottom = -50;
    } else {
      // Pantalla más alta que ancha
      this.camera.left = -50;
      this.camera.right = 50;
      this.camera.top = 50 / aspect;
      this.camera.bottom = -50 / aspect;
    }
    
    this.camera.updateProjectionMatrix();
  }

  onMouseMove(event) {
    if (!this.isOpen || !this.renderer) return;

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.markers, false);

    if (intersects.length > 0) {
      const target = intersects[0].object;
      
      if (this.intersected !== target) {
        if (this.intersected) this.resetMarkerScale(this.intersected);
        
        this.intersected = target;
        this.renderer.domElement.style.cursor = target.userData.isUnlocked ? 'pointer' : 'not-allowed';
        
        if (target.userData.isUnlocked) {
          target.scale.set(1.3, 1.3, 1);
          if (this.audio?.playHover) this.audio.playHover();
        }
        
        this.tooltip.innerHTML = `
          <div style="font-size:10px;color:#94a3b8;font-weight:bold;">TIER ${target.userData.tierId}</div>
          <div style="font-weight:bold;margin:2px 0;">${target.userData.meta.icon} ${target.userData.meta.name}</div>
          <div style="font-size:11px;color:#cbd5e1">${target.userData.meta.district}</div>
          ${!target.userData.isUnlocked ? '<div style="color:#ef4444;font-size:10px;margin-top:4px;">Bloqueado 🔒</div>' : ''}
        `;
        this.tooltip.style.opacity = '1';
      }
      
      this.tooltip.style.left = (event.clientX + 15) + 'px';
      this.tooltip.style.top = (event.clientY + 15) + 'px';
    } else {
      if (this.intersected) {
        this.resetMarkerScale(this.intersected);
        this.intersected = null;
        this.renderer.domElement.style.cursor = 'default';
        this.tooltip.style.opacity = '0';
      }
    }
  }

  resetMarkerScale(marker) {
    marker.scale.set(1, 1, 1);
  }

  onClick() {
    if (this.intersected && this.intersected.userData.isUnlocked) {
      if (this.audio?.playTypewriterClick) this.audio.playTypewriterClick();

      const tierId = this.intersected.userData.tierId;
      const tierCases = ALL_LEVELS.filter(l => l.tier === tierId);
      const solvedClues = this.levelManager.solvedClues;
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
    } else if (this.intersected && !this.intersected.userData.isUnlocked) {
      if (this.audio?.playErrorBuzz) this.audio.playErrorBuzz();
    }
  }

  initEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

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

    if (this.modal) this.modal.classList.add('active');
    
    // Necesitamos que el DOM esté actualizado y visible para calcular el tamaño
    setTimeout(() => {
      this.initThreeJS();
      this.resize();
      
      const currentCase = this.levelManager.getCurrentCase();
      this.selectedTierId = tierToSelect || currentCase.tier || 1;
      
      this.renderMap();
      this.animate();
    }, 50);
  }

  close() {
    this.isOpen = false;
    this.tooltip.style.opacity = '0';
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
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

  animate() {
    if (!this.isOpen || !this.renderer) return;
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.005;
    this.markers.forEach(marker => {
      if (marker.userData.isUnlocked && marker !== this.intersected) {
        // Latido suave
        const scale = 1 + Math.sin(time + marker.userData.tierId) * 0.05;
        marker.scale.set(scale, scale, 1);
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  renderMap() {
    const solvedClues = this.levelManager.solvedClues;
    if (this.progressSummary) {
      this.progressSummary.textContent = `Casos Resueltos: ${solvedClues.size} / ${ALL_LEVELS.length}`;
    }

    if (!this.markers) return;

    this.markers.forEach(marker => {
      const tierId = marker.userData.tierId;
      const isUnlocked = GameConfig.isTierUnlocked(tierId, solvedClues, ALL_LEVELS);
      marker.userData.isUnlocked = isUnlocked;

      const tierCases = ALL_LEVELS.filter(l => l.tier === tierId);
      const solvedInTier = tierCases.filter(l =>
        solvedClues.has(`clue_case_${l.id}`) || solvedClues.has(l.id)
      ).length;
      const allSolved = solvedInTier === tierCases.length;
      const hasPending = isUnlocked && !allSolved;

      // Colorear dependiendo del estado
      if (isUnlocked) {
        if (tierId === this.selectedTierId) {
          marker.material.color.setHex(0x38bdf8); // Seleccionado (Cyan)
        } else if (hasPending) {
          marker.material.color.setHex(0xf59e0b); // Pendiente (Naranja)
        } else {
          marker.material.color.setHex(0x10b981); // Completado (Verde)
        }
      } else {
        marker.material.color.setHex(0x475569); // Bloqueado (Gris oscuro)
      }
    });
  }
}
