/**
 * Sistema de Diálogos e Interacción con NPCs (Estilo Subtítulos Noir)
 */
export class DialogueUI {
  constructor(audioManager) {
    this.audio = audioManager;
    this.container = document.getElementById('dialogue-box');
    this.avatarEl = document.getElementById('dialogue-avatar');
    this.nameEl = document.getElementById('dialogue-name');
    this.roleEl = document.getElementById('dialogue-role');
    this.textEl = document.getElementById('dialogue-text');
    this.closeBtn = document.getElementById('dialogue-close-btn');

    this.currentNPC = null;
    this.currentLineIndex = 0;
    this.typewriterInterval = null;
    this.autoCloseTimeout = null;

    this.setupListeners();
  }

  setupListeners() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.hide());
    }

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && this.isVisible()) {
        this.hide();
      }
    });
  }

  isVisible() {
    return this.container && this.container.classList.contains('visible');
  }

  show(npcData) {
    if (!this.container) return;

    // Si es el mismo NPC, avanzamos de línea de diálogo
    if (this.currentNPC && this.currentNPC.name === npcData.name) {
      this.currentLineIndex = (this.currentLineIndex + 1) % npcData.dialogues.length;
    } else {
      this.currentNPC = npcData;
      this.currentLineIndex = 0;
    }

    // Actualizar encabezados
    if (this.avatarEl) this.avatarEl.textContent = npcData.avatar || '👤';
    if (this.nameEl) this.nameEl.textContent = npcData.name || 'Desconocido';
    if (this.roleEl) this.roleEl.textContent = npcData.role || 'Ciudadano de New Haven';

    const fullText = npcData.dialogues[this.currentLineIndex] || '...';
    this.typewriterText(fullText);

    this.container.classList.add('visible');

    // Reiniciar temporizador de auto-cierre tras 9 segundos
    if (this.autoCloseTimeout) clearTimeout(this.autoCloseTimeout);
    this.autoCloseTimeout = setTimeout(() => {
      this.hide();
    }, 9000);
  }

  typewriterText(text) {
    if (this.typewriterInterval) clearInterval(this.typewriterInterval);
    if (!this.textEl) return;

    this.textEl.textContent = '';
    let index = 0;
    const speed = 18; // ms por carácter

    this.typewriterInterval = setInterval(() => {
      if (index < text.length) {
        this.textEl.textContent += text[index];
        // Sonido suave de tipeo cada 4 caracteres
        if (index % 4 === 0 && this.audio && typeof this.audio.playTypewriterClick === 'function') {
          this.audio.playTypewriterClick();
        }
        index++;
      } else {
        clearInterval(this.typewriterInterval);
        this.typewriterInterval = null;
      }
    }, speed);
  }

  hide() {
    if (!this.container) return;
    this.container.classList.remove('visible');
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
      this.typewriterInterval = null;
    }
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = null;
    }
    this.currentNPC = null;
  }
}
