/**
 * Configuración del Modo de Juego y Reglas de Desbloqueo
 * Lee la variable de entorno VITE_APP_MODE ('DEVELOP' vs 'PRODUCTION')
 */

export class GameConfig {
  /**
   * Obtiene el modo actual: 'DEVELOP' o 'PRODUCTION'
   */
  static getMode() {
    // Permitir override en localStorage para testeo rápido en navegador
    const override = localStorage.getItem('regex_crime_mode_override');
    if (override && (override === 'DEVELOP' || override === 'PRODUCTION')) {
      return override;
    }
    const envMode = (import.meta.env.VITE_APP_MODE || 'DEVELOP').toUpperCase();
    return envMode === 'PRODUCTION' ? 'PRODUCTION' : 'DEVELOP';
  }

  /**
   * Indica si está en modo desarrollo (todos los niveles desbloqueados)
   */
  static isDevelopMode() {
    return this.getMode() === 'DEVELOP';
  }

  /**
   * Alterna el modo en caliente para pruebas en navegador
   */
  static setModeOverride(mode) {
    if (mode === 'DEVELOP' || mode === 'PRODUCTION') {
      localStorage.setItem('regex_crime_override_mode', mode);
      window.location.reload();
    }
  }

  /**
   * Verifica si un Tier específico está desbloqueado
   * @param {number} tierId ID del tier (1..10)
   * @param {Set<string|number>} solvedClues Claves de casos resueltos (ej. 'clue_case_1' o 1)
   * @param {Array} allLevels Lista completa de los 100 niveles
   */
  static isTierUnlocked(tierId, solvedClues, allLevels) {
    if (this.isDevelopMode()) return true;
    if (tierId <= 1) return true;

    // En producción: el tier actual requiere que los casos del tier anterior estén resueltos
    const prevTierId = tierId - 1;
    const prevTierLevels = allLevels.filter(lvl => lvl.tier === prevTierId);
    
    // Si no hay niveles previos, desbloqueado
    if (prevTierLevels.length === 0) return true;

    // Requiere haber resuelto al menos los niveles del tier previo
    const solvedCountInPrev = prevTierLevels.filter(lvl => 
      solvedClues.has(`clue_case_${lvl.id}`) || solvedClues.has(lvl.id)
    ).length;

    // Se desbloquea si completó todos los casos del tier anterior (10 de 10)
    return solvedCountInPrev >= prevTierLevels.length;
  }

  /**
   * Verifica si un caso específico está desbloqueado
   */
  static isCaseUnlocked(caseData, solvedClues, allLevels) {
    if (this.isDevelopMode()) return true;

    // Si el caso ya fue resuelto, está desbloqueado
    if (solvedClues.has(`clue_case_${caseData.id}`) || solvedClues.has(caseData.id)) {
      return true;
    }

    // El primer caso del juego siempre está disponible
    if (caseData.id === 1) return true;

    // Verificar si el Tier está desbloqueado
    if (!this.isTierUnlocked(caseData.tier, solvedClues, allLevels)) {
      return false;
    }

    // Dentro de un Tier desbloqueado, el primer caso del tier siempre está abierto
    const tierCases = allLevels.filter(l => l.tier === caseData.tier);
    if (tierCases.length > 0 && tierCases[0].id === caseData.id) {
      return true;
    }

    // Los casos subsiguientes requieren haber resuelto el caso inmediatamente anterior
    const prevCaseId = caseData.id - 1;
    return solvedClues.has(`clue_case_${prevCaseId}`) || solvedClues.has(prevCaseId);
  }
}
