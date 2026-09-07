/**
 * Base de datos completa de los 100 Niveles de 'Regex: The Crime'
 * Estructurados en 10 Tiers de Dificultad (10 niveles por Tier)
 * Cubre los 5 Actos de la Historia y los 6 Escenarios 3D interactivos:
 * alley, hotel, office, morgue, docks, sanctuary.
 */

export const TIERS = [
  { id: 1, name: "Tier 1: Recluta de Patrulla", levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], timeLimit: null, maxAttempts: null, badge: "⭐" },
  { id: 2, name: "Tier 2: Oficial de Ronda", levels: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], timeLimit: 90, maxAttempts: 5, badge: "⭐⭐" },
  { id: 3, name: "Tier 3: Detective de Distrito", levels: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], timeLimit: 80, maxAttempts: 5, badge: "⭐⭐⭐" },
  { id: 4, name: "Tier 4: Brigada de Delitos Especiales", levels: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40], timeLimit: 75, maxAttempts: 4, badge: "🎖️" },
  { id: 5, name: "Tier 5: Investigador de Homicidios", levels: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50], timeLimit: 65, maxAttempts: 4, badge: "🎖️🎖️" },
  { id: 6, name: "Tier 6: Forense de Inteligencia", levels: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60], timeLimit: 55, maxAttempts: 3, badge: "🎖️🎖️🎖️" },
  { id: 7, name: "Tier 7: Agente Especial Encubierto", levels: [61, 62, 63, 64, 65, 66, 67, 68, 69, 70], timeLimit: 50, maxAttempts: 3, badge: "🏅" },
  { id: 8, name: "Tier 8: Unidad de Delitos Mayores", levels: [71, 72, 73, 74, 75, 76, 77, 78, 79, 80], timeLimit: 45, maxAttempts: 3, badge: "🏅🏅" },
  { id: 9, name: "Tier 9: Auditoría Antiterrorista", levels: [81, 82, 83, 84, 85, 86, 87, 88, 89, 90], timeLimit: 35, maxAttempts: 3, badge: "🏅🏅🏅" },
  { id: 10, name: "Tier 10: Comisionado Maestro Forense", levels: [91, 92, 93, 94, 95, 96, 97, 98, 99, 100], timeLimit: 30, maxAttempts: 2, badge: "🏆" }
];

export const ALL_LEVELS = [
  // ========================================================
  // TIER 1: RECLUTA DE PATRULLA (Niveles 1 a 10) - Acto I
  // Sin límite de tiempo. Fundamentos, literales, flags y clases.
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
    sceneType: "alley",
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
    sceneType: "alley",
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
    sceneType: "alley",
    title: "Caso 05: Fondos del Sector Primario",
    subtitle: "Banco Central • Bóveda de Préstamos",
    description: "El banquero corrupto ocultó llaves de cajas de seguridad numeradas del 1 al 5.",
    type: "construction",
    timeLimit: null,
    maxAttempts: null,
    documentTitle: "LISTA DE CAJAS DE SEGURIDAD",
    sourceText: `BÓVEDA DE FONDOS ILÍCITOS:
KEY-1 (Fondo secreto)
KEY-3 (Fondo secreto)
KEY-5 (Fondo secreto)
KEY-9 (Invalida)
SAFE-0 (Externa)`,
    task: "El guardia reveló que los fondos están en las cajas KEY asignadas del 1 al 5. Localiza únicamente los códigos de esas llaves.",
    hint: "Escribe el prefijo 'KEY-' y añade un rango entre corchetes para los números del 1 al 5.",
    recommendedRegex: "KEY-[1-5]",
    recommendedFlags: "g",
    expectedMatches: ["KEY-1", "KEY-3", "KEY-5"]
  },
  {
    id: 6,
    tier: 1,
    sceneType: "alley",
    title: "Caso 06: La Pista Negada",
    subtitle: "Alrededores de la Clínica • 03:00 AM",
    description: "Furgonetas de la banda merodean los alrededores de los hospitales nocturnos.",
    type: "construction",
    timeLimit: null,
    maxAttempts: null,
    documentTitle: "AVISTAMIENTOS DE FURGONETAS",
    sourceText: `CÓDIGOS DE PATENTE:
CAR-7
CAR-8
CAR-9
CAR-2 (Descartado)
CAR-1 (Descartado)\n\nEl viento soplaba friamente en la calle principal.`,
    task: "El informante asegura que los vehículos de la banda tienen códigos CAR que jamás usan números del 0 al 4. Aísla los vehículos sospechosos.",
    hint: "Utiliza corchetes con el símbolo de negación '^' para excluir los números del 0 al 4.",
    recommendedRegex: "CAR-[^0-4]",
    recommendedFlags: "g",
    expectedMatches: ["CAR-7", "CAR-8", "CAR-9"]
  },
  {
    id: 7,
    tier: 1,
    sceneType: "alley",
    title: "Caso 07: Conmutador de la Morgue",
    subtitle: "Cabina Pública 4B",
    description: "El informante dictó extensiones telefónicas internas que comunican con la morgue y la red clínica.",
    type: "construction",
    timeLimit: null,
    maxAttempts: null,
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
    tier: 1,
    sceneType: "alley",
    title: "Caso 08: Autopsias Anómalas",
    subtitle: "Morgue del Distrito • Mesa Central",
    description: "Los reportes forenses de las víctimas confirman la extirpación quirúrgica de riñones y córneas.",
    type: "construction",
    timeLimit: null,
    maxAttempts: null,
    documentTitle: "ACTAS FORENSES DE AUTOPSIA",
    sourceText: `REGISTRO FORENSE:
Caso 1: Mutilación de riñón
Caso 2: Extirpación ocular
Caso 3: Sin órganos vitales\n\nNadie parecía notar el rastro dejado en el asfalto mojado.`,
    task: "Extrae los nombres de expedientes formados por la palabra 'Caso' seguida de su espacio y su número.",
    hint: "Representa el espacio en blanco y el dígito mediante sus metacaracteres abreviados.",
    recommendedRegex: "Caso\\s\\d",
    recommendedFlags: "g",
    expectedMatches: ["Caso 1", "Caso 2", "Caso 3"]
  },
  {
    id: 9,
    tier: 1,
    sceneType: "alley",
    title: "Caso 09: Extorsión y Saqueo",
    subtitle: "Recepción del Hotel Savoy",
    description: "La banda de Falcone exige rescates mientras desvalija las viviendas de los desaparecidos.",
    type: "construction",
    timeLimit: null,
    maxAttempts: null,
    documentTitle: "DEMANDAS DE RESCATE",
    sourceText: `DEMANDAS DE FALCONE:
Primer pago: $50
Segundo pago: $300
Tercer pago: $15000
No acepto cheques.\n\nEl vigilante hacía su ronda alumbrando con una linterna gastada.`,
    task: "Captura todas las sumas de dinero completas en dólares, sin importar cuántos dígitos tengan.",
    hint: "Neutraliza el signo de dólar con barra invertida y añade un cuantificador de una o más repeticiones para los dígitos.",
    recommendedRegex: "\\$\\d+",
    recommendedFlags: "g",
    expectedMatches: ["$50", "$300", "$15000"]
  },
  {
    id: 10,
    tier: 1,
    sceneType: "alley",
    title: "Caso 10: La Lista de Nombres Tachados",
    subtitle: "Caja Fuerte del Banquero • Nombres en Rojo",
    description: "Vance encuentra la lista de clientes con nombres tachados en rojo y cartas dirigidas a la Dra. Cross y el Dr. Miller.",
    type: "construction",
    timeLimit: null,
    maxAttempts: null,
    documentTitle: "CORRESPONDENCIA MÉDICA CLANDESTINA",
    sourceText: `Un coche negro aceleró y dobló la esquina rápidamente.\n\nCARTAS A CIRUJANOS:
Atención de Dr. Miller
Atención de Dra. Cross
Atención de Dr. Smith
Sin título: Jones\n\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.`,
    task: "Localiza los tratamientos médicos tanto en masculino ('Dr.') como en femenino ('Dra.') con un solo patrón.",
    hint: "Identifica qué letra es opcional y usa el símbolo cuantificador de cero o una repetición.",
    recommendedRegex: "Dra?\\.",
    recommendedFlags: "g",
    expectedMatches: ["Dr.", "Dra.", "Dr."]
  },

  // ========================================================
  // TIER 2: OFICIAL DE RONDA (Niveles 11 a 20) - Acto II
  // Tiempo: 90s + 5 Vidas. Furgones, refrigeración y desvíos.
  // ========================================================
  {
    id: 11,
    tier: 2,
    sceneType: "hotel",
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
    tier: 2,
    sceneType: "hotel",
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
    tier: 2,
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
    tier: 2,
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
    tier: 2,
    sceneType: "hotel",
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
  {
    id: 16,
    tier: 2,
    sceneType: "hotel",
    title: "Caso 16: La Trampa de Falcone #1",
    subtitle: "Bomba en el Callejón",
    description: "Falcone intentó liquidar a Vance con un artefacto explosivo programado con Regex. ¿Qué códigos activan la detonación?",
    type: "criminal_cipher",
    timeLimit: 90,
    maxAttempts: 5,
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
    tier: 2,
    sceneType: "hotel",
    title: "Caso 17: Suero Inmunosupresor",
    subtitle: "Laboratorio Clandestino de Falcone",
    description: "Antinarcóticos creía que eran drogas, pero los pesajes en gramos corresponden a suero para evitar el rechazo de los órganos.",
    type: "construction",
    timeLimit: 90,
    maxAttempts: 5,
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
    tier: 2,
    sceneType: "hotel",
    title: "Caso 18: La Trampa de Falcone #2",
    subtitle: "Habitación 404 • Maletín con Candado",
    description: "El maletín de Falcone contiene las listas de apartamentos saqueados tras desvivir a sus ocupantes. Descifra la clave.",
    type: "criminal_cipher",
    timeLimit: 90,
    maxAttempts: 5,
    documentTitle: "ESQUEMA DE SEGURIDAD DEL MALETÍN",
    criminalRegex: "^[A-Z]{2}\\*\\d{2}\\*[A-Z]{2}$",
    criminalFlags: "",
    sourceText: `CLAVES REGISTRADAS:
Clave 1: NY*99*LA
Clave 2: NYC*100*LA
Clave 3: US-55-UK
Clave 4: TX*12*CA\n\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nUn archivo polvoriento reposaba sobre el escritorio.`,
    question: "La regex del candado es ^[A-Z]{2}\\*\\d{2}\\*[A-Z]{2}$. ¿Cuáles claves abren el maletín?",
    options: [
      { id: "opt_a", text: "La Clave 1 y la Clave 4 (NY*99*LA y TX*12*CA)", isCorrect: true, feedback: "¡Excelente! Ambas tienen 2 mayúsculas, asterisco escapado \\*, 2 números, asterisco y 2 mayúsculas." },
      { id: "opt_b", text: "Solo la Clave 2", isCorrect: false, feedback: "Incorrecto: NYC tiene 3 letras y la regla exige exactamente 2 letras [A-Z]{2}." },
      { id: "opt_c", text: "La Clave 3 (US-55-UK)", isCorrect: false, feedback: "Incorrecto: Usa guiones (-) en lugar de asteriscos (*)." }
    ]
  },
  {
    id: 19,
    tier: 2,
    sceneType: "hotel",
    title: "Caso 19: Conexión con la Clínica",
    subtitle: "Recepción Savoy • Intervención Telefónica",
    description: "Llamadas telefónicas entre los lugartenientes de Falcone y la centralita privada de la Clínica Renacer.",
    type: "construction",
    timeLimit: 90,
    maxAttempts: 5,
    documentTitle: "REGISTRO DE LLAMADAS INTERCEPTADAS",
    sourceText: `El olor a café rancio inundaba la oficina del investigador.\n\nLLAMADAS A LA CLÍNICA:
Fiscal: 555-1234
Muelle: 555-9081
Policía: 911
Contacto: 555-7744\nNadie se atrevía a caminar por ese sector después del anochecer.`,
    task: "Localiza los números telefónicos locales de la central telefónica que inician con el prefijo 555 y tienen 4 dígitos.",
    hint: "Combina el prefijo con el guion y el cuantificador exacto para las cifras finales.",
    recommendedRegex: "555-\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["555-1234", "555-9081", "555-7744"]
  },
  {
    id: 20,
    tier: 2,
    sceneType: "hotel",
    title: "Caso 20: Cuentas Suizas de la Dra. Cross",
    subtitle: "Despacho Vance • Auditoría Financiera",
    description: "Cuentas en Ginebra y Zúrich desde donde magnates pagan fortunas por los trasplantes clandestinos.",
    type: "construction",
    timeLimit: 90,
    maxAttempts: 5,
    documentTitle: "REGISTRO DE CUENTAS EN SUIZA",
    sourceText: `El semáforo parpadeaba en amarillo sin que nadie lo respetara.\nUn coche negro aceleró y dobló la esquina rápidamente.\n\nCUENTAS SECRETAS DE LA CLÍNICA:
Ginebra: CH-10928
Zúrich: CH-44910
Berna: CH-88123
Nueva York: US-991\n\nLas cajas apiladas formaban un laberinto casi impenetrable.`,
    task: "El banquero desvió capitales a cuentas suizas identificadas por el prefijo 'CH-' y 5 cifras. Captura esas cuentas.",
    hint: "Representa el prefijo suizo y fija la longitud numérica a 5 dígitos.",
    recommendedRegex: "CH-\\d{5}",
    recommendedFlags: "g",
    expectedMatches: ["CH-10928", "CH-44910", "CH-88123"]
  },

  // ========================================================
  // TIER 3: DETECTIVE DE DISTRITO (Niveles 21 a 30) - Acto III
  // Tiempo: 80s + 5 Vidas. Fronteras de palabra, anclas y cierres.
  // ========================================================
  {
    id: 21,
    tier: 3,
    sceneType: "docks",
    title: "Caso 21: El Testimonio de Rob",
    subtitle: "La Coartada Bajo la Lluvia",
    description: "Rob confiesa aterrado que las víctimas del allanamiento tenían citas previas en la Clínica Renacer antes de desaparecer.",
    type: "construction",
    timeLimit: 80,
    maxAttempts: 5,
    documentTitle: "INTERROGATORIO BAJO LA LLUVIA",
    sourceText: `Gotas de lluvia golpeaban incesantemente el cristal de la ventana.\nTESTIMONIO DE ROB:
Vi a Rob correr hacia la avenida.
Roberto no estuvo en la escena.
Me robaron el reloj ayer.
Nadie ayudó a Rob en la fuga.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.`,
    task: "El testigo declaró sobre el sospechoso 'Rob'. Encuentra las menciones a 'Rob' como palabra independiente, sin confundirlo con 'Roberto' ni 'robaron'.",
    hint: "Coloca límites de frontera de palabra antes y después del nombre.",
    recommendedRegex: "\\bRob\\b",
    recommendedFlags: "g",
    expectedMatches: ["Rob", "Rob"]
  },
  {
    id: 22,
    tier: 3,
    sceneType: "docks",
    title: "Caso 22: Desapariciones en Cadena",
    subtitle: "Boletín de la Comisaría Central",
    description: "Aumentan las alertas policiales por desapariciones de personas que acudieron a consultas privadas en la clínica.",
    type: "construction",
    timeLimit: 80,
    maxAttempts: 5,
    documentTitle: "BOLETÍN POLICIAL DE DESAPARECIDOS",
    sourceText: `Un coche negro aceleró y dobló la esquina rápidamente.\nEl viento soplaba friamente en la calle principal.\n\nALERTA: Paciente desaparecido en el callejón.
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
    tier: 3,
    sceneType: "docks",
    title: "Caso 23: El Sello de Clausura [FIN]",
    subtitle: "Habitación 404 • Telegramas Cifrados",
    description: "Los mensajes de los sicarios que confirman las extracciones terminan con la palabra ritual '[FIN]' (segundo sello del destierro).",
    type: "construction",
    timeLimit: 80,
    maxAttempts: 5,
    documentTitle: "TELEGRAMAS DEL SINDICATO",
    sourceText: `Las alcantarillas emitían un leve vapor debido al frío de la madrugada.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\n\nLínea de contacto 1 [FIN]
Línea interrumpida por disparos
Transmisión segura completada [FIN]
Mensaje sin confirmar\nNadie parecía notar el rastro dejado en el asfalto mojado.`,
    task: "El espía autentica sus despachos colocando '[FIN]' exactamente al cierre del renglón. Captura esos cierres legítimos.",
    hint: "Recuerda escapar los corchetes literales y usar el ancla de fin de línea '$'.",
    recommendedRegex: "\\[FIN\\]$",
    recommendedFlags: "gm",
    expectedMatches: ["[FIN]", "[FIN]"]
  },
  {
    id: 24,
    tier: 3,
    sceneType: "docks",
    title: "Caso 24: La Trampa de Falcone #3",
    subtitle: "Caja Fuerte de la Habitación",
    description: "Los sicarios usaban carnés médicos falsos para circular por los hospitales sin levantar sospechas.",
    type: "criminal_cipher",
    timeLimit: 80,
    maxAttempts: 5,
    documentTitle: "REGISTRO DE AGENTES CUESTIONADOS",
    criminalRegex: "^AGENT_\\d{3}_[A-Z]{2}$",
    criminalFlags: "",
    sourceText: `Nadie se atrevía a caminar por ese sector después del anochecer.\nEl viento soplaba friamente en la calle principal.\n\nCarné 1: AGENT_007_US
Carné 2: AGENT_99_UK
Carné 3: SPY_881_FR
Carné 4: AGENT_555_ru (en minúscula)\n\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nUn archivo polvoriento reposaba sobre el escritorio.`,
    question: "Con la regex ^AGENT_\\d{3}_[A-Z]{2}$, ¿cuál es el único carné aceptado?",
    options: [
      { id: "opt_a", text: "Carné 1: AGENT_007_US", isCorrect: true, feedback: "¡Perfecto! Cumple AGENT_, 3 dígitos (007) y 2 mayúsculas (US)." },
      { id: "opt_b", text: "Carné 2: AGENT_99_UK", isCorrect: false, feedback: "Incorrecto: Solo tiene 2 dígitos (99) y se exigían 3." },
      { id: "opt_c", text: "Carné 4: AGENT_555_ru", isCorrect: false, feedback: "Incorrecto: 'ru' está en minúsculas y se exigían mayúsculas [A-Z]{2}." }
    ]
  },
  {
    id: 25,
    tier: 3,
    sceneType: "docks",
    title: "Caso 25: Cámara Frigorífica Subterránea",
    subtitle: "Cerradura Digital de la Bóveda",
    description: "Códigos de 6 caracteres que abren la cámara refrigerada donde reposan los órganos recién extirpados.",
    type: "construction",
    timeLimit: 80,
    maxAttempts: 5,
    documentTitle: "MEMORIA DE LA CÁMARA FRIGORÍFICA",
    sourceText: `Un coche negro aceleró y dobló la esquina rápidamente.\nEl olor a café rancio inundaba la oficina del investigador.\n\nCÓDIGOS DE LA CÁMARA:
V12345 (Aceptado)
V99881 (Aceptado)
V77770 (Aceptado)
X99999 (Invalido)\n\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nEl barman limpiaba distraídamente un vaso de cristal.`,
    task: "Los códigos de apertura de la bóveda comienzan con la letra 'V' y tienen 5 cifras numéricas. Encuentra los códigos autorizados.",
    hint: "Combina la letra inicial con el metarácter de dígito cuantificado a 5 repeticiones.",
    recommendedRegex: "V\\d{5}",
    recommendedFlags: "g",
    expectedMatches: ["V12345", "V99881", "V77770"]
  },
  {
    id: 26,
    tier: 3,
    sceneType: "docks",
    title: "Caso 26: La Fuga de los Cirujanos",
    subtitle: "Pista Clandestina de la Mafia",
    description: "Los cómplices de la Dra. Cross solo huyen en 'Sedan' o 'Avioneta' bimotor. Filtra ambos transportes.",
    type: "construction",
    timeLimit: 80,
    maxAttempts: 5,
    documentTitle: "BITÁCORA DE CONTROL AÉREO",
    sourceText: `El olor a salitre y humo impregnaba el ambiente portuario.\nNadie parecía notar el rastro dejado en el asfalto mojado.\n\nTRANSPORTE DE LA RED:
1. Huida en Sedan negro
2. Fuga en Avioneta bimotor
3. Carga en Camión pesado
4. Retorno en Sedan gris\nEl vigilante hacía su ronda alumbrando con una linterna gastada.`,
    task: "El informante asegura que los cómplices solo huyeron en 'Sedan' o en 'Avioneta'. Filtra únicamente esos dos medios de transporte.",
    hint: "Usa paréntesis con la barra vertical de alternancia para indicar 'uno u otro'.",
    recommendedRegex: "(Sedan|Avioneta)",
    recommendedFlags: "g",
    expectedMatches: ["Sedan", "Avioneta", "Sedan"]
  },
  {
    id: 27,
    tier: 3,
    sceneType: "docks",
    title: "Caso 27: La Trampa de Falcone #4",
    subtitle: "Terminal de Cifrado Mafia",
    description: "Falcone configuró un filtro para encubrir los envíos de órganos bajo la etiqueta de armas y sustancias.",
    type: "criminal_cipher",
    timeLimit: 80,
    maxAttempts: 5,
    documentTitle: "CÓDIGOS DE EMBARQUE INTERCEPTADOS",
    criminalRegex: "^(DROGA|ARMAS)-\\d+-(ALTA|BAJA)$",
    criminalFlags: "m",
    sourceText: `El olor a salitre y humo impregnaba el ambiente portuario.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\n\nENVÍOS:
Línea A: ARMAS-500-ALTA
Línea B: DINERO-100-ALTA
Línea C: DROGA-20-BAJA
Línea D: ARMAS-MEDIA\nNadie parecía notar el rastro dejado en el asfalto mojado.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.`,
    question: "Con la regex ^(DROGA|ARMAS)-\\d+-(ALTA|BAJA)$, ¿qué envíos cumplen el patrón?",
    options: [
      { id: "opt_a", text: "Solo el envío A", isCorrect: false, feedback: "Incorrecto: El envío C también coincide (DROGA-20-BAJA)." },
      { id: "opt_b", text: "Los envíos A y C (ARMAS-500-ALTA y DROGA-20-BAJA)", isCorrect: true, feedback: "¡Excelente! Ambos cumplen la alternativa inicial, los dígitos centrales y la prioridad final." },
      { id: "opt_c", text: "Todos los envíos", isCorrect: false, feedback: "Incorrecto: Ni DINERO ni ARMAS-MEDIA cumplen las reglas." }
    ]
  },
  {
    id: 28,
    tier: 3,
    sceneType: "docks",
    title: "Caso 28: El Hombre Sin Sombra",
    subtitle: "Grabación Telefónica de la Morgue",
    description: "El testigo tartamudea aterrorizado al relatar cómo vio a un ser de traje oscuro que no proyecta sombra.",
    type: "construction",
    timeLimit: 80,
    maxAttempts: 5,
    documentTitle: "DESGRABACIÓN DE CINTA DE AUDIO",
    sourceText: `El olor a café rancio inundaba la oficina del investigador.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\n\nAUDIO INTERCEPTADO:
El testigo dijo: muy muy peligroso.
Luego gritó: auxilio auxilio en la sala.
El oficial respondió con calma.\n\nEl barman limpiaba distraídamente un vaso de cristal.\nEl viento soplaba friamente en la calle principal.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.`,
    task: "Bajo presión, el testigo tartamudeó y repitió palabras consecutivas. Encuentra los términos duplicados idénticos en la grabación.",
    hint: "Captura una palabra en un grupo con paréntesis y haz referencia a ella con '\\1'.",
    recommendedRegex: "\\b(\\w+)\\s+\\1\\b",
    recommendedFlags: "g",
    expectedMatches: ["muy muy", "auxilio auxilio"]
  },
  {
    id: 29,
    tier: 3,
    sceneType: "docks",
    title: "Caso 29: Fechas de Rejuvenecimiento",
    subtitle: "Libro de Pacientes Ilustres",
    description: "Fechas registradas en la agenda que marcan las milagrosas recuperaciones de magnates ancianos tras sus trasplantes.",
    type: "construction",
    timeLimit: 80,
    maxAttempts: 5,
    documentTitle: "AGENDA PRIVADA DE LA CLÍNICA",
    sourceText: `El eco del agua goteando de una tubería rota marcaba el ritmo de la espera.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\n\nFECHAS DE CIRUGÍA:
12/04/1946
28-08-1946
15/10/1947
Ano 1890\nNadie parecía notar el rastro dejado en el asfalto mojado.`,
    task: "El informante utilizó indistintamente barras '/' o guiones '-' para anotar las fechas. Extrae todas las fechas válidas.",
    hint: "Usa corchetes que contengan tanto la barra como el guion como separador de cifras.",
    recommendedRegex: "\\d{2}[/-]\\d{2}[/-]\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["12/04/1946", "28-08-1946", "15/10/1947"]
  },
  {
    id: 30,
    tier: 3,
    sceneType: "docks",
    title: "Caso 30: Fondos de la Dra. Cross",
    subtitle: "Servidor Financiero del Banco Central",
    description: "Cuentas corporativas en EE.UU. y Suiza que financian los experimentos biomecánicos del sanatorio.",
    type: "construction",
    timeLimit: 80,
    maxAttempts: 5,
    documentTitle: "LISTA DE FONDOS INTERNACIONALES",
    sourceText: `Un gato negro saltó desde el muro y desapareció en las sombras.\nEl viento soplaba friamente en la calle principal.\n\nCUENTAS SECRETAS:
ACC-US-1029 (Nueva York)
ACC-CH-4491 (Ginebra)
ACC-UK-9011 (Londres)
ACC-US-8812 (Miami)\n\nLa sirena de una ambulancia resonó a varias calles de distancia.\nUn periódico viejo volaba arrastrado por la brisa otoñal.`,
    task: "Investiga las cuentas sospechosas de fondos negros radicadas únicamente en Estados Unidos ('US') o Suiza ('CH').",
    hint: "Aplica alternancia en el código de país dentro del formato 'ACC-XX-XXXX'.",
    recommendedRegex: "ACC-(US|CH)-\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["ACC-US-1029", "ACC-CH-4491", "ACC-US-8812"]
  },

  // ========================================================
  // TIER 4: BRIGADA DE DELITOS ESPECIALES (Niveles 31 a 40) - Acto III
  // Tiempo: 75s + 4 Vidas. Cuantificadores perezosos y lookaheads.
  // ========================================================
  {
    id: 31,
    tier: 4,
    sceneType: "mansion",
    title: "Caso 31: Testimonio del Ritual",
    subtitle: "Interrogatorio en el Callejón",
    description: "Declaración judicial donde el testigo confiesa haber presenciado cánticos y figuras oscuras en el sótano de la clínica.",
    type: "construction",
    timeLimit: 75,
    maxAttempts: 4,
    documentTitle: "ACTA JUDICIAL DE DECLARACIÓN",
    sourceText: `Nadie parecía notar el rastro dejado en el asfalto mojado.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nDECLARACIÓN DEL ENFERMERO:
El testigo gritó: "¡cuidado con el arma!" y luego "¡corran todos!".\n\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nEl viento soplaba friamente en la calle principal.`,
    task: "El acta judicial contiene dos frases textuales entre comillas. Aísla cada cita entrecomillada de manera individual.",
    hint: "Usa el cuantificador comodín perezoso añadiendo '?' para que no atrape todo de golpe.",
    recommendedRegex: "\".*?\"",
    recommendedFlags: "g",
    expectedMatches: ["\"¡cuidado con el arma!\"", "\"¡corran todos!\""]
  },
  {
    id: 32,
    tier: 4,
    sceneType: "mansion",
    title: "Caso 32: La Trampa de Falcone #5",
    subtitle: "Detonador con Cuenta Regresiva",
    description: "¡Bomba de tiempo en el muelle! Los criminales configuraron un validador con etiquetas HTML.",
    type: "criminal_cipher",
    timeLimit: 75,
    maxAttempts: 4,
    documentTitle: "CIRCUITO DEL TEMPORIZADOR",
    criminalRegex: "<tag>.*?</tag>",
    criminalFlags: "g",
    sourceText: `El candado de la puerta trasera parecía oxidado pero intacto.\nUna figura envuelta en una gabardina cruzó la avenida.\nNadie parecía notar el rastro dejado en el asfalto mojado.\n\nDATOS: <tag>CÓDIGO_1</tag> y <tag>CÓDIGO_2</tag>\n\nEl detective suspiró mientras encendía otro cigarrillo.\nUn archivo polvoriento reposaba sobre el escritorio.\nEn la radio se informaba sobre las bajas temperaturas.`,
    question: "¿Qué capturará la expresión <tag>.*?</tag> debido al cuantificador perezoso '?'?",
    options: [
      { id: "opt_a", text: "Captura todo de principio a fin como una sola cadena: <tag>CÓDIGO_1</tag> y <tag>CÓDIGO_2</tag>", isCorrect: false, feedback: "Incorrecto: Eso lo haría el cuantificador codicioso (.*), no el perezoso (.*?)." },
      { id: "opt_b", text: "Captura dos coincidencias independientes: '<tag>CÓDIGO_1</tag>' y '<tag>CÓDIGO_2</tag>'", isCorrect: true, feedback: "¡Desactivaste la bomba! El '?' hace que se detenga en el primer </tag> que encuentra." },
      { id: "opt_c", text: "No captura nada", isCorrect: false, feedback: "Incorrecto: Hay dos etiquetas válidas." }
    ]
  },
  {
    id: 33,
    tier: 4,
    sceneType: "mansion",
    title: "Caso 33: Frascos de Tejido Biológico",
    subtitle: "Laboratorio Subterráneo de la Dra. Cross",
    description: "Recipientes de vidrio rotulados entre corchetes que contienen los órganos preservados para los trasplantes.",
    type: "construction",
    timeLimit: 75,
    maxAttempts: 4,
    documentTitle: "REGISTRO DE MUESTRAS EN FRASCOS",
    sourceText: `El reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nEl olor a salitre y humo impregnaba el ambiente portuario.\n\nREGISTROS DEL LABORATORIO:
[PISTA_ALPHA] encontrada en la mesa.
[PISTA_BETA] oculta en el piso.
Texto sin corchetes.\n\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.`,
    task: "Extrae los nombres en clave de las evidencias que se encuentran encerradas entre corchetes literales.",
    hint: "Escapa los corchetes exteriores y dentro usa una clase negada para el corchete de cierre.",
    recommendedRegex: "\\[[^\\]]+\\]",
    recommendedFlags: "g",
    expectedMatches: ["[PISTA_ALPHA]", "[PISTA_BETA]"]
  },
  {
    id: 34,
    tier: 4,
    sceneType: "mansion",
    title: "Caso 34: Censo de Almas Deudoras",
    subtitle: "Despacho Clandestino de la Clínica",
    description: "Base de datos con las identidades deudoras clasificadas con prefijos sin captura '(?:REF|ID)-\\d{4}'.",
    type: "construction",
    timeLimit: 75,
    maxAttempts: 4,
    documentTitle: "CENSO DE DEUDORES FAUSTIANOS",
    sourceText: `El viento soplaba friamente en la calle principal.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nDEUDORES REGISTRADOS:
REF-9988 (Inspeccionado)
ID-1102 (Inspeccionado)
COD-00 (Descartado)\n\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.`,
    task: "El archivo clasifica las piezas con los identificadores 'REF-' o 'ID-' seguidos de 4 dígitos. Localiza los registros válidos.",
    hint: "Usa un grupo sin captura '(?:...)' para los dos prefijos posibles seguidos de los números.",
    recommendedRegex: "(?:REF|ID)-\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["REF-9988", "ID-1102"]
  },
  {
    id: 35,
    tier: 4,
    sceneType: "mansion",
    title: "Caso 35: Facturas de Rejuvenecimiento",
    subtitle: "Balanza de la Dra. Cross",
    description: "Tarifas astronómicas en dólares pagadas por la élite por extender sus vidas a costa de víctimas inocentes.",
    type: "construction",
    timeLimit: 75,
    maxAttempts: 4,
    documentTitle: "BALANZA CONTABLE DE TRASPLANTES",
    sourceText: `La música de jazz sonaba suavemente desde un tocadiscos lejano.\n\nTRANSACCIONES DE TRASPLANTE:
Cobro: $120.50
Depósito: $500.00
Comisión: $15.75
Sin centavos: $99\nNadie se atrevía a caminar por ese sector después del anochecer.\nEl barman limpiaba distraídamente un vaso de cristal.\nEl viento soplaba friamente en la calle principal.`,
    task: "La fiscalía necesita auditar los pagos que incluyan centavos exactos (dos decimales tras el punto).",
    hint: "Combina el símbolo de dólar escapado, uno o más dígitos, el punto decimal escapado y dos dígitos de centavos.",
    recommendedRegex: "\\$\\d+\\.\\d{2}",
    recommendedFlags: "g",
    expectedMatches: ["$120.50", "$500.00", "$15.75"]
  },
  {
    id: 36,
    tier: 4,
    sceneType: "mansion",
    title: "Caso 36: Cajas con Dinamita",
    subtitle: "Almacén Portuario • Demolición",
    description: "Falcone ha colocado dinamita en las cajas de suministros para volar las pruebas forenses.",
    type: "construction",
    timeLimit: 75,
    maxAttempts: 4,
    documentTitle: "INSPECCIÓN DE CARGAS EXPLOSIVAS",
    sourceText: `Las cajas apiladas formaban un laberinto casi impenetrable.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nBODEGA AMENAZADA:
Caja PELIGRO (No tocar)
Caja SEGURA (Verificada)
Caja PELIGRO (Dinamita)\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nUn gato negro saltó desde el muro y desapareció en las sombras.`,
    task: "Encuentra la palabra 'Caja' únicamente cuando contenga explosivos (seguida de la etiqueta 'PELIGRO'), sin incluir dicha etiqueta en la coincidencia.",
    hint: "Aplica un lookahead positivo (?=...) para verificar el texto posterior sin consumirlo.",
    recommendedRegex: "Caja(?=\\sPELIGRO)",
    recommendedFlags: "g",
    expectedMatches: ["Caja", "Caja"]
  },
  {
    id: 37,
    tier: 4,
    sceneType: "mansion",
    title: "Caso 37: Escape por el Canal",
    subtitle: "Puerto Marítimo de la Bahía",
    description: "Los cirujanos intentan huir en buques no militares antes de que llegue la Guardia Nacional.",
    type: "construction",
    timeLimit: 75,
    maxAttempts: 4,
    documentTitle: "CONTROL DE EMBARCACIONES EN FUGA",
    sourceText: `Un archivo polvoriento reposaba sobre el escritorio.\nEl olor a café rancio inundaba la oficina del investigador.\nPUERTO:
BARCO CARGA
BARCO MILITAR (Prohibido)
BARCO PESQUERO\n\nEn la radio se informaba sobre las bajas temperaturas.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.`,
    task: "Identifica las embarcaciones civiles capturando 'BARCO' solo cuando NO corresponda a una unidad 'MILITAR'.",
    hint: "Utiliza un lookahead negativo (?!...) para descartar el término prohibido a continuación.",
    recommendedRegex: "BARCO(?!\\sMILITAR)",
    recommendedFlags: "g",
    expectedMatches: ["BARCO", "BARCO"]
  },
  {
    id: 38,
    tier: 4,
    sceneType: "mansion",
    title: "Caso 38: La Trampa de la Dra. Cross #6",
    subtitle: "Sanctum Privado de la Dra. Cross",
    description: "El despacho de la doctora está blindado con un validador complejo de contraseña con lookaheads.",
    type: "criminal_cipher",
    timeLimit: 75,
    maxAttempts: 4,
    documentTitle: "VALIDADOR DEL SANCTUM MÉDICO",
    criminalRegex: "^(?=.*[A-Z])(?=.*\\d).{6,}$",
    criminalFlags: "",
    sourceText: `El detective suspiró mientras encendía otro cigarrillo.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nNadie se atrevía a caminar por ese sector después del anochecer.\n\nCLAVES CANDIDATAS:
Clave A: secreto1 (Sin mayúscula)
Clave B: SECRETO (Sin número)
Clave C: Noir42 (6 letras/números, al menos 1 mayúscula y 1 número)
Clave D: Ab1 (Muy corta)\n\nNadie parecía notar el rastro dejado en el asfalto mojado.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nUn archivo polvoriento reposaba sobre el escritorio.`,
    question: "La regex exige: al menos 1 mayúscula, al menos 1 número y mínimo 6 caracteres. ¿Cuál clave es válida?",
    options: [
      { id: "opt_a", text: "Clave C: Noir42", isCorrect: true, feedback: "¡Exacto! Cumple los dos lookaheads positivos y tiene 6 caracteres de longitud." },
      { id: "opt_b", text: "Clave A: secreto1", isCorrect: false, feedback: "Incorrecto: Le falta una letra mayúscula." },
      { id: "opt_c", text: "Clave B: SECRETO", isCorrect: false, feedback: "Incorrecto: No tiene ningún número." }
    ]
  },
  {
    id: 39,
    tier: 4,
    sceneType: "mansion",
    title: "Caso 39: El Libro de Sangre de Malphas",
    subtitle: "Caja Oculta • Contratos Fausto",
    description: "Libro de registro arcaico donde se anotaron los pagos de sangre del pacto.",
    type: "construction",
    timeLimit: 75,
    maxAttempts: 4,
    documentTitle: "RECIBOS DE SANGRE Y TRIBUTO",
    sourceText: `Las gaviotas revoloteaban sobre los barcos pesqueros.\n\nCONTABILIDAD DEL PACTO:
PAGO: 500
MULTA: 100
PAGO: 1200
COBRO: 80\n\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.`,
    task: "Extrae únicamente los montos numéricos de los recibos que correspondan a un 'PAGO: ', sin incluir la palabra del concepto.",
    hint: "Aplica una aserción retrospectiva positiva (?<=...) para comprobar lo que precede al número.",
    recommendedRegex: "(?<=PAGO:\\s)\\d+",
    recommendedFlags: "g",
    expectedMatches: ["500", "1200"]
  },
  {
    id: 40,
    tier: 4,
    sceneType: "mansion",
    title: "Caso 40: Servidores de la Clínica Renacer",
    subtitle: "Terminal Central de la Clínica",
    description: "Códigos de autenticación para ingresar a los servidores maestros antes de que se inicie el protocolo de autodestrucción.",
    type: "construction",
    timeLimit: 75,
    maxAttempts: 4,
    documentTitle: "TERMINAL MAESTRA DE CONTROL",
    sourceText: `Las gaviotas revoloteaban sobre los barcos pesqueros.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nLa sirena de una ambulancia resonó a varias calles de distancia.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\n\nCÓDIGOS DE ACCESO:
KEY_8841_OK
KEY_1029_OK
KEY_99_OK (Corta)
PASS_4412_OK\n\nEl viento soplaba friamente en la calle principal.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.`,
    task: "Verifica los códigos de validación de seguridad que inician con 'KEY_', tienen 4 dígitos y finalizan con el estado '_OK'.",
    hint: "Estructura el prefijo, la cantidad exacta de números entre llaves y el sufijo de confirmación.",
    recommendedRegex: "KEY_\\d{4}_OK",
    recommendedFlags: "g",
    expectedMatches: ["KEY_8841_OK", "KEY_1029_OK"]
  },

  // ========================================================
  // TIER 5: INVESTIGADOR DE HOMICIDIOS (Niveles 41 a 50) - Acto III
  // Tiempo: 65s + 4 Vidas. Sabotaje ReDoS y Cargas de TNT.
  // ========================================================
  {
    id: 41,
    tier: 5,
    sceneType: "office",
    title: "Caso 41: El Sabotaje ReDoS del Demonio",
    subtitle: "Servidores Centrales Colapsados",
    description: "Una fuerza sobrenatural introdujo un ataque ReDoS ^(a+)+$ en el sistema para colapsar las redes de la ciudad.",
    type: "criminal_cipher",
    timeLimit: 65,
    maxAttempts: 4,
    documentTitle: "LOG DEL SERVIDOR CAÍDO",
    criminalRegex: "^(a+)+$",
    criminalFlags: "",
    sourceText: `Nadie parecía notar el rastro dejado en el asfalto mojado.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nTEXTO DE PRUEBA:
aaaaaaaaaaaaaaaaaaaaaaaaaaaaab (falla al final)\n\nEl viento soplaba friamente en la calle principal.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nUn archivo polvoriento reposaba sobre el escritorio.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.`,
    question: "¿Por qué la regex ^(a+)+$ congela el procesador cuando la cadena falla al final?",
    options: [
      { id: "opt_a", text: "Porque contiene un error de sintaxis y no compila", isCorrect: false, feedback: "Incorrecto: La sintaxis es válida, el problema es su rendimiento." },
      { id: "opt_b", text: "Por 'Catastrophic Backtracking': las combinaciones de repetición crecen exponencialmente O(2^N) intentando hacer coincidir la 'b' final", isCorrect: true, feedback: "¡Deducción de élite! Es un ataque de denegación de servicio (ReDoS) clásico." },
      { id: "opt_c", text: "Porque los paréntesis están invertidos", isCorrect: false, feedback: "Incorrecto: No hay error de paréntesis." }
    ]
  },
  {
    id: 42,
    tier: 5,
    sceneType: "office",
    title: "Caso 42: Parche Lineal de Vance",
    subtitle: "Reactivación de Servidores",
    description: "Vance reescribe el algoritmo de autenticación de forma lineal para restablecer las alarmas antes de la detonación.",
    type: "construction",
    timeLimit: 65,
    maxAttempts: 4,
    documentTitle: "PARCHE DE CÓDIGO FORENSE",
    sourceText: `El viento soplaba friamente en la calle principal.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\n\nCADENAS A VERIFICAR:
TOKEN_ALPHA_99
TOKEN_BETA_10
TOKEN_GAMMA_44\nUn gato negro saltó desde el muro y desapareció en las sombras.\nEl eco del agua goteando de una tubería rota marcaba el ritmo de la espera.`,
    task: "Construye una regla eficiente para verificar los tokens compuestos por el prefijo 'TOKEN_', letras mayúsculas y dos números.",
    hint: "Evita anidar cuantificadores; utiliza un rango de letras mayúsculas seguido del cuantificador numérico exacto.",
    recommendedRegex: "TOKEN_[A-Z]+_\\d{2}",
    recommendedFlags: "g",
    expectedMatches: ["TOKEN_ALPHA_99", "TOKEN_BETA_10", "TOKEN_GAMMA_44"]
  },
  {
    id: 43,
    tier: 5,
    sceneType: "office",
    title: "Caso 43: Orden de Cosecha de Almas",
    subtitle: "Terminal Diplomática Savoy",
    description: "Correos electrónicos intervenidos que autorizan la entrega de deudores para su intervención quirúrgica.",
    type: "construction",
    timeLimit: 65,
    maxAttempts: 4,
    documentTitle: "BANDEJA DIPLOMÁTICA INTERCEPTADA",
    sourceText: `Las letras del letrero 'ABIERTO' estaban medio fundidas.\nLas cajas apiladas formaban un laberinto casi impenetrable.\nUn coche negro aceleró y dobló la esquina rápidamente.\nNadie parecía notar el rastro dejado en el asfalto mojado.\n\nCONTACTOS DE LA RED:
agente@embajada.com
informante@safe.org
invalido@@mail
espia@muelle.com\n\nEl barman limpiaba distraídamente un vaso de cristal.\nLa sirena de una ambulancia resonó a varias calles de distancia.`,
    task: "Filtra las direcciones de correo electrónico oficiales con extensiones '.com' o '.org' y descarta las direcciones malformadas.",
    hint: "Combina el identificador, el símbolo arroba, el dominio y una alternancia para las dos extensiones posibles escapando el punto.",
    recommendedRegex: "[a-z]+@[a-z]+\\.(com|org)",
    recommendedFlags: "g",
    expectedMatches: ["agente@embajada.com", "informante@safe.org", "espia@muelle.com"]
  },
  {
    id: 44,
    tier: 5,
    sceneType: "office",
    title: "Caso 44: La Trampa del Criminal #7",
    subtitle: "Firewall del Búnker Subterráneo",
    description: "La regla de firewall del búnker contiene una vulnerabilidad que delata la dirección IP de la cámara de invocación.",
    type: "criminal_cipher",
    timeLimit: 65,
    maxAttempts: 4,
    documentTitle: "REGLA DE FIREWALL DEFECTUOSA",
    criminalRegex: "^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$",
    criminalFlags: "",
    sourceText: `Un periódico viejo volaba arrastrado por la brisa otoñal.\n\nIPS INGRESADAS:
1) 192.168.1.1
2) 999.888.777.666
3) 10.0.0.1\n\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nEl viento soplaba friamente en la calle principal.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.`,
    question: "¿Cuál de estas IPs falsas es aceptada por la regex debido a que \\d{1,3} no comprueba el rango 0-255?",
    options: [
      { id: "opt_a", text: "999.888.777.666", isCorrect: true, feedback: "¡Correcto! \\d{1,3} permite números hasta 999, violando el límite de 255 de una IP." },
      { id: "opt_b", text: "192.168.1.1", isCorrect: false, feedback: "Incorrecto: Esa es una IP totalmente válida." },
      { id: "opt_c", text: "Ninguna", isCorrect: false, feedback: "Incorrecto: 999.888.777.666 pasa el filtro erróneamente." }
    ]
  },
  {
    id: 45,
    tier: 5,
    sceneType: "office",
    title: "Caso 45: Detonadores de TNT en los Cimientos",
    subtitle: "Sótano de la Clínica Renacer",
    description: "Falcone ha cebado los cimientos del hospital con cargas de TNT. Desactiva los detonadores activos antes de que exploten.",
    type: "construction",
    timeLimit: 65,
    maxAttempts: 4,
    documentTitle: "MANIFIESTO DE DETONADORES ACTIVOS",
    sourceText: `El olor a salitre y humo impregnaba el ambiente portuario.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nNadie se atrevía a caminar por ese sector después del anochecer.\n\nCARGAS DE TNT ACTIVAS:
TNT-8891-A (Activo)
TNT-1024-B (Activo)
TNT-9910-Z (Desactivado)
C4-001-A (Otro tipo)\n\nEl barman limpiaba distraídamente un vaso de cristal.\nUn periódico viejo volaba arrastrado por la brisa otoñal.\nUn coche negro aceleró y dobló la esquina rápidamente.`,
    task: "Localiza los detonadores activos de TNT compuestos por 4 dígitos y terminados en las frecuencias de activación 'A' o 'B'.",
    hint: "Estructura 'TNT-', cuatro números y corchetes con las letras de frecuencia autorizadas.",
    recommendedRegex: "TNT-\\d{4}-[AB]",
    recommendedFlags: "g",
    expectedMatches: ["TNT-8891-A", "TNT-1024-B"]
  },
  {
    id: 46,
    tier: 5,
    sceneType: "office",
    title: "Caso 46: Fuga de Camiones Frigoríficos",
    subtitle: "Batida en los Muelles de Carga",
    description: "¡Los últimos camiones con órganos extraídos están escapando hacia alta mar!",
    type: "construction",
    timeLimit: 65,
    maxAttempts: 4,
    documentTitle: "RADAR PORTUARIO DE ALTA VELOCIDAD",
    sourceText: `El detective suspiró mientras encendía otro cigarrillo.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\n\nVEHÍCULOS EN FUGA:
TRUCK-401-X
TRUCK-889-Z
CAR-112-A
TRUCK-002-B\n\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.`,
    task: "¡Redada contrarreloj! Identifica los camiones de escape matriculados con código 'TRUCK-', 3 números y una letra mayúscula.",
    hint: "Combina el prefijo del camión con 3 cifras y una clase de letra mayúscula.",
    recommendedRegex: "TRUCK-\\d{3}-[A-Z]",
    recommendedFlags: "g",
    expectedMatches: ["TRUCK-401-X", "TRUCK-889-Z", "TRUCK-002-B"]
  },
  {
    id: 47,
    tier: 5,
    sceneType: "office",
    title: "Caso 47: El C4 del Capo Falcone",
    subtitle: "El Maletín con C4 en el Callejón",
    description: "Carmine Falcone activa su último detonador de C4 para inmolarse y llevarse el secreto a la tumba.",
    type: "criminal_cipher",
    timeLimit: 65,
    maxAttempts: 4,
    documentTitle: "CIRCUITO DEL DETONADOR DE C4",
    criminalRegex: "^(?:ALPHA|BETA)_\\d{4}_(?:WIN|END)$",
    criminalFlags: "m",
    sourceText: `Un archivo polvoriento reposaba sobre el escritorio.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\n\nSEÑALES DETECTADAS:
1: ALPHA_9941_WIN
2: GAMMA_1102_END
3: BETA_8820_END
4: ALPHA_12_WIN\n\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nUna figura envuelta en una gabardina cruzó la avenida.`,
    question: "¿Cuáles señales coinciden con el detonador del capo?",
    options: [
      { id: "opt_a", text: "Señales 1 y 3 (ALPHA_9941_WIN y BETA_8820_END)", isCorrect: true, feedback: "¡DESACTIVASTE EL C4! Cumplen ALPHA/BETA, 4 dígitos y WIN/END." },
      { id: "opt_b", text: "Solo la Señal 2", isCorrect: false, feedback: "Incorrecto: GAMMA no está en el grupo permitido (ALPHA|BETA)." },
      { id: "opt_c", text: "Todas las señales", isCorrect: false, feedback: "Incorrecto: La señal 4 solo tiene 2 dígitos (12)." }
    ]
  },
  {
    id: 48,
    tier: 5,
    sceneType: "office",
    title: "Caso 48: Runas de Sangre en el Espejo",
    subtitle: "Cámara de Invocación • Espejo Empañado",
    description: "Runas rituales dejadas en el espejo por donde se manifiesta Malphas. Vance busca los renglones cifrados.",
    type: "construction",
    timeLimit: 65,
    maxAttempts: 4,
    documentTitle: "INSCRIPCIÓN RITUAL EN EL ESPEJO",
    sourceText: `Las letras del letrero 'ABIERTO' estaban medio fundidas.\nEl detective suspiró mientras encendía otro cigarrillo.\n\n#CLAVE_42
TEXTO NORMAL
#SECRETO_99
#INVAL_X\nLa sirena de una ambulancia resonó a varias calles de distancia.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.`,
    task: "Encuentra los renglones cifrados completos que comienzan con el símbolo '#' y concluyen con dos dígitos numéricos.",
    hint: "Combina anclas de inicio y fin de línea con la bandera multilínea 'm'.",
    recommendedRegex: "^#.+_\\d{2}$",
    recommendedFlags: "gm",
    expectedMatches: ["#CLAVE_42", "#SECRETO_99"]
  },
  {
    id: 49,
    tier: 5,
    sceneType: "office",
    title: "Caso 49: El Conspirador Supremo",
    subtitle: "Libreta del Sindicato Internacional",
    description: "Cuentas bancarias de la red criminal mayor que conecta la clínica con testaferros en todo el mundo.",
    type: "construction",
    timeLimit: 65,
    maxAttempts: 4,
    documentTitle: "LIBRETA DEL JEFE DE MAFIA",
    sourceText: `El reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nLas cajas apiladas formaban un laberinto casi impenetrable.\nUn gato negro saltó desde el muro y desapareció en las sombras.\n\nFONDOS SECRETOS DEL PACTO:
ACC-CH-9910-A
ACC-US-4402-B
ACC-UK-12-Z (Inválida)
ACC-FR-8812-C\n\nUn coche negro aceleró y dobló la esquina rápidamente.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nUna figura envuelta en una gabardina cruzó la avenida.\nEn la radio se informaba sobre las bajas temperaturas.`,
    task: "Localiza las cuentas de la mafia internacional compuestas por el prefijo 'ACC-', 2 letras de país, 4 dígitos y una letra de control.",
    hint: "Define las secciones intermedias con sus longitudes exactas respetando los guiones separadores.",
    recommendedRegex: "ACC-[A-Z]{2}-\\d{4}-[A-Z]",
    recommendedFlags: "g",
    expectedMatches: ["ACC-CH-9910-A", "ACC-US-4402-B", "ACC-FR-8812-C"]
  },
  {
    id: 50,
    tier: 5,
    sceneType: "office",
    title: "Caso 50: La Puerta Blindada de la Clínica",
    subtitle: "Acceso al Santuario de la Dra. Cross",
    description: "Cerradura maestra de la puerta que conduce al santuario subterráneo.",
    type: "construction",
    timeLimit: 65,
    maxAttempts: 4,
    documentTitle: "CERRADURA DE CIRUGÍA MAYOR",
    sourceText: `El olor a café rancio inundaba la oficina del investigador.\nNadie se atrevía a caminar por ese sector después del anochecer.\nEl viento soplaba friamente en la calle principal.\nCÓDIGOS DE LA PUERTA:
MASTER_KEY_AB8899ZZ (Aprobada)
MASTER_KEY_7741KK99 (Aprobada)
KEY_CERO_00000000 (Falsa)
MASTER_KEY_123 (Corta)\n\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.`,
    task: "Abre la puerta del laboratorio localizando las llaves que inician con 'MASTER_KEY_' y tienen exactamente 8 caracteres alfanuméricos.",
    hint: "Combina el prefijo fijo con una clase alfanumérica y un cuantificador exacto de 8 caracteres.",
    recommendedRegex: "MASTER_KEY_[A-Z0-9]{8}",
    recommendedFlags: "g",
    expectedMatches: ["MASTER_KEY_AB8899ZZ", "MASTER_KEY_7741KK99"]
  },

  // ========================================================
  // TIER 6: FORENSE DE INTELIGENCIA (Niveles 51 a 60) - Acto IV
  // Tiempo: 55s + 3 Vidas. Compatibilidad HLA, bitácoras y furgones.
  // ========================================================
  {
    id: 51,
    tier: 6,
    sceneType: "morgue",
    title: "Caso 51: Compatibilidad Genética HLA",
    subtitle: "Morgue Central • Laboratorio de Análisis",
    description: "Los órganos cosechados poseen compatibilidad perfecta antinatural. Identifica los perfiles HLA.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "EXPEDIENTE DE COMPATIBILIDAD BIOLÓGICA",
    sourceText: `Un archivo polvoriento reposaba sobre el escritorio.\nEl detective suspiró mientras encendía otro cigarrillo.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nPERFILES COMPATIBLES:
Donante 1: HLA-AB-102
Donante 2: HLA-CD-994
Donante 3: RECHAZO-00
Donante 4: HLA-EF-771\n\nNadie se atrevía a caminar por ese sector después del anochecer.\nEl olor a café rancio inundaba la oficina del investigador.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.`,
    task: "Filtra los perfiles de compatibilidad celular que inician con 'HLA-', dos letras mayúsculas, guion y tres dígitos.",
    hint: "Combina 'HLA-', clase de mayúsculas cuantificada a 2, guion y dígitos cuantificados a 3.",
    recommendedRegex: "HLA-[A-Z]{2}-\\d{3}",
    recommendedFlags: "g",
    expectedMatches: ["HLA-AB-102", "HLA-CD-994", "HLA-EF-771"]
  },
  {
    id: 52,
    tier: 6,
    sceneType: "morgue",
    title: "Caso 52: Nitrógeno Líquido Portuario",
    subtitle: "Almacén 9 del Muelle",
    description: "Tanques de nitrógeno criogénico usados para congelar órganos en menos de 15 minutos.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "MANIFIESTO CRIOGÉNICO",
    sourceText: `El viento soplaba friamente en la calle principal.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nUn periódico viejo volaba arrastrado por la brisa otoñal.\nLas cajas apiladas formaban un laberinto casi impenetrable.\n\nTANQUES REGISTRADOS:
NITRO_101_A (Presurizado)
NITRO_554_B (Presurizado)
NITRO_99_Z (Fuga)
NITRO_882_C (Presurizado)\n\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nEn la radio se informaba sobre las bajas temperaturas.\nUna figura envuelta en una gabardina cruzó la avenida.\nEl eco del agua goteando de una tubería rota marcaba el ritmo de la espera.`,
    task: "Localiza los tanques activos identificados con 'NITRO_', 3 cifras, guion bajo y una letra de sector.",
    hint: "Usa el prefijo literal con 3 dígitos exactos y una clase mayúscula.",
    recommendedRegex: "NITRO_\\d{3}_[A-Z]",
    recommendedFlags: "g",
    expectedMatches: ["NITRO_101_A", "NITRO_554_B", "NITRO_882_C"]
  },
  {
    id: 53,
    tier: 6,
    sceneType: "morgue",
    title: "Caso 53: El Terror del Conserje",
    subtitle: "Grabadora de Alambre del Hotel",
    description: "El conserje confiesa temblando cómo vio al hombre de traje negro y repite palabras de pánico.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "TRANSCRIPCIÓN DE CINTA MAGNETOFÓNICA",
    sourceText: `Las gaviotas revoloteaban sobre los barcos pesqueros.\nUn coche negro aceleró y dobló la esquina rápidamente.\nNadie se atrevía a caminar por ese sector después del anochecer.\nLas cajas apiladas formaban un laberinto casi impenetrable.\n\nDECLARACIÓN DEL CONSERJE:
Gritó: fuego fuego en el pasillo.
Luego dijo: miedo miedo no puedo hablar.
El guardia se calmó lentamente.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nUna figura envuelta en una gabardina cruzó la avenida.\nUn gato negro saltó desde el muro y desapareció en las sombras.`,
    task: "Encuentra las palabras de 3 o más letras que se repiten de forma idéntica consecutivamente en el testimonio.",
    hint: "Captura en un grupo palabras con letras de longitud 3 o más y referencia con '\\1'.",
    recommendedRegex: "\\b([a-z]{3,})\\s+\\1\\b",
    recommendedFlags: "g",
    expectedMatches: ["fuego fuego", "miedo miedo"]
  },
  {
    id: 54,
    tier: 6,
    sceneType: "morgue",
    title: "Caso 54: La Bitácora de Falcone",
    subtitle: "Despacho Central • Libreta Negra",
    description: "El capo codificó los informes de las viviendas allanadas con una regla regex.",
    type: "criminal_cipher",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "BITÁCORA DE ALLANAMIENTOS",
    criminalRegex: "^SAQUEO-\\d{2}-[A-Z]{3}$",
    criminalFlags: "m",
    sourceText: `Las alcantarillas emitían un leve vapor debido al frío de la madrugada.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\n\nCÓDIGOS DE CASAS SAQUEADAS:
1: SAQUEO-14-NYC
2: SAQUEO-9-LA
3: ROBO-22-MIA
4: SAQUEO-88-BOS\n\nNadie parecía notar el rastro dejado en el asfalto mojado.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nUn archivo polvoriento reposaba sobre el escritorio.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nLas cajas apiladas formaban un laberinto casi impenetrable.`,
    question: "¿Qué registros de saqueo cumplen el patrón ^SAQUEO-\\d{2}-[A-Z]{3}$?",
    options: [
      { id: "opt_a", text: "Solo el 1", isCorrect: false, feedback: "Incorrecto: El registro 4 también cumple exactamente." },
      { id: "opt_b", text: "Los registros 1 y 4 (SAQUEO-14-NYC y SAQUEO-88-BOS)", isCorrect: true, feedback: "¡Correcto! Cumplen SAQUEO-, 2 dígitos y 3 letras mayúsculas de ciudad." },
      { id: "opt_c", text: "Todos los registros", isCorrect: false, feedback: "Incorrecto: El registro 2 solo tiene 1 dígito y el 3 tiene prefijo ROBO." }
    ]
  },
  {
    id: 55,
    tier: 6,
    sceneType: "morgue",
    title: "Caso 55: Lanchas Rápidas en la Bahía",
    subtitle: "Control Costero • Radares",
    description: "Embarcaciones clandestinas que transportan los contenedores hacia buques en aguas internacionales.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "RADAR COSTEÑO NOCTURNO",
    sourceText: `Las letras del letrero 'ABIERTO' estaban medio fundidas.\nEl viento soplaba friamente en la calle principal.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\n\nLANCHAS DETECTADAS:
BOAT#1044 (Veloz)
BOAT#8819 (Veloz)
BOAT#22 (Demasiado lenta)
SHIP-001 (Civil)\n\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nUn periódico viejo volaba arrastrado por la brisa otoñal.\nLa sirena de una ambulancia resonó a varias calles de distancia.`,
    task: "Identifica las lanchas ilegales matriculadas con 'BOAT#' seguido exactamente de 4 números.",
    hint: "Escribe 'BOAT#' y añade el metarácter de dígito cuantificado a cuatro repeticiones.",
    recommendedRegex: "BOAT#\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["BOAT#1044", "BOAT#8819"]
  },
  {
    id: 56,
    tier: 6,
    sceneType: "morgue",
    title: "Caso 56: Rótulos de Órganos Vitales",
    subtitle: "Morgue de la Dra. Cross • Frascos Clave",
    description: "Los frascos están clasificados con los nombres en latín de corazón, riñón e hígado.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "ETIQUETAS DE ÓRGANOS EN FORMOL",
    sourceText: `Las gaviotas revoloteaban sobre los barcos pesqueros.\nEl candado de la puerta trasera parecía oxidado pero intacto.\n\nFRASCOS PREPARADOS:
Muestra 1: COR-1102 (Corazón)
Muestra 2: REN-9941 (Riñón)
Muestra 3: OJO-12 (Descartado)
Muestra 4: HEPAR-4401 (Hígado)\n\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nEl viento soplaba friamente en la calle principal.\nEl barman limpiaba distraídamente un vaso de cristal.`,
    task: "Aísla los frascos que inician con 'COR', 'REN' o 'HEPAR' seguidos de un guion y 4 números usando un grupo sin captura.",
    hint: "Agrupa las tres opciones con alternancia '(?:COR|REN|HEPAR)' antes de los dígitos.",
    recommendedRegex: "(?:COR|REN|HEPAR)-\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["COR-1102", "REN-9941", "HEPAR-4401"]
  },
  {
    id: 57,
    tier: 6,
    sceneType: "morgue",
    title: "Caso 57: Vehículos Fantasma",
    subtitle: "Callejón de Emergencia • Clínica",
    description: "Furgonetas y autos sin identificar que ingresan pacientes clandestinos por la puerta trasera.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "REGISTRO DE GUARDIA NOCTURNA",
    sourceText: `El tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nUn periódico viejo volaba arrastrado por la brisa otoñal.\n\nVEHÍCULOS EN LA PUERTA TRASERA:
1) VAN-42X
2) CAR-99A
3) AMB-00 (Oficial)
4) VAN-11Z\n\nEl viento soplaba friamente en la calle principal.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nEn la radio se informaba sobre las bajas temperaturas.`,
    task: "Filtra los vehículos no registrados con prefijo 'VAN' o 'CAR', guion, 2 dígitos y una letra mayúscula final.",
    hint: "Usa un grupo sin captura '(?:VAN|CAR)' seguido de guion, \\d{2} y [A-Z].",
    recommendedRegex: "(?:VAN|CAR)-\\d{2}[A-Z]",
    recommendedFlags: "g",
    expectedMatches: ["VAN-42X", "CAR-99A", "VAN-11Z"]
  },
  {
    id: 58,
    tier: 6,
    sceneType: "morgue",
    title: "Caso 58: Contratos Sellados con Sangre",
    subtitle: "Caja de Pergaminos Clandestinos",
    description: "Contratos milenarios donde cada deudor se identifica al final de la línea como deudor oficial.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "ARCHIVOS PERGAMINADOS",
    sourceText: `La sirena de una ambulancia resonó a varias calles de distancia.\nEl viento soplaba friamente en la calle principal.\nUna figura envuelta en una gabardina cruzó la avenida.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\n\nCONTRATOS DE SANGRE:
Contrato de Arthur Miller: DEUDOR_1002
Contrato roto por muerte prematura
Contrato de Sarah Vance: DEUDOR_4491
Contrato inválido\nUn coche negro aceleró y dobló la esquina rápidamente.\nUn archivo polvoriento reposaba sobre el escritorio.`,
    task: "Encuentra las firmas de deudores que finalizan la línea con 'DEUDOR_' y 4 números exactos.",
    hint: "Combina la palabra clave con dígitos cuantificados y el ancla de fin de línea '$'.",
    recommendedRegex: "DEUDOR_\\d{4}$",
    recommendedFlags: "gm",
    expectedMatches: ["DEUDOR_1002", "DEUDOR_4491"]
  },
  {
    id: 59,
    tier: 6,
    sceneType: "morgue",
    title: "Caso 59: Llamadas de Auxilio Interceptadas",
    subtitle: "Centralita Telefónica Savoy",
    description: "Los deudores faustianos intentaban pedir auxilio al darse cuenta de que su plazo vencía.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "REGISTRO DE CONMUTADOR",
    sourceText: `Un archivo polvoriento reposaba sobre el escritorio.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\n\nLLAMADAS DE ALERTA:
Operadora: CALL-102-11
Operadora: CALL-994-55
Emergencia: 911
Operadora: CALL-881-99\n\nEl detective suspiró mientras encendía otro cigarrillo.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.`,
    task: "Extrae los registros de llamadas que inician con 'CALL-', 3 dígitos, guion y 2 dígitos.",
    hint: "Estructura 'CALL-\\d{3}-\\d{2}' con precisión de cifras.",
    recommendedRegex: "CALL-\\d{3}-\\d{2}",
    recommendedFlags: "g",
    expectedMatches: ["CALL-102-11", "CALL-994-55", "CALL-881-99"]
  },
  {
    id: 60,
    tier: 6,
    sceneType: "morgue",
    title: "Caso 60: La Caja Blindada de Vance",
    subtitle: "Despacho Forense • Bóveda Secreta",
    description: "Vance protege las pruebas originales recolectadas en una caja de seguridad con código maestro.",
    type: "construction",
    timeLimit: 55,
    maxAttempts: 3,
    documentTitle: "SISTEMA DE SEGURIDAD PRIVADO",
    sourceText: `La música de jazz sonaba suavemente desde un tocadiscos lejano.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nNadie se atrevía a caminar por ese sector después del anochecer.\n\nARCHIVADORES BLINDADOS:
Caja de Homicidios: VANCE_SAFE_10029
Caja de Drogas: VANCE_SAFE_44019
Caja común: SAFE_11
Caja de Aduana: VANCE_SAFE_88310\nEn la radio se informaba sobre las bajas temperaturas.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.`,
    task: "Encuentra los identificadores que comienzan con 'VANCE_SAFE_' y tienen exactamente 5 números.",
    hint: "Combina el prefijo literal con \\d{5}.",
    recommendedRegex: "VANCE_SAFE_\\d{5}",
    recommendedFlags: "g",
    expectedMatches: ["VANCE_SAFE_10029", "VANCE_SAFE_44019", "VANCE_SAFE_88310"]
  },

  // ========================================================
  // TIER 7: AGENTE ESPECIAL ENCUBIERTO (Niveles 61 a 70) - Acto IV
  // Tiempo: 50s + 3 Vidas. Citas textuales, químicos y catacumbas.
  // ========================================================
  {
    id: 61,
    tier: 7,
    sceneType: "boiler_room",
    title: "Caso 61: Declaraciones Textuales en Actas",
    subtitle: "Despacho Judicial de la Dra. Cross",
    description: "Citas textuales entre comillas donde se describen las apariciones del demonio en la noche.",
    type: "construction",
    timeLimit: 50,
    maxAttempts: 3,
    documentTitle: "ACTA JUDICIAL CONFIDENCIAL",
    sourceText: `La música de jazz sonaba suavemente desde un tocadiscos lejano.\nUn archivo polvoriento reposaba sobre el escritorio.\nEl barman limpiaba distraídamente un vaso de cristal.\n\nCONFESIÓN BAJO JURAMENTO:
La doctora declaró: "el plazo de las almas nunca se prorroga" ante el tribunal.
El fiscal anotó: "las cirugías no son humanas" en su informe.\n\nNadie parecía notar el rastro dejado en el asfalto mojado.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.`,
    task: "Aísla cada frase textual entrecomillada de manera individual utilizando cuantificadores perezosos.",
    hint: "Usa comillas dobles y comodín perezoso \".+?\".",
    recommendedRegex: "\".+?\"",
    recommendedFlags: "g",
    expectedMatches: ["\"el plazo de las almas nunca se prorroga\"", "\"las cirugías no son humanas\""]
  },
  {
    id: 62,
    tier: 7,
    sceneType: "boiler_room",
    title: "Caso 62: Dosificación de Conservante Celular",
    subtitle: "Laboratorio Químico de la Morgue",
    description: "Mililitros exactos de suero biológico usados para mantener frescos los riñones y corazones.",
    type: "construction",
    timeLimit: 50,
    maxAttempts: 3,
    documentTitle: "HOJA DE DOSIFICACIÓN CLÍNICA",
    sourceText: `Un relámpago iluminó el cielo amenazando con una tormenta inminente.\nEl viento soplaba friamente en la calle principal.\nUn archivo polvoriento reposaba sobre el escritorio.\nEn la radio se informaba sobre las bajas temperaturas.\n\nDOSIS PREPARADAS:
Dosis Riñón: 25.50ml
Dosis Córnea: 5.75ml
Dosis desechada: 10ml
Dosis Corazón: 100.25ml\n\nEl olor a salitre y humo impregnaba el ambiente portuario.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nUn gato negro saltó desde el muro y desapareció en las sombras.`,
    task: "Captura los volúmenes en mililitros que incluyan exactamente dos decimales seguidos de la unidad 'ml'.",
    hint: "Combina uno o más dígitos, punto decimal escapado, dos dígitos y 'ml'.",
    recommendedRegex: "\\d+\\.\\d{2}ml",
    recommendedFlags: "g",
    expectedMatches: ["25.50ml", "5.75ml", "100.25ml"]
  },
  {
    id: 63,
    tier: 7,
    sceneType: "boiler_room",
    title: "Caso 63: El Criptograma de Compatibilidad",
    subtitle: "Morgue Central • Algoritmo de Falcone",
    description: "El clasificador del sindicato comprueba muestras de sangre o médula con resultado POS o NEG.",
    type: "criminal_cipher",
    timeLimit: 50,
    maxAttempts: 3,
    documentTitle: "CIRCUITO DEL ANALIZADOR DE TEJIDO",
    criminalRegex: "^(?:SANGRE|MEDULA)_[A-Z]{2}_(POS|NEG)$",
    criminalFlags: "m",
    sourceText: `Las alcantarillas emitían un leve vapor debido al frío de la madrugada.\nUn archivo polvoriento reposaba sobre el escritorio.\nEl viento soplaba friamente en la calle principal.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nNadie se atrevía a caminar por ese sector después del anochecer.\n\nMUESTRAS BIOLÓGICAS:
Línea 1: SANGRE_AB_POS
Línea 2: TEJIDO_XX_POS
Línea 3: MEDULA_OR_NEG
Línea 4: SANGRE_A_POS\n\nUn gato negro saltó desde el muro y desapareció en las sombras.\nEl eco del agua goteando de una tubería rota marcaba el ritmo de la espera.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nEl detective suspiró mientras encendía otro cigarrillo.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.`,
    question: "¿Cuáles muestras son validadas por ^(?:SANGRE|MEDULA)_[A-Z]{2}_(POS|NEG)$?",
    options: [
      { id: "opt_a", text: "Solo la Línea 1", isCorrect: false, feedback: "Incorrecto: La línea 3 (MEDULA_OR_NEG) también coincide perfectamente." },
      { id: "opt_b", text: "Las Líneas 1 y 3 (SANGRE_AB_POS y MEDULA_OR_NEG)", isCorrect: true, feedback: "¡Exacto! Cumplen el tipo de muestra, 2 letras de grupo y el estado POS o NEG." },
      { id: "opt_c", text: "Todas las líneas", isCorrect: false, feedback: "Incorrecto: Ni TEJIDO ni SANGRE_A cumplen las 2 letras obligatorias." }
    ]
  },
  {
    id: 64,
    tier: 7,
    sceneType: "boiler_room",
    title: "Caso 64: Instrumental Quirúrgico Militar",
    subtitle: "Aduana Portuaria • Caja Fuerte 4",
    description: "Cajas de instrumental importadas clandestinamente con prefijo 'SURGERY-' y 4 números.",
    type: "construction",
    timeLimit: 50,
    maxAttempts: 3,
    documentTitle: "MANIFIESTO DE IMPORTACIÓN",
    sourceText: `El tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nEl viento soplaba friamente en la calle principal.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nCAJAS IMPORTADAS:
Lote 1: SURGERY-1092 (Bisturís)
Lote 2: SURGERY-4491 (Sierras de hueso)
Lote 3: MED-11 (Común)
Lote 4: SURGERY-8812 (Catéteres)\n\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nLos ecos de pasos apresurados resonaban en el callejón vacío.`,
    task: "Localiza los números de lote del instrumental que inician con 'SURGERY-' y tienen 4 dígitos.",
    hint: "Escribe 'SURGERY-\\d{4}'.",
    recommendedRegex: "SURGERY-\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["SURGERY-1092", "SURGERY-4491", "SURGERY-8812"]
  },
  {
    id: 65,
    tier: 7,
    sceneType: "boiler_room",
    title: "Caso 65: Los Candelabros del Santuario",
    subtitle: "Catacumbas • Entrada al Círculo",
    description: "Candelabros encendidos para el ritual de invocación marcados como activos.",
    type: "construction",
    timeLimit: 50,
    maxAttempts: 3,
    documentTitle: "REGISTRO DE LLAMAS RITUALES",
    sourceText: `El candado de la puerta trasera parecía oxidado pero intacto.\nUna figura envuelta en una gabardina cruzó la avenida.\nEl barman limpiaba distraídamente un vaso de cristal.\nEn la radio se informaba sobre las bajas temperaturas.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\n\nESTADO DE CANDELABROS:
Candelabro 1: CANDLE_01_ON
Candelabro 2: CANDLE_02_ON
Candelabro 3: CANDLE_03_OFF
Candelabro 4: TORCH_01_ON\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nEl eco del agua goteando de una tubería rota marcaba el ritmo de la espera.\nEl viento soplaba friamente en la calle principal.\nUn archivo polvoriento reposaba sobre el escritorio.`,
    task: "Encuentra los candelabros rituales activos que inician con 'CANDLE_', 2 dígitos y finalizan en '_ON'.",
    hint: "Estructura 'CANDLE_\\d{2}_ON'.",
    recommendedRegex: "CANDLE_\\d{2}_ON",
    recommendedFlags: "g",
    expectedMatches: ["CANDLE_01_ON", "CANDLE_02_ON"]
  },
  {
    id: 66,
    tier: 7,
    sceneType: "boiler_room",
    title: "Caso 66: Las Palabras del Pacto",
    subtitle: "Habitación 404 • Mensaje en Cenizas",
    description: "Papeles quemados en la chimenea donde se lee el encabezado ritual del pacto con palabras de 6 mayúsculas.",
    type: "construction",
    timeLimit: 50,
    maxAttempts: 3,
    documentTitle: "FRAGMENTO RESCATADO DEL FUEGO",
    sourceText: `El olor a café rancio inundaba la oficina del investigador.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\n\nFRAGMENTO:
El encabezado decía: PACTO: PACTUM en la primera línea.
En la segunda decía: PACTO: MORTEM sellado con sangre.
En la tercera decía: PACTO: NO válido.\n\nEl viento soplaba friamente en la calle principal.\nEn la radio se informaba sobre las bajas temperaturas.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.`,
    task: "Captura los nombres rituales de 6 letras mayúsculas precedidos por 'PACTO: '.",
    hint: "Escribe 'PACTO:\\s' seguido de una clase de mayúsculas de 6 repeticiones.",
    recommendedRegex: "PACTO:\\s[A-Z]{6}",
    recommendedFlags: "g",
    expectedMatches: ["PACTO: PACTUM", "PACTO: MORTEM"]
  },
  {
    id: 67,
    tier: 7,
    sceneType: "boiler_room",
    title: "Caso 67: Cámaras Clandestinas del Hampa",
    subtitle: "Callejón de Miller • Farolas Vigiladas",
    description: "Dispositivos ópticos instalados por Falcone para vigilar a los policías que se acercan a la clínica.",
    type: "construction",
    timeLimit: 50,
    maxAttempts: 3,
    documentTitle: "RECONOCIMIENTO DE DISPOSITIVOS ÓPTICOS",
    sourceText: `El viento soplaba friamente en la calle principal.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nCÁMARAS DETECTADAS:
Poste A: CAM-01-A
Poste B: CAM-02-B
Farola C: LIGHT-99
Poste D: CAM-03-C\n\nLa sirena de una ambulancia resonó a varias calles de distancia.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nEl olor a café rancio inundaba la oficina del investigador.\nEl barman limpiaba distraídamente un vaso de cristal.\nEl detective suspiró mientras encendía otro cigarrillo.`,
    task: "Extrae los identificadores de cámaras formados por 'CAM-', dos dígitos, guion y una letra mayúscula.",
    hint: "Usa 'CAM-\\d{2}-[A-Z]'.",
    recommendedRegex: "CAM-\\d{2}-[A-Z]",
    recommendedFlags: "g",
    expectedMatches: ["CAM-01-A", "CAM-02-B", "CAM-03-C"]
  },
  {
    id: 68,
    tier: 7,
    sceneType: "boiler_room",
    title: "Caso 68: Servidores Satélite del Sanatorio",
    subtitle: "Terminal Central de Redes",
    description: "Direcciones IP privadas de la red hospitalaria clandestina que inician en 10 o 192.",
    type: "construction",
    timeLimit: 50,
    maxAttempts: 3,
    documentTitle: "TABLA DE RUTEO PRIVADA",
    sourceText: `El barman limpiaba distraídamente un vaso de cristal.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nDIRECCIONES IP DE LA CLÍNICA:
1) 10.0.1.50
2) 192.168.1.100
3) 8.8.8.8 (Pública descartada)
4) 10.200.5.1\n\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nEl viento soplaba friamente en la calle principal.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.`,
    task: "Filtra las IPs privadas que comienzan por '10.' o '192.' seguidas de sus correspondientes octetos numéricos.",
    hint: "Usa un grupo sin captura para los dos comienzos posibles seguido de los tres bloques de dígitos restantes.",
    recommendedRegex: "(?:10|192)\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}",
    recommendedFlags: "g",
    expectedMatches: ["10.0.1.50", "192.168.1.100", "10.200.5.1"]
  },
  {
    id: 69,
    tier: 7,
    sceneType: "boiler_room",
    title: "Caso 69: Rótulos entre Llaves",
    subtitle: "Morgue de la Dra. Cross • Sala B",
    description: "Etiquetas sagradas talladas entre llaves literales en los frascos de trasplante primario.",
    type: "construction",
    timeLimit: 50,
    maxAttempts: 3,
    documentTitle: "FRASCOS CON CÓDIGOS DE CIRUGÍA",
    sourceText: `Los ecos de pasos apresurados resonaban en el callejón vacío.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nNadie se atrevía a caminar por ese sector después del anochecer.\nFRASCOS DE ALTA PRIORIDAD:
Frasco {COR} preparado para trasplante.
Frasco {REN} en refrigerador.
Frasco sin llaves.
Frasco {HEPAR} listo.\n\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nEl detective suspiró mientras encendía otro cigarrillo.\nEn la radio se informaba sobre las bajas temperaturas.`,
    task: "Captura los términos en mayúsculas encerrados entre llaves literales '{' y '}'.",
    hint: "Escapa las llaves \\{ y \\} con una clase mayúscula adentro.",
    recommendedRegex: "\\{[A-Z]+\\}",
    recommendedFlags: "g",
    expectedMatches: ["{COR}", "{REN}", "{HEPAR}"]
  },
  {
    id: 70,
    tier: 7,
    sceneType: "boiler_room",
    title: "Caso 70: Tokens de la Junta Directiva",
    subtitle: "Despacho del Banco Central",
    description: "Tokens alfanuméricos de 6 caracteres con los que los senadores aprueban las transferencias ilícitas.",
    type: "construction",
    timeLimit: 50,
    maxAttempts: 3,
    documentTitle: "AUTORIZACIONES BANCARIAS",
    sourceText: `Las huellas en el barro indicaban que alguien había estado allí recientemente.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nUn coche negro aceleró y dobló la esquina rápidamente.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nEl barman limpiaba distraídamente un vaso de cristal.\nUna figura envuelta en una gabardina cruzó la avenida.\n\nTOKENS DE AUTORIZACIÓN:
Aprobado: AUTH-AB12CD
Aprobado: AUTH-99ZZ88
Rechazado: AUTH-00 (Muy corto)
Aprobado: AUTH-KL44MN\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nEn la radio se informaba sobre las bajas temperaturas.`,
    task: "Localiza los tokens oficiales que inician con 'AUTH-' y poseen exactamente 6 caracteres alfanuméricos.",
    hint: "Combina 'AUTH-' con [A-Z0-9]{6}.",
    recommendedRegex: "AUTH-[A-Z0-9]{6}",
    recommendedFlags: "g",
    expectedMatches: ["AUTH-AB12CD", "AUTH-99ZZ88", "AUTH-KL44MN"]
  },

  // ========================================================
  // TIER 8: UNIDAD DE DELITOS MAYORES (Niveles 71 a 80) - Acto IV
  // Tiempo: 45s + 3 Vidas. Lookbehinds, negaciones y candelabros.
  // ========================================================
  {
    id: 71,
    tier: 8,
    sceneType: "server_room",
    title: "Caso 71: Lookbehind de Tarifas Clínicas",
    subtitle: "Archivo de la Dra. Cross",
    description: "Precios de rescate y adquisición de órganos precedidos de la palabra 'COSTE: '.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "TARIFARIO PRIVADO",
    sourceText: `Gotas de lluvia golpeaban incesantemente el cristal de la ventana.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nEn la radio se informaba sobre las bajas temperaturas.\nEl olor a salitre y humo impregnaba el ambiente portuario.\n\nPRESUPUESTOS CLÍNICOS:
COSTE: $5000 (Riñón sano)
RESERVA: $200 (Adelanto)
COSTE: $12000 (Corazón joven)
ENVIO: $50\nUna figura envuelta en una gabardina cruzó la avenida.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nEl detective suspiró mientras encendía otro cigarrillo.`,
    task: "Extrae únicamente los montos en dólares precedidos por 'COSTE: ' sin incluir dicha palabra en la coincidencia.",
    hint: "Aplica un lookbehind positivo (?<=COSTE:\\s) seguido del signo de dólar escapado y dígitos.",
    recommendedRegex: "(?<=COSTE:\\s)\\$\\d+",
    recommendedFlags: "g",
    expectedMatches: ["$5000", "$12000"]
  },
  {
    id: 72,
    tier: 8,
    sceneType: "server_room",
    title: "Caso 72: Líquidos No Tóxicos",
    subtitle: "Muelle de Carga • Bodega de Barriles",
    description: "Barriles de conservantes biológicos seguros rotulados como 'LIQUIDO' que NO correspondan a sustancias tóxicas.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "INSPECCIÓN DE BARRILES QUÍMICOS",
    sourceText: `Nadie parecía notar el rastro dejado en el asfalto mojado.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nEl barman limpiaba distraídamente un vaso de cristal.\nEl viento soplaba friamente en la calle principal.\nBARRILES EN BODEGA:
LIQUIDO SALINO
LIQUIDO TOXICO (Peligro)
LIQUIDO CELULAR\n\nUn gato negro saltó desde el muro y desapareció en las sombras.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.`,
    task: "Captura la palabra 'LIQUIDO' solo cuando NO esté seguida de la etiqueta 'TOXICO'.",
    hint: "Utiliza un lookahead negativo (?<!\\sTOXICO) o (?!\\sTOXICO).",
    recommendedRegex: "LIQUIDO(?!\\sTOXICO)",
    recommendedFlags: "g",
    expectedMatches: ["LIQUIDO", "LIQUIDO"]
  },
  {
    id: 73,
    tier: 8,
    sceneType: "server_room",
    title: "Caso 73: Detonador Múltiple de Falcone",
    subtitle: "Búnker de la Calle 8",
    description: "El detonador del escondite de Falcone se activa solo con comandos de detonación armada.",
    type: "criminal_cipher",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "CIRCUITO DEL DETONADOR MÚLTIPLE",
    criminalRegex: "^(?:DET|ARM)_\\d{3}_(?:READY|FIRE)$",
    criminalFlags: "m",
    sourceText: `Las gaviotas revoloteaban sobre los barcos pesqueros.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nUna figura envuelta en una gabardina cruzó la avenida.\nEl olor a café rancio inundaba la oficina del investigador.\nEl detective suspiró mientras encendía otro cigarrillo.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nSEÑALES DE CONTROL:
1: DET_101_READY
2: BOM_555_FIRE
3: ARM_882_FIRE
4: DET_99_READY\nEl eco del agua goteando de una tubería rota marcaba el ritmo de la espera.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nUn gato negro saltó desde el muro y desapareció en las sombras.`,
    question: "¿Cuáles señales activan el detonador con la regla ^(?:DET|ARM)_\\d{3}_(?:READY|FIRE)$?",
    options: [
      { id: "opt_a", text: "Solo la Señal 1", isCorrect: false, feedback: "Incorrecto: La señal 3 también cumple el prefijo ARM, 3 dígitos y FIRE." },
      { id: "opt_b", text: "Las Señales 1 y 3 (DET_101_READY y ARM_882_FIRE)", isCorrect: true, feedback: "¡Desactivado! Ambas cumplen el prefijo, los 3 dígitos y el sufijo autorizado." },
      { id: "opt_c", text: "Todas las señales", isCorrect: false, feedback: "Incorrecto: La señal 2 tiene prefijo BOM y la señal 4 solo tiene 2 dígitos." }
    ]
  },
  {
    id: 74,
    tier: 8,
    sceneType: "server_room",
    title: "Caso 74: Runas Grabadas en la Piedra",
    subtitle: "Umbral del Santuario Subterráneo",
    description: "Símbolos mágicos grabados en la puerta de piedra con código hexadecimal de 4 caracteres.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "INSCRIPCIONES EN EL PORTAL",
    sourceText: `Gotas de lluvia golpeaban incesantemente el cristal de la ventana.\nEl detective suspiró mientras encendía otro cigarrillo.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\n\nSÍMBOLOS EN EL ARCO:
Runa 1: RUNE_A1F0 (Brillante)
Runa 2: RUNE_3B9C (Brillante)
Runa 3: RUNE_ZZ (Invalida)
Runa 4: RUNE_F882 (Brillante)\n\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nEl viento soplaba friamente en la calle principal.`,
    task: "Extrae los códigos de runa válidos que inician con 'RUNE_' y tienen 4 caracteres hexadecimales (letras A-F o números 0-9).",
    hint: "Combina 'RUNE_' con una clase [A-F0-9] cuantificada a 4.",
    recommendedRegex: "RUNE_[A-F0-9]{4}",
    recommendedFlags: "g",
    expectedMatches: ["RUNE_A1F0", "RUNE_3B9C", "RUNE_F882"]
  },
  {
    id: 75,
    tier: 8,
    sceneType: "server_room",
    title: "Caso 75: Nombres en Clave de Senadores",
    subtitle: "Despacho Central • Archivo Clasificado",
    description: "Identificadores en clave de los senadores y magistrados que recibieron trasplantes ilegales.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "LISTA DE BENEFICIARIOS POLÍTICOS",
    sourceText: `El viento soplaba friamente en la calle principal.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nUn archivo polvoriento reposaba sobre el escritorio.\nMAGISTRADOS OPERADOS:
Paciente: SENATOR-WSH
Paciente: SENATOR-BOS
Paciente: JUEZ-01 (Sin código)
Paciente: SENATOR-CHI\n\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nEn la radio se informaba sobre las bajas temperaturas.\nNadie parecía notar el rastro dejado en el asfalto mojado.`,
    task: "Encuentra los identificadores que comienzan con 'SENATOR-' y terminan en 3 letras mayúsculas.",
    hint: "Usa 'SENATOR-[A-Z]{3}'.",
    recommendedRegex: "SENATOR-[A-Z]{3}",
    recommendedFlags: "g",
    expectedMatches: ["SENATOR-WSH", "SENATOR-BOS", "SENATOR-CHI"]
  },
  {
    id: 76,
    tier: 8,
    sceneType: "server_room",
    title: "Caso 76: Temperaturas de Criogenización",
    subtitle: "Cámara Frigorífica de la Morgue",
    description: "Lecturas térmicas bajo cero de los congeladores de órganos que inician con signo negativo y símbolo de grado.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "TERMÓMETROS DE CONGELACIÓN",
    sourceText: `El viento soplaba friamente en la calle principal.\nEl olor a café rancio inundaba la oficina del investigador.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nUna figura envuelta en una gabardina cruzó la avenida.\n\nREGISTRO TÉRMICO:
Congelador A: -18°C
Congelador B: -24°C
Ambiente: +20°C
Congelador C: -40°C\n\nUn coche negro aceleró y dobló la esquina rápidamente.\nEn la radio se informaba sobre las bajas temperaturas.\nUn periódico viejo volaba arrastrado por la brisa otoñal.\nUn archivo polvoriento reposaba sobre el escritorio.\nNadie se atrevía a caminar por ese sector después del anochecer.\nEl barman limpiaba distraídamente un vaso de cristal.`,
    task: "Captura los registros de temperatura bajo cero que inician con '-', dos cifras y terminan en '°C'.",
    hint: "Combina '-', \\d{2} y '°C'.",
    recommendedRegex: "-\\d{2}°C",
    recommendedFlags: "g",
    expectedMatches: ["-18°C", "-24°C", "-40°C"]
  },
  {
    id: 77,
    tier: 8,
    sceneType: "server_room",
    title: "Caso 77: Líneas Eléctricas de Emergencia",
    subtitle: "Subestación del Muelle",
    description: "Líneas de energía de alta tensión que mantienen activos los congeladores portuarios.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "PANEL DE CONTROL ELÉCTRICO",
    sourceText: `Nadie parecía notar el rastro dejado en el asfalto mojado.\nEl olor a café rancio inundaba la oficina del investigador.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nUna figura envuelta en una gabardina cruzó la avenida.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nEn la radio se informaba sobre las bajas temperaturas.\nCIRCUITOS ACTIVOS:
Circuito 1: LINEA_101_OK
Circuito 2: LINEA_882_OK
Circuito 3: LINEA_12_FALLA
Circuito 4: LINEA_440_OK\n\nNadie se atrevía a caminar por ese sector después del anochecer.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nEl viento soplaba friamente en la calle principal.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nEl detective suspiró mientras encendía otro cigarrillo.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nUn gato negro saltó desde el muro y desapareció en las sombras.`,
    task: "Aísla las líneas activas que inician con 'LINEA_', 3 dígitos y concluyen con '_OK'.",
    hint: "Estructura 'LINEA_\\d{3}_OK'.",
    recommendedRegex: "LINEA_\\d{3}_OK",
    recommendedFlags: "g",
    expectedMatches: ["LINEA_101_OK", "LINEA_882_OK", "LINEA_440_OK"]
  },
  {
    id: 78,
    tier: 8,
    sceneType: "server_room",
    title: "Caso 78: Órdenes de Captura de Fiscales",
    subtitle: "Despacho del Comisario Briggs",
    description: "Órdenes judiciales emitidas para arrestar a los fiscales cómplices de la clínica.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "MANDATOS JUDICIALES",
    sourceText: `Los ecos de pasos apresurados resonaban en el callejón vacío.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nORDENES DE DETENCIÓN:
Caso A: WARRANT-10029 (Fiscal Davis)
Caso B: WARRANT-44019 (Juez Taylor)
Caso C: AVISO-11 (Invalido)
Caso D: WARRANT-88310 (Comisionado Adjunto)\n\nEl detective suspiró mientras encendía otro cigarrillo.\nLa sirena de una ambulancia resonó a varias calles de distancia.\nEl olor a café rancio inundaba la oficina del investigador.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nUn coche negro aceleró y dobló la esquina rápidamente.\nLas gaviotas revoloteaban sobre los barcos pesqueros.`,
    task: "Captura los mandatos judiciales de captura que inician con 'WARRANT-' y tienen 5 números.",
    hint: "Combina 'WARRANT-' con \\d{5}.",
    recommendedRegex: "WARRANT-\\d{5}",
    recommendedFlags: "g",
    expectedMatches: ["WARRANT-10029", "WARRANT-44019", "WARRANT-88310"]
  },
  {
    id: 79,
    tier: 8,
    sceneType: "server_room",
    title: "Caso 79: Las Velas Negras del Pacto",
    subtitle: "Altar Subterráneo de Malphas",
    description: "Velas consagradas con sebo humano para alimentar la presencia del demonio.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "INVENTARIO DEL ALTAR",
    sourceText: `El viento soplaba friamente en la calle principal.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nVELAS DEL RITUAL:
Altar norte: CANDLE_BLACK_1
Altar este: CANDLE_BLACK_5
Altar roto: CANDLE_WHITE_0
Altar oeste: CANDLE_BLACK_9\n\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nUn archivo polvoriento reposaba sobre el escritorio.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nNadie se atrevía a caminar por ese sector después del anochecer.\nLas cajas apiladas formaban un laberinto casi impenetrable.\nEl barman limpiaba distraídamente un vaso de cristal.`,
    task: "Localiza las velas oscuras consagradas identificadas con 'CANDLE_BLACK_' y uno o más números.",
    hint: "Escribe 'CANDLE_BLACK_\\d+'.",
    recommendedRegex: "CANDLE_BLACK_\\d+",
    recommendedFlags: "g",
    expectedMatches: ["CANDLE_BLACK_1", "CANDLE_BLACK_5", "CANDLE_BLACK_9"]
  },
  {
    id: 80,
    tier: 8,
    sceneType: "server_room",
    title: "Caso 80: El Cerrojo de la Bóveda de Malphas",
    subtitle: "Entrada a las Profundidades",
    description: "Cerradura de triple combinación que custodia el arcón primigenio del contrato.",
    type: "construction",
    timeLimit: 45,
    maxAttempts: 3,
    documentTitle: "CERRADURA DE HIERRO FORJADO",
    sourceText: `Las gaviotas revoloteaban sobre los barcos pesqueros.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nLa sirena de una ambulancia resonó a varias calles de distancia.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nEl barman limpiaba distraídamente un vaso de cristal.\nUn archivo polvoriento reposaba sobre el escritorio.\n\nCOMBINACIONES CANDIDATAS:
Cerradura 1: VAULT-AB-1029 (Aprobada)
Cerradura 2: VAULT-CD-4401 (Aprobada)
Cerradura 3: VAULT-11-XX (Invalida)
Cerradura 4: VAULT-EF-8812 (Aprobada)\n\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nNadie se atrevía a caminar por ese sector después del anochecer.`,
    task: "Encuentra las combinaciones que inician con 'VAULT-', 2 letras mayúsculas, guion y 4 números.",
    hint: "Usa 'VAULT-[A-Z]{2}-\\d{4}'.",
    recommendedRegex: "VAULT-[A-Z]{2}-\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["VAULT-AB-1029", "VAULT-CD-4401", "VAULT-EF-8812"]
  },

  // ========================================================
  // TIER 9: AUDITORÍA ANTITERRORISTA (Niveles 81 a 90) - Acto V
  // Tiempo: 35s + 3 Vidas. ReDoS avanzado, mercurio y calderas.
  // ========================================================
  {
    id: 81,
    tier: 9,
    sceneType: "sanctuary",
    title: "Caso 81: La Trampa de ReDoS Anidado",
    subtitle: "Terminal Central de Redes",
    description: "El demonio introdujo un patrón malicioso ^(x+)+y$ que congela los servidores policiales.",
    type: "criminal_cipher",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "ALERTA DE SEGURIDAD DEL SISTEMA",
    criminalRegex: "^(x+)+y$",
    criminalFlags: "",
    sourceText: `Un periódico viejo volaba arrastrado por la brisa otoñal.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nLa sirena de una ambulancia resonó a varias calles de distancia.\nUn archivo polvoriento reposaba sobre el escritorio.\nCADENA ANALIZADA:
xxxxxxxxxxxxxxxxxxxxxxxxxxxx (sin 'y' al final)\nUn coche negro aceleró y dobló la esquina rápidamente.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nNadie se atrevía a caminar por ese sector después del anochecer.\nLas cajas apiladas formaban un laberinto casi impenetrable.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.`,
    question: "¿Por qué ^(x+)+y$ produce una denegación de servicio (ReDoS) al fallar la 'y' final?",
    options: [
      { id: "opt_a", text: "Porque el motor de regex prueba todas las particiones posibles de las 'x' de forma exponencial O(2^N) antes de fallar", isCorrect: true, feedback: "¡Magistral! Es la definición teórica del backtracking catastrófico." },
      { id: "opt_b", text: "Porque la letra 'y' no es un carácter válido en expresiones regulares", isCorrect: false, feedback: "Incorrecto: La 'y' es un literal perfectamente válido." },
      { id: "opt_c", text: "Porque falta una barra invertida", isCorrect: false, feedback: "Incorrecto: La sintaxis es válida pero ineficiente." }
    ]
  },
  {
    id: 82,
    tier: 9,
    sceneType: "sanctuary",
    title: "Caso 82: Parche de Blindaje Policial",
    subtitle: "Consola de Seguridad Central",
    description: "Vance implementa un token lineal sin anidamiento para reactivar los sistemas de emergencia.",
    type: "construction",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "TOKEN DE SEGURIDAD LINEAL",
    sourceText: `Un periódico viejo volaba arrastrado por la brisa otoñal.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nEl detective suspiró mientras encendía otro cigarrillo.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nEl barman limpiaba distraídamente un vaso de cristal.\nTOKENS LINEALES:
Token A: SEC_TOKEN_1029
Token B: SEC_TOKEN_4401
Token C: TOKEN_XX (Invalido)
Token D: SEC_TOKEN_8812\n\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nNadie se atrevía a caminar por ese sector después del anochecer.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nLas cajas apiladas formaban un laberinto casi impenetrable.\nEl olor a café rancio inundaba la oficina del investigador.`,
    task: "Verifica los tokens lineales que inician con 'SEC_TOKEN_' y contienen exactamente 4 dígitos.",
    hint: "Estructura 'SEC_TOKEN_\\d{4}'.",
    recommendedRegex: "SEC_TOKEN_\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["SEC_TOKEN_1029", "SEC_TOKEN_4401", "SEC_TOKEN_8812"]
  },
  {
    id: 83,
    tier: 9,
    sceneType: "sanctuary",
    title: "Caso 83: Detonadores de Mercurio",
    subtitle: "Subestación de la Morgue",
    description: "Falcone instaló detonadores de mercurio hipersensibles en las paredes del hospital.",
    type: "construction",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "ESQUEMA DE EXPLOSIVOS DE MERCURIO",
    sourceText: `El olor a café rancio inundaba la oficina del investigador.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\n\nDETONADORES ACTIVOS:
Bomba 1: MERCURY-101-A
Bomba 2: MERCURY-554-B
Bomba 3: DET-00 (Inerte)
Bomba 4: MERCURY-882-C\n\nUn coche negro aceleró y dobló la esquina rápidamente.\nEn la radio se informaba sobre las bajas temperaturas.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nUn archivo polvoriento reposaba sobre el escritorio.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nEl detective suspiró mientras encendía otro cigarrillo.`,
    task: "Localiza los detonadores que inician con 'MERCURY-', 3 dígitos, guion y una letra mayúscula.",
    hint: "Usa 'MERCURY-\\d{3}-[A-Z]'.",
    recommendedRegex: "MERCURY-\\d{3}-[A-Z]",
    recommendedFlags: "g",
    expectedMatches: ["MERCURY-101-A", "MERCURY-554-B", "MERCURY-882-C"]
  },
  {
    id: 84,
    tier: 9,
    sceneType: "sanctuary",
    title: "Caso 84: El Filtro de Invocación",
    subtitle: "Grimorio Digital de la Dra. Cross",
    description: "La doctora configuró un comando ritual para invocar el alma o la carne de los deudores.",
    type: "criminal_cipher",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "CONSOLA DEL RITUAL",
    criminalRegex: "^INVOKE_[A-Z]{4}_(?:SOUL|FLESH)$",
    criminalFlags: "m",
    sourceText: `El eco del agua goteando de una tubería rota marcaba el ritmo de la espera.\nEl viento soplaba friamente en la calle principal.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nUn archivo polvoriento reposaba sobre el escritorio.\nEl olor a café rancio inundaba la oficina del investigador.\nNadie se atrevía a caminar por ese sector después del anochecer.\n\nCOMANDOS INGRESADOS:
1: INVOKE_DARK_SOUL
2: CALL_LIGHT_FLESH
3: INVOKE_MORT_FLESH
4: INVOKE_AB_SOUL\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nLa sirena de una ambulancia resonó a varias calles de distancia.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nEl detective suspiró mientras encendía otro cigarrillo.`,
    question: "¿Cuáles comandos activan la invocación según ^INVOKE_[A-Z]{4}_(?:SOUL|FLESH)$?",
    options: [
      { id: "opt_a", text: "Solo el 1", isCorrect: false, feedback: "Incorrecto: El comando 3 (INVOKE_MORT_FLESH) también tiene exactamente 4 letras y termina en FLESH." },
      { id: "opt_b", text: "Los comandos 1 y 3 (INVOKE_DARK_SOUL e INVOKE_MORT_FLESH)", isCorrect: true, feedback: "¡Desactivado! Cumplen INVOKE_, 4 letras mayúsculas y SOUL o FLESH." },
      { id: "opt_c", text: "Todos los comandos", isCorrect: false, feedback: "Incorrecto: El 2 tiene prefijo CALL y el 4 solo tiene 2 letras." }
    ]
  },
  {
    id: 85,
    tier: 9,
    sceneType: "sanctuary",
    title: "Caso 85: Coches Bomba en el Callejón",
    subtitle: "Salida de Emergencia de la Clínica",
    description: "Falcone aparcó vehículos cargados con explosivos para impedir que la policía rescate a los heridos.",
    type: "construction",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "RADAR ANTIBOMBAS",
    sourceText: `El detective suspiró mientras encendía otro cigarrillo.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nUn coche negro aceleró y dobló la esquina rápidamente.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\n\nAMENAZAS DETECTADAS:
Auto 1: CAR_BOMB_01 (Cebado)
Auto 2: CAR_BOMB_02 (Cebado)
Auto 3: TAXI_99 (Limpio)
Auto 4: CAR_BOMB_03 (Cebado)\n\nLa sirena de una ambulancia resonó a varias calles de distancia.\nEl viento soplaba friamente en la calle principal.\nUn archivo polvoriento reposaba sobre el escritorio.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nLas cajas apiladas formaban un laberinto casi impenetrable.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nUn periódico viejo volaba arrastrado por la brisa otoñal.`,
    task: "Encuentra los identificadores que comienzan con 'CAR_BOMB_' y concluyen con dos dígitos.",
    hint: "Estructura 'CAR_BOMB_\\d{2}'.",
    recommendedRegex: "CAR_BOMB_\\d{2}",
    recommendedFlags: "g",
    expectedMatches: ["CAR_BOMB_01", "CAR_BOMB_02", "CAR_BOMB_03"]
  },
  {
    id: 86,
    tier: 9,
    sceneType: "sanctuary",
    title: "Caso 86: La Lancha del Capo Carmine Falcone",
    subtitle: "Muelle Privado 2",
    description: "La embarcación blindada de Falcone lista para zarpar con los últimos millones de dólares saqueados.",
    type: "construction",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "VIGILANCIA COSTERA",
    sourceText: `Gotas de lluvia golpeaban incesantemente el cristal de la ventana.\nNadie se atrevía a caminar por ese sector después del anochecer.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nEl eco del agua goteando de una tubería rota marcaba el ritmo de la espera.\nEl detective suspiró mientras encendía otro cigarrillo.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nEMBARCACIONES PRIVADAS:
Lancha de Falcone: FALCONE_ESCAPE_101
Lancha de señuelo: FALCONE_ESCAPE_202
Lancha pesquera: PESCA_01
Lancha de escolta: FALCONE_ESCAPE_303\nUn archivo polvoriento reposaba sobre el escritorio.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nEn la radio se informaba sobre las bajas temperaturas.`,
    task: "Captura los códigos de escape de la lancha de Falcone que inician con 'FALCONE_ESCAPE_' y tienen 3 números.",
    hint: "Escribe 'FALCONE_ESCAPE_\\d{3}'.",
    recommendedRegex: "FALCONE_ESCAPE_\\d{3}",
    recommendedFlags: "g",
    expectedMatches: ["FALCONE_ESCAPE_101", "FALCONE_ESCAPE_202", "FALCONE_ESCAPE_303"]
  },
  {
    id: 87,
    tier: 9,
    sceneType: "sanctuary",
    title: "Caso 87: Huellas No Humanas",
    subtitle: "Mesa de Disección • Rastros Forenses",
    description: "Huellas dactilares aberrantes dejadas sobre el acero que no pertenecen a ninguna especie conocida.",
    type: "construction",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "REPORTE DACTILOSCÓPICO",
    sourceText: `Las cajas apiladas formaban un laberinto casi impenetrable.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nUna figura envuelta en una gabardina cruzó la avenida.\n\nEVIDENCIAS BIOLÓGICAS:
Muestra A: PRINT_NON_HUMAN_01
Muestra B: PRINT_NON_HUMAN_02
Muestra C: PRINT_HUMAN_99
Muestra D: PRINT_NON_HUMAN_03\nUn coche negro aceleró y dobló la esquina rápidamente.\nEl olor a café rancio inundaba la oficina del investigador.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nUn periódico viejo volaba arrastrado por la brisa otoñal.`,
    task: "Aísla los registros de huellas no humanas formados por 'PRINT_NON_HUMAN_' y 2 números.",
    hint: "Usa 'PRINT_NON_HUMAN_\\d{2}'.",
    recommendedRegex: "PRINT_NON_HUMAN_\\d{2}",
    recommendedFlags: "g",
    expectedMatches: ["PRINT_NON_HUMAN_01", "PRINT_NON_HUMAN_02", "PRINT_NON_HUMAN_03"]
  },
  {
    id: 88,
    tier: 9,
    sceneType: "sanctuary",
    title: "Caso 88: Válvulas de Presión Crítica",
    subtitle: "Sala de Calderas del Subsuelo",
    description: "La caldera principal fue saboteada para hacer estallar el santuario si Vance desactiva el altar.",
    type: "construction",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "MONITOR DE PRESIÓN DE VAPOR",
    sourceText: `El viento soplaba friamente en la calle principal.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nVÁLVULAS DE VAPOR:
Válvula 1: VALVE_01_CRITICAL (Sobrepresión)
Válvula 2: VALVE_02_CRITICAL (Sobrepresión)
Válvula 3: VALVE_03_NORMAL
Válvula 4: VALVE_04_CRITICAL (Sobrepresión)\nUn coche negro aceleró y dobló la esquina rápidamente.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nEl detective suspiró mientras encendía otro cigarrillo.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.`,
    task: "Localiza las válvulas en peligro que inician con 'VALVE_', 2 dígitos y finalizan en '_CRITICAL'.",
    hint: "Combina 'VALVE_\\d{2}_CRITICAL'.",
    recommendedRegex: "VALVE_\\d{2}_CRITICAL",
    recommendedFlags: "g",
    expectedMatches: ["VALVE_01_CRITICAL", "VALVE_02_CRITICAL", "VALVE_04_CRITICAL"]
  },
  {
    id: 89,
    tier: 9,
    sceneType: "sanctuary",
    title: "Caso 89: La Confesión de la Dra. Cross",
    subtitle: "Despacho Privado • Caja de Cristal",
    description: "El diario íntimo de la doctora donde confiesa cómo firmó el pacto con Malphas al envejecer.",
    type: "construction",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "DIARIO CONFIDENCIAL DE LA DRA. CROSS",
    sourceText: `Una figura envuelta en una gabardina cruzó la avenida.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nEl viento soplaba friamente en la calle principal.\nEn la radio se informaba sobre las bajas temperaturas.\nNOTAS DEL DIARIO:
Entrada 1: CONFESION_1945
Entrada 2: CONFESION_1946
Entrada descartada: BORRADOR_01
Entrada 3: CONFESION_1947\n\nNadie parecía notar el rastro dejado en el asfalto mojado.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nUn archivo polvoriento reposaba sobre el escritorio.\nLas gaviotas revoloteaban sobre los barcos pesqueros.`,
    task: "Encuentra las entradas del diario que inician con 'CONFESION_' seguidas de 4 números de año.",
    hint: "Estructura 'CONFESION_\\d{4}'.",
    recommendedRegex: "CONFESION_\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["CONFESION_1945", "CONFESION_1946", "CONFESION_1947"]
  },
  {
    id: 90,
    tier: 9,
    sceneType: "sanctuary",
    title: "Caso 90: El Portal Rúnico Abierto",
    subtitle: "Entrada Principal al Sanctum de Malphas",
    description: "Vance utiliza el Tratado de los Ecos para abrir las puertas selladas del abismo.",
    type: "construction",
    timeLimit: 35,
    maxAttempts: 3,
    documentTitle: "FÓRMULA DE APERTURA DEL PORTAL",
    sourceText: `El detective suspiró mientras encendía otro cigarrillo.\nEn la radio se informaba sobre las bajas temperaturas.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nUn periódico viejo volaba arrastrado por la brisa otoñal.\nUna figura envuelta en una gabardina cruzó la avenida.\nPORTALES SUBTERRÁNEOS:
Portal 1: OPEN_GATE_CORP
Portal 2: OPEN_GATE_SOUL
Portal 3: CLOSE_GATE_00
Portal 4: OPEN_GATE_FIRE\nNadie se atrevía a caminar por ese sector después del anochecer.\nEl olor a café rancio inundaba la oficina del investigador.\nLa sirena de una ambulancia resonó a varias calles de distancia.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nNadie parecía notar el rastro dejado en el asfalto mojado.`,
    task: "Abre el portal capturando los comandos que inician con 'OPEN_GATE_' y 4 letras mayúsculas.",
    hint: "Combina 'OPEN_GATE_[A-Z]{4}'.",
    recommendedRegex: "OPEN_GATE_[A-Z]{4}",
    recommendedFlags: "g",
    expectedMatches: ["OPEN_GATE_CORP", "OPEN_GATE_SOUL", "OPEN_GATE_FIRE"]
  },

  // ========================================================
  // TIER 10: COMISIONADO MAESTRO FORENSE (Niveles 91 a 100) - Acto V
  // Tiempo: 30s + 2 Vidas. El Gran Exorcismo y la Derrota de Malphas.
  // ========================================================
  {
    id: 91,
    tier: 10,
    sceneType: "abyss",
    title: "Caso 91: La Firma Espectral de Malphas",
    subtitle: "Círculo de Invocación • Humo Carmesí",
    description: "Lecturas electromagnéticas que capturan la presencia física del demonio en la cripta.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "DETECTOR DE FLUJO ESPECTRAL",
    sourceText: `Una figura envuelta en una gabardina cruzó la avenida.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nEl eco del agua goteando de una tubería rota marcaba el ritmo de la espera.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nEl olor a café rancio inundaba la oficina del investigador.\nLas cajas apiladas formaban un laberinto casi impenetrable.\n\nLECTURAS DE FRECUENCIA:
Señal Alfa: MALPHAS_AURA_101
Señal Beta: MALPHAS_AURA_554
Ruido estático: NOISE_99
Señal Gamma: MALPHAS_AURA_882\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nLos ecos de pasos apresurados resonaban en el callejón vacío.`,
    task: "Identifica las firmas espectrales que inician con 'MALPHAS_AURA_' y tienen 3 números.",
    hint: "Combina 'MALPHAS_AURA_\\d{3}'.",
    recommendedRegex: "MALPHAS_AURA_\\d{3}",
    recommendedFlags: "g",
    expectedMatches: ["MALPHAS_AURA_101", "MALPHAS_AURA_554", "MALPHAS_AURA_882"]
  },
  {
    id: 92,
    tier: 10,
    sceneType: "abyss",
    title: "Caso 92: El Último Camión en el Muelle",
    subtitle: "Muelle 1 • Redada de la Guardia Nacional",
    description: "¡Solo 30 segundos! El camión blindado con las últimas pruebas intenta abordar el buque.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "BLOQUEO NAVAL POLICIAL",
    sourceText: `Un gato negro saltó desde el muro y desapareció en las sombras.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nLas cajas apiladas formaban un laberinto casi impenetrable.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\n\nCAMIONES BLOQUEADOS:
Camión 1: FINAL_TRUCK_101
Camión 2: FINAL_TRUCK_554
Camioneta: CIVIL_12
Camión 3: FINAL_TRUCK_882\n\nNadie se atrevía a caminar por ese sector después del anochecer.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nLa sirena de una ambulancia resonó a varias calles de distancia.\nUna figura envuelta en una gabardina cruzó la avenida.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nLos ecos de pasos apresurados resonaban en el callejón vacío.`,
    task: "Intercepta los camiones fugitivos con prefijo 'FINAL_TRUCK_' y 3 cifras exactas.",
    hint: "Usa 'FINAL_TRUCK_\\d{3}'.",
    recommendedRegex: "FINAL_TRUCK_\\d{3}",
    recommendedFlags: "g",
    expectedMatches: ["FINAL_TRUCK_101", "FINAL_TRUCK_554", "FINAL_TRUCK_882"]
  },
  {
    id: 93,
    tier: 10,
    sceneType: "abyss",
    title: "Caso 93: El C4 del Sanctum Final",
    subtitle: "Bóveda de Malphas • Carga de Demolición",
    description: "Falcone programó la carga final de C4 para colapsar las catacumbas enteras sobre el detective.",
    type: "criminal_cipher",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "CIRCUITO DEL DETONADOR SUPREMO",
    criminalRegex: "^(?:OMEGA|FINAL)_\\d{4}_EXTERMINATE$",
    criminalFlags: "m",
    sourceText: `El semáforo parpadeaba en amarillo sin que nadie lo respetara.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nUn gato negro saltó desde el muro y desapareció en las sombras.\n\nSEÑALES DETECTADAS:
1: OMEGA_9941_EXTERMINATE
2: ALPHA_1102_EXTERMINATE
3: FINAL_8820_EXTERMINATE
4: OMEGA_12_EXTERMINATE\n\nEl viento soplaba friamente en la calle principal.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nUn coche negro aceleró y dobló la esquina rápidamente.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nEn la radio se informaba sobre las bajas temperaturas.`,
    question: "¿Cuáles señales coinciden con el detonador de demolición de la bóveda?",
    options: [
      { id: "opt_a", text: "Solo la Señal 1", isCorrect: false, feedback: "Incorrecto: La señal 3 (FINAL_8820_EXTERMINATE) también es válida." },
      { id: "opt_b", text: "Las Señales 1 y 3 (OMEGA_9941_EXTERMINATE y FINAL_8820_EXTERMINATE)", isCorrect: true, feedback: "¡DESACTIVASTE EL C4 FINAL! Cumplen OMEGA/FINAL, 4 dígitos y EXTERMINATE." },
      { id: "opt_c", text: "Todas las señales", isCorrect: false, feedback: "Incorrecto: La señal 2 tiene prefijo ALPHA y la 4 solo tiene 2 dígitos." }
    ]
  },
  {
    id: 94,
    tier: 10,
    sceneType: "abyss",
    title: "Caso 94: El Espejo de Azufre",
    subtitle: "Cámara Ritual • Espejo de Sangre",
    description: "Invocaciones reflejadas en el espejo que comienzan con '@DEMON_' y concluyen con el signo de dólar.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "REFLEJO DE AZUFRE EN EL ESPEJO",
    sourceText: `Un archivo polvoriento reposaba sobre el escritorio.\nEl eco del agua goteando de una tubería rota marcaba el ritmo de la espera.\nLa sirena de una ambulancia resonó a varias calles de distancia.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\n@DEMON_MALPHAS_PACT$
TEXTO CORRUPTO
@DEMON_CHAOS_END$
@DEMON_FAIL\n\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nUn coche negro aceleró y dobló la esquina rápidamente.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nEl viento soplaba friamente en la calle principal.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.`,
    task: "Encuentra las inscripciones rituales que comienzan con '@DEMON_' y terminan exactamente con '$'.",
    hint: "Combina '^@DEMON_.+\\$$' con la bandera multilínea 'm' y escapa el dólar final.",
    recommendedRegex: "^@DEMON_.+\\$$",
    recommendedFlags: "gm",
    expectedMatches: ["@DEMON_MALPHAS_PACT$", "@DEMON_CHAOS_END$"]
  },
  {
    id: 95,
    tier: 10,
    sceneType: "abyss",
    title: "Caso 95: Cancelación de la Purga Digital",
    subtitle: "Terminal Central de la Clínica",
    description: "Vance detiene el borrado electromagnético de los expedientes de trasplante antes de que se pierdan.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "PROTOCOLO DE ABORTO DE PURGA",
    sourceText: `Los ecos de pasos apresurados resonaban en el callejón vacío.\nEl viento soplaba friamente en la calle principal.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nLas cajas apiladas formaban un laberinto casi impenetrable.\n\nCOMANDOS DE INTERRUPCIÓN:
Comando 1: ABORT_PURGE_1029
Comando 2: ABORT_PURGE_4401
Comando 3: PURGE_NOW_00
Comando 4: ABORT_PURGE_8812\n\nNadie parecía notar el rastro dejado en el asfalto mojado.\nUna figura envuelta en una gabardina cruzó la avenida.\nUn coche negro aceleró y dobló la esquina rápidamente.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nEl barman limpiaba distraídamente un vaso de cristal.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nEl eco del agua goteando de una tubería rota marcaba el ritmo de la espera.\nEl olor a café rancio inundaba la oficina del investigador.`,
    task: "Detén el borrado aislando los comandos que inician con 'ABORT_PURGE_' y tienen 4 dígitos.",
    hint: "Usa 'ABORT_PURGE_\\d{4}'.",
    recommendedRegex: "ABORT_PURGE_\\d{4}",
    recommendedFlags: "g",
    expectedMatches: ["ABORT_PURGE_1029", "ABORT_PURGE_4401", "ABORT_PURGE_8812"]
  },
  {
    id: 96,
    tier: 10,
    sceneType: "abyss",
    title: "Caso 96: El Grimorio - Estrofa 1 (El Deudor Primigenio)",
    subtitle: "Bóveda de Malphas • El Tratado de los Ecos",
    description: "El libro indica la primera regla del conjuro: 'Una palabra de 6 mayúsculas que selle un pacto al inicio del renglón'. Coteja tus evidencias pasadas.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "EVIDENCIA DEL BANCO CENTRAL (CASO 05/66)",
    sourceText: `El candado de la puerta trasera parecía oxidado pero intacto.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nEl olor a salitre y humo impregnaba el ambiente portuario.\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nUna figura envuelta en una gabardina cruzó la avenida.\nREGISTRO DE CONTRATOS ANTIGUOS:
PACTUM selló el destino de los magnates.
MORTEM fue la consecuencia.
VERITAS prevalecerá al final.\n\nEl detective suspiró mientras encendía otro cigarrillo.\nEl eco del agua goteando de una tubería rota marcaba el ritmo de la espera.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nUn gato negro saltó desde el muro y desapareció en las sombras.`,
    task: "Aplica la primera regla del grimorio: encuentra la palabra de 6 letras mayúsculas ubicada al principio exacto del renglón.",
    hint: "Combina el ancla de inicio '^' con una clase de mayúsculas cuantificada a 6 repeticiones.",
    recommendedRegex: "^[A-Z]{6}",
    recommendedFlags: "gm",
    expectedMatches: ["PACTUM", "MORTEM"]
  },
  {
    id: 97,
    tier: 10,
    sceneType: "abyss",
    title: "Caso 97: El Grimorio - Estrofa 2 (El Cierre Terrenal)",
    subtitle: "Bóveda de Malphas • El Tratado de los Ecos",
    description: "La segunda regla del conjuro: 'El símbolo de clausura que rompe el contrato al final de la línea'. Coteja los telegramas del Caso 23.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "TELEGRAMAS CIFRADOS DEL SINDICATO",
    sourceText: `Los ecos de pasos apresurados resonaban en el callejón vacío.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nLas alcantarillas emitían un leve vapor debido al frío de la madrugada.\nUn periódico viejo volaba arrastrado por la brisa otoñal.\nEl barman limpiaba distraídamente un vaso de cristal.\nDESPACHOS DE LOS SICARIOS:
La primera víctima entregada [FIN]
La extracción de órganos fue completada [FIN]
Transmisión sin terminar\n\nNadie se atrevía a caminar por ese sector después del anochecer.\nEl viento soplaba friamente en la calle principal.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nUn relámpago iluminó el cielo amenazando con una tormenta inminente.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nEl reloj del ayuntamiento marcó la medianoche con un sonido lúgubre.\nLas letras del letrero 'ABIERTO' estaban medio fundidas.\nUn archivo polvoriento reposaba sobre el escritorio.`,
    task: "Encuentra los cierres legítimos del contrato compuestos por '[FIN]' exactamente al final de la línea.",
    hint: "Escapa los corchetes literales \\[ y \\] y añade el ancla de fin de renglón '$'.",
    recommendedRegex: "\\[FIN\\]$",
    recommendedFlags: "gm",
    expectedMatches: ["[FIN]", "[FIN]"]
  },
  {
    id: 98,
    tier: 10,
    sceneType: "abyss",
    title: "Caso 98: El Grimorio - Estrofa 3 (El Vínculo Robado)",
    subtitle: "Bóveda de Malphas • El Tratado de los Ecos",
    description: "La tercera regla: 'El tributo robado en los frascos: selecciona únicamente entre CARNE o COR sin gastar memoria de captura'.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "RÓTULOS DE FRASCOS QUIRÚRGICOS",
    sourceText: `Las letras del letrero 'ABIERTO' estaban medio fundidas.\nLa sirena de una ambulancia resonó a varias calles de distancia.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nEl viento soplaba friamente en la calle principal.\nEn la radio se informaba sobre las bajas temperaturas.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\n\nFRASCOS EN EL ALTAR:
Frasco 1: CARNE de pecadores inocentes
Frasco 2: COR palpitante de la víctima
Frasco 3: OJO de cristal\n\nLos ecos de pasos apresurados resonaban en el callejón vacío.\nEl tren de las 3:15 pasó haciendo vibrar las paredes del edificio.\nNadie se atrevía a caminar por ese sector después del anochecer.\nUn periódico viejo volaba arrastrado por la brisa otoñal.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nUn archivo polvoriento reposaba sobre el escritorio.`,
    task: "Captura las palabras 'CARNE' o 'COR' usando un grupo sin captura.",
    hint: "Utiliza '(?:CARNE|COR)'.",
    recommendedRegex: "(?:CARNE|COR)",
    recommendedFlags: "g",
    expectedMatches: ["CARNE", "COR"]
  },
  {
    id: 99,
    tier: 10,
    sceneType: "abyss",
    title: "Caso 99: El Grimorio - Estrofa 4 (La Verdad Inmune)",
    subtitle: "Bóveda de Malphas • El Tratado de los Ecos",
    description: "La cuarta regla del libro: 'La palabra de la verdad que no esté precedida por el engaño del demonio'.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "INSCRIPCIONES EN EL ESPEJO DEL TEMPLO",
    sourceText: `El eco del agua goteando de una tubería rota marcaba el ritmo de la espera.\nEl olor a café rancio inundaba la oficina del investigador.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nLas cajas apiladas formaban un laberinto casi impenetrable.\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nNadie se atrevía a caminar por ese sector después del anochecer.\nUn periódico viejo volaba arrastrado por la brisa otoñal.\n\nTEXTOS DEL ESPEJO:
DEMONVERITAS (Engaño del abismo)
PURA VERITAS (Luz forense de Vance)
SOLA VERITAS (Juicio final)\n\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nEl detective suspiró mientras encendía otro cigarrillo.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nLas gaviotas revoloteaban sobre los barcos pesqueros.\nEl viento soplaba friamente en la calle principal.\nUna figura envuelta en una gabardina cruzó la avenida.`,
    task: "Captura la palabra 'VERITAS' solo cuando NO esté inmediatamente precedida por 'DEMON'.",
    hint: "Utiliza un lookbehind negativo '(?<!DEMON)VERITAS'.",
    recommendedRegex: "(?<!DEMON)VERITAS",
    recommendedFlags: "g",
    expectedMatches: ["VERITAS", "VERITAS"]
  },
  {
    id: 100,
    tier: 10,
    sceneType: "abyss",
    title: "Caso 100: El Destierro Definitivo de Malphas",
    subtitle: "Arcón del Pacto Primigenio • Bóveda de la Carne",
    description: "¡El clímax supremo! Abre el arcón donde arde el contrato primigenio de Malphas introduciendo la combinación maestra sagrada que calcina el pacto y destierra al demonio para siempre.",
    type: "construction",
    timeLimit: 30,
    maxAttempts: 2,
    documentTitle: "ARCÓN PRIMIGENIO DE MALPHAS",
    sourceText: `Un archivo polvoriento reposaba sobre el escritorio.\nUn gato negro saltó desde el muro y desapareció en las sombras.\nEl semáforo parpadeaba en amarillo sin que nadie lo respetara.\nEl candado de la puerta trasera parecía oxidado pero intacto.\nLa música de jazz sonaba suavemente desde un tocadiscos lejano.\nNadie parecía notar el rastro dejado en el asfalto mojado.\nEl olor a salitre y humo impregnaba el ambiente portuario.\n\nCOMBINACIÓN FINAL DEL DESTIERRO:
MASTER_KEY_AB8899ZZ (Combinación Alfa del Exorcismo)
MASTER_KEY_7741KK99 (Combinación Beta del Destierro)
KEY_MALPHAS_00000000 (Falsa)
MASTER_KEY_666 (Incompleta)\n\nEl vigilante hacía su ronda alumbrando con una linterna gastada.\nEl detective suspiró mientras encendía otro cigarrillo.\nEl viento soplaba friamente en la calle principal.\nUna figura envuelta en una gabardina cruzó la avenida.\nGotas de lluvia golpeaban incesantemente el cristal de la ventana.\nLas huellas en el barro indicaban que alguien había estado allí recientemente.\nLos ecos de pasos apresurados resonaban en el callejón vacío.`,
    task: "¡El exorcismo final! Abre el arcón arcano localizando las llaves que inician con 'MASTER_KEY_' y contienen exactamente 8 caracteres alfanuméricos.",
    hint: "Combina el prefijo sagrado 'MASTER_KEY_' con una clase alfanumérica [A-Z0-9]{8}.",
    recommendedRegex: "MASTER_KEY_[A-Z0-9]{8}",
    recommendedFlags: "g",
    expectedMatches: ["MASTER_KEY_AB8899ZZ", "MASTER_KEY_7741KK99"]
  }
];
