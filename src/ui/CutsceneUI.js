// ========================================================
// CUTSCENE UI CONTROLLER: GESTOR DE CINEMÁTICAS NOIR
// ========================================================

import { CHARACTERS, CUTSCENES } from '../data/CutscenesData.js';

export class CutsceneUI {
  constructor(audioManager, controls) {
    this.audio = audioManager;
    this.controls = controls;

    this.modalEl = document.getElementById('cutscene-modal');
    this.titleEl = document.getElementById('cutscene-title');
    this.subtitleEl = document.getElementById('cutscene-subtitle');
    this.sceneBadgeEl = document.getElementById('cutscene-scene-badge');
    this.speakerCardEl = document.getElementById('cutscene-dialogue-card');
    this.avatarEl = document.getElementById('cutscene-avatar');
    this.speakerNameEl = document.getElementById('cutscene-speaker-name');
    this.speakerRoleEl = document.getElementById('cutscene-speaker-role');
    this.textEl = document.getElementById('cutscene-text');
    this.dotsContainerEl = document.getElementById('cutscene-dots');
    this.btnNext = document.getElementById('cutscene-btn-next');
    this.btnSkip = document.getElementById('cutscene-btn-skip');

    this.currentCutscene = null;
    this.currentLineIndex = 0;
    this.isTyping = false;
    this.typewriterInterval = null;
    this.onCompleteCallback = null;

    this.setupListeners();
  }

  setupListeners() {
    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => this.handleAdvance());
    }

    if (this.btnSkip) {
      this.btnSkip.addEventListener('click', () => this.skipCutscene());
    }

    window.addEventListener('keydown', (e) => {
      if (!this.modalEl || !this.modalEl.classList.contains('active')) return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        this.handleAdvance();
      } else if (e.code === 'Escape') {
        e.preventDefault();
        this.skipCutscene();
      }
    });
  }

  play(cutsceneKeyOrData, onComplete = null) {
    let cutscene = cutsceneKeyOrData;
    if (typeof cutsceneKeyOrData === 'string') {
      cutscene = CUTSCENES[cutsceneKeyOrData];
    }

    if (!cutscene || !cutscene.lines || cutscene.lines.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    this.currentCutscene = cutscene;
    this.currentLineIndex = 0;
    this.onCompleteCallback = onComplete;

    // Desactivar controles 3D durante cinemática
    if (this.controls) {
      this.controls.isEnabled = false;
      try {
        if (document.exitPointerLock) document.exitPointerLock();
      } catch (err) {}
    }

    // Poblar títulos
    if (this.titleEl) this.titleEl.textContent = cutscene.title;
    if (this.subtitleEl) this.subtitleEl.textContent = cutscene.subtitle || "";
    if (this.sceneBadgeEl) this.sceneBadgeEl.textContent = cutscene.id.replace(/_/g, " ").toUpperCase();

    // Crear puntos indicadores
    if (this.dotsContainerEl) {
      this.dotsContainerEl.innerHTML = "";
      cutscene.lines.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `cutscene-dot ${i === 0 ? 'active' : ''}`;
        this.dotsContainerEl.appendChild(dot);
      });
    }

    // Mostrar modal
    if (this.modalEl) {
      this.modalEl.classList.add('active');
    }

    // Reproducir primera línea
    this.showCurrentLine();
  }

  showCurrentLine() {
    if (!this.currentCutscene || this.currentLineIndex >= this.currentCutscene.lines.length) {
      this.finishCutscene();
      return;
    }

    const line = this.currentCutscene.lines[this.currentLineIndex];
    const character = CHARACTERS[line.speaker] || CHARACTERS.narrator;

    // Actualizar estilos y datos del personaje
    if (this.speakerCardEl) {
      this.speakerCardEl.className = `cutscene-dialogue-card ${character.themeClass || ''}`;
    }
    if (this.avatarEl) this.avatarEl.textContent = character.avatar;
    if (this.speakerNameEl) this.speakerNameEl.textContent = character.name;
    if (this.speakerRoleEl) this.speakerRoleEl.textContent = character.title;

    // Actualizar puntos de progreso
    if (this.dotsContainerEl) {
      const dots = this.dotsContainerEl.querySelectorAll('.cutscene-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentLineIndex);
      });
    }

    // Cambiar texto de botón en la última línea
    if (this.btnNext) {
      const isLast = this.currentLineIndex === this.currentCutscene.lines.length - 1;
      this.btnNext.innerHTML = isLast ? `Continuar Caso ➔` : `Siguiente ➔`;
    }

    // Animación Typewriter
    this.startTypewriter(line.text);
  }

  startTypewriter(fullText) {
    clearInterval(this.typewriterInterval);
    this.isTyping = true;
    let charIndex = 0;

    if (this.textEl) {
      this.textEl.innerHTML = `<span class="typing-caret"></span>`;
    }

    this.typewriterInterval = setInterval(() => {
      charIndex += 2; // de a 2 caracteres para ritmo fluido
      if (charIndex > fullText.length) {
        charIndex = fullText.length;
      }

      const visible = fullText.substring(0, charIndex);
      if (this.textEl) {
        this.textEl.innerHTML = `${visible}<span class="typing-caret"></span>`;
      }

      // Sonido de tipeo sutil ocasional
      if (charIndex % 6 === 0 && this.audio) {
        this.audio.playTypewriterClick();
      }

      if (charIndex >= fullText.length) {
        this.completeTypewriter(fullText);
      }
    }, 22);
  }

  completeTypewriter(fullText) {
    clearInterval(this.typewriterInterval);
    this.isTyping = false;
    if (this.textEl) {
      this.textEl.textContent = fullText;
    }
  }

  handleAdvance() {
    if (!this.currentCutscene) return;

    const currentLine = this.currentCutscene.lines[this.currentLineIndex];

    // Si aún está escribiendo, completar la línea al instante
    if (this.isTyping) {
      this.completeTypewriter(currentLine.text);
      return;
    }

    // Si ya terminó de escribir, avanzar a la siguiente línea
    this.currentLineIndex++;
    if (this.currentLineIndex < this.currentCutscene.lines.length) {
      if (this.audio) this.audio.playTypewriterClick();
      this.showCurrentLine();
    } else {
      this.finishCutscene();
    }
  }

  skipCutscene() {
    clearInterval(this.typewriterInterval);
    this.finishCutscene();
  }

  finishCutscene() {
    clearInterval(this.typewriterInterval);
    this.isTyping = false;

    if (this.modalEl) {
      this.modalEl.classList.remove('active');
    }

    // Restaurar controles 3D
    if (this.controls) {
      this.controls.isEnabled = true;
    }

    if (this.onCompleteCallback) {
      const cb = this.onCompleteCallback;
      this.onCompleteCallback = null;
      cb();
    }
  }
}
