import * as THREE from 'three';

/**
 * Sistema de Raycasting e Interacción con Pistas
 */
export class Interaction {
  constructor(camera, audioManager) {
    this.camera = camera;
    this.audio = audioManager;
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 4.0; // Distancia máxima de interacción en metros
    this.interactiveObjects = [];
    this.hoveredClue = null;
    this.hoveredNPC = null;
    this.onInspectClue = null;
    this.onTalkToNPC = null;

    this.setupKeyListener();
  }

  setInteractiveObjects(objects) {
    this.interactiveObjects = objects || [];
    this.hoveredClue = null;
    this.hoveredNPC = null;
  }

  setupKeyListener() {
    window.addEventListener('keydown', (e) => {
      // Ignorar tecla E si el usuario está escribiendo en cualquier input/textarea
      const target = e.target;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      // Ignorar si hay algún modal abierto (Cuaderno, Academia, Victoria, Fallo, Cinemática, Mapa o Inventario)
      const notebookModal = document.getElementById('notebook-modal');
      const academyModal = document.getElementById('academy-modal');
      const victoryModal = document.getElementById('case-completed-modal');
      const failedModal = document.getElementById('case-failed-modal');
      const cutsceneModal = document.getElementById('cutscene-modal');
      const cityMapModal = document.getElementById('city-map-modal');
      const inventoryModal = document.getElementById('inventory-modal');
      const isAnyModalActive = (notebookModal && notebookModal.classList.contains('active')) ||
                               (academyModal && academyModal.classList.contains('active')) ||
                               (victoryModal && victoryModal.classList.contains('active')) ||
                               (failedModal && failedModal.classList.contains('active')) ||
                               (cutsceneModal && cutsceneModal.classList.contains('active')) ||
                               (cityMapModal && cityMapModal.classList.contains('active')) ||
                               (inventoryModal && inventoryModal.classList.contains('active'));
      if (isAnyModalActive) {
        return;
      }

      if (e.code === 'KeyE') {
        if (this.hoveredClue && this.onInspectClue) {
          this.audio.playTypewriterClick();
          this.onInspectClue(this.hoveredClue);
        } else if (this.hoveredNPC && this.onTalkToNPC) {
          this.audio.playTypewriterClick();
          this.onTalkToNPC(this.hoveredNPC);
        }
      }
    });
  }

  update() {
    // Lanzar rayo desde el centro de la pantalla (hacia donde apunta la retícula)
    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);

    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

    const promptEl = document.getElementById('interaction-prompt');
    const reticleEl = document.getElementById('reticle');

    if (intersects.length > 0) {
      // Buscar el ancestro con userData.isClue o userData.isNPC
      let obj = intersects[0].object;
      while (obj && !obj.userData?.isClue && !obj.userData?.isNPC && obj.parent) {
        obj = obj.parent;
      }

      if (obj && obj.userData?.isClue) {
        this.hoveredClue = obj.userData.clueData;
        this.hoveredNPC = null;
        if (promptEl) {
          promptEl.innerHTML = `<span class="key-badge">E</span> Inspeccionar <strong>${this.hoveredClue.name}</strong>`;
          promptEl.classList.add('visible');
        }
        if (reticleEl) {
          reticleEl.classList.add('hovering');
        }
        return;
      }

      if (obj && obj.userData?.isNPC) {
        this.hoveredNPC = obj.userData.npcData;
        this.hoveredClue = null;
        if (promptEl) {
          const actionText = this.hoveredNPC.actionText || 'Hablar con';
          promptEl.innerHTML = `<span class="key-badge">E</span> ${actionText} <strong>${this.hoveredNPC.name}</strong>`;
          promptEl.classList.add('visible');
        }
        if (reticleEl) {
          reticleEl.classList.add('hovering');
        }
        return;
      }
    }

    this.hoveredClue = null;
    this.hoveredNPC = null;
    if (promptEl) {
      promptEl.classList.remove('visible');
    }
    if (reticleEl) {
      reticleEl.classList.remove('hovering');
    }
  }
}
