/**
 * Catálogo de Lecciones de la Academia de Detectives — Estilo W3Schools ("Para Dummies")
 * Explicaciones simples, tablas directas y aprendizaje progresivo sin frustración.
 */

export const ACADEMY_MODULES = [
  {
    id: 1,
    title: "Módulo 1: Primeros Pasos con Regex",
    subtitle: "El buscador inteligente, banderas /i y /g, y corchetes"
  },
  {
    id: 2,
    title: "Módulo 2: Atajos y Repeticiones",
    subtitle: "Dígitos \\d, espacios \\s, y cuantificadores +, *, ?"
  },
  {
    id: 3,
    title: "Módulo 3: Precisión de Detective",
    subtitle: "Escapar caracteres (\\$, \\.), límites de palabra \\b y llaves {n}"
  },
  {
    id: 4,
    title: "Módulo 4: Aprende a Leer una Regex",
    subtitle: "Alternancia (x|y) y lectura paso a paso como un profesional"
  }
];

export const ACADEMY_LESSONS = [
  // ==========================================
  // LECCIÓN 1: TEXTO EXACTO (Como Ctrl + F)
  // ==========================================
  {
    id: "les_1",
    moduleId: 1,
    title: "1. Tu Primera Búsqueda (Texto Exacto)",
    category: "Lo Básico",
    type: "construction",
    theory: `
      <h4>¿Qué es una Expresión Regular?</h4>
      <p>Imagina que estás en tu navegador y presionas <strong>Ctrl + F</strong> para buscar una palabra en una página. ¡Eso es una Expresión Regular básica!</p>
      
      <p>Si escribes una palabra literal, el buscador encontrará exactamente esa palabra:</p>
      
      <table class="w3-mini-table">
        <tr><th>Patrón</th><th>¿Qué busca?</th><th>Ejemplo</th></tr>
        <tr><td><code>arma</code></td><td>La palabra exacta "arma"</td><td>"El <strong>arma</strong> estaba oculta"</td></tr>
      </table>
    `,
    sourceText: `INFORME DEL FORENSE:
El sospechoso abandonó el arma cerca de la estación de trenes.
No se encontró ninguna otra arma en el vehículo.
El testigo vio cómo arrojaba el objeto metálico.`,
    task: "Encuentra todas las veces que aparece la palabra 'arma' en el informe.",
    hint: "Simplemente escribe la palabra arma en el buscador.",
    recommendedRegex: "arma",
    expectedMatches: ["arma", "arma"]
  },

  // ==========================================
  // LECCIÓN 2: LAS BANDERAS MÁGICAS (/i y /g)
  // ==========================================
  {
    id: "les_2",
    moduleId: 1,
    title: "2. Las Banderas Mágicas (/i y /g)",
    category: "Modificadores",
    type: "construction",
    theory: `
      <h4>¿Qué son los Modificadores (Flags)?</h4>
      <p>Son letras que se colocan al final de la expresión <code>/patrón/flags</code> y le dan superpoderes:</p>
      
      <table class="w3-mini-table">
        <tr><th>Bandera</th><th>Nombre</th><th>¿Qué hace?</th><th>Ejemplo</th></tr>
        <tr><td><code>g</code></td><td>Global</td><td>Busca <strong>todas</strong> las apariciones, no solo la primera.</td><td><code>/gato/g</code></td></tr>
        <tr><td><code>i</code></td><td>Insensible</td><td><strong>Ignora si es MAYÚSCULA o minúscula</strong>.</td><td><code>/pista/i</code> encuentra "pista", "Pista", "PISTA"</td></tr>
      </table>

      <p>Puedes combinarlas: <code>/sospechoso/gi</code> buscará <strong>todas</strong> las apariciones ignorando mayúsculas y minúsculas.</p>
    `,
    sourceText: `REGISTRO DE VIGILANCIA:
10:00 - Se avistó al SOSPECHOSO en el muelle.
10:15 - El sospechoso abordó un sedán oscuro.
10:30 - Perdimos de vista al Sospechoso cerca del puente.`,
    task: "Escribe la palabra 'sospechoso' y activa la bandera 'i' (Ignorar mayúsculas) para capturar las 3 apariciones: SOSPECHOSO, sospechoso y Sospechoso.",
    hint: "Escribe sospechoso en el buscador y activa la casilla 'i (Ignorar mayúsculas)'.",
    recommendedRegex: "sospechoso",
    recommendedFlags: "gi",
    expectedMatches: ["SOSPECHOSO", "sospechoso", "Sospechoso"]
  },

  // ==========================================
  // LECCIÓN 3: CORCHETES Y RANGOS [...]
  // ==========================================
  {
    id: "les_3",
    moduleId: 1,
    title: "3. Elige entre Opciones con Corchetes [...]",
    category: "Corchetes",
    type: "construction",
    theory: `
      <h4>¿Para qué sirven los corchetes <code>[...]</code>?</h4>
      <p>Los corchetes significan: <em>"cualquiera de estos caracteres en esta posición"</em>.</p>

      <table class="w3-mini-table">
        <tr><th>Patrón</th><th>Significado</th><th>Encuentra</th></tr>
        <tr><td><code>[abc]</code></td><td>La letra 'a', la 'b' o la 'c'</td><td>"c<strong>a</strong>sa", "c<strong>o</strong>sa" (con [ao])</td></tr>
        <tr><td><code>[0-9]</code></td><td>Cualquier número del 0 al 9</td><td>"1", "4", "9"</td></tr>
        <tr><td><code>[A-Z]</code></td><td>Cualquier letra MAYÚSCULA</td><td>"A", "B", "Z"</td></tr>
      </table>
    `,
    sourceText: `REGISTRO DEL HOTEL:
Habitación 101: Huésped A
Habitación 102: Huésped B
Habitación 103: Huésped C
Habitación 109: Desocupada`,
    sourceText: `REGISTRO DEL HOTEL:
Habitación 101: Huésped A
Habitación 102: Huésped B
Habitación 103: Huésped C
Habitación 109: Desocupada`,
    task: "El conserje sospecha de las habitaciones 101, 102 y 103. Encuentra los números de esas tres habitaciones usando corchetes para el último dígito.",
    hint: "Combina el texto común '10' con un rango de corchetes del 1 al 3.",
    recommendedRegex: "10[1-3]",
    expectedMatches: ["101", "102", "103"]
  },

  // ==========================================
  // LECCIÓN 4: EL ATAJO PARA DÍGITOS (\d)
  // ==========================================
  {
    id: "les_4",
    moduleId: 2,
    title: "4. Atajos Rápidos: Números (\\d)",
    category: "Metacaracteres",
    type: "construction",
    theory: `
      <h4>En lugar de escribir <code>[0-9]</code>, usa <code>\\d</code></h4>
      <p>La letra <code>d</code> viene del inglés <em>digit</em> (dígito). Cada vez que escribes <code>\\d</code>, el buscador entiende: <strong>cualquier número del 0 al 9</strong>.</p>

      <table class="w3-mini-table">
        <tr><th>Atajo</th><th>Equivale a</th><th>¿Qué busca?</th></tr>
        <tr><td><code>\\d</code></td><td><code>[0-9]</code></td><td>Un solo número</td></tr>
        <tr><td><code>\\d\\d</code></td><td><code>[0-9][0-9]</code></td><td>Dos números seguidos</td></tr>
        <tr><td><code>\\D</code></td><td><code>[^0-9]</code></td><td>Cualquier cosa que NO sea un número</td></tr>
      </table>
    `,
    sourceText: `ARCHIVOS DE EXPEDIENTES:
Caso #1: Robo nocturno
Caso #2: Fraude bancario
Expediente General: Sin resolver
Caso #7: Homicidio premeditado`,
    task: "Encuentra todas las menciones a expedientes con formato 'Caso #' seguidos de su número.",
    hint: "Combina el texto fijo con el atajo de dígito numérico.",
    recommendedRegex: "Caso #\\d",
    expectedMatches: ["Caso #1", "Caso #2", "Caso #7"]
  },

  // ==========================================
  // LECCIÓN 5: ¿CUÁNTAS VECES SE REPITE? (EL SIGNO +)
  // ==========================================
  {
    id: "les_5",
    moduleId: 2,
    title: "5. Uno o Muchos Números con el Signo (+)",
    category: "Cuantificadores",
    type: "construction",
    theory: `
      <h4>El Cuantificador <code>+</code> (Uno o Más)</h4>
      <p>¿Qué pasa si un número tiene varias cifras, como <code>5</code>, <code>500</code> o <code>12000</code>?</p>
      <p>Si usas solo <code>\\d</code>, solo atraparás un dígito. Para decirle al buscador <em>"uno o muchos dígitos juntos"</em>, le agregas el signo más: <code>\\d+</code>.</p>

      <table class="w3-mini-table">
        <tr><th>Patrón</th><th>Significado</th><th>Ejemplo</th></tr>
        <tr><td><code>\\d</code></td><td>Exactamente 1 número</td><td>"<strong>1</strong>23" (solo atrapa el 1)</td></tr>
        <tr><td><code>\\d+</code></td><td>1 o muchos números juntos</td><td>"<strong>123</strong>" (atrapa el número completo)</td></tr>
      </table>
    `,
    sourceText: `LIBRETA DE APUNTES DEL PRESTAMISTA:
Deuda de Miller: 5 dólares
Deuda de Vance: 500 dólares
Deuda de Frankie: 15000 dólares
Sin deuda registrada hoy.`,
    task: "Captura todas las cantidades numéricas de dinero de la libreta, sin importar cuántas cifras tengan.",
    hint: "Usa el atajo de dígitos seguido del signo cuantificador de una o más repeticiones.",
    recommendedRegex: "\\d+",
    expectedMatches: ["5", "500", "15000"]
  },

  // ==========================================
  // LECCIÓN 6: NEUTRALIZAR CARACTERES ESPECIALES (\. y \$)
  // ==========================================
  {
    id: "les_6",
    moduleId: 3,
    title: "6. Caracteres con Superpoderes (\\ y \\$)",
    category: "Escapes",
    type: "construction",
    theory: `
      <h4>¿Por qué algunos símbolos necesitan una barra <code>\\</code>?</h4>
      <p>En Regex, caracteres como <code>$</code> y <code>.</code> tienen significados especiales ocultos (el punto significa <em>"cualquier carácter"</em> y el dólar significa <em>"final de la línea"</em>).</p>

      <p>Si quieres buscar un <strong>signo de dólar real</strong> o un <strong>punto real</strong>, debes ponerle una barra invertida adelante para "quitarle el superpoder":</p>

      <table class="w3-mini-table">
        <tr><th>Para buscar...</th><th>Debes escribir</th><th>¿Por qué?</th></tr>
        <tr><td>El signo <code>$</code> real</td><td><code>\\$</code></td><td>Porque <code>$</code> solo es fin de línea.</td></tr>
        <tr><td>Un punto <code>.</code> real</td><td><code>\\.</code></td><td>Porque <code>.</code> solo es comodín para cualquier letra.</td></tr>
      </table>
    `,
    sourceText: `NOTA DE CHANTAJE:
Reúne $500 antes de las diez.
Si no cumples, te costará $10000 adicionales.
No intentes llamar al 911.`,
    task: "El extorsionador exige pagos en dólares. Captura las sumas monetarias que llevan el símbolo '$' al inicio.",
    hint: "Neutraliza el símbolo de dólar con barra invertida y añade dígitos con cuantificador.",
    recommendedRegex: "\\$\\d+",
    expectedMatches: ["$500", "$10000"]
  },

  // ==========================================
  // LECCIÓN 7: CANTIDAD EXACTA CON LLAVES {4}
  // ==========================================
  {
    id: "les_7",
    moduleId: 3,
    title: "7. Cantidad Exacta con Llaves {4}",
    category: "Cuantificadores",
    type: "construction",
    theory: `
      <h4>¿Cómo buscar exactamente 4 números seguidos?</h4>
      <p>En lugar de escribir <code>\\d\\d\\d\\d</code>, puedes poner el número entre llaves <code>{4}</code>:</p>

      <table class="w3-mini-table">
        <tr><th>Patrón</th><th>Significado</th><th>Ejemplo</th></tr>
        <tr><td><code>\\d{4}</code></td><td>Exactamente 4 dígitos</td><td>Años como "<strong>1947</strong>"</td></tr>
        <tr><td><code>[A-Z]{3}</code></td><td>Exactamente 3 letras mayúsculas</td><td>Códigos como "<strong>NYC</strong>"</td></tr>
        <tr><td><code>\\d{2,4}</code></td><td>Entre 2 y 4 dígitos</td><td>"50", "500", "5000"</td></tr>
      </table>
    `,
    sourceText: `REGISTRO DE MATRÍCULAS POLICIALES:
Patrulla A: NYPD-1234
Patrulla B: CAR-8891
Taxi no policial: TAXI-99 (solo 2 números)
Coche de fuga: FORD-0042`,
    task: "Identifica las patrullas policiales y vehículos de interés cuyas placas tienen 4 letras mayúsculas, un guion y exactamente 4 números.",
    hint: "Combina una clase de letras mayúsculas con llaves de cantidad, guion y dígitos con llaves.",
    recommendedRegex: "[A-Z]{4}-\\d{4}",
    expectedMatches: ["NYPD-1234", "FORD-0042"]
  },

  // ==========================================
  // LECCIÓN 8: LÍMITES DE PALABRA (\b)
  // ==========================================
  {
    id: "les_8",
    moduleId: 3,
    title: "8. Límites de Palabra (\\b)",
    category: "Límites",
    type: "construction",
    theory: `
      <h4>El problema de las palabras dentro de palabras</h4>
      <p>Si buscas la palabra <code>Rob</code>, el buscador normal encontraría también <strong>Rob</strong>erto, <strong>rob</strong>ado y <strong>Rob</strong>in.</p>
      
      <p>Para buscar únicamente la <strong>palabra completa e independiente</strong>, se usa <code>\\b</code> (de <em>boundary</em> = frontera/límite) al inicio y al final:</p>

      <table class="w3-mini-table">
        <tr><th>Patrón</th><th>¿Qué encuentra?</th><th>¿Qué descarta?</th></tr>
        <tr><td><code>\\bRob\\b</code></td><td>Únicamente "<strong>Rob</strong>"</td><td>Descarta "Roberto", "robar"</td></tr>
      </table>
    `,
    sourceText: `INTERROGATORIO DE TESTIGOS:
- Vi a Rob en el callejón.
- Roberto dice que estuvo trabajando.
- El dinero fue robado a medianoche.
- Nadie acompañaba a Rob cuando escapó.`,
    task: "Aísla las menciones al sospechoso 'Rob' como palabra independiente, sin confundirlo con 'Roberto' ni 'robado'.",
    hint: "Rodea el nombre con los límites de frontera de palabra.",
    recommendedRegex: "\\bRob\\b",
    expectedMatches: ["Rob", "Rob"]
  },

  // ==========================================
  // LECCIÓN 9: UNO U OTRO CON LA BARRA (x|y)
  // ==========================================
  {
    id: "les_9",
    moduleId: 4,
    title: "9. Uno u Otro con Alternancia (x|y)",
    category: "Alternancia",
    type: "construction",
    theory: `
      <h4>La barra vertical <code>|</code> significa "O" (OR)</h4>
      <p>Si buscas dos palabras posibles, puedes agruparlas entre paréntesis separadas por una barra vertical <code>(x|y)</code>:</p>

      <table class="w3-mini-table">
        <tr><th>Patrón</th><th>Significado</th><th>Ejemplo</th></tr>
        <tr><td><code>(Sedan|Taxi)</code></td><td>Encuentra "Sedan" o encuentra "Taxi"</td><td>"Un <strong>Taxi</strong> se detuvo"</td></tr>
        <tr><td><code>(rojo|azul|negro)</code></td><td>Encuentra cualquiera de los 3 colores</td><td>"Coche <strong>rojo</strong>"</td></tr>
      </table>
    `,
    sourceText: `REPORTE DE TRÁFICO NOCTURNO:
Vehículo 1: Sedan sospechoso
Vehículo 2: Camión de mudanzas
Vehículo 3: Taxi del sindicato
Vehículo 4: Bicicleta de reparto
Vehículo 5: Sedan sin placas`,
    task: "El reporte vial registra muchos transportes. Filtra únicamente los vehículos que sean 'Sedan' o 'Taxi'.",
    hint: "Usa paréntesis con la barra vertical para indicar la opción.",
    recommendedRegex: "(Sedan|Taxi)",
    expectedMatches: ["Sedan", "Taxi", "Sedan"]
  },

  // ==========================================
  // LECCIÓN 10: APRENDE A LEER UNA REGEX (DECONSTRUCCIÓN)
  // ==========================================
  {
    id: "les_10",
    moduleId: 4,
    title: "10. ¿Cómo Leer una Regex Profesional?",
    category: "Criptoanálisis",
    type: "deconstruction",
    theory: `
      <h4>Cómo leer una Regex de izquierda a derecha</h4>
      <p>Una expresión regular se lee como una receta de cocina, paso por paso. Mira este ejemplo:</p>
      
      <div class="code-spotlight"><code>^[A-Z]{3}-\\d{4}$</code></div>

      <ol style="margin-left: 20px; line-height: 1.8; color: #cbd5e1;">
        <li><code>^</code> = El texto debe <strong>empezar aquí</strong>.</li>
        <li><code>[A-Z]{3}</code> = Debe tener <strong>3 letras mayúsculas</strong>.</li>
        <li><code>-</code> = Debe tener un <strong>guion literal</strong> en medio.</li>
        <li><code>\\d{4}</code> = Debe tener <strong>4 números</strong>.</li>
        <li><code>$</code> = El texto debe <strong>terminar aquí</strong>.</li>
      </ol>
    `,
    question: "Teniendo en cuenta la explicación anterior, ¿cuál de los siguientes códigos pasaría la prueba perfectamente con el patrón ^[A-Z]{3}-\\d{4}$ ?",
    options: [
      {
        id: "opt_a",
        text: "NY-1234 (Falta una letra mayúscula)",
        isCorrect: false,
        feedback: "Incorrecto: Solo tiene 2 letras (NY), pero la regla pide exactamente 3 letras [A-Z]{3}."
      },
      {
        id: "opt_b",
        text: "ABC-4921",
        isCorrect: true,
        feedback: "¡Deducción perfecta! Tiene 3 letras mayúsculas (ABC), un guion (-) y 4 dígitos (4921). ¡Te has graduado con honores de la Academia!"
      },
      {
        id: "opt_c",
        text: "CAR-99 (Faltan dos números)",
        isCorrect: false,
        feedback: "Incorrecto: Solo tiene 2 dígitos (99), pero la regla exige 4 dígitos \\d{4}."
      }
    ]
  }
];
