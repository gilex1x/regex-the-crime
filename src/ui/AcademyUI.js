import { ACADEMY_MODULES, ACADEMY_LESSONS } from '../academy/AcademyData.js';
import { RegexEngine } from '../regex/RegexEngine.js';

/**
 * Controlador de la Interfaz del Modo Academia de Detectives Forenses
 */
export class AcademyUI {
  constructor(audioManager, controls) {
    this.audio = audioManager;
    this.controls = controls;

    this.currentLessonIndex = 0;
    this.completedLessons = new Set(
      JSON.parse(localStorage.getItem('regex_academy_completed') || '[]')
    );

    this.modalEl = document.getElementById('academy-modal');
    this.lessonsNavListEl = document.getElementById('academy-lessons-nav');
    this.progressFillEl = document.getElementById('academy-progress-fill');
    this.progressTextEl = document.getElementById('academy-progress-text');
    this.lessonTitleEl = document.getElementById('academy-lesson-title');
    this.lessonCategoryEl = document.getElementById('academy-lesson-category');
    this.theoryBoxEl = document.getElementById('academy-theory-content');
    this.taskContentEl = document.getElementById('academy-task-content');
    this.labAreaEl = document.getElementById('academy-lab-area');
    this.btnExit = document.getElementById('btn-exit-academy');

    this.init();
  }

  init() {
    if (this.btnExit) {
      this.btnExit.addEventListener('click', () => {
        this.close();
      });
    }

    // Cerrar con Escape si está abierta la academia
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    this.renderSidebar();
    this.loadLesson(this.currentLessonIndex);
  }

  isOpen() {
    return this.modalEl && this.modalEl.classList.contains('active');
  }

  open() {
    if (this.controls) {
      this.controls.unlock();
      this.controls.setEnabled(false);
    }
    if (this.modalEl) {
      this.modalEl.classList.add('active');
    }
    this.loadLesson(this.currentLessonIndex);
  }

  close() {
    if (this.modalEl) {
      this.modalEl.classList.remove('active');
    }
    if (this.controls) {
      this.controls.setEnabled(true);
    }
  }

  saveProgress() {
    localStorage.setItem(
      'regex_academy_completed',
      JSON.stringify([...this.completedLessons])
    );
    this.renderSidebar();
  }

  renderSidebar() {
    if (!this.lessonsNavListEl) return;

    let html = '';
    ACADEMY_MODULES.forEach(module => {
      html += `<div class="module-header-title">${module.title}</div>`;

      const moduleLessons = ACADEMY_LESSONS.map((les, index) => ({ les, index }))
        .filter(item => item.les.moduleId === module.id);

      moduleLessons.forEach(({ les, index }) => {
        const isCurrent = index === this.currentLessonIndex;
        const isCompleted = this.completedLessons.has(les.id);
        const classes = `lesson-nav-btn ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;

        html += `
          <button class="${classes}" data-index="${index}">
            <span>${les.title}</span>
          </button>
        `;
      });
    });

    this.lessonsNavListEl.innerHTML = html;

    // Conectar clicks del sidebar
    this.lessonsNavListEl.querySelectorAll('.lesson-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index, 10);
        this.loadLesson(index);
      });
    });

    // Actualizar barra de progreso
    const total = ACADEMY_LESSONS.length;
    const completedCount = this.completedLessons.size;
    const percent = Math.round((completedCount / total) * 100);

    if (this.progressFillEl) this.progressFillEl.style.width = `${percent}%`;
    if (this.progressTextEl) this.progressTextEl.textContent = `${completedCount} / ${total} Lecciones (${percent}%)`;
  }

  loadLesson(index) {
    if (index < 0 || index >= ACADEMY_LESSONS.length) return;
    this.currentLessonIndex = index;
    const lesson = ACADEMY_LESSONS[index];

    if (this.lessonTitleEl) this.lessonTitleEl.textContent = lesson.title;
    if (this.lessonCategoryEl) this.lessonCategoryEl.textContent = lesson.category;
    if (this.theoryBoxEl) this.theoryBoxEl.innerHTML = lesson.theory;

    if (lesson.type === 'deconstruction') {
      if (this.taskContentEl) {
        this.taskContentEl.innerHTML = `<h4>🎯 Misión de Criptoanálisis:</h4><p>Lee la expresión con atención y deduce su comportamiento forense.</p>`;
      }
      this.renderDeconstructionLab(lesson);
    } else {
      if (this.taskContentEl) {
        this.taskContentEl.innerHTML = `<h4>🎯 Tu Misión:</h4><p>${lesson.task}</p>`;
      }
      this.renderConstructionLab(lesson);
    }

    this.renderSidebar();
  }

  renderConstructionLab(lesson) {
    if (!this.labAreaEl) return;

    this.labAreaEl.innerHTML = `
      <div class="matches-label">📄 Documento de Evidencia para Análisis:</div>
      <div class="lab-document-view" id="academy-doc-view">${RegexEngine.escapeHTML(lesson.sourceText)}</div>

      <label for="academy-regex-input" class="matches-label">Tu Expresión Regular:</label>
      <div class="lab-regex-bar">
        <span class="regex-slash">/</span>
        <input type="text" id="academy-regex-input" placeholder="${lesson.hint}" autocomplete="off" spellcheck="false" />
        <span class="regex-slash">/</span>
        <span class="regex-flags" id="academy-flags-display">${lesson.recommendedFlags || 'g'}</span>
      </div>

      <!-- Selector interactivo de banderas (flags) -->
      <div class="flags-selector-bar">
        <span class="flags-label">Modificadores / Banderas:</span>
        <label class="flag-chip-label" title="Búsqueda Global: encuentra todas las apariciones">
          <input type="checkbox" id="flag-chk-g" ${(!lesson.recommendedFlags || lesson.recommendedFlags.includes('g')) ? 'checked' : ''}>
          <code>g</code> Global (Todas)
        </label>
        <label class="flag-chip-label" title="Insensible a mayúsculas: ignora MAYÚSCULAS y minúsculas">
          <input type="checkbox" id="flag-chk-i" ${(lesson.recommendedFlags && lesson.recommendedFlags.includes('i')) ? 'checked' : ''}>
          <code>i</code> Ignorar Mayúsculas
        </label>
      </div>

      <div style="margin-bottom: 14px;">
        <button type="button" class="btn-try-solution" id="btn-academy-try-example">
          💡 Ver Solución / Probar Ejemplo
        </button>
      </div>

      <div class="lab-status-box" id="academy-feedback">
        Escribe un patrón para probar coincidencias en vivo sobre el documento.
      </div>

      <div class="lab-matches-box">
        <div class="matches-label">Coincidencias Detectadas:</div>
        <div id="academy-matches-preview">
          <span class="empty-msg">Esperando expresión...</span>
        </div>
      </div>

      <div class="lab-actions-group">
        <button class="btn-academy-primary" id="btn-academy-check">
          🔍 Comprobar Solución
        </button>
        <button class="btn-academy-next" id="btn-academy-next" style="display: none;">
          Siguiente Lección ➔
        </button>
      </div>
    `;

    const inputEl = document.getElementById('academy-regex-input');
    const docView = document.getElementById('academy-doc-view');
    const feedbackEl = document.getElementById('academy-feedback');
    const matchesBox = document.getElementById('academy-matches-preview');
    const checkBtn = document.getElementById('btn-academy-check');
    const nextBtn = document.getElementById('btn-academy-next');
    const tryExampleBtn = document.getElementById('btn-academy-try-example');
    const chkG = document.getElementById('flag-chk-g');
    const chkI = document.getElementById('flag-chk-i');
    const flagsDisplay = document.getElementById('academy-flags-display');

    const getActiveFlags = () => {
      let flags = '';
      if (chkG && chkG.checked) flags += 'g';
      if (chkI && chkI.checked) flags += 'i';
      return flags;
    };

    const updateFlagsDisplay = () => {
      if (flagsDisplay) flagsDisplay.textContent = getActiveFlags() || '-';
    };

    if (chkG) chkG.addEventListener('change', () => { updateFlagsDisplay(); doEvaluate(); });
    if (chkI) chkI.addEventListener('change', () => { updateFlagsDisplay(); doEvaluate(); });

    // Botón estilo W3Schools: Cargar solución de ejemplo interactiva
    if (tryExampleBtn) {
      tryExampleBtn.addEventListener('click', () => {
        inputEl.value = lesson.recommendedRegex;
        const wantI = Boolean(lesson.recommendedFlags && lesson.recommendedFlags.includes('i'));
        if (chkI) chkI.checked = wantI;
        updateFlagsDisplay();
        doEvaluate();
        feedbackEl.className = 'lab-status-box success';
        feedbackEl.innerHTML = `💡 Ejemplo cargado: <code>/${lesson.recommendedRegex}/${getActiveFlags()}</code>. ¡Observa las coincidencias resaltadas y pulsa 'Comprobar Solución'!`;
      });
    }

    // Evaluación en tiempo real
    const doEvaluate = () => {
      const pattern = inputEl.value.trim();
      const flags = getActiveFlags();

      if (!pattern) {
        docView.innerHTML = RegexEngine.escapeHTML(lesson.sourceText);
        matchesBox.innerHTML = '<span class="empty-msg">Esperando expresión...</span>';
        feedbackEl.className = 'lab-status-box';
        feedbackEl.textContent = 'Escribe un patrón para probar coincidencias en vivo.';
        return;
      }

      const { regex, error } = RegexEngine.compile(pattern, flags);
      if (error) {
        feedbackEl.className = 'lab-status-box error';
        feedbackEl.textContent = `Error de sintaxis: ${error}`;
        return;
      }

      const { matches, ranges } = RegexEngine.evaluate(regex, lesson.sourceText);
      docView.innerHTML = RegexEngine.generateHighlightedHTML(lesson.sourceText, ranges);

      if (matches.length > 0) {
        matchesBox.innerHTML = matches.map(m => `<span class="match-badge">${RegexEngine.escapeHTML(m)}</span>`).join(' ');
        feedbackEl.className = 'lab-status-box';
        feedbackEl.textContent = `${matches.length} coincidencia(s) detectada(s). Pulsa 'Comprobar Solución'.`;
      } else {
        matchesBox.innerHTML = '<span class="empty-msg">Sin coincidencias</span>';
        feedbackEl.className = 'lab-status-box';
        feedbackEl.textContent = 'No hay coincidencias con este patrón.';
      }
    };

    inputEl.addEventListener('input', () => {
      this.audio.playTypewriterClick();
      doEvaluate();
    });

    // Comprobar
    checkBtn.addEventListener('click', () => {
      const pattern = inputEl.value.trim();
      const flags = getActiveFlags();
      const { regex, error } = RegexEngine.compile(pattern, flags);

      if (error || !pattern) {
        this.audio.playErrorBuzz();
        feedbackEl.className = 'lab-status-box error';
        feedbackEl.textContent = error ? `Sintaxis inválida: ${error}` : 'Escribe una expresión antes de comprobar.';
        return;
      }

      const { matches } = RegexEngine.evaluate(regex, lesson.sourceText);
      const validation = RegexEngine.validateMatches(matches, lesson.expectedMatches);

      if (validation.isSuccess) {
        this.audio.playSuccessBell();
        feedbackEl.className = 'lab-status-box success';
        feedbackEl.innerHTML = `⭐ <strong>¡Excelente! Lección Dominada.</strong> ${validation.message}`;
        this.completedLessons.add(lesson.id);
        this.saveProgress();

        checkBtn.style.display = 'none';
        nextBtn.style.display = 'block';
      } else {
        this.audio.playErrorBuzz();
        feedbackEl.className = 'lab-status-box error';
        feedbackEl.innerHTML = `⚠️ ${validation.message}<br>Pista del Instructor: <code>${lesson.hint}</code>`;
      }
    });

    nextBtn.addEventListener('click', () => {
      if (this.currentLessonIndex < ACADEMY_LESSONS.length - 1) {
        this.loadLesson(this.currentLessonIndex + 1);
      } else {
        alert("¡Felicitaciones! Has completado todas las lecciones de la Academia.");
      }
    });
  }

  renderDeconstructionLab(lesson) {
    if (!this.labAreaEl) return;

    let optionsHtml = '';
    lesson.options.forEach((opt, idx) => {
      const letter = String.fromCharCode(65 + idx); // A, B, C
      optionsHtml += `
        <div class="quiz-option-card" data-idx="${idx}">
          <span class="quiz-badge">${letter}</span>
          <span>${opt.text}</span>
        </div>
      `;
    });

    this.labAreaEl.innerHTML = `
      <div class="quiz-question-box">
        <strong>Pregunta del Instructor:</strong><br>
        ${lesson.question}
      </div>

      <div class="quiz-options-list">
        ${optionsHtml}
      </div>

      <div class="lab-status-box" id="quiz-feedback">
        Selecciona una de las opciones para validar tu deducción.
      </div>

      <div class="lab-actions-group">
        <button class="btn-academy-next" id="btn-quiz-next" style="display: none;">
          Siguiente Lección ➔
        </button>
      </div>
    `;

    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-quiz-next');
    const cards = this.labAreaEl.querySelectorAll('.quiz-option-card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.idx, 10);
        const option = lesson.options[idx];

        cards.forEach(c => c.className = 'quiz-option-card');

        if (option.isCorrect) {
          this.audio.playSuccessBell();
          card.classList.add('selected-correct');
          feedbackEl.className = 'lab-status-box success';
          feedbackEl.innerHTML = `⭐ <strong>¡CORRECTO!</strong> ${option.feedback}`;
          this.completedLessons.add(lesson.id);
          this.saveProgress();

          cards.forEach(c => c.style.pointerEvents = 'none');
          nextBtn.style.display = 'block';
        } else {
          this.audio.playErrorBuzz();
          card.classList.add('selected-wrong');
          feedbackEl.className = 'lab-status-box error';
          feedbackEl.innerHTML = `❌ <strong>Incorrecto:</strong> ${option.feedback}`;
        }
      });
    });

    nextBtn.addEventListener('click', () => {
      if (this.currentLessonIndex < ACADEMY_LESSONS.length - 1) {
        this.loadLesson(this.currentLessonIndex + 1);
      } else {
        alert("🎓 ¡MAGNÍFICO DETECTIVE! Has aprobado con honores todos los módulos de la Academia.");
      }
    });
  }
}
