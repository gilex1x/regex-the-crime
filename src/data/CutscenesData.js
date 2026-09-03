// ========================================================
// CUTSCENES DATA: CINEMÁTICAS NOIR INTER-TIER
// Historia basada en HISTORIA_DEL_JUEGO.md
// ========================================================

export const CHARACTERS = {
  vance: {
    name: "Detective Vincent Vance",
    title: "Investigador Forense",
    avatar: "🕵️‍♂️",
    themeClass: "speaker-vance"
  },
  briggs: {
    name: "Comisario Briggs",
    title: "Jefe de Policía del Distrito",
    avatar: "👮‍♂️",
    themeClass: "speaker-briggs"
  },
  falcone: {
    name: "Carmine 'El Carnicero' Falcone",
    title: "Capo del Sindicato Criminal",
    avatar: "🦹‍♂️",
    themeClass: "speaker-falcone"
  },
  cross: {
    name: "Dra. Evelyn Cross",
    title: "Directora de la Clínica Renacer",
    avatar: "👩‍⚕️",
    themeClass: "speaker-cross"
  },
  malphas: {
    name: "Malphas",
    title: "El Arquitecto del Abismo / Cobrador",
    avatar: "👁️‍🗨️",
    themeClass: "speaker-malphas"
  },
  narrator: {
    name: "Crónica de New Haven (1947)",
    title: "Voz en Off",
    avatar: "📻",
    themeClass: "speaker-narrator"
  }
};

export const CUTSCENES = {
  // Prólogo antes del Caso 1
  prologue: {
    id: "prologue",
    tierTrigger: 1,
    title: "PRÓLOGO: LA LLUVIA DE NEW HAVEN",
    subtitle: "Noviembre de 1947 • Medianoche",
    lines: [
      {
        speaker: "vance",
        text: "La lluvia en New Haven nunca limpia la suciedad... solo la hace brillar bajo las farolas rotas."
      },
      {
        speaker: "vance",
        text: "Me llamo Vincent Vance. La gente cree que los criminales cometen errores al azar, pero la verdad es matemática: el crimen siempre deja un patrón."
      },
      {
        speaker: "briggs",
        text: "¡Vance! Deja de mirar la ventana como un poeta barato. Tenemos un cuerpo en el callejón de Miller y notas de apuestas en el Savoy."
      },
      {
        speaker: "vance",
        text: "Para Briggs, solo eran casos de rutina: borrachos con mala suerte y carteristas de poca monta. Ojalá hubiera tenido razón."
      }
    ]
  },

  // Transición Tier 1 a Tier 2 (Completar caso 5)
  tier_1_to_2: {
    id: "tier_1_to_2",
    tierTrigger: 2,
    title: "INTERLUDIO I: EL LIBRO QUE NADIE QUISO",
    subtitle: "Comisaría Central • Sala de Evidencias",
    lines: [
      {
        speaker: "vance",
        text: "En el allanamiento a la casa de empeños confisqué algo insólito: un tomo encuadernado en cuero agrietado, titulado 'El Tratado de los Ecos'."
      },
      {
        speaker: "vance",
        text: "Hablaba de geometría verbal y reglas sintácticas para 'atar y desterrar a los que no tienen sombra'. Pensé que era la chifladura de un loco supersticioso y lo tiré al fondo de mi maletín."
      },
      {
        speaker: "briggs",
        text: "Vance, acaban de traer el reporte del forense sobre el vagabundo del Caso 5. No murió de frío. Le extrajeron los dos riñones con precisión de relojero suizo."
      },
      {
        speaker: "vance",
        text: "En las calles no hay cirujanos trabajando gratis. Alguien está cazando gente en la niebla."
      }
    ]
  },

  // Transición Tier 2 a Tier 3 (Completar caso 10)
  tier_2_to_3: {
    id: "tier_2_to_3",
    tierTrigger: 3,
    title: "INTERLUDIO II: LAS MARCAS DEL BISTURÍ",
    subtitle: "Morgue del Distrito 4 • 03:15 AM",
    lines: [
      {
        speaker: "vance",
        text: "Los informes de correspondencia médica revelaron cartas cifradas dirigidas a dos cirujanos: el Dr. Miller y la Dra. Evelyn Cross."
      },
      {
        speaker: "briggs",
        text: "Cuidado por dónde pisas, Vance. La Dra. Cross opera en la Clínica Renacer, en las colinas. Sus clientes son senadores, banqueros y jueces supremos."
      },
      {
        speaker: "vance",
        text: "Un testigo en el muelle vio camiones con placas extrañas cargando cajas térmicas a medianoche. La sangre no miente: esto ya no es hampa común."
      },
      {
        speaker: "vance",
        text: "Tengo que llegar a los muelles antes de que el cargamento zarpe hacia alta mar."
      }
    ]
  },

  // Transición Tier 3 a Tier 4 (Completar caso 15)
  tier_3_to_4: {
    id: "tier_3_to_4",
    tierTrigger: 4,
    title: "INTERLUDIO III: LA BRIGADA ANTINARCÓTICOS",
    subtitle: "Almacén 7 del Puerto • Lluvia Torrencial",
    lines: [
      {
        speaker: "falcone",
        text: "¡Ese sabueso de Vance está husmeando donde no debe! Bloqueen las bodegas con candados cifrados y monten las trampas."
      },
      {
        speaker: "vance",
        text: "La Brigada Antinarcóticos creía que Falcone traficaba con polvo blanco en dosis medidas por gramos. Pero los reactivos químicos dieron negativo."
      },
      {
        speaker: "vance",
        text: "No eran drogas. Eran frascos de suero inmunosupresor y preservantes de órganos humanos. La mafia de Falcone no trafica con sustancias... trafica con carne."
      },
      {
        speaker: "narrator",
        text: "Las advertencias del sindicato se volvieron mortales: bombas con temporizadores y candados criptográficos esperan al detective."
      }
    ]
  },

  // Transición Tier 4 a Tier 5 (Completar caso 20)
  tier_4_to_5: {
    id: "tier_4_to_5",
    tierTrigger: 5,
    title: "INTERLUDIO IV: LOS HOGARES SAQUEADOS",
    subtitle: "Despacho de Falcone • Archivo de Robos",
    lines: [
      {
        speaker: "vance",
        text: "Entre los papeles de Falcone encontramos algo perturbador: listas de direcciones de apartamentos residenciales desvalijados en los últimos tres meses."
      },
      {
        speaker: "briggs",
        text: "¿Por qué un capo millonario saquearía cuadros, alhajas y cajas fuertes de familias ordinarias?"
      },
      {
        speaker: "vance",
        text: "Porque no eran familias cualquiera. Eran las mismas personas cuyos cuerpos aparecieron flotando en la bahía sin órganos. Primero los desviven, luego saquean sus vidas enteras."
      },
      {
        speaker: "vance",
        text: "Frankie 'Dedos' Miller, el cerrajero de la banda, quiso escapar antes de que le tocara a él. Tengo que interrogarlo antes de que Falcone lo silencie."
      }
    ]
  },

  // Transición Tier 5 a Tier 6 (Completar caso 25)
  tier_5_to_6: {
    id: "tier_5_to_6",
    tierTrigger: 6,
    title: "INTERLUDIO V: LA SOMBRA SIN ROSTRO",
    subtitle: "Callejón de la Coartada • Bajo la Tormenta",
    lines: [
      {
        speaker: "vance",
        text: "Interrogué a Rob bajo la lluvia torrencial. Estaba temblando, empapado en sudor frío y terror genuino."
      },
      {
        speaker: "vance",
        text: "'No es Falcone quien da las órdenes', me dijo entre sollozos. 'Es un caballero de traje impecable que viene a la clínica a medianoche. Las lámparas parpadean y su figura... su figura no proyecta sombra en la pared'."
      },
      {
        speaker: "cross",
        text: "La ciencia médica siempre exige sacrificios, detective Vance. La muerte es una enfermedad... y mis benefactores pagan bien por la cura."
      },
      {
        speaker: "vance",
        text: "Las cuentas suizas en Zúrich y Ginebra canalizan millones de dólares para la Dra. Cross. La telaraña llega hasta la cúspide del poder."
      }
    ]
  },

  // Transición Tier 6 a Tier 7 (Completar caso 30)
  tier_6_to_7: {
    id: "tier_6_to_7",
    tierTrigger: 7,
    title: "INTERLUDIO VI: PERGAMINOS Y SANGRE",
    subtitle: "Archivo Subterráneo de la Clínica Renacer",
    lines: [
      {
        speaker: "vance",
        text: "Logré infiltrarme en el archivo clínico restringido. Lo que encontré allí no figuraba en ningún manual de medicina."
      },
      {
        speaker: "vance",
        text: "No eran historiales clínicos comunes: eran contratos redactados en un dialecto arcaico, firmados con huellas dactilares estampadas en sangre espesa."
      },
      {
        speaker: "cross",
        text: "Nuestros pacientes no aceptan cualquier órgano, Vance. Solo tejido perfectamente compatible. ¿Y sabes quién garantiza esa perfección biológica? Alguien mucho más antiguo que las leyes humanas."
      },
      {
        speaker: "vance",
        text: "El sindicato no elige las víctimas por azar ni por dinero. Las víctimas ya le pertenecían a una entidad desde antes."
      }
    ]
  },

  // Transición Tier 7 a Tier 8 (Completar caso 35)
  tier_7_to_8: {
    id: "tier_7_to_8",
    tierTrigger: 8,
    title: "INTERLUDIO VII: EL PACTO DE MALPHAS",
    subtitle: "Bóveda Cifrada • 02:00 AM",
    lines: [
      {
        speaker: "malphas",
        text: "¿Realmente crees que la codicia de los hombres termina con un apretón de manos, pequeño detective?"
      },
      {
        speaker: "vance",
        text: "Una voz gutural resonó en los conductos de ventilación, helándome la médula espinal. La temperatura cayó bajo cero en un segundo."
      },
      {
        speaker: "malphas",
        text: "Hace décadas, esos hombres y mujeres imploraron mi favor. Éxito, juventud, riqueza instantánea... Todo a cambio de su alma cuando el plazo expirara. Su tiempo terminó. Su carne es de la doctora; su espíritu es mío."
      },
      {
        speaker: "vance",
        text: "Falcone sabe que he llegado hasta el fondo. Han sembrado el complejo con explosivos y dinamita militar. Si caigo, la verdad morirá conmigo."
      }
    ]
  },

  // Transición Tier 8 a Tier 9 (Completar caso 40)
  tier_8_to_9: {
    id: "tier_8_to_9",
    tierTrigger: 9,
    title: "INTERLUDIO VIII: CUENTA REGRESIVA FINAL",
    subtitle: "Centralita y Servidores de la Clínica",
    lines: [
      {
        speaker: "briggs",
        text: "¡Vance! La Guardia Nacional no puede entrar; hay interferencia electromagnética y los circuitos están colapsando por un sabotaje masivo."
      },
      {
        speaker: "falcone",
        text: "¡Nadie saldrá vivo de esta clínica! Si caigo yo, este hospital arderá hasta los cimientos junto con todos los expedientes."
      },
      {
        speaker: "vance",
        text: "Los saboteadores introdujeron ataques de retroceso exponencial (ReDoS) y cables de activación de TNT en los servidores. Tengo segundos para refactorizar los filtros y desactivar las detonaciones."
      },
      {
        speaker: "vance",
        text: "Y lo peor de todo: mis balas atravesaron la sombra del demonio como si fuera humo. Las armas de fuego no sirven. Necesito algo más antiguo."
      }
    ]
  },

  // Transición Tier 9 a Tier 10 (Completar caso 45)
  tier_9_to_10: {
    id: "tier_9_to_10",
    tierTrigger: 10,
    title: "INTERLUDIO IX: EL CONJURO DE LOS PATRONES",
    subtitle: "Entrada a la Bóveda Maestra Subterránea",
    lines: [
      {
        speaker: "vance",
        text: "En medio del fuego y el humo, saqué de mi maletín el libro que descarté en el primer caso: 'El Tratado de los Ecos'."
      },
      {
        speaker: "vance",
        text: "Por fin lo entendí todo. El libro no traía las palabras del conjuro porque cada demonio se ata con los nombres de sus propios crímenes."
      },
      {
        speaker: "vance",
        text: "El libro me dio la ESTRUCTURA: las reglas y patrones sintácticos de las expresiones regulares sagradas. Pero las PALABRAS REALES están escondidas en las evidencias que recolecté a lo largo de toda la investigación."
      },
      {
        speaker: "malphas",
        text: "Adelante, detective. Cruza las puertas de la bóveda. Intentemos ver si tu lógica mortal puede desatar el nudo que até con sangre."
      }
    ]
  },

  // Epílogo final tras superar el Caso 50
  epilogue: {
    id: "epilogue",
    tierTrigger: 11,
    title: "EPÍLOGO: EL PRECIO DE LA VERDAD",
    subtitle: "Amanecer en New Haven • 06:00 AM",
    lines: [
      {
        speaker: "vance",
        text: "Introduje la última combinación en la terminal de la bóveda. Las runas Regex brillaron con un fuego azul gélido que iluminó todo el subsuelo."
      },
      {
        speaker: "malphas",
        text: "¡NO! ¡EL CONTRATO ESTÁ RESCINDIDO! ¡LA CADENA DE CARNE SE ROMPE...!"
      },
      {
        speaker: "vance",
        text: "La entidad fue succionada por el vórtice de su propia trampa legal, chillando con el estruendo de mil cadenas al partirse."
      },
      {
        speaker: "narrator",
        text: "En los pisos superiores, los magnates y jueces de la clínica sufrieron un rechazo inmunológico instantáneo, envejeciendo cuarenta años en cuestión de segundos al romperse el pacto impío."
      },
      {
        speaker: "briggs",
        text: "Falcone está bajo custodia en una celda de máxima seguridad, balbuceando incoherentemente. La Dra. Cross huyó antes del cerco, pero su imperio quedó reducido a cenizas."
      },
      {
        speaker: "vance",
        text: "Salí a la calle al amanecer. Encendí un cigarrillo bajo la llovizna fría de New Haven y guardé mi cuaderno de notas. La ciudad sigue su curso... pero ahora sé qué monstruos habitan detrás del telón."
      }
    ]
  }
};
