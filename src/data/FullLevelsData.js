/**
 * Base de datos completa de los 50 Niveles de 'Regex: The Crime'
 * Estructurados en 10 Tiers de Dificultad (5 niveles por Tier)
 * Incluye mecánicas de tiempo límite, intentos máximos y desafíos del criminal (inversos).
 */

export const TIERS = [
  { id: 1, name: "Tier 1: Recluta de Patrulla", levels: [1, 2, 3, 4, 5], timeLimit: null, maxAttempts: null, badge: "⭐" },
  { id: 2, name: "Tier 2: Oficial de Ronda", levels: [6, 7, 8, 9, 10], timeLimit: null, maxAttempts: 5, badge: "⭐⭐" },
  { id: 3, name: "Tier 3: Detective de Distrito", levels: [11, 12, 13, 14, 15], timeLimit: 90, maxAttempts: 5, badge: "⭐⭐⭐" },
  { id: 4, name: "Tier 4: Brigada Antinarcóticos", levels: [16, 17, 18, 19, 20], timeLimit: 80, maxAttempts: 4, badge: "🎖️" },
  { id: 5, name: "Tier 5: Investigador de Homicidios", levels: [21, 22, 23, 24, 25], timeLimit: 60, maxAttempts: 4, badge: "🎖️🎖️" },
  { id: 6, name: "Tier 6: Forense de Inteligencia", levels: [26, 27, 28, 29, 30], timeLimit: 55, maxAttempts: 3, badge: "🎖️🎖️🎖️" },
  { id: 7, name: "Tier 7: Agente Especial Encubierto", levels: [31, 32, 33, 34, 35], timeLimit: 45, maxAttempts: 3, badge: "🏅" },
  { id: 8, name: "Tier 8: Unidad de Delitos Mayores", levels: [36, 37, 38, 39, 40], timeLimit: 40, maxAttempts: 3, badge: "🏅🏅" },
  { id: 9, name: "Tier 9: Auditoría Antiterrorista", levels: [41, 42, 43, 44, 45], timeLimit: 35, maxAttempts: 3, badge: "🏅🏅🏅" },
  { id: 10, name: "Tier 10: Comisionado Maestro Forense", levels: [46, 47, 48, 49, 50], timeLimit: 30, maxAttempts: 2, badge: "🏆" }
];

export const ALL_LEVELS = [
  // ========================================================
  // TIER 1: RECLUTA DE PATRULLA (Niveles 1 a 5)
  // Sin límite de tiempo ni de intentos. Fundamentos directos.
  // ========================================================
  {
    id: 1,
    tier: 1,
    sceneType: "alley",
    title: "Caso 01: El Arma Descartada",
    subtitle: "Distrito Industrial • 02:00 AM",
    description: "Una llamada reportó que un borracho habitual fue hallado muerto tras los botes de basura con cortes extraños. Inspecciona el parte del arma.",
    type: "construction",
    timeLimit: null,
    maxAttempts: null,
    documentTitle: "PARTE POLICIAL INICIAL",
    sourceText: `INFORME DE HOMICIDIOS:
El sospechoso soltó el arma en la acera.
No se halló otra arma en su gabardina.
El cómplice huyó desarmado hacia el muelle.`,
    task: "Encuentra todas las apariciones de la palabra 'arma' en el texto del informe.",
    hint: "Escribe simplemente la palabra exacta: arma",
    recommendedRegex: "arma",
    recommendedFlags: "g",
    expectedMatches: ["arma", "arma"]
  },
  {
    id: 2,
    tier: 1,
    sceneType: "alley",
    title: "Caso 02: Banderas de Búsqueda",
    subtitle: "Muelle 14 • Niebla Espesa",
    description: "El testigo vio a un individuo vigilando una tienda de empeños cercana. La radio policial transmitió varias alertas.",
    type: "construction",
    timeLimit: null,
    maxAttempts: null,
    documentTitle: "TRANSCRIPCIÓN DE RADIO POLICIAL",
    sourceText: `CENTRAL DE PATRULLAS:
10:10 - SOSPECHOSO avistado cerca de la tienda de empeños.
10:15 - El sospechoso viste gabardina gris y maletín médico.
10:20 - Perdimos al Sospechoso en el túnel del tranvía.`,
    task: "Captura las 3 menciones a 'sospechoso' ignorando mayúsculas y minúsculas con la bandera 'i'.",
    hint: "Escribe sospechoso y activa la bandera 'i'.",
    recommendedRegex: "sospechoso",
    recommendedFlags: "gi",
    expectedMatches: ["SOSPECHOSO", "sospechoso", "Sospechoso"]
  },
  {
    id: 3,
    tier: 1,
    sceneType: "hotel",
    title: "Caso 03: El Tratado Olvidado",
    subtitle: "Hotel Savoy • Habitación 100",
    description: "En una redada en el Savoy, Vance confisca objetos abandonados, entre ellos un viejo libro de ocultismo: 'El Tratado de los Ecos'.",
    type: "construction",
    timeLimit: null,
    maxAttempts: null,
    documentTitle: "REGISTRO DE INCAUTACIÓN EN HABITACIONES",
    sourceText: `REGISTRO SAVOY:
Habitación 101: Arthur Vance (Apostador)
Habitación 102: Frankie 'Dedos' Miller (Cerrajero)
Habitación 103: Tratado de los Ecos (Grimorio Oculto)
Habitación 108: Personal de limpieza`,
    task: "El conserje asegura que las evidencias clave estaban en las habitaciones 101, 102 y 103. Encuentra los números de esas tres habitaciones.",
    hint: "Combina el prefijo '10' con un rango de corchetes para el dígito final.",
    recommendedRegex: "10[1-3]",
    recommendedFlags: "g",
    expectedMatches: ["101", "102", "103"]
  },
  {
    id: 4,
    tier: 1,
    sceneType: "hotel",
    title: "Caso 04: Calibres de Munición",
    subtitle: "Armería Clandestina de la Banda",
    description: "Los matones de Falcone custodiaban cajas de munición pesada clasificadas por lotes.",
    type: "construction",
    timeLimit: null,
    maxAttempts: null,
    documentTitle: "MANIFIESTO DE ARMERÍA",
    sourceText: `LOTES DE MUNICIÓN:
Lote A: 9mm parabellum
Lote B: .45 ACP
Lote C: .38 Especial
Lote Z: Inocuo`,
    task: "La policía busca los lotes de contrabando clasificados con las letras A, B o C. Extrae únicamente esos lotes.",
    hint: "Usa corchetes para agrupar las opciones de letras permitidas tras la palabra 'Lote '.",
    recommendedRegex: "Lote [ABC]",
    recommendedFlags: "g",
    expectedMatches: ["Lote A", "Lote B", "Lote C"]
  },
  {
    id: 5,
    tier: 1,
    sceneType: "office",
    title: "Caso 05: La Lista de Nombres Tachados",
    subtitle: "Banco Central • Bóveda Subterránea",
    description: "En la caja fuerte del banquero corrupto, Vance descubre llaves y un fajo de billetes con nombres tachados en rojo.",
    type: "construction",
    timeLimit: null,
    maxAttempts: null,
    documentTitle: "LISTA DE CAJAS DE SEGURIDAD",
    sourceText: `BÓVEDA DE FONDOS ILÍCITOS:
KEY-1 (Fondo secreto - Nombres tachados)
KEY-3 (Fondo secreto - Nombres tachados)
KEY-5 (Fondo secreto - Nombres tachados)
KEY-9 (Invalida)
SAFE-0 (Externa)`,
    task: "El guardia reveló que los fondos robados están en las cajas KEY asignadas del 1 al 5. Localiza únicamente los códigos de esas llaves.",
    hint: "Escribe el prefijo 'KEY-' y añade un rango entre corchetes para los números del 1 al 5.",
    recommendedRegex: "KEY-[1-5]",
    recommendedFlags: "g",
    expectedMatches: ["KEY-1", "KEY-3", "KEY-5"]
  },

  // ========================================================
  // TIER 2: OFICIAL DE RONDA (Niveles 6 a 10)
  // Límite de 5 Intentos Máximos. Se introducen negaciones y metacaracteres.
  // ========================================================
  {
    id: 6,
    tier: 2,
    sceneType: "alley",
    title: "Caso 06: La Pista Negada",
    subtitle: "Almacén Abandonado • Perímetro Clínico",
    description: "Furgonetas de la banda merodean los alrededores de los hospitales nocturnos.",
    type: "construction",
    timeLimit: null,
    maxAttempts: 5,
    documentTitle: "AVISTAMIENTOS DE FURGONETAS",
    sourceText: `CÓDIGOS DE PATENTE:
CAR-7
CAR-8
CAR-9
CAR-2 (Descartado)
CAR-1 (Descartado)`,
    task: "El informante asegura que los vehículos de la banda tienen códigos CAR que jamás usan números del 0 al 4. Aísla los vehículos sospechosos.",
    hint: "Utiliza corchetes con el símbolo de negación '^' para excluir los números del 0 al 4.",
    recommendedRegex: "CAR-[^0-4]",
    recommendedFlags: "g",
    expectedMatches: ["CAR-7", "CAR-8", "CAR-9"]
  },
  {
    id: 7,
    tier: 2,
    sceneType: "alley",
    title: "Caso 07: Conmutador de la Morgue",
    subtitle: "Cabina Pública 4B",
    description: "El informante dictó extensiones telefónicas internas que comunican con la morgue y la red clínica.",
    type: "construction",
    timeLimit: null,
    maxAttempts: 5,
    documentTitle: "DIRECTORIO TELEFÓNICO CLANDESTINO",
    sourceText: `DIRECTORIO:
Fiscalía: EXT#401
Comisaría: EXT#911
Club: EXT#882
Línea falsa: EXT#9`,
    task: "El contacto solo atiende extensiones que inician con 'EXT#' y tienen exactamente 3 números. Filtra las líneas válidas.",
    hint: "Combina 'EXT#' con el metarácter de dígito repetido o con un cuantificador de llaves.",
    recommendedRegex: "EXT#\\d{3}",
    recommendedFlags: "g",
    expectedMatches: ["EXT#401", "EXT#911", "EXT#882"]
  },
  {
    id: 8,
    tier: 2,
    sceneType: "hotel",
    title: "Caso 08: Autopsias Anómalas",
    subtitle: "Habitación 404 • Expedientes de la Morgue",
    description: "Los reportes forenses de las víctimas confirman la extirpación quirúrgica de riñones y córneas.",
    type: "construction",
    timeLimit: null,
    maxAttempts: 5,
    documentTitle: "ACTAS FORENSES DE AUTOPSIA",
    sourceText: `REGISTRO FORENSE:
Caso 1: Mutilación de riñón
Caso 2: Extirpación ocular
Caso 3: Sin órganos vitales`,
    task: "Extrae los nombres de expedientes formados por la palabra 'Caso' seguida de su espacio y su número.",
    hint: "Representa el espacio en blanco y el dígito mediante sus metacaracteres abreviados.",
    recommendedRegex: "Caso\\s\\d",
    recommendedFlags: "g",
    expectedMatches: ["Caso 1", "Caso 2", "Caso 3"]
  },
  {
    id: 9,
    tier: 2,
    sceneType: "hotel",
    title: "Caso 09: Extorsión y Saqueo",
    subtitle: "Recepción del Hotel",
    description: "La banda de Falcone exige rescates mientras desvalija las viviendas de los desaparecidos.",
    type: "construction",
    timeLimit: null,
    maxAttempts: 5,
    documentTitle: "DEMANDAS DE RESCATE",
    sourceText: `DEMANDAS DE FALCONE:
Primer pago: $50
Segundo pago: $300
Tercer pago: $15000
No acepto cheques.`,
    task: "Captura todas las sumas de dinero completas en dólares, sin importar cuántos dígitos tengan.",
    hint: "Neutraliza el signo de dólar con barra invertida y añade un cuantificador de una o más repeticiones para los dígitos.",
    recommendedRegex: "\\$\\d+",
    recommendedFlags: "g",
    expectedMatches: ["$50", "$300", "$15000"]
  },
  {
    id: 10,
    tier: 2,
    sceneType: "office",
    title: "Caso 10: Los Cirujanos de Élite",
    subtitle: "Despacho Vance • Correspondencia Cifrada",
    description: "Cartas enviadas a la Dra. Evelyn Cross y al Dr. Miller sobre pacientes de alta alcurnia.",
    type: "construction",
    timeLimit: null,
    maxAttempts: 5,
    documentTitle: "CORRESPONDENCIA MÉDICA CLANDESTINA",
    sourceText: `CARTAS A CIRUJANOS:
Atención de Dr. Miller
Atención de Dra. Vance
Atención de Dr. Smith
Sin título: Jones`,
    task: "Localiza los tratamientos médicos tanto en masculino ('Dr.') como en femenino ('Dra.') con un solo patrón.",
    hint: "Identifica qué letra es opcional y usa el símbolo cuantificador de cero o una repetición.",
    recommendedRegex: "Dra?\\.",
    recommendedFlags: "g",
    expectedMatches: ["Dr.", "Dra.", "Dr."]
  },

  // ========================================================
  // TIER 3: DETECTIVE DE DISTRITO (Niveles 11 a 15)
  // Tiempo límite: 90 segundos + 5 Intentos. Mayor presión.
  // ========================================================
  {
    id: 11,
    tier: 3,
    sceneType: "alley",
    title: "Caso 11: Furgones Frigoríficos (90s)",
    subtitle: "Muelle 14 • Transporte Nocturno",
    description: "¡Los camiones frigoríficos de transporte urgente de órganos están despegando del muelle! Tienes 90 segundos para capturar las matrículas oficiales.",
    type: "construction",
    timeLimit: 90,
    maxAttempts: 5,
    documentTitle: "CONTROL DE SALIDAS EN EL MUELLE",
    sourceText: `FURGONES DETECTADOS:
Furgón A: ABC-1234
Furgón B: XYZ-9876
Camioneta: TAXI-99
Furgón D: MET-5541`,
    task: "¡El vehículo de fuga escapa! Identifica las matrículas oficiales con formato de 3 letras mayúsculas, guion y 4 números.",
    hint: "Combina un rango de letras mayúsculas con llaves para la cantidad y dígitos con llaves tras el guion.",
    recommendedRegex: "[A-Z]{3}-\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["ABC-1234", "XYZ-9876", "MET-5541"]
  },
  {
    id: 12,
    tier: 3,
    sceneType: "alley",
    title: "Caso 12: Contenedores Biológicos",
    subtitle: "Aduana Portuaria • Muelle 7",
    description: "Los contenedores etiquetados con prefijo 'BOX_' contienen frascos con preservantes de tejido humano.",
    type: "construction",
    timeLimit: 90,
    maxAttempts: 5,
    documentTitle: "MANIFIESTO DE CARGA BIOLÓGICA",
    sourceText: `CARGAMENTO ADUANERO:
BOX_01 (Tejido criogenizado)
BOX_44 (Preservante celular)
BOX_88 (Suero fisiológico)
ITEM# (Invalido)`,
    task: "Inspecciona los contenedores de carga y extrae los números de serie que inician con 'BOX_' y tienen dos dígitos.",
    hint: "Escribe el texto inicial fijo y representa los números con el metarácter correspondiente.",
    recommendedRegex: "BOX_\\d{2}",
    recommendedFlags: "g",
    expectedMatches: ["BOX_01", "BOX_44", "BOX_88"]
  },
  {
    id: 13,
    tier: 3,
    sceneType: "hotel",
    title: "Caso 13: Calendario de Cirugías",
    subtitle: "Caja Fuerte del Savoy • Agenda Secreta",
    description: "Fechas registradas en la libreta del intermediario donde se anotaron las operaciones de trasplante.",
    type: "construction",
    timeLimit: 90,
    maxAttempts: 5,
    documentTitle: "CALENDARIO DE TRASPLANTES",
    sourceText: `CITAS QUIRÚRGICAS:
14/03/1947 - Trasplante de córnea (Senador)
22/08/1947 - Reemplazo de riñón (Banquero)
05/11/1947 - Cirugía mayor (Juez)
Ano 1945`,
    task: "Localiza las fechas clave del crimen escritas con formato estándar de día, mes y año de cuatro cifras separadas por barras.",
    hint: "Representa los pares de números y el bloque final de cuatro cifras intercalando las barras.",
    recommendedRegex: "\\d{2}/\\d{2}/\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["14/03/1947", "22/08/1947", "05/11/1947"]
  },
  {
    id: 14,
    tier: 3,
    sceneType: "hotel",
    title: "Caso 14: Los Saqueadores de Hogares",
    subtitle: "Diario del Cerrajero Frankie Miller",
    description: "Frankie anotó en clave los apodos de los miembros de Falcone que allanaban los apartamentos de las víctimas.",
    type: "construction",
    timeLimit: 90,
    maxAttempts: 5,
    documentTitle: "DIARIO CONFIDENCIAL DE FRANKIE",
    sourceText: `INTEGRANTES DEL GRUPO DE SAQUEO:
Clave: topo1 (Cerrajero)
Clave: gato2 (Vigilante)
Clave: lobo9 (Conductor)
Falso: PERRO1`,
    task: "El espía firma sus notas con nombres en clave en minúsculas de 4 letras seguidas de un número. Aísla sus apodos.",
    hint: "Usa un rango de letras minúsculas con cantidad exacta de 4 caracteres y añade un dígito al final.",
    recommendedRegex: "[a-z]{4}\\d",
    recommendedFlags: "g",
    expectedMatches: ["topo1", "gato2", "lobo9"]
  },
  {
    id: 15,
    tier: 3,
    sceneType: "office",
    title: "Caso 15: Transferencias de la Clínica",
    subtitle: "Banco Metropolitano • Cuentas Corrientes",
    description: "Transferencias secretas emitidas por la Clínica Renacer hacia el sindicato criminal de Carmine Falcone.",
    type: "construction",
    timeLimit: 90,
    maxAttempts: 5,
    documentTitle: "LIBRO DE PAGOS A LA MAFIA",
    sourceText: `TRANSFERENCIAS DE LA CLÍNICA:
TX-10029 (Abono por lote)
TX-440192 (Abono por lote)
TX-88310 (Abono por lote)
TX-12 (Demasiado corta)`,
    task: "Audita el libro contable y captura las transferencias que inician con 'TX-' y contienen entre 5 y 6 cifras.",
    hint: "Añade llaves con el rango mínimo y máximo de repeticiones tras el metarácter de dígito.",
    recommendedRegex: "TX-\\d{5,6}",
    recommendedFlags: "g",
    expectedMatches: ["TX-10029", "TX-440192", "TX-88310"]
  },

  // ========================================================
  // TIER 4: BRIGADA ANTINARCÓTICOS (Niveles 16 a 20)
  // Tiempo límite: 80s + 4 Intentos.
  // ¡Se introducen los NIVELES DE DESAFÍO DEL CRIMINAL (Inversos / Criptoanálisis)!
  // ========================================================
  {
    id: 16,
    tier: 4,
    sceneType: "alley",
    title: "Caso 16: La Trampa de Falcone #1",
    subtitle: "Bomba en el Callejón",
    description: "Falcone intentó liquidar a Vance con un artefacto explosivo programado con Regex. ¿Qué códigos activan la detonación?",
    type: "criminal_cipher",
    timeLimit: 80,
    maxAttempts: 4,
    documentTitle: "CIRCUITO TEMPORIZADO DE LA BOMBA",
    criminalRegex: "^BOMB-\\d{3}-[A-Z]$",
    criminalFlags: "m",
    sourceText: `CÓDIGOS DETECTADOS EN EL CIRCUITO:
Linea 1: BOMB-102-X
Linea 2: BOMB-99-A
Linea 3: DETONATOR-001
Linea 4: BOMB-774-Z`,
    question: "El criminal configuró el patrón: ^BOMB-\\d{3}-[A-Z]$. ¿Cuáles líneas coinciden exactamente?",
    options: [
      { id: "opt_a", text: "Solo la Línea 2 (BOMB-99-A)", isCorrect: false, feedback: "Incorrecto: BOMB-99-A solo tiene 2 dígitos (99) y la regla exige 3 dígitos (\\d{3})." },
      { id: "opt_b", text: "Las Líneas 1 y 4 (BOMB-102-X y BOMB-774-Z)", isCorrect: true, feedback: "¡Brillante deducción! Ambas inician con BOMB-, tienen 3 dígitos y terminan en una letra mayúscula." },
      { id: "opt_c", text: "Todas las 4 líneas", isCorrect: false, feedback: "Incorrecto: Ni la línea 2 ni la línea 3 cumplen los 3 dígitos o el prefijo." }
    ]
  },
  {
    id: 17,
    tier: 4,
    sceneType: "alley",
    title: "Caso 17: Suero Inmunosupresor",
    subtitle: "Almacén Clandestino de Falcone",
    description: "Antinarcóticos creía que eran drogas, pero los pesajes en gramos corresponden a suero para evitar el rechazo de los órganos.",
    type: "construction",
    timeLimit: 80,
    maxAttempts: 4,
    documentTitle: "PESAJE DE REACTIVOS DE LABORATORIO",
    sourceText: `INVENTARIO DE CONSERVACIÓN:
Paquete A: 100g
Paquete B: 250g
Paquete C: 500g
Paquete D: 2kg`,
    task: "El pesaje clandestino está etiquetado en gramos con la letra 'g'. Identifica todos los pesos registrados en gramos.",
    hint: "Combina uno o más dígitos con la letra literal de la unidad.",
    recommendedRegex: "\\d+g",
    recommendedFlags: "g",
    expectedMatches: ["100g", "250g", "500g"]
  },
  {
    id: 18,
    tier: 4,
    sceneType: "hotel",
    title: "Caso 18: La Trampa de Falcone #2",
    subtitle: "Habitación 404 • Maletín con Candado",
    description: "El maletín de Falcone contiene las listas de apartamentos saqueados tras desvivir a sus ocupantes. Descifra la clave.",
    type: "criminal_cipher",
    timeLimit: 80,
    maxAttempts: 4,
    documentTitle: "ESQUEMA DE SEGURIDAD DEL MALETÍN",
    criminalRegex: "^[A-Z]{2}\\*\\d{2}\\*[A-Z]{2}$",
    criminalFlags: "",
    sourceText: `CLAVES REGISTRADAS:
Clave 1: NY*99*LA
Clave 2: NYC*100*LA
Clave 3: US-55-UK
Clave 4: TX*12*CA`,
    question: "La regex del candado es ^[A-Z]{2}\\*\\d{2}\\*[A-Z]{2}$. ¿Cuáles claves abren el maletín?",
    options: [
      { id: "opt_a", text: "La Clave 1 y la Clave 4 (NY*99*LA y TX*12*CA)", isCorrect: true, feedback: "¡Excelente! Ambas tienen 2 mayúsculas, asterisco escapado \\*, 2 números, asterisco y 2 mayúsculas." },
      { id: "opt_b", text: "Solo la Clave 2", isCorrect: false, feedback: "Incorrecto: NYC tiene 3 letras y la regla exige exactamente 2 letras [A-Z]{2}." },
      { id: "opt_c", text: "La Clave 3 (US-55-UK)", isCorrect: false, feedback: "Incorrecto: Usa guiones (-) en lugar de asteriscos (*)." }
    ]
  },
  {
    id: 19,
    tier: 4,
    sceneType: "hotel",
    title: "Caso 19: Conexión con la Clínica",
    subtitle: "Recepción Savoy • Intervención Telefónica",
    description: "Llamadas telefónicas entre los lugartenientes de Falcone y la centralita privada de la Clínica Renacer.",
    type: "construction",
    timeLimit: 80,
    maxAttempts: 4,
    documentTitle: "REGISTRO DE LLAMADAS INTERCEPTADAS",
    sourceText: `LLAMADAS A LA CLÍNICA:
Fiscal: 555-1234
Muelle: 555-9081
Policía: 911
Contacto: 555-7744`,
    task: "Localiza los números telefónicos locales de la central telefónica que inician con el prefijo 555 y tienen 4 dígitos.",
    hint: "Combina el prefijo con el guion y el cuantificador exacto para las cifras finales.",
    recommendedRegex: "555-\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["555-1234", "555-9081", "555-7744"]
  },
  {
    id: 20,
    tier: 4,
    sceneType: "office",
    title: "Caso 20: Cuentas Suizas de la Dra. Cross",
    subtitle: "Despacho Vance • Auditoría Financiera",
    description: "Cuentas en Ginebra y Zúrich desde donde magnates pagan fortunas por los trasplantes clandestinos.",
    type: "construction",
    timeLimit: 80,
    maxAttempts: 4,
    documentTitle: "REGISTRO DE CUENTAS EN SUIZA",
    sourceText: `CUENTAS SECRETAS DE LA CLÍNICA:
Ginebra: CH-10928
Zúrich: CH-44910
Berna: CH-88123
Nueva York: US-991`,
    task: "El banquero desvió capitales a cuentas suizas identificadas por el prefijo 'CH-' y 5 cifras. Captura esas cuentas.",
    hint: "Representa el prefijo suizo y fija la longitud numérica a 5 dígitos.",
    recommendedRegex: "CH-\\d{5}",
    recommendedFlags: "g",
    expectedMatches: ["CH-10928", "CH-44910", "CH-88123"]
  },

  // ========================================================
  // TIER 5: INVESTIGADOR DE HOMICIDIOS (Niveles 21 a 25)
  // Tiempo límite: 60s + 4 Intentos. Anclas ^, $ y fronteras \b.
  // ========================================================
  {
    id: 21,
    tier: 5,
    sceneType: "alley",
    title: "Caso 21: El Testimonio de Rob",
    subtitle: "La Coartada Bajo la Lluvia",
    description: "Rob confiesa aterrado que las víctimas del allanamiento tenían citas previas en la Clínica Renacer antes de desaparecer.",
    type: "construction",
    timeLimit: 60,
    maxAttempts: 4,
    documentTitle: "INTERROGATORIO BAJO LA LLUVIA",
    sourceText: `TESTIMONIO DE ROB:
Vi a Rob correr hacia la avenida.
Roberto no estuvo en la escena.
Me robaron el reloj ayer.
Nadie ayudó a Rob en la fuga.`,
    task: "El testigo declaró sobre el sospechoso 'Rob'. Encuentra las menciones a 'Rob' como palabra independiente, sin confundirlo con 'Roberto' ni 'robaron'.",
    hint: "Coloca límites de frontera de palabra antes y después del nombre.",
    recommendedRegex: "\\bRob\\b",
    recommendedFlags: "g",
    expectedMatches: ["Rob", "Rob"]
  },
  {
    id: 22,
    tier: 5,
    sceneType: "alley",
    title: "Caso 22: Desapariciones en Cadena",
    subtitle: "Boletín de la Comisaría Central",
    description: "Aumentan las alertas policiales por desapariciones de personas que acudieron a consultas privadas en la clínica.",
    type: "construction",
    timeLimit: 60,
    maxAttempts: 4,
    documentTitle: "BOLETÍN POLICIAL DE DESAPARECIDOS",
    sourceText: `ALERTA: Paciente desaparecido en el callejón.
AVISO: Calle cerrada por obras.
ALERTA: Furgón no identificado cerca del club.
RUMOR: Se escucharon disparos.`,
    task: "Filtra los boletines oficiales que inician formalmente con 'ALERTA:' al principio del renglón.",
    hint: "Utiliza el ancla de inicio de línea '^' junto con la palabra clave y la bandera multilínea 'm'.",
    recommendedRegex: "^ALERTA:",
    recommendedFlags: "gm",
    expectedMatches: ["ALERTA:", "ALERTA:"]
  },
  {
    id: 23,
    tier: 5,
    sceneType: "hotel",
    title: "Caso 23: El Sello de Clausura [FIN]",
    subtitle: "Habitación 404 • Telegramas Cifrados",
    description: "Los mensajes de los sicarios que confirman las extracciones terminan con la palabra ritual '[FIN]' (segundo sello del destierro).",
    type: "construction",
    timeLimit: 60,
    maxAttempts: 4,
    documentTitle: "TELEGRAMAS DEL SINDICATO",
    sourceText: `Línea de contacto 1 [FIN]
Línea interrumpida por disparos
Transmisión segura completada [FIN]
Mensaje sin confirmar`,
    task: "El espía autentica sus despachos colocando '[FIN]' exactamente al cierre del renglón. Captura esos cierres legítimos.",
    hint: "Recuerda escapar los corchetes literales y usar el ancla de fin de línea '$'.",
    recommendedRegex: "\\[FIN\\]$",
    recommendedFlags: "gm",
    expectedMatches: ["[FIN]", "[FIN]"]
  },
  {
    id: 24,
    tier: 5,
    sceneType: "hotel",
    title: "Caso 24: La Trampa de Falcone #3",
    subtitle: "Caja Fuerte de la Habitación",
    description: "Los sicarios usaban carnés médicos falsos para circular por los hospitales sin levantar sospechas.",
    type: "criminal_cipher",
    timeLimit: 60,
    maxAttempts: 4,
    documentTitle: "REGISTRO DE AGENTES CUESTIONADOS",
    criminalRegex: "^AGENT_\\d{3}_[A-Z]{2}$",
    criminalFlags: "",
    sourceText: `Carné 1: AGENT_007_US
Carné 2: AGENT_99_UK
Carné 3: SPY_881_FR
Carné 4: AGENT_555_ru (en minúscula)`,
    question: "Con la regex ^AGENT_\\d{3}_[A-Z]{2}$, ¿cuál es el único carné aceptado?",
    options: [
      { id: "opt_a", text: "Carné 1: AGENT_007_US", isCorrect: true, feedback: "¡Perfecto! Cumple AGENT_, 3 dígitos (007) y 2 mayúsculas (US)." },
      { id: "opt_b", text: "Carné 2: AGENT_99_UK", isCorrect: false, feedback: "Incorrecto: Solo tiene 2 dígitos (99) y se exigían 3." },
      { id: "opt_c", text: "Carné 4: AGENT_555_ru", isCorrect: false, feedback: "Incorrecto: 'ru' está en minúsculas y se exigían mayúsculas [A-Z]{2}." }
    ]
  },
  {
    id: 25,
    tier: 5,
    sceneType: "office",
    title: "Caso 25: Cámara Frigorífica Subterránea",
    subtitle: "Cerradura Digital de la Bóveda",
    description: "Códigos de 6 caracteres que abren la cámara refrigerada donde reposan los órganos recién extirpados.",
    type: "construction",
    timeLimit: 60,
    maxAttempts: 4,
    documentTitle: "MEMORIA DE LA CÁMARA FRIGORÍFICA",
    sourceText: `CÓDIGOS DE LA CÁMARA:
V12345 (Aceptado)
V99881 (Aceptado)
V77770 (Aceptado)
X99999 (Invalido)`,
    task: "Los códigos de apertura de la bóveda comienzan con la letra 'V' y tienen 5 cifras numéricas. Encuentra los códigos autorizados.",
    hint: "Combina la letra inicial con el metarácter de dígito cuantificado a 5 repeticiones.",
    recommendedRegex: "V\\d{5}",
    recommendedFlags: "g",
    expectedMatches: ["V12345", "V99881", "V77770"]
  },

  // ========================================================
  // TIER 6: FORENSE DE INTELIGENCIA (Niveles 26 a 30)
  // Tiempo límite: 55s + 3 Intentos. Grupos y alternancias.
  // ========================================================
  {
    id: 26,
    tier: 6,
    sceneType: "alley",
    title: "Caso 26: La Fuga de los Cirujanos",
    subtitle: "Pista Clandestina de la Mafia",
    description: "Los cómplices de la Dra. Cross solo huyen en 'Sedan' o 'Avioneta' bimotor. Filtra ambos transportes.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "BITÁCORA DE CONTROL AÉREO",
    sourceText: `TRANSPORTE DE LA RED:
1. Huida en Sedan negro
2. Fuga en Avioneta bimotor
3. Carga en Camión pesado
4. Retorno en Sedan gris`,
    task: "El informante asegura que los cómplices solo huyeron en 'Sedan' o en 'Avioneta'. Filtra únicamente esos dos medios de transporte.",
    hint: "Usa paréntesis con la barra vertical de alternancia para indicar 'uno u otro'.",
    recommendedRegex: "(Sedan|Avioneta)",
    recommendedFlags: "g",
    expectedMatches: ["Sedan", "Avioneta", "Sedan"]
  },
  {
    id: 27,
    tier: 6,
    sceneType: "alley",
    title: "Caso 27: La Trampa de Falcone #4",
    subtitle: "Terminal de Cifrado Mafia",
    description: "Falcone configuró un filtro para encubrir los envíos de órganos bajo la etiqueta de armas y sustancias.",
    type: "criminal_cipher",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "CÓDIGOS DE EMBARQUE INTERCEPTADOS",
    criminalRegex: "^(DROGA|ARMAS)-\\d+-(ALTA|BAJA)$",
    criminalFlags: "m",
    sourceText: `ENVÍOS:
Línea A: ARMAS-500-ALTA
Línea B: DINERO-100-ALTA
Línea C: DROGA-20-BAJA
Línea D: ARMAS-MEDIA`,
    question: "Con la regex ^(DROGA|ARMAS)-\\d+-(ALTA|BAJA)$, ¿qué envíos cumplen el patrón?",
    options: [
      { id: "opt_a", text: "Solo el envío A", isCorrect: false, feedback: "Incorrecto: El envío C también coincide (DROGA-20-BAJA)." },
      { id: "opt_b", text: "Los envíos A y C (ARMAS-500-ALTA y DROGA-20-BAJA)", isCorrect: true, feedback: "¡Excelente! Ambos cumplen la alternativa inicial, los dígitos centrales y la prioridad final." },
      { id: "opt_c", text: "Todos los envíos", isCorrect: false, feedback: "Incorrecto: Ni DINERO ni ARMAS-MEDIA cumplen las reglas." }
    ]
  },
  {
    id: 28,
    tier: 6,
    sceneType: "hotel",
    title: "Caso 28: El Hombre Sin Sombra",
    subtitle: "Grabación Telefónica de la Morgue",
    description: "El testigo tartamudea aterrorizado al relatar cómo vio a un ser de traje oscuro que no proyecta sombra.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "DESGRABACIÓN DE CINTA DE AUDIO",
    sourceText: `AUDIO INTERCEPTADO:
El testigo dijo: muy muy peligroso.
Luego gritó: auxilio auxilio en la sala.
El oficial respondió con calma.`,
    task: "Bajo presión, el testigo tartamudeó y repitió palabras consecutivas. Encuentra los términos duplicados idénticos en la grabación.",
    hint: "Captura una palabra en un grupo con paréntesis y haz referencia a ella con '\\1'.",
    recommendedRegex: "\\b(\\w+)\\s+\\1\\b",
    recommendedFlags: "g",
    expectedMatches: ["muy muy", "auxilio auxilio"]
  },
  {
    id: 29,
    tier: 6,
    sceneType: "hotel",
    title: "Caso 29: Fechas de Rejuvenecimiento",
    subtitle: "Libro de Pacientes Ilustres",
    description: "Fechas registradas en la agenda que marcan las milagrosas recuperaciones de magnates ancianos tras sus trasplantes.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "AGENDA PRIVADA DE LA CLÍNICA",
    sourceText: `FECHAS DE CIRUGÍA:
12/04/1946
28-08-1946
15/10/1947
Ano 1890`,
    task: "El informante utilizó indistintamente barras '/' o guiones '-' para anotar las fechas. Extrae todas las fechas válidas.",
    hint: "Usa corchetes que contengan tanto la barra como el guion como separador de cifras.",
    recommendedRegex: "\\d{2}[/-]\\d{2}[/-]\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["12/04/1946", "28-08-1946", "15/10/1947"]
  },
  {
    id: 30,
    tier: 6,
    sceneType: "office",
    title: "Caso 30: Fondos de la Dra. Cross",
    subtitle: "Servidor Financiero del Banco Central",
    description: "Cuentas corporativas en EE.UU. y Suiza que financian los experimentos biomecánicos del sanatorio.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "LISTA DE FONDOS INTERNACIONALES",
    sourceText: `CUENTAS SECRETAS:
ACC-US-1029 (Nueva York)
ACC-CH-4491 (Ginebra)
ACC-UK-9011 (Londres)
ACC-US-8812 (Miami)`,
    task: "Investiga las cuentas sospechosas de fondos negros radicadas únicamente en Estados Unidos ('US') o Suiza ('CH').",
    hint: "Aplica alternancia en el código de país dentro del formato 'ACC-XX-XXXX'.",
    recommendedRegex: "ACC-(US|CH)-\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["ACC-US-1029", "ACC-CH-4491", "ACC-US-8812"]
  },

  // ========================================================
  // TIER 7: AGENTE ESPECIAL ENCUBIERTO (Niveles 31 a 35)
  // Tiempo límite: 45s + 3 Intentos. Cuantificadores Perezosos (Lazy).
  // ========================================================
  {
    id: 31,
    tier: 7,
    sceneType: "alley",
    title: "Caso 31: Testimonio del Ritual",
    subtitle: "Interrogatorio en el Callejón",
    description: "Declaración judicial donde el testigo confiesa haber presenciado cánticos y figuras oscuras en el sótano de la clínica.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "ACTA JUDICIAL DE DECLARACIÓN",
    sourceText: `DECLARACIÓN DEL ENFERMERO:
El testigo gritó: "¡cuidado con el arma!" y luego "¡corran todos!".`,
    task: "El acta judicial contiene dos frases textuales entre comillas. Aísla cada cita entrecomillada de manera individual.",
    hint: "Usa el cuantificador comodín perezoso añadiendo '?' para que no atrape todo de golpe.",
    recommendedRegex: "\".*?\"",
    recommendedFlags: "g",
    expectedMatches: ["\"¡cuidado con el arma!\"", "\"¡corran todos!\""]
  },
  {
    id: 32,
    tier: 7,
    sceneType: "alley",
    title: "Caso 32: La Trampa de Falcone #5",
    subtitle: "Detonador con Cuenta Regresiva",
    description: "¡Bomba de tiempo de 45 segundos en el túnel! Los criminales configuraron un validador con etiquetas HTML.",
    type: "criminal_cipher",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "CIRCUITO DEL TEMPORIZADOR",
    criminalRegex: "<tag>.*?</tag>",
    criminalFlags: "g",
    sourceText: `DATOS: <tag>CÓDIGO_1</tag> y <tag>CÓDIGO_2</tag>`,
    question: "¿Qué capturará la expresión <tag>.*?</tag> debido al cuantificador perezoso '?'?",
    options: [
      { id: "opt_a", text: "Captura todo de principio a fin como una sola cadena: <tag>CÓDIGO_1</tag> y <tag>CÓDIGO_2</tag>", isCorrect: false, feedback: "Incorrecto: Eso lo haría el cuantificador codicioso (.*), no el perezoso (.*?)." },
      { id: "opt_b", text: "Captura dos coincidencias independientes: '<tag>CÓDIGO_1</tag>' y '<tag>CÓDIGO_2</tag>'", isCorrect: true, feedback: "¡Desactivaste la bomba! El '?' hace que se detenga en el primer </tag> que encuentra." },
      { id: "opt_c", text: "No captura nada", isCorrect: false, feedback: "Incorrecto: Hay dos etiquetas válidas." }
    ]
  },
  {
    id: 33,
    tier: 7,
    sceneType: "hotel",
    title: "Caso 33: Frascos de Tejido Biológico",
    subtitle: "Laboratorio Subterráneo de la Dra. Cross",
    description: "Recipientes de vidrio rotulados entre corchetes que contienen los órganos preservados para los trasplantes.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "REGISTRO DE MUESTRAS EN FRASCOS",
    sourceText: `REGISTROS DEL LABORATORIO:
[PISTA_ALPHA] encontrada en la mesa.
[PISTA_BETA] oculta en el piso.
Texto sin corchetes.`,
    task: "Extrae los nombres en clave de las evidencias que se encuentran encerradas entre corchetes literales.",
    hint: "Escapa los corchetes exteriores y dentro usa una clase negada para el corchete de cierre.",
    recommendedRegex: "\\[[^\\]]+\\]",
    recommendedFlags: "g",
    expectedMatches: ["[PISTA_ALPHA]", "[PISTA_BETA]"]
  },
  {
    id: 34,
    tier: 7,
    sceneType: "hotel",
    title: "Caso 34: Censo de Almas Deudoras",
    subtitle: "Despacho Clandestino de la Clínica",
    description: "Base de datos con las identidades deudoras clasificadas con prefijos sin captura '(?:REF|ID)-\\d{4}'.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "CENSO DE DEUDORES FAUSTIANOS",
    sourceText: `DEUDORES REGISTRADOS:
REF-9988 (Inspeccionado)
ID-1102 (Inspeccionado)
COD-00 (Descartado)`,
    task: "El archivo clasifica las piezas con los identificadores 'REF-' o 'ID-' seguidos de 4 dígitos. Localiza los registros válidos.",
    hint: "Usa un grupo sin captura '(?:...)' para los dos prefijos posibles seguidos de los números.",
    recommendedRegex: "(?:REF|ID)-\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["REF-9988", "ID-1102"]
  },
  {
    id: 35,
    tier: 7,
    sceneType: "office",
    title: "Caso 35: Facturas de Rejuvenecimiento",
    subtitle: "Balanza de la Dra. Cross",
    description: "Tarifas astronómicas en dólares pagadas por la élite por extender sus vidas a costa de víctimas inocentes.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "BALANZA CONTABLE DE TRASPLANTES",
    sourceText: `TRANSACCIONES DE TRASPLANTE:
Cobro: $120.50
Depósito: $500.00
Comisión: $15.75
Sin centavos: $99`,
    task: "La fiscalía necesita auditar los pagos que incluyan centavos exactos (dos decimales tras el punto).",
    hint: "Combina el símbolo de dólar escapado, uno o más dígitos, el punto decimal escapado y dos dígitos de centavos.",
    recommendedRegex: "\\$\\d+\\.\\d{2}",
    recommendedFlags: "g",
    expectedMatches: ["$120.50", "$500.00", "$15.75"]
  },

  // ========================================================
  // TIER 8: UNIDAD DE DELITOS MAYORES (Niveles 36 a 40)
  // Tiempo límite: 40s + 3 Intentos. Lookaheads y Lookbehinds.
  // ========================================================
  {
    id: 36,
    tier: 8,
    sceneType: "alley",
    title: "Caso 36: Cajas con Dinamita",
    subtitle: "Almacén de la Mafia • Demolición",
    description: "Falcone ha colocado dinamita en las cajas de suministros para volar las pruebas forenses.",
    type: "construction",
    timeLimit: 40,
    maxAttempts: 3,
    documentTitle: "INSPECCIÓN DE CARGAS EXPLOSIVAS",
    sourceText: `BODEGA AMENAZADA:
Caja PELIGRO (No tocar)
Caja SEGURA (Verificada)
Caja PELIGRO (Dinamita)`,
    task: "Encuentra la palabra 'Caja' únicamente cuando contenga explosivos (seguida de la etiqueta 'PELIGRO'), sin incluir dicha etiqueta en la coincidencia.",
    hint: "Aplica un lookahead positivo (?=...) para verificar el texto posterior sin consumirlo.",
    recommendedRegex: "Caja(?=\\sPELIGRO)",
    recommendedFlags: "g",
    expectedMatches: ["Caja", "Caja"]
  },
  {
    id: 37,
    tier: 8,
    sceneType: "alley",
    title: "Caso 37: Escape por el Canal",
    subtitle: "Puerto Marítimo de la Bahía",
    description: "Los cirujanos intentan huir en buques no militares antes de que llegue la Guardia Nacional.",
    type: "construction",
    timeLimit: 40,
    maxAttempts: 3,
    documentTitle: "CONTROL DE EMBARCACIONES EN FUGA",
    sourceText: `PUERTO:
BARCO CARGA
BARCO MILITAR (Prohibido)
BARCO PESQUERO`,
    task: "Identifica las embarcaciones civiles capturando 'BARCO' solo cuando NO corresponda a una unidad 'MILITAR'.",
    hint: "Utiliza un lookahead negativo (?!...) para descartar el término prohibido a continuación.",
    recommendedRegex: "BARCO(?!\\sMILITAR)",
    recommendedFlags: "g",
    expectedMatches: ["BARCO", "BARCO"]
  },
  {
    id: 38,
    tier: 8,
    sceneType: "hotel",
    title: "Caso 38: La Trampa de la Dra. Cross #6",
    subtitle: "Sanctum Privado de la Dra. Cross",
    description: "El despacho de la doctora está blindado con un validador complejo de contraseña con lookaheads.",
    type: "criminal_cipher",
    timeLimit: 40,
    maxAttempts: 3,
    documentTitle: "VALIDADOR DEL SANCTUM MÉDICO",
    criminalRegex: "^(?=.*[A-Z])(?=.*\\d).{6,}$",
    criminalFlags: "",
    sourceText: `CLAVES CANDIDATAS:
Clave A: secreto1 (Sin mayúscula)
Clave B: SECRETO (Sin número)
Clave C: Noir42 (6 letras/números, al menos 1 mayúscula y 1 número)
Clave D: Ab1 (Muy corta)`,
    question: "La regex exige: al menos 1 mayúscula, al menos 1 número y mínimo 6 caracteres. ¿Cuál clave es válida?",
    options: [
      { id: "opt_a", text: "Clave C: Noir42", isCorrect: true, feedback: "¡Exacto! Cumple los dos lookaheads positivos y tiene 6 caracteres de longitud." },
      { id: "opt_b", text: "Clave A: secreto1", isCorrect: false, feedback: "Incorrecto: Le falta una letra mayúscula." },
      { id: "opt_c", text: "Clave B: SECRETO", isCorrect: false, feedback: "Incorrecto: No tiene ningún número." }
    ]
  },
  {
    id: 39,
    tier: 8,
    sceneType: "hotel",
    title: "Caso 39: El Libro de Sangre de Malphas",
    subtitle: "Caja Oculta • Contratos Fausto",
    description: "Libro de registro arcaico donde se anotaron los pagos de sangre del pacto.",
    type: "construction",
    timeLimit: 40,
    maxAttempts: 3,
    documentTitle: "RECIBOS DE SANGRE Y TRIBUTO",
    sourceText: `CONTABILIDAD DEL PACTO:
PAGO: 500
MULTA: 100
PAGO: 1200
COBRO: 80`,
    task: "Extrae únicamente los montos numéricos de los recibos que correspondan a un 'PAGO: ', sin incluir la palabra del concepto.",
    hint: "Aplica una aserción retrospectiva positiva (?<=...) para comprobar lo que precede al número.",
    recommendedRegex: "(?<=PAGO:\\s)\\d+",
    recommendedFlags: "g",
    expectedMatches: ["500", "1200"]
  },
  {
    id: 40,
    tier: 8,
    sceneType: "office",
    title: "Caso 40: Servidores de la Clínica Renacer",
    subtitle: "Terminal Central de la Clínica",
    description: "Códigos de autenticación para ingresar a los servidores maestros antes de que se inicie el protocolo de autodestrucción.",
    type: "construction",
    timeLimit: 40,
    maxAttempts: 3,
    documentTitle: "TERMINAL MAESTRA DE CONTROL",
    sourceText: `CÓDIGOS DE ACCESO:
KEY_8841_OK
KEY_1029_OK
KEY_99_OK (Corta)
PASS_4412_OK`,
    task: "Verifica los códigos de validación de seguridad que inician con 'KEY_', tienen 4 dígitos y finalizan con el estado '_OK'.",
    hint: "Estructura el prefijo, la cantidad exacta de números entre llaves y el sufijo de confirmación.",
    recommendedRegex: "KEY_\\d{4}_OK",
    recommendedFlags: "g",
    expectedMatches: ["KEY_8841_OK", "KEY_1029_OK"]
  },

  // ========================================================
  // TIER 9: AUDITORÍA ANTITERRORISTA (Niveles 41 a 45)
  // Tiempo límite: 35s + 3 Intentos. Detección de ReDoS y Optimización.
  // ========================================================
  {
    id: 41,
    tier: 9,
    sceneType: "alley",
    title: "Caso 41: El Sabotaje ReDoS del Demonio",
    subtitle: "Servidores Centrales Colapsados",
    description: "Una fuerza sobrenatural introdujo un ataque ReDoS ^(a+)+$ en el sistema para colapsar las redes de la ciudad.",
    type: "criminal_cipher",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "LOG DEL SERVIDOR CAÍDO",
    criminalRegex: "^(a+)+$",
    criminalFlags: "",
    sourceText: `TEXTO DE PRUEBA:
aaaaaaaaaaaaaaaaaaaaaaaaaaaaab (falla al final)`,
    question: "¿Por qué la regex ^(a+)+$ congela el procesador cuando la cadena falla al final?",
    options: [
      { id: "opt_a", text: "Porque contiene un error de sintaxis y no compila", isCorrect: false, feedback: "Incorrecto: La sintaxis es válida, el problema es su rendimiento." },
      { id: "opt_b", text: "Por 'Catastrophic Backtracking': las combinaciones de repetición crecen exponencialmente O(2^N) intentando hacer coincidir la 'b' final", isCorrect: true, feedback: "¡Deducción de élite! Es un ataque de denegación de servicio (ReDoS) clásico." },
      { id: "opt_c", text: "Porque los paréntesis están invertidos", isCorrect: false, feedback: "Incorrecto: No hay error de paréntesis." }
    ]
  },
  {
    id: 42,
    tier: 9,
    sceneType: "alley",
    title: "Caso 42: Parche Lineal de Vance",
    subtitle: "Reactivación de Servidores",
    description: "Vance reescribe el algoritmo de autenticación de forma lineal para restablecer las alarmas antes de la detonación.",
    type: "construction",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "PARCHE DE CÓDIGO FORENSE",
    sourceText: `CADENAS A VERIFICAR:
TOKEN_ALPHA_99
TOKEN_BETA_10
TOKEN_GAMMA_44`,
    task: "Construye una regla eficiente para verificar los tokens compuestos por el prefijo 'TOKEN_', letras mayúsculas y dos números.",
    hint: "Evita anidar cuantificadores; utiliza un rango de letras mayúsculas seguido del cuantificador numérico exacto.",
    recommendedRegex: "TOKEN_[A-Z]+_\\d{2}",
    recommendedFlags: "g",
    expectedMatches: ["TOKEN_ALPHA_99", "TOKEN_BETA_10", "TOKEN_GAMMA_44"]
  },
  {
    id: 43,
    tier: 9,
    sceneType: "hotel",
    title: "Caso 43: Orden de Cosecha de Almas",
    subtitle: "Terminal Diplomática",
    description: "Correos electrónicos intervenidos que autorizan la entrega de deudores para su intervención quirúrgica.",
    type: "construction",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "BANDEJA DIPLOMÁTICA INTERCEPTADA",
    sourceText: `CONTACTOS DE LA RED:
agente@embajada.com
informante@safe.org
invalido@@mail
espia@muelle.com`,
    task: "Filtra las direcciones de correo electrónico oficiales con extensiones '.com' o '.org' y descarta las direcciones malformadas.",
    hint: "Combina el identificador, el símbolo arroba, el dominio y una alternancia para las dos extensiones posibles escapando el punto.",
    recommendedRegex: "[a-z]+@[a-z]+\\.(com|org)",
    recommendedFlags: "g",
    expectedMatches: ["agente@embajada.com", "informante@safe.org", "espia@muelle.com"]
  },
  {
    id: 44,
    tier: 9,
    sceneType: "hotel",
    title: "Caso 44: La Trampa del Criminal #7",
    subtitle: "Firewall del Búnker Subterráneo",
    description: "La regla de firewall del búnker contiene una vulnerabilidad que delata la dirección IP de la cámara de invocación.",
    type: "criminal_cipher",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "REGLA DE FIREWALL DEFECTUOSA",
    criminalRegex: "^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$",
    criminalFlags: "",
    sourceText: `IPS INGRESADAS:
1) 192.168.1.1
2) 999.888.777.666
3) 10.0.0.1`,
    question: "¿Cuál de estas IPs falsas es aceptada por la regex debido a que \\d{1,3} no comprueba el rango 0-255?",
    options: [
      { id: "opt_a", text: "999.888.777.666", isCorrect: true, feedback: "¡Correcto! \\d{1,3} permite números hasta 999, violando el límite de 255 de una IP." },
      { id: "opt_b", text: "192.168.1.1", isCorrect: false, feedback: "Incorrecto: Esa es una IP totalmente válida." },
      { id: "opt_c", text: "Ninguna", isCorrect: false, feedback: "Incorrecto: 999.888.777.666 pasa el filtro erróneamente." }
    ]
  },
  {
    id: 45,
    tier: 9,
    sceneType: "office",
    title: "Caso 45: Detonadores de TNT en los Cimientos",
    subtitle: "Sótano de la Clínica Renacer",
    description: "Falcone ha cebado los cimientos del hospital con cargas de TNT. Desactiva los detonadores activos antes de que exploten.",
    type: "construction",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "MANIFIESTO DE DETONADORES ACTIVOS",
    sourceText: `CARGAS DE TNT ACTIVAS:
TNT-8891-A (Activo)
TNT-1024-B (Activo)
TNT-9910-Z (Desactivado)
C4-001-A (Otro tipo)`,
    task: "Localiza los detonadores activos de TNT compuestos por 4 dígitos y terminados en las frecuencias de activación 'A' o 'B'.",
    hint: "Estructura 'TNT-', cuatro números y corchetes con las letras de frecuencia autorizadas.",
    recommendedRegex: "TNT-\\d{4}-[AB]",
    recommendedFlags: "g",
    expectedMatches: ["TNT-8891-A", "TNT-1024-B"]
  },

  // ========================================================
  // TIER 10: COMISIONADO MAESTRO FORENSE (Niveles 46 a 50)
  // Tiempo límite: 30s + 2 Intentos. Dificultad Máxima y Examen Maestro.
  // ========================================================
  {
    id: 46,
    tier: 10,
    sceneType: "alley",
    title: "Caso 46: Fuga de Camiones Frigoríficos (30s)",
    subtitle: "Batida en los Muelles de Carga",
    description: "¡Solo tienes 30 segundos y 2 vidas! Los últimos camiones con órganos extraídos están escapando.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "RADAR PORTUARIO DE ALTA VELOCIDAD",
    sourceText: `VEHÍCULOS EN FUGA:
TRUCK-401-X
TRUCK-889-Z
CAR-112-A
TRUCK-002-B`,
    task: "¡Redada contrarreloj! Identifica los camiones de escape matriculados con código 'TRUCK-', 3 números y una letra mayúscula.",
    hint: "Combina el prefijo del camión con 3 cifras y una clase de letra mayúscula.",
    recommendedRegex: "TRUCK-\\d{3}-[A-Z]",
    recommendedFlags: "g",
    expectedMatches: ["TRUCK-401-X", "TRUCK-889-Z", "TRUCK-002-B"]
  },
  {
    id: 47,
    tier: 10,
    sceneType: "alley",
    title: "Caso 47: El C4 del Capo Falcone",
    subtitle: "El Maletín con C4 en la Bóveda",
    description: "Carmine Falcone activa su último detonador de C4 para inmolarse y llevarse el secreto a la tumba.",
    type: "criminal_cipher",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "CIRCUITO DEL DETONADOR DE C4",
    criminalRegex: "^(?:ALPHA|BETA)_\\d{4}_(?:WIN|END)$",
    criminalFlags: "m",
    sourceText: `SEÑALES DETECTADAS:
1: ALPHA_9941_WIN
2: GAMMA_1102_END
3: BETA_8820_END
4: ALPHA_12_WIN`,
    question: "¿Cuáles señales coinciden con el detonador del capo?",
    options: [
      { id: "opt_a", text: "Señales 1 y 3 (ALPHA_9941_WIN y BETA_8820_END)", isCorrect: true, feedback: "¡DESACTIVASTE EL C4! Cumplen ALPHA/BETA, 4 dígitos y WIN/END." },
      { id: "opt_b", text: "Solo la Señal 2", isCorrect: false, feedback: "Incorrecto: GAMMA no está en el grupo permitido (ALPHA|BETA)." },
      { id: "opt_c", text: "Todas las señales", isCorrect: false, feedback: "Incorrecto: La señal 4 solo tiene 2 dígitos (12)." }
    ]
  },
  {
    id: 48,
    tier: 10,
    sceneType: "hotel",
    title: "Caso 48: Runas de Sangre en el Espejo",
    subtitle: "Cámara de Invocación • Espejo Empañado",
    description: "Runas rituales dejadas en el espejo por donde se manifiesta Malphas. Vance busca los renglones cifrados.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "INSCRIPCIÓN RITUAL EN EL ESPEJO",
    sourceText: `#CLAVE_42
TEXTO NORMAL
#SECRETO_99
#INVAL_X`,
    task: "Encuentra los renglones cifrados completos que comienzan con el símbolo '#' y concluyen con dos dígitos numéricos.",
    hint: "Combina anclas de inicio y fin de línea con la bandera multilínea 'm'.",
    recommendedRegex: "^#.+_\\d{2}$",
    recommendedFlags: "gm",
    expectedMatches: ["#CLAVE_42", "#SECRETO_99"]
  },
  {
    id: 49,
    tier: 10,
    sceneType: "hotel",
    title: "Caso 49: El Conspirador Supremo",
    subtitle: "Libreta del Sindicato Internacional",
    description: "Cuentas bancarias de la red criminal mayor que conecta la clínica con testaferros en todo el mundo.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "LIBRETA DEL JEFE DE MAFIA",
    sourceText: `FONDOS SECRETOS DEL PACTO:
ACC-CH-9910-A
ACC-US-4402-B
ACC-UK-12-Z (Inválida)
ACC-FR-8812-C`,
    task: "Localiza las cuentas de la mafia internacional compuestas por el prefijo 'ACC-', 2 letras de país, 4 dígitos y una letra de control.",
    hint: "Define las secciones intermedias con sus longitudes exactas respetando los guiones separadores.",
    recommendedRegex: "ACC-[A-Z]{2}-\\d{4}-[A-Z]",
    recommendedFlags: "g",
    expectedMatches: ["ACC-CH-9910-A", "ACC-US-4402-B", "ACC-FR-8812-C"]
  },
  {
    id: 50,
    tier: 10,
    sceneType: "office",
    title: "Caso 50: El Destierro de Malphas",
    subtitle: "Bóveda Clandestina de la Clínica Renacer",
    description: "¡El clímax final! Vance abre el arcón arcano con la combinación que destruye el contrato de Malphas y anula el pacto para siempre.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "ARCÓN DEL CONTRATO PRIMIGENIO",
    sourceText: `CÓDIGOS FINALES DEL CONJURO:
MASTER_KEY_AB8899ZZ (Combinación Alfa)
MASTER_KEY_7741KK99 (Combinación Beta)
KEY_CERO_00000000 (Falsa)
MASTER_KEY_123 (Corta)`,
    task: "¡El caso definitivo! Abre la caja fuerte maestra localizando las llaves de seguridad que inician con 'MASTER_KEY_' y tienen exactamente 8 caracteres alfanuméricos.",
    hint: "Combina el prefijo fijo con una clase alfanumérica y un cuantificador exacto de 8 caracteres.",
    recommendedRegex: "MASTER_KEY_[A-Z0-9]{8}",
    recommendedFlags: "g",
    expectedMatches: ["MASTER_KEY_AB8899ZZ", "MASTER_KEY_7741KK99"]
  }
];
