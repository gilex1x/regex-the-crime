/**
 * Motor de evaluación y análisis seguro de expresiones regulares
 */

export class RegexEngine {
  /**
   * Intenta compilar la expresión regular del usuario de forma segura.
   * @param {string} pattern - Patrón regex sin barras
   * @param {string} flags - Banderas ('g', 'i', 'm', etc.)
   * @returns {{ regex: RegExp|null, error: string|null }}
   */
  static compile(pattern, flags = 'g') {
    if (!pattern || pattern.trim() === '') {
      return { regex: null, error: null };
    }

    // Asegurar que flag 'g' esté presente para encontrar todas las ocurrencias
    const safeFlags = flags.includes('g') ? flags : flags + 'g';

    try {
      const regex = new RegExp(pattern, safeFlags);
      return { regex, error: null };
    } catch (err) {
      return { regex: null, error: err.message };
    }
  }

  /**
   * Ejecuta el regex sobre el texto fuente y retorna las coincidencias con rangos para resaltado.
   * @param {RegExp} regex 
   * @param {string} text 
   * @returns {{ matches: string[], ranges: Array<{start: number, end: number, text: string}>, error: string|null }}
   */
  static evaluate(regex, text) {
    if (!regex || !text) {
      return { matches: [], ranges: [], error: null };
    }

    const matches = [];
    const ranges = [];
    let match;
    let iterations = 0;
    const MAX_ITERATIONS = 500; // Protección contra loops infinitos con regex vacías

    try {
      // Reiniciar lastIndex para búsquedas globales
      regex.lastIndex = 0;

      while ((match = regex.exec(text)) !== null) {
        if (match[0].length === 0) {
          regex.lastIndex++; // Prevenir loop infinito en regex que hacen match de string vacío
        } else {
          matches.push(match[0]);
          ranges.push({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0]
          });
        }

        iterations++;
        if (iterations > MAX_ITERATIONS) {
          return { matches, ranges, error: "Límite de iteraciones alcanzado (posible loop infinito en patrón)." };
        }
      }

      return { matches, ranges, error: null };
    } catch (err) {
      return { matches: [], ranges: [], error: err.message };
    }
  }

  /**
   * Genera el HTML formateado con las coincidencias resaltadas en estilo marcador amarillo/verde detective.
   * @param {string} text 
   * @param {Array<{start: number, end: number}>} ranges 
   * @returns {string} HTML seguro con tags <mark>
   */
  static generateHighlightedHTML(text, ranges) {
    if (!ranges || ranges.length === 0) {
      return this.escapeHTML(text);
    }

    // Ordenar rangos
    const sorted = [...ranges].sort((a, b) => a.start - b.start);
    let html = '';
    let lastIndex = 0;

    for (const r of sorted) {
      if (r.start < lastIndex) continue; // Evitar superposiciones rotas

      // Texto antes del match
      html += this.escapeHTML(text.substring(lastIndex, r.start));
      // Texto dentro del match
      html += `<mark class="regex-match">${this.escapeHTML(text.substring(r.start, r.end))}</mark>`;
      lastIndex = r.end;
    }

    // Texto restante al final
    html += this.escapeHTML(text.substring(lastIndex));
    return html;
  }

  /**
   * Escapa caracteres HTML para evitar XSS.
   */
  static escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Compara los matches obtenidos con los esperados por la pista.
   * @param {string[]} actualMatches 
   * @param {string[]} expectedMatches 
   * @returns {{ isSuccess: boolean, message: string, missing: string[], extras: string[] }}
   */
  static validateMatches(actualMatches, expectedMatches) {
    if (!actualMatches || actualMatches.length === 0) {
      return {
        isSuccess: false,
        message: "No se encontraron coincidencias en el documento.",
        missing: expectedMatches,
        extras: []
      };
    }

    const missing = expectedMatches.filter(exp => !actualMatches.includes(exp));
    const extras = actualMatches.filter(act => !expectedMatches.includes(act));

    if (missing.length === 0 && extras.length === 0) {
      return {
        isSuccess: true,
        message: "¡Patrón perfecto! Todas las pistas clave han sido extraídas con precisión.",
        missing: [],
        extras: []
      };
    }

    if (missing.length > 0 && extras.length === 0) {
      return {
        isSuccess: false,
        message: `El patrón es demasiado restrictivo. Faltan ${missing.length} pistas por capturar.`,
        missing,
        extras
      };
    }

    if (missing.length === 0 && extras.length > 0) {
      return {
        isSuccess: false,
        message: `El patrón es demasiado amplio. Has capturado ${extras.length} datos falsos que entorpecen la investigación.`,
        missing,
        extras
      };
    }

    return {
      isSuccess: false,
      message: `El patrón capturó datos incorrectos y dejó fuera pistas esenciales.`,
      missing,
      extras
    };
  }
}
