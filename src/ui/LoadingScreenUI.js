/**
 * LoadingScreenUI.js
 * Pantalla de carga cinematográfica estilo Noir entre escenarios.
 * Muestra información del caso, estado de despacho policial y tips formativos de REGEX.
 */

export const REGEX_TIPS = [
  {
    category: "CLASES DE CARACTERES",
    pattern: "\\d  vs  \\D",
    title: "Dígitos y Matrículas",
    description: "\\d coincide con cualquier dígito del 0 al 9 (matrículas, teléfonos, cajas fuertes). Su némesis \\D coincide con cualquier carácter que NO sea un número.",
    example: "Patrón: \\d{4}  →  Coincide: '1947' en 'Caso 1947'"
  },
  {
    category: "CLASES DE CARACTERES",
    pattern: "\\w  vs  \\W",
    title: "Caracteres Alfanuméricos y Alias",
    description: "\\w coincide con letras (a-z, A-Z), dígitos (0-9) y guion bajo (_). Ideal para nombres clave y alias de telegrama. \\W coincide con cualquier símbolo o espacio.",
    example: "Patrón: \\w+  →  Coincide: 'Frankie_45' en 'Alias: Frankie_45'"
  },
  {
    category: "CLASES DE CARACTERES",
    pattern: "\\s  vs  \\S",
    title: "Espacios y Sombras",
    description: "\\s intercepta espacios en blanco, tabulaciones y saltos de línea invisibles. \\S captura cualquier carácter visible que deje rastro tipográfico.",
    example: "Patrón: \\S+  →  Coincide: 'Sospechoso' descartando espacios adyacentes"
  },
  {
    category: "ANCLAS Y LÍMITES",
    pattern: "^  y  $",
    title: "Perímetro Inviolable",
    description: "El acento circunflejo ^ fija el inicio de la línea y el signo de dólar $ fija el final. Combinados como ^patrón$, aseguran que toda la línea coincida sin añadidos fraudulentos.",
    example: "Patrón: ^CONFIDENCIAL$  →  No coincidirá con 'NO CONFIDENCIAL'"
  },
  {
    category: "ANCLAS Y LÍMITES",
    pattern: "\\b",
    title: "Frontera de Palabra",
    description: "\\b delimita el borde exacto de una palabra. Evita falsos positivos: buscar '\\brobo\\b' encontrará la palabra 'robo', pero ignorará 'proboscidio' o 'comprobante'.",
    example: "Patrón: \\bpie\\b  →  Coincide con 'pie' pero NO con 'pieza' ni 'copie'"
  },
  {
    category: "CUANTIFICADORES",
    pattern: "+  (Uno o más)",
    title: "Rastro Obligatorio",
    description: "El signo + exige que el elemento anterior aparezca como mínimo una vez, repitiéndose de forma codiciosa tantas veces consecutivas como exista.",
    example: "Patrón: 9+  →  Coincide con '9', '99' y '999999'"
  },
  {
    category: "CUANTIFICADORES",
    pattern: "*  (Cero o más)",
    title: "Presencia Opcional Múltiple",
    description: "El asterisco * acepta que el elemento anterior no aparezca ninguna vez, o que se repita indefinidamente. Útil cuando no estás seguro si hubo repetición.",
    example: "Patrón: no*  →  Coincide con 'n', 'no', 'nooo' y 'nooooo'"
  },
  {
    category: "CUANTIFICADORES",
    pattern: "?  (Cero o uno)",
    title: "Sospecha Opcional",
    description: "El signo de interrogación ? vuelve opcional al carácter o grupo precedente. Ideal para variaciones ortográficas o plurales.",
    example: "Patrón: colou?r  →  Coincide tanto con 'color' como con 'colour'"
  },
  {
    category: "CUANTIFICADORES",
    pattern: "{min,max}",
    title: "Rango de Conteo Exacto",
    description: "Las llaves definen límites estrictos de repetición. {4} exige exactamente 4 repeticiones; {2,5} exige entre 2 y 5; {3,} exige un mínimo de 3 sin límite superior.",
    example: "Patrón: [A-Z]{3}-\\d{3}  →  Coincide con matrículas como 'NYC-782'"
  },
  {
    category: "CUANTIFICADORES",
    pattern: "*?  y  +?",
    title: "Avaricia vs Perezoso (Lazy)",
    description: "Por defecto, los cuantificadores son codiciosos (greedy) y toman el texto más largo posible. Añadirles ? los vuelve perezosos (lazy), deteniéndose en la primera coincidencia.",
    example: "En '<p>Uno</p><p>Dos</p>', '<p>.*?</p>' captura solo el primer párrafo"
  },
  {
    category: "CONJUNTOS Y CLASES",
    pattern: "[abc]",
    title: "Rueda de Reconocimiento",
    description: "Los corchetes agrupan una lista de caracteres admisibles. La expresión coincidirá con exactamente UNO de los caracteres contenidos.",
    example: "Patrón: [aeiou]  →  Captura cualquier vocal individual"
  },
  {
    category: "CONJUNTOS Y CLASES",
    pattern: "[^abc]",
    title: "Clase Negada / Lista de Exclusión",
    description: "Si colocas un acento circunflejo ^ justo al abrir los corchetes, la regla se invierte: coincidirá con cualquier carácter que NO esté en la lista.",
    example: "Patrón: [^0-9]  →  Coincide con letras, espacios y puntuación, pero no dígitos"
  },
  {
    category: "CONJUNTOS Y CLASES",
    pattern: "[a-z]  y  [0-9]",
    title: "Rangos Continuos",
    description: "El guion dentro de los corchetes define secuencias continuas según la tabla ASCII, ahorrándote escribir cada carácter individual.",
    example: "Patrón: [0-9a-fA-F]  →  Valida caracteres hexadecimales de cifrado"
  },
  {
    category: "CARACTERES ESPECIALES",
    pattern: ".  (El Comodín)",
    title: "El Comodín Peligroso",
    description: "El punto coincide con cualquier carácter individual excepto saltos de línea. ¡Cuidado! Si buscas un punto ortográfico real, debes escaparlo con barra invertida: \\.",
    example: "Patrón: c.r  →  Coincide con 'car', 'cor', 'c-r' y 'c3r'"
  },
  {
    category: "GRUPOS Y DISYUNCIÓN",
    pattern: "(a|b)",
    title: "La Alternativa (O Lógico)",
    description: "La barra vertical | funciona como una disyunción lógica entre diferentes ramas de búsqueda. Útil para capturar múltiples alias o prefijos.",
    example: "Patrón: (pistola|revólver|escopeta)  →  Identifica el arma utilizada"
  },
  {
    category: "GRUPOS Y CAPTURA",
    pattern: "(...)",
    title: "Grupos de Captura",
    description: "Los paréntesis aíslan subexpresiones y guardan los fragmentos coincidentes en variables de captura ($1, $2) para extraerlos o reorganizarlos posteriormente.",
    example: "Patrón: (\\d{2})/(\\d{2})  →  $1 contendrá el día y $2 el mes"
  },
  {
    category: "GRUPOS Y CAPTURA",
    pattern: "(?:...)",
    title: "Grupos de No Captura",
    description: "Añadir ?: al inicio del paréntesis agrupa la expresión lógica sin reservar un número de captura ni consumir memoria del motor.",
    example: "Patrón: (?:https?://)?([\\w.-]+)  →  Agrupa el protocolo sin capturarlo"
  },
  {
    category: "LOOKAROUNDS (AVANZADO)",
    pattern: "(?=...)",
    title: "Lookahead Positivo (Mirada Hacia Adelante)",
    description: "Verifica que a continuación del patrón actual venga una condición específica, pero SIN consumir esos caracteres ni incluirlos en la coincidencia.",
    example: "Patrón: \\d+(?= dólares)  →  Coincide con '500' en '500 dólares'"
  },
  {
    category: "LOOKAROUNDS (AVANZADO)",
    pattern: "(?!...)",
    title: "Lookahead Negativo",
    description: "Asegura que el patrón NO vaya seguido de determinada secuencia. Es la herramienta definitiva para descartar falsas pistas o extensiones prohibidas.",
    example: "Patrón: archivo(?!\\.tmp)  →  Ignora copias temporales como 'archivo.tmp'"
  },
  {
    category: "LOOKAROUNDS (AVANZADO)",
    pattern: "(?<=...)",
    title: "Lookbehind Positivo (Mirada Hacia Atrás)",
    description: "Inspecciona el texto precedente sin incluirlo en el resultado. Ideal para capturar montos tras signos monetarios o remitentes tras encabezados.",
    example: "Patrón: (?<=\\$)\\d+  →  Coincide con '1000' en '$1000'"
  },
  {
    category: "LOOKAROUNDS (AVANZADO)",
    pattern: "(?<!...)",
    title: "Lookbehind Negativo",
    description: "Exige que el patrón NO esté precedido por una secuencia específica. Útil para verificar que un texto no sea un código de escape o comentario.",
    example: "Patrón: (?<!\\\\)\"  →  Detecta comillas reales no escapadas"
  },
  {
    category: "FLAGS Y MODIFICADORES",
    pattern: "/patrón/i",
    title: "Bandera 'i': Insensible a Mayúsculas",
    description: "El flag 'i' ignora la distinción entre mayúsculas y minúsculas en todo el patrón. El asesino no podrá esconderse cambiando la tipografía.",
    example: "Patrón: /veneno/i  →  Coincide con 'VENENO', 'Veneno' y 'vEnEnO'"
  },
  {
    category: "FLAGS Y MODIFICADORES",
    pattern: "/patrón/g",
    title: "Bandera 'g': Búsqueda Global",
    description: "Sin el flag 'g', el motor regular se detendrá en la primera coincidencia que halle en el documento. Con 'g', examinará hasta la última línea.",
    example: "Permite listar todas las pruebas del manuscrito sin truncar el resultado"
  },
  {
    category: "FLAGS Y MODIFICADORES",
    pattern: "/patrón/m",
    title: "Bandera 'm': Modo Multilínea",
    description: "En modo multilínea, los anclas ^ y $ coinciden con el inicio y fin de CADA línea individual dentro de un texto con saltos de línea (\\n).",
    example: "Permite validar que cada registro de un archivo de bitácora inicie con fecha"
  },
  {
    category: "CONSEJOS DE DETECTIVE",
    pattern: "\\\\",
    title: "El Escape Forense",
    description: "Caracteres como . * + ? ^ $ { } [ ] ( ) | \\ tienen significados reservados. Si buscas su símbolo literal, antepón siempre una contrabarra \\.",
    example: "Para buscar el costo de $5.00 debes escribir: \\$5\\.00"
  },
  {
    category: "CONSEJOS DE DETECTIVE",
    pattern: "\\d{1,3}\\.\\d{1,3}",
    title: "Direcciones y Coordenadas",
    description: "Combina cuantificadores acotados con escapes precisos para estructurar verificadores de IPs, coordenadas o sellos temporales 00:00:00.",
    example: "Patrón: \\b\\d{2}:\\d{2}:\\d{2}\\b  →  Detecta sellos horarios forenses"
  }
];

export const DISPATCH_MESSAGES = [
  "Despachando patrulla al sector de investigación...",
  "Compilando autómatas finitos deterministas...",
  "Acordonando perímetro forense con cinta policial...",
  "Consultando antecedentes en la central de inteligencia...",
  "Cargando evidencias balísticas y cartas cifradas...",
  "Sincronizando frecuencias de radio de patrulla...",
  "Desplegando instrumental y reactivo luminol...",
  "Asegurando el perímetro contra saboteadores de Malphas...",
  "Examinando huellas dactilares y registros de telegrama...",
  "Verificando integridad criptográfica del expediente..."
];

export class LoadingScreenUI {
  constructor(audioManager = null) {
    this.audioManager = audioManager;
    this.overlay = document.getElementById('level-loading-screen');
    this.caseTitleEl = document.getElementById('loading-case-title');
    this.tierBadgeEl = document.getElementById('loading-tier-badge');
    this.locationEl = document.getElementById('loading-location-label');
    this.statusTextEl = document.getElementById('loading-status-text');
    this.progressBarFill = document.getElementById('loading-progress-bar-fill');
    this.progressPercent = document.getElementById('loading-progress-percent');
    
    // Elementos del tip
    this.tipCategoryEl = document.getElementById('loading-tip-category');
    this.tipPatternEl = document.getElementById('loading-tip-pattern');
    this.tipTitleEl = document.getElementById('loading-tip-title');
    this.tipDescEl = document.getElementById('loading-tip-desc');
    this.tipExampleEl = document.getElementById('loading-tip-example');
    this.nextTipBtn = document.getElementById('loading-next-tip-btn');

    this.currentTipIndex = Math.floor(Math.random() * REGEX_TIPS.length);
    this.progressInterval = null;
    this.statusInterval = null;
    this.isVisible = false;

    if (this.nextTipBtn) {
      this.nextTipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextTip();
      });
    }
  }

  renderTip(index) {
    const tip = REGEX_TIPS[index % REGEX_TIPS.length];
    if (!tip) return;

    if (this.tipCategoryEl) this.tipCategoryEl.textContent = `[ ${tip.category} ]`;
    if (this.tipPatternEl) this.tipPatternEl.textContent = tip.pattern;
    if (this.tipTitleEl) this.tipTitleEl.textContent = tip.title;
    if (this.tipDescEl) this.tipDescEl.textContent = tip.description;
    if (this.tipExampleEl) this.tipExampleEl.textContent = tip.example;
  }

  nextTip() {
    this.currentTipIndex = (this.currentTipIndex + 1) % REGEX_TIPS.length;
    this.renderTip(this.currentTipIndex);
    if (this.audioManager?.playTypewriterClick) {
      this.audioManager.playTypewriterClick();
    }
  }

  randomTip() {
    this.currentTipIndex = Math.floor(Math.random() * REGEX_TIPS.length);
    this.renderTip(this.currentTipIndex);
  }

  show(caseData, tierData) {
    if (!this.overlay) return Promise.resolve();

    this.isVisible = true;
    this.overlay.classList.remove('fade-out');
    this.overlay.classList.add('active');

    // Actualizar datos del caso
    if (this.caseTitleEl) {
      this.caseTitleEl.textContent = caseData ? `CASO #${caseData.id}: ${caseData.title}` : 'CARGANDO EXPEDIENTE...';
    }
    if (this.tierBadgeEl) {
      this.tierBadgeEl.textContent = tierData ? `${tierData.badge} ${tierData.name}` : 'TIER CLASIFICADO';
    }
    if (this.locationEl) {
      const sceneNames = {
        alley: 'El Callejón Olvidado',
        hotel: 'Hotel Savoy - Habitación 204',
        office: 'Oficina del Banquero Sterling',
        morgue: 'Morgue Municipal Clandestina',
        docks: 'Muelles de Carga del Distrito Este',
        sanctuary: 'Santuario de la Hermandad',
        mansion: 'Mansión Vance - Salón Principal',
        boiler_room: 'Sala de Calderas Industrial',
        server_room: 'Bóveda de Servidores y Cómputo',
        abyss: 'La Bóveda del Abismo de Malphas'
      };
      this.locationEl.textContent = `📍 Locación: ${sceneNames[caseData?.sceneType] || 'Zona de Intervención Policial'}`;
    }

    // Renderizar un tip fresco
    this.randomTip();

    // Iniciar barra de progreso y estado
    let progress = 5;
    if (this.progressBarFill) this.progressBarFill.style.width = `${progress}%`;
    if (this.progressPercent) this.progressPercent.textContent = `${Math.round(progress)}%`;

    const randomStatus = DISPATCH_MESSAGES[Math.floor(Math.random() * DISPATCH_MESSAGES.length)];
    if (this.statusTextEl) this.statusTextEl.textContent = randomStatus;

    clearInterval(this.progressInterval);
    clearInterval(this.statusInterval);

    // Simular avance fluido hacia el 85% mientras se descarga el chunk y se arma la escena
    this.progressInterval = setInterval(() => {
      if (progress < 85) {
        progress += Math.random() * 12 + 6;
        if (progress > 85) progress = 85;
        if (this.progressBarFill) this.progressBarFill.style.width = `${progress}%`;
        if (this.progressPercent) this.progressPercent.textContent = `${Math.round(progress)}%`;
      }
    }, 100);

    // Cambiar mensaje de estado si tarda un poco
    let statusCycle = 0;
    this.statusInterval = setInterval(() => {
      statusCycle++;
      const nextMsg = DISPATCH_MESSAGES[(Math.floor(Math.random() * DISPATCH_MESSAGES.length) + statusCycle) % DISPATCH_MESSAGES.length];
      if (this.statusTextEl) this.statusTextEl.textContent = nextMsg;
    }, 900);

    // Garantizar que la llamada retorne y permita el siguiente paso en el event loop
    return new Promise(resolve => setTimeout(resolve, 60));
  }

  hide() {
    if (!this.overlay) return Promise.resolve();

    clearInterval(this.progressInterval);
    clearInterval(this.statusInterval);

    // Completar barra al 100%
    if (this.progressBarFill) this.progressBarFill.style.width = '100%';
    if (this.progressPercent) this.progressPercent.textContent = '100%';
    if (this.statusTextEl) this.statusTextEl.textContent = '¡Perímetro asegurado! Ingresando a la escena...';

    return new Promise(resolve => {
      // Pausa breve para notar el 100% y luego iniciar fade-out fluido
      setTimeout(() => {
        this.overlay.classList.add('fade-out');
        setTimeout(() => {
          this.overlay.classList.remove('active');
          this.overlay.classList.remove('fade-out');
          this.isVisible = false;
          resolve();
        }, 400);
      }, 250);
    });
  }
}
