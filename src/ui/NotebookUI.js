import { RegexEngine } from '../regex/RegexEngine.js';

/**
 * Interfaz de usuario del Cuaderno de Detective y Consola Regex
 * Soporta:
 * 1. Modo Construcción de Regex (con flags g/i y botón de solución de ejemplo)
 * 2. Modo Criptoanálisis / Trampa del Criminal (Inverso: deducir salida o coincidencias)
 * 3. Cuenta regresiva con temporizador de presión
 * 4. Sistema de vidas / intentos máximos
 */
export class NotebookUI {
  constructor(audioManager, levelManager, controls) {
    this.audio = audioManager;
    this.levelManager = levelManager;
    this.controls = controls;

    this.activeClue = null;
    this.currentLevel = null;

    // Elementos DOM
    this.modalEl = document.getElementById('notebook-modal');
    this.docTitleEl = document.getElementById('notebook-doc-title');
    this.docBodyEl = document.getElementById('notebook-doc-body');
    this.instructionsEl = document.getElementById('notebook-instructions');
    this.closeBtn = document.getElementById('btn-close-notebook');

    // Barra de Presión
    this.pressureBarEl = document.getElementById('notebook-pressure-bar');
    this.timerDisplayEl = document.getElementById('notebook-timer-display');
    this.timerValEl = document.getElementById('timer-val');
    this.attemptsDisplayEl = document.getElementById('notebook-attempts-display');
    this.attemptsValEl = document.getElementById('attempts-val');

    // Consola de Construcción
    this.constructionConsoleEl = document.getElementById('construction-console');
    this.regexInputEl = document.getElementById('regex-input');
    this.feedbackEl = document.getElementById('regex-feedback');
    this.matchesListEl = document.getElementById('matches-list');
    this.flagsDisplayEl = document.getElementById('notebook-flags-display');
    this.flagG = document.getElementById('nb-flag-g');
    this.flagI = document.getElementById('nb-flag-i');
    this.trySolutionBtn = document.getElementById('btn-notebook-try-solution');
    this.cheatContentEl = document.getElementById('cheat-content');
    this.cheatToggleBtn = document.getElementById('cheat-toggle-btn');
    this.submitBtn = document.getElementById('btn-submit-clue');

    // Consola del Criminal (Criptoanálisis)
    this.cipherConsoleEl = document.getElementById('cipher-console');
    this.cipherRegexValEl = document.getElementById('cipher-regex-val');
    this.cipherQuestionEl = document.getElementById('cipher-question-text');
    this.cipherOptionsListEl = document.getElementById('cipher-options-list');
    this.cipherFeedbackEl = document.getElementById('cipher-feedback');

    // Modal de Fallo
    this.failedModalEl = document.getElementById('case-failed-modal');
    this.failedMessageEl = document.getElementById('failed-case-message');
    this.retryBtn = document.getElementById('btn-retry-case');

    // Estado del temporizador y vidas
    this.timerInterval = null;
    this.remainingSeconds = null;
    this.remainingAttempts = null;

    this.setupListeners();
  }

  setupListeners() {
    // Input interactivo en tiempo real
    this.regexInputEl.addEventListener('input', () => {
      this.audio.playTypewriterClick();
      this.evaluateCurrentInput();
    });

    this.regexInputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.submitClue();
      }
    });

    this.submitBtn.addEventListener('click', () => {
      this.submitClue();
    });

    this.closeBtn.addEventListener('click', () => {
      this.close();
    });

    // Banderas interactivas en el cuaderno
    const onFlagChange = () => {
      this.updateFlagsDisplay();
      this.evaluateCurrentInput();
    };
    if (this.flagG) this.flagG.addEventListener('change', onFlagChange);
    if (this.flagI) this.flagI.addEventListener('change', onFlagChange);

    // Botón Solución de Ejemplo
    if (this.trySolutionBtn) {
      this.trySolutionBtn.addEventListener('click', () => {
        if (!this.currentLevel) return;
        this.regexInputEl.value = this.currentLevel.recommendedRegex || '';
        if (this.flagI) {
          const wantI = Boolean(this.currentLevel.recommendedFlags && this.currentLevel.recommendedFlags.includes('i'));
          this.flagI.checked = wantI;
        }
        this.updateFlagsDisplay();
        this.evaluateCurrentInput();
        this.feedbackEl.className = 'feedback-box success';
        this.feedbackEl.innerHTML = `💡 Ejemplo cargado: <code>/${this.regexInputEl.value}/${this.getActiveFlags()}</code>. ¡Pulsa 'Archivar Evidencia'!`;
      });
    }

    // Cerrar con Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Acordeón de apuntes
    this.cheatToggleBtn.addEventListener('click', () => {
      const isHidden = this.cheatContentEl.classList.toggle('hidden');
      this.cheatToggleBtn.textContent = isHidden ? '💡 Ver Apuntes del Detective' : '🔼 Ocultar Apuntes';
    });

    // Reintentar caso tras fallo
    if (this.retryBtn) {
      this.retryBtn.addEventListener('click', () => {
        this.failedModalEl.classList.remove('active');
        this.levelManager.restartCurrentCase();
        // Abrir nuevamente el cuaderno
        setTimeout(() => {
          if (this.levelManager.currentClue) {
            this.open(this.levelManager.currentClue);
          }
        }, 150);
      });
    }
  }

  getActiveFlags() {
    let f = '';
    if (this.flagG && this.flagG.checked) f += 'g';
    if (this.flagI && this.flagI.checked) f += 'i';
    return f || 'g';
  }

  updateFlagsDisplay() {
    if (this.flagsDisplayEl) {
      this.flagsDisplayEl.textContent = this.getActiveFlags();
    }
  }

  isOpen() {
    return this.modalEl.classList.contains('active');
  }

  open(clueData, isReviewMode = false) {
    this.activeClue = clueData;
    this.currentLevel = clueData.levelData || this.levelManager.getCurrentCase();
    this.isReviewMode = isReviewMode;

    this.controls.unlock();
    this.controls.setEnabled(false);

    // Llenar datos de la pista
    this.docTitleEl.textContent = clueData.documentTitle;
    this.instructionsEl.innerHTML = `<strong>Misión:</strong> ${clueData.taskInstructions}`;

    // Configurar presión (Tiempo y Vidas)
    this.setupPressureMechanics();

    // Determinar modo: Construcción vs Criptoanálisis del Criminal
    if (this.currentLevel.type === 'criminal_cipher') {
      this.setupCipherMode();
    } else {
      this.setupConstructionMode();
    }

    if (this.isReviewMode) {
      if (this.submitBtn) {
        this.submitBtn.disabled = false;
        this.submitBtn.innerHTML = '⬅️ Volver al Inventario';
        this.submitBtn.onclick = () => {
          this.close();
          if (window.app && window.app.ui && window.app.ui.inventory) {
            window.app.ui.inventory.open();
          }
        };
      }
    } else {
      if (this.submitBtn) {
        this.submitBtn.onclick = null;
        this.submitBtn.innerHTML = '🔍 Archivar Evidencia';
        this.submitBtn.disabled = false;
      }
    }

    this.modalEl.classList.add('active');
  }

  setupPressureMechanics() {
    this.stopTimer();

    const hasTimeLimit = Boolean(this.currentLevel.timeLimit);
    const hasMaxAttempts = Boolean(this.currentLevel.maxAttempts);

    if (hasTimeLimit || hasMaxAttempts) {
      this.pressureBarEl.style.display = 'flex';
    } else {
      this.pressureBarEl.style.display = 'none';
    }

    // 1. Temporizador
    if (hasTimeLimit && !this.isReviewMode) {
      this.remainingSeconds = this.currentLevel.timeLimit;
      this.timerDisplayEl.style.display = 'flex';
      this.timerDisplayEl.classList.remove('critical');
      this.updateTimerDisplay();
      this.startTimer();
    } else {
      this.timerDisplayEl.style.display = 'none';
    }

    // 2. Intentos / Vidas
    if (hasMaxAttempts && !this.isReviewMode) {
      this.remainingAttempts = this.currentLevel.maxAttempts;
      this.attemptsDisplayEl.style.display = 'flex';
      this.updateAttemptsDisplay();
    } else {
      this.attemptsDisplayEl.style.display = 'none';
    }
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.remainingSeconds--;
      this.updateTimerDisplay();

      if (this.remainingSeconds <= 10 && this.remainingSeconds > 0) {
        this.timerDisplayEl.classList.add('critical');
        this.audio.playTypewriterClick();
      }

      if (this.remainingSeconds <= 0) {
        this.stopTimer();
        this.handleFailure('¡TIEMPO AGOTADO! El sospechoso logró escapar y ocultó todas las evidencias.');
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    const mins = Math.floor(Math.max(0, this.remainingSeconds) / 60);
    const secs = Math.max(0, this.remainingSeconds) % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (this.timerValEl) this.timerValEl.textContent = formatted;
  }

  updateAttemptsDisplay() {
    if (!this.attemptsValEl) return;
    const total = this.currentLevel.maxAttempts || 3;
    const hearts = '❤️'.repeat(Math.max(0, this.remainingAttempts)) + '🖤'.repeat(Math.max(0, total - this.remainingAttempts));
    this.attemptsValEl.textContent = `${hearts} (${this.remainingAttempts}/${total})`;
  }

  handleFailure(reasonText) {
    this.audio.playErrorBuzz();
    this.close();
    if (this.failedMessageEl) this.failedMessageEl.textContent = reasonText;
    if (this.failedModalEl) this.failedModalEl.classList.add('active');
  }

  deductAttempt() {
    if (this.remainingAttempts !== null) {
      this.remainingAttempts--;
      this.updateAttemptsDisplay();
      if (this.remainingAttempts <= 0) {
        this.stopTimer();
        this.handleFailure('¡INTENTOS AGOTADOS! Las pruebas fueron destruidas por el sospechoso.');
        return false;
      }
    }
    return true;
  }

  // ==========================================
  // CONFIGURACIÓN MODO CONSTRUCCIÓN
  // ==========================================
  setupConstructionMode() {
    this.constructionConsoleEl.style.display = 'block';
    this.cipherConsoleEl.style.display = 'none';

    this.cheatContentEl.innerHTML = `
      <p class="hint-text">${this.activeClue.regexHint}</p>
      <div class="hint-example"><strong>Sintaxis recomendada:</strong> <code>${this.activeClue.syntaxCheat}</code></div>
    `;
    this.cheatContentEl.classList.add('hidden');
    this.cheatToggleBtn.textContent = '💡 Ver Apuntes del Detective';

    // Banderas iniciales
    if (this.flagI) {
      this.flagI.checked = Boolean(this.currentLevel.recommendedFlags && this.currentLevel.recommendedFlags.includes('i'));
    }
    this.updateFlagsDisplay();

    const alreadySolved = this.levelManager.isClueSolved(this.activeClue.id);
    if (this.isReviewMode) {
      const userSolution = this.levelManager.userSolutions[this.currentLevel.id] || this.levelManager.userSolutions[`clue_case_${this.currentLevel.id}`];
      if (userSolution && userSolution.type === 'construction') {
        this.regexInputEl.value = userSolution.regex || '';
        const flags = userSolution.flags || '';
        this.flagG.checked = flags.includes('g');
        this.flagI.checked = flags.includes('i');
      } else {
        this.regexInputEl.value = this.currentLevel.recommendedRegex || '';
        const flags = this.currentLevel.recommendedFlags || 'g';
        this.flagG.checked = flags.includes('g');
        this.flagI.checked = flags.includes('i');
      }
      this.regexInputEl.disabled = true;
      this.flagG.disabled = true;
      this.flagI.disabled = true;
      
      this.updateFlagsDisplay();
      this.evaluateCurrentInput();
      this.feedbackEl.className = 'feedback-box success';
      this.feedbackEl.innerHTML = `⭐ <strong>Evidencia Archivada.</strong> Estás revisando un caso ya resuelto.`;
    } else if (alreadySolved) {
      this.regexInputEl.value = this.activeClue.syntaxCheat || this.currentLevel.recommendedRegex || '';
      this.regexInputEl.disabled = true;
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = '✅ Evidencia Archivada';
      this.evaluateCurrentInput();
    } else {
      this.regexInputEl.value = '';
      this.regexInputEl.disabled = false;
      this.flagG.disabled = false;
      this.flagI.disabled = false;
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = '🔍 Archivar Evidencia';
      this.feedbackEl.className = 'feedback-box';
      this.feedbackEl.textContent = 'Escribe un patrón Regex para comenzar la búsqueda.';
      this.matchesListEl.innerHTML = '<span class="empty-msg">Esperando expresión...</span>';
      this.evaluateCurrentInput();
    }

    setTimeout(() => {
      if (!alreadySolved && !this.isReviewMode) this.regexInputEl.focus();
    }, 100);
  }

  evaluateCurrentInput() {
    if (!this.activeClue || this.currentLevel.type === 'criminal_cipher') return;

    const pattern = this.regexInputEl.value.trim();
    const sourceText = this.activeClue.sourceText;
    const flags = this.getActiveFlags();

    if (!pattern) {
      this.docBodyEl.innerHTML = RegexEngine.escapeHTML(sourceText);
      this.matchesListEl.innerHTML = '<span class="empty-msg">Esperando expresión...</span>';
      this.feedbackEl.className = 'feedback-box';
      this.feedbackEl.textContent = 'Escribe un patrón Regex para comenzar la búsqueda.';
      return;
    }

    const { regex, error } = RegexEngine.compile(pattern, flags);

    if (error) {
      this.docBodyEl.innerHTML = RegexEngine.escapeHTML(sourceText);
      this.feedbackEl.className = 'feedback-box error';
      this.feedbackEl.textContent = `Error de sintaxis Regex: ${error}`;
      this.matchesListEl.innerHTML = '<span class="empty-msg error-text">Sintaxis inválida</span>';
      return;
    }

    const { matches, ranges, error: evalError } = RegexEngine.evaluate(regex, sourceText);

    if (evalError) {
      this.feedbackEl.className = 'feedback-box error';
      this.feedbackEl.textContent = evalError;
      return;
    }

    this.docBodyEl.innerHTML = RegexEngine.generateHighlightedHTML(sourceText, ranges);

    if (matches.length > 0) {
      this.matchesListEl.innerHTML = matches.map(m => `<span class="match-badge">${RegexEngine.escapeHTML(m)}</span>`).join(' ');
      this.feedbackEl.className = 'feedback-box';
      this.feedbackEl.textContent = `Coincidencias encontradas: ${matches.length}. Pulsa 'Archivar Evidencia'.`;
    } else {
      this.matchesListEl.innerHTML = '<span class="empty-msg">Sin coincidencias</span>';
      this.feedbackEl.className = 'feedback-box warning';
      this.feedbackEl.textContent = 'El patrón no coincide con ninguna parte del texto.';
    }
  }

  submitClue() {
    if (!this.activeClue || this.currentLevel.type === 'criminal_cipher') return;

    const pattern = this.regexInputEl.value.trim();
    const flags = this.getActiveFlags();

    if (!pattern) {
      this.audio.playErrorBuzz();
      this.feedbackEl.className = 'feedback-box warning';
      this.feedbackEl.textContent = 'Por favor escribe un patrón Regex antes de validar.';
      return;
    }

    const { regex, error } = RegexEngine.compile(pattern, flags);
    if (error) {
      this.audio.playErrorBuzz();
      this.feedbackEl.className = 'feedback-box error';
      this.feedbackEl.textContent = `Error de sintaxis Regex: ${error}`;
      this.deductAttempt();
      return;
    }

    // Validar coincidencias
    const { matches } = RegexEngine.evaluate(regex, this.activeClue.sourceText);
    const validation = RegexEngine.validateMatches(matches, this.activeClue.expectedMatches);

    if (validation.isSuccess) {
      this.stopTimer();
      this.audio.playSuccessBell();
      this.feedbackEl.className = 'feedback-box success';
      this.feedbackEl.innerHTML = `⭐ <strong>${validation.message}</strong>`;
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = '✅ Evidencia Archivada';

      const stamp = document.createElement('div');
      stamp.className = 'stamp-approved';
      stamp.textContent = 'EVIDENCIA CONFIRMADA';
      this.docBodyEl.appendChild(stamp);

      this.levelManager.markClueSolved(this.activeClue.id, {
        type: 'construction',
        regex: pattern,
        flags: flags
      });

      setTimeout(() => {
        if (this.isOpen()) this.close();
      }, 1600);
    } else {
      this.audio.playErrorBuzz();
      this.feedbackEl.className = 'feedback-box error';
      let details = validation.message;
      if (validation.missing.length > 0) {
        details += `<br>Falta capturar: <code>${validation.missing.join(', ')}</code>`;
      }
      if (validation.extras.length > 0) {
        details += `<br>Datos sobrantes: <code>${validation.extras.join(', ')}</code>`;
      }
      this.feedbackEl.innerHTML = `⚠️ ${details}`;
      this.deductAttempt();
    }
  }

  // ==========================================
  // CONFIGURACIÓN MODO TRAMPA DEL CRIMINAL
  // ==========================================
  setupCipherMode() {
    this.constructionConsoleEl.style.display = 'none';
    this.cipherConsoleEl.style.display = 'flex';

    // Renderizar documento del criminal
    this.docBodyEl.innerHTML = RegexEngine.escapeHTML(this.currentLevel.sourceText);

    // Renderizar datos del criminal
    const flagsStr = this.currentLevel.criminalFlags ? `/${this.currentLevel.criminalFlags}` : '/';
    this.cipherRegexValEl.textContent = `/${this.currentLevel.criminalRegex}${flagsStr}`;
    this.cipherQuestionEl.textContent = this.currentLevel.question;

    this.cipherFeedbackEl.className = 'feedback-box';
    this.cipherFeedbackEl.textContent = 'Analiza la expresión y selecciona la opción correcta.';

    // Opciones múltiples
    const options = this.currentLevel.options || [];
    this.cipherOptionsListEl.innerHTML = options.map((opt, i) => `
      <button class="cipher-option-card" data-index="${i}">
        <strong>Opción ${String.fromCharCode(65 + i)}:</strong>
        <span>${RegexEngine.escapeHTML(opt.text)}</span>
      </button>
    `).join('');

    const optButtons = this.cipherOptionsListEl.querySelectorAll('.cipher-option-card');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.isReviewMode) return;
        const idx = parseInt(btn.dataset.index, 10);
        this.verifyCipherAnswer(idx, optButtons);
      });
    });

    if (this.isReviewMode) {
      const userSolution = this.levelManager.userSolutions[this.currentLevel.id] || this.levelManager.userSolutions[`clue_case_${this.currentLevel.id}`];
      let answerText = userSolution ? userSolution.answer : null;
      
      optButtons.forEach((btn, idx) => {
        btn.disabled = true;
        const opt = options[idx];
        if (answerText === opt.text || opt.isCorrect) {
          btn.classList.add('correct');
        }
      });
      this.cipherFeedbackEl.className = 'feedback-box success';
      this.cipherFeedbackEl.innerHTML = `⭐ <strong>Trampa Desactivada.</strong> Estás revisando un caso ya resuelto.`;
    }
  }

  verifyCipherAnswer(selectedIndex, allButtons) {
    const selectedOption = this.currentLevel.options[selectedIndex];
    const targetBtn = allButtons[selectedIndex];

    if (selectedOption.isCorrect) {
      this.stopTimer();
      this.audio.playSuccessBell();
      targetBtn.classList.add('correct');
      allButtons.forEach(b => b.disabled = true);

      this.cipherFeedbackEl.className = 'feedback-box success';
      this.cipherFeedbackEl.innerHTML = `⭐ <strong>¡Deducción Perfecta!</strong> ${selectedOption.feedback}`;

      const stamp = document.createElement('div');
      stamp.className = 'stamp-approved';
      stamp.textContent = 'TRAMPA DESACTIVADA';
      this.docBodyEl.appendChild(stamp);

      this.levelManager.markClueSolved(this.activeClue.id, {
        type: 'cipher',
        answer: selectedOption.text
      });

      setTimeout(() => {
        if (this.isOpen()) this.close();
      }, 2000);
    } else {
      this.audio.playErrorBuzz();
      targetBtn.classList.add('incorrect');
      targetBtn.disabled = true;

      this.cipherFeedbackEl.className = 'feedback-box error';
      this.cipherFeedbackEl.innerHTML = `❌ ${selectedOption.feedback}`;

      this.deductAttempt();
    }
  }

  close() {
    this.stopTimer();
    this.modalEl.classList.remove('active');
    this.activeClue = null;
    this.controls.setEnabled(true);
  }
}
