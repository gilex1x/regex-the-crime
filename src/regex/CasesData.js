/**
 * Base de datos de casos, pistas, objetivos y textos de 'Regex: The Crime'
 */

export const CASES = [
  {
    id: 1,
    title: "El Chantaje en el Callejón Lluvioso",
    subtitle: "Caso 01 • Distrito Industrial • 02:15 AM",
    description: "Una llamada anónima te citó tras el club nocturno Blue Velvet. Entre la lluvia y la basura yacen pistas clave dejadas por el extorsionador. Descifra los patrones antes de que la lluvia borre la tinta.",
    sceneType: "alley",
    solvedMessage: "¡Excelente deducción, Detective! Las matrículas y las sumas de extorsión coinciden con la banda del puerto. El caso 01 ha sido resuelto.",
    clues: [
      {
        id: "c1_p1",
        name: "Nota de Chantaje Arrugada",
        objectName: "crumpled_paper",
        icon: "📄",
        position: [2.2, 0.4, -4.5],
        brief: "Encontrada cerca del contenedor de basura. Contiene las demandas del extorsionador.",
        documentTitle: "NOTA MANUSCRITA ENCONTRADA EN EL CONTENEDOR",
        sourceText: `Oye infeliz, si quieres volver a ver a tu socio con vida, reúne exactamente $500 en billetes pequeños no marcados antes de la medianoche. No me vengas con $20 de limosna ni con los $15000 que prometiste la semana pasada en cheques falsos. Si veo a un solo policía en la esquina, el rescate subirá de inmediato a $50000 y se acabó el trato.`,
        taskInstructions: "El chantajista menciona varias sumas de dinero en dólares. Escribe una expresión regular para encontrar todas las cantidades monetarias válidas que inicien con '$' seguido de uno o más dígitos.",
        regexHint: "Recuerda que el carácter '$' es especial en Regex (ancla de fin de texto). Para buscar un dólar literal, debes escaparlo con barra invertida: \\$ y luego buscar uno o más dígitos con \\d+ o [0-9]+.",
        expectedMatches: ["$500", "$20", "$15000", "$50000"],
        testRegexValidator: (userRegex) => {
          try {
            const matches = `Oye infeliz, si quieres volver a ver a tu socio con vida, reúne exactamente $500 en billetes pequeños no marcados antes de la medianoche. No me vengas con $20 de limosna ni con los $15000 que prometiste la semana pasada en cheques falsos. Si veo a un solo policía en la esquina, el rescate subirá de inmediato a $50000 y se acabó el trato.`.match(userRegex);
            if (!matches) return false;
            const expected = ["$500", "$20", "$15000", "$50000"];
            return expected.length === matches.length && expected.every(e => matches.includes(e));
          } catch {
            return false;
          }
        },
        syntaxCheat: "\\$\\d+  o  \\$[0-9]+"
      },
      {
        id: "c1_p2",
        name: "Registro de Vehículos en el Fango",
        objectName: "license_plate_log",
        icon: "🚗",
        position: [-3.2, 0.2, -6.8],
        brief: "Huellas de neumáticos y una libreta de vigilancia caída en un charco de aceite.",
        documentTitle: "BITÁCORA DE VIGILANCIA DEL SERENO NOCTURNO",
        sourceText: `REGISTRO DE SALIDAS DEL CALLEJÓN (23:00 - 02:00):
- 23:45 | Ford V8 Sospechoso: ABC-4921
- 00:10 | Taxi del sindicato: TAXI-99
- 01:05 | Sedán negro del capo: KRT-8841
- 01:30 | Camioneta de reparto: VAN-120
- 01:55 | Coche de fuga identificado: ZPX-7019
- 02:05 | Patrulla policial: 911-COP`,
        taskInstructions: "Filtra únicamente las matrículas oficiales del estado, compuestas exactamente por 3 letras mayúsculas, un guion y 4 dígitos.",
        regexHint: "Utiliza conjuntos de caracteres [A-Z] con cuantificador exacto {3}, seguido de un guion literal '-' y \\d{4} o [0-9]{4}.",
        expectedMatches: ["ABC-4921", "KRT-8841", "ZPX-7019"],
        testRegexValidator: (userRegex) => {
          try {
            const text = `ABC-4921 TAXI-99 KRT-8841 VAN-120 ZPX-7019 911-COP`;
            const matches = text.match(userRegex);
            if (!matches) return false;
            const expected = ["ABC-4921", "KRT-8841", "ZPX-7019"];
            return expected.length === matches.length && expected.every(e => matches.includes(e));
          } catch {
            return false;
          }
        },
        syntaxCheat: "[A-Z]{3}-\\d{4}"
      }
    ]
  },
  {
    id: 2,
    title: "El Cuarto 404 del Hotel Noir",
    subtitle: "Caso 02 • Hotel Savoy • 04:30 AM",
    description: "El informante de la fiscalía ha desaparecido. La habitación 404 tiene el teléfono descolgado, la cama deshecha y recortes de prensa subrayados. Cruza los datos para descubrir a quién telefoneó antes de escapar.",
    sceneType: "hotel",
    solvedMessage: "¡Caso 02 resuelto! Has interceptado las comunicaciones de la mafia y confirmado la fecha exacta de la conspiración.",
    clues: [
      {
        id: "c2_p1",
        name: "Registro de Escuchas Telefónicas",
        objectName: "telephone_desk",
        icon: "📞",
        position: [2.5, 0.8, -1.8],
        brief: "Cinta de registro de llamadas junto al teléfono de baquelita negra.",
        documentTitle: "CENTRALITA DEL HOTEL SAVOY - HISTORIAL DE LLAMADAS",
        sourceText: `REGISTRO DE LLAMADAS HABITACIÓN 404:
1. Contacto local: (555) 839-4412
2. Centralita general: 411-0000
3. Sospechoso 'El Zurdo': (555) 201-9988
4. Línea de ultramar: +34-91-555-1234
5. Muelle de carga 9: (555) 771-3304
6. Servicio de habitaciones: 555-11`,
        taskInstructions: "Encuentra todos los números telefónicos sospechosos con código de área (555) entre paréntesis, un espacio, 3 dígitos, un guion y 4 dígitos.",
        regexHint: "Los paréntesis '(' y ')' son grupos en Regex. Para buscarlos literalmente, debes escaparlos con \\( y \\). Ejemplo: \\(555\\)\\s\\d{3}-\\d{4}",
        expectedMatches: ["(555) 839-4412", "(555) 201-9988", "(555) 771-3304"],
        testRegexValidator: (userRegex) => {
          try {
            const text = `(555) 839-4412 411-0000 (555) 201-9988 +34-91-555-1234 (555) 771-3304 555-11`;
            const matches = text.match(userRegex);
            if (!matches) return false;
            const expected = ["(555) 839-4412", "(555) 201-9988", "(555) 771-3304"];
            return expected.length === matches.length && expected.every(e => matches.includes(e));
          } catch {
            return false;
          }
        },
        syntaxCheat: "\\(555\\)\\s\\d{3}-\\d{4}"
      },
      {
        id: "c2_p2",
        name: "Edición Nocturna del Daily Gazette",
        objectName: "newspaper_bed",
        icon: "📰",
        position: [-2.4, 0.5, -3.2],
        brief: "Periódico abierto con fechas de incidentes criminales marcadas con ceniza de cigarrillo.",
        documentTitle: "THE DAILY GAZETTE - CRÓNICA DE SUCESOS",
        sourceText: `INVESTIGACIÓN EN CURSO:
El asalto a la joyería ocurrió el 14/03/1947 bajo una densa niebla.
Un segundo incidente con la misma banda se reportó el 28-08-1946 cerca del río Hudson.
El testigo clave fue visto por última vez el 05/11/1947 abordando el expreso nocturno.
Otras menciones irrelevantes: año 1899, código 99999, fecha inválida 12/999/22.`,
        taskInstructions: "Extrae todas las fechas de dos dígitos de día, dos dígitos de mes y cuatro dígitos de año, separadas indistintamente por barra '/' o guion '-'.",
        regexHint: "Usa una clase de caracteres para el separador [/\\-] o [/-], por ejemplo: \\d{2}[/-]\\d{2}[/-]\\d{4}",
        expectedMatches: ["14/03/1947", "28-08-1946", "05/11/1947"],
        testRegexValidator: (userRegex) => {
          try {
            const text = `14/03/1947 28-08-1946 05/11/1947 1899 99999 12/999/22`;
            const matches = text.match(userRegex);
            if (!matches) return false;
            const expected = ["14/03/1947", "28-08-1946", "05/11/1947"];
            return expected.length === matches.length && expected.every(e => matches.includes(e));
          } catch {
            return false;
          }
        },
        syntaxCheat: "\\d{2}[/-]\\d{2}[/-]\\d{4}"
      }
    ]
  },
  {
    id: 3,
    title: "La Caja Fuerte del Banquero Corrupto",
    subtitle: "Caso 03 • Despacho Vance & Co. • 06:15 AM",
    description: "El banquero Arthur Vance fue atacado en su oficina de caoba. Detrás de un cuadro al óleo hay una caja fuerte digital y sobre el escritorio descansan transferencias a cuentas secretas en Suiza.",
    sceneType: "office",
    solvedMessage: "¡BRUTAL DEDUCCIÓN! Has quebrado la conspiración financiera de la ciudad. El sindicato criminal ha caído gracias a tu pericia con las expresiones regulares.",
    clues: [
      {
        id: "c3_p1",
        name: "Libro Mayor de Cuentas Suizas",
        objectName: "bank_ledger",
        icon: "💼",
        position: [0.3, 0.8, -2.5],
        brief: "Documento contable con transferencias camufladas a cuentas en paraísos fiscales.",
        documentTitle: "LIBRO MAYOR CONFIDENCIAL - TRANSFERENCIAS CLANDESTINAS",
        sourceText: `REGISTRO DE CUENTAS VINCULADAS:
- Operación 1: ACC-US-1029-X (Cuenta ordinaria Nueva York)
- Operación 2: ACC-CH-4491-A (Depósito secreto en Ginebra)
- Operación 3: ACC-UK-9021-B (Inversión Londres)
- Operación 4: ACC-CH-8120-B (Fondo reservado Zúrich)
- Operación 5: ACC-CH-3310-Z (Cuenta bloqueada por aduanas)
- Operación 6: ACC-FR-1122-A (París)`,
        taskInstructions: "El informante testificó que los sobornos fueron a cuentas en Suiza ('ACC-CH-') con 4 dígitos que terminan en categoría '-A' o '-B'. Extrae exactamente estas cuentas.",
        regexHint: "Combina el prefijo literal ACC-CH-, cuatro dígitos \\d{4}- y la clase de caracteres final [AB] o (A|B). Ejemplo: ACC-CH-\\d{4}-[AB]",
        expectedMatches: ["ACC-CH-4491-A", "ACC-CH-8120-B"],
        testRegexValidator: (userRegex) => {
          try {
            const text = `ACC-US-1029-X ACC-CH-4491-A ACC-UK-9021-B ACC-CH-8120-B ACC-CH-3310-Z ACC-FR-1122-A`;
            const matches = text.match(userRegex);
            if (!matches) return false;
            const expected = ["ACC-CH-4491-A", "ACC-CH-8120-B"];
            return expected.length === matches.length && expected.every(e => matches.includes(e));
          } catch {
            return false;
          }
        },
        syntaxCheat: "ACC-CH-\\d{4}-[AB]"
      },
      {
        id: "c3_p2",
        name: "Caja Fuerte Tras el Cuadro",
        objectName: "hidden_safe",
        icon: "🔐",
        position: [-3.8, 1.3, -2.8],
        brief: "Caja fuerte de acero reforzado tras un lienzo de la época renacentista.",
        documentTitle: "SISTEMA DE SEGURIDAD - CÓDIGOS DE DESBLOQUEO",
        sourceText: `MEMORÁNDUM DE CÓDIGOS DE EMERGENCIA:
Tokens registrados:
- admin123 (desactivado)
- VIP#9901 (prueba)
- OMEGA_8842_KEY (CÓDIGO ACTIVO DE LA BÓVEDA)
- 123456 (falso)
- DELTA_7719_KEY (SEGUNDO CÓDIGO MAESTRO)
- KEY_ZERO (caducado)`,
        taskInstructions: "Para abrir la cerradura electrónica necesitas aislar los dos códigos maestros que tienen: una o más letras mayúsculas, un guion bajo, 4 números, otro guion bajo y terminan con la palabra 'KEY'.",
        regexHint: "Utiliza [A-Z]+ seguido de _\\d{4}_KEY.",
        expectedMatches: ["OMEGA_8842_KEY", "DELTA_7719_KEY"],
        testRegexValidator: (userRegex) => {
          try {
            const text = `admin123 VIP#9901 OMEGA_8842_KEY 123456 DELTA_7719_KEY KEY_ZERO`;
            const matches = text.match(userRegex);
            if (!matches) return false;
            const expected = ["OMEGA_8842_KEY", "DELTA_7719_KEY"];
            return expected.length === matches.length && expected.every(e => matches.includes(e));
          } catch {
            return false;
          }
        },
        syntaxCheat: "[A-Z]+_\\d{4}_KEY"
      }
    ]
  }
];
