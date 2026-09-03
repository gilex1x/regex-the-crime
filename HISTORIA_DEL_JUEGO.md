# 🗂️ EXPEDIENTE CONFIDENCIAL: LA HISTORIA DE "REGEX: THE CRIME"

> *"La carne de los pecadores compra los años de los poderosos... pero el contrato final siempre se cobra en sangre."*

---

## 📖 1. SINOPSIS GENERAL (EL GRAN COMPLOT)

En la superficie de la ciudad de **New Haven (1947)**, el detective privado **Vincent Vance** solo ve la típica podredumbre humana: extorsión, asaltos nocturnos, contrabando en los muelles y banqueros lavando dinero sucio.

Sin embargo, debajo de la niebla urbana opera un engranaje siniestro compuesto por tres vértices:

1. **La Clínica de la Élite ("Clínica Renacer / Sanitas Aeterna"):** Un sanatorio privado de superlujo en las colinas de la ciudad, donde magnates ancianos, políticos corruptos y jueces pagan fortunas millonarias por someterse a cirugías clandestinas de sustitución de órganos para rejuvenecer y extender su vida más allá del límite biológico.
2. **El Sindicato de los Taxidermistas ("La Hermandad del Bisturí"):** Una despiadada organización criminal contratada por la clínica para cazar a las personas compatibles, eliminarlas sin dejar rastro biológico y extraer sus órganos en furgones frigoríficos en menos de 15 minutos. Como beneficio adicional, los sicarios saquean los apartamentos, cajas de seguridad, joyas y cuentas bancarias de las víctimas para financiar su imperio criminal.
3. **El Pacto Demoníaco (La Entidad: *Malphas, El Arquitecto del Abismo*):** Los criminales no eligen a sus víctimas al azar. Años atrás, el líder del sindicato invocó a un demonio cobrador de deudas mediante un pacto de sangre. El demonio les entrega listas codificadas con los nombres, residencias y tipos sanguíneos de personas que en el pasado vendieron su alma o hicieron pactos con él a cambio de fama, fortuna o curas milagrosas. Al estar ya "condenadas por contrato", sus cuerpos pueden ser cosechados sin que ninguna autoridad divina intervenga.

4. **El Grimorio Olvidado y el Conjuro de Patrones:** Al inicio de su carrera, Vance incauta un viejo libro de ocultismo que describe la estructura de conjuros para someter entidades oscuras. Vance lo desecha como simple superstición de charlatanes. Sin embargo, al final descubrirá que **el libro no contiene las palabras mágicas literales, sino la fórmula sintáctica y los patrones (expresiones regulares)** que deben tener. Para destruir al demonio, el detective se verá forzado a rebuscar en las evidencias físicas y documentos recolectados a lo largo de los 100 casos, aislar las palabras reales que coinciden con esos patrones y ensamblarlas en el orden sagrado exacto.

---

## 👥 2. PERSONAJES Y OBJETOS CLAVE

| Elemento | Rol en la Historia | Descripción |
| :--- | :--- | :--- |
| **Vincent Vance** | Protagonista / Detective | Exinvestigador de homicidios caído en desgracia. Obsesivo con los patrones, las máquinas de escribir y los cuadernos forenses. |
| **Dra. Evelyn Cross** | Antagonista Científica | Directora médica de la Clínica Renacer. Una prodigio de la cirugía obsesionada con derrotar la vejez y la muerte mediante trasplantes biomecánicos oscuros. |
| **Carmine "El Carnicero" Falcone** | Antagonista Criminal | Capo del hampa local. Maneja las morgues clandestinas, los camiones frigoríficos (`TRUCK-XXX-X`) y el saqueo de viviendas. |
| **Malphas (El Cobrador)** | Antagonista Sobrenatural | Demonio antiguo con aspecto de aristócrata de traje negro y ojos de azufre. Suministra los nombres de las víctimas a cambio de la desesperación y el sufrimiento de la ciudad. |
| **Frankie "Dedos" Miller** | Informante / Víctima Clave | Falsificador y cerrajero que trabajaba para el sindicato saqueando las cajas fuertes de los asesinados, hasta que descubrió la verdad y dejó pistas cifradas antes de huir. |
| **El Tratado de los Ecos (Grimorio)** | Objeto Clave / Catalizador | Antiguo tomo incautado al principio. No contiene conjuros cerrados, sino **las reglas de los patrones (la sintaxis Regex)** para romper contratos del inframundo. |

---

## 🗺️ 3. ESTRUCTURA NARRATIVA: PROGRESIÓN POR TIERS (100 CASOS)

### 🟢 ACTO I: El Día a Día de un Policía (Niveles 1 a 10)
*Casos aparentemente aislados y mundanos. El detective asume que solo investiga el crimen común de la ciudad.*
- **Nivel 01 - 05:** El Callejón de Miller y notas de hotel de baja estofa. Pequeños hurtos y sospechosos habituales.
- **El Hallazgo del Libro Ignorado:** En una redada a una tienda de empeños clandestina ligada a estafadores, Vance confisca un extraño libro encuadernado en piel oscura: *"El Tratado de los Ecos"*. El texto habla de geometrías lingüísticas, leyes de invocación y patrones verbales para expulsar demonios. Vance sonríe con escepticismo, lo califica de "chifladura de fanáticos" y lo arroja al fondo de su maletín de archivos sin prestarle mayor atención.
- **Nivel 06 - 10:** Huéspedes sospechosos en el Hotel Savoy y claves de cajas de seguridad (`KEY-[1-5]`) en el banco central.
- *Giro sutil:* En la caja fuerte del Nivel 10, Vance encuentra un fajo de billetes con una lista de nombres tachados con tinta roja... pero lo atribuye a simples deudas de juego.

---

### 🟡 ACTO II: Las Marcas del Bisturí (Niveles 11 a 20)
*La violencia escala. Empiezan a aparecer cadáveres desvalijados con precisión médica.*
- **Nivel 11 - 15 (Tier 2):** Se investigan autos sospechosos (`CAR-7`, `CAR-8`), extensiones telefónicas clandestinas y cartas de chantaje dirigidas a médicos (`Dr.` y `Dra.`).
  - *Evidencia descubierta:* Las autopsias de dos vagabundos revelan que les extrajeron riñones y córneas con instrumental quirúrgico militar.
- **Nivel 16 - 20 (Tier 3):** Carreras contrarreloj en los muelles. Vance intercepta furgones sospechosos y transferencias con códigos `TX-XXXXX`.
- **Casos de Distracción (Red Herrings):**
  - *Caso 12:* Un robo de cigarrillos y whisky en aduanas (`BOX_XX`) que resulta ser una tapadera de los mismos estibadores.
  - *Caso 14:* Un diario íntimo de un chantajista menor (`topo1`, `gato2`).

---

### 🟠 ACTO III: El Rastro de la Carne y el Saqueo (Niveles 21 a 50)
*Vance descubre la conexión entre la mafia de Falcone y la Clínica Renacer.*
- **Nivel 21 - 35 (Tier 4):** Se activa la Brigada Antinarcóticos. Vance descubre que lo que creían que era tráfico de drogas pesadas (`\d+g`) en realidad son dosis de **inmunosupresores y conservantes de órganos para trasplantes**.
  - *La Trampa del Criminal #1 & #2:* Falcone comienza a dejar bombas y candados de tiempo con algoritmos cifrados al darse cuenta de que Vance los está acorralando.
  - *Evidencia de Saqueo:* En las oficinas de Falcone hay listas de apartamentos allanados tras el fallecimiento de sus inquilinos.
- **Nivel 36 - 50 (Tier 5):** Interrogatorios bajo la lluvia (`\bRob\b`). Vance descubre que las víctimas de los allanamientos no murieron de causas naturales: todas tenían citas privadas en la clínica.

---

### 🔴 ACTO IV: La Revelación Oculta (Niveles 51 a 75)
*El horror sobrenatural emerge. Los contratos no son mercantiles: son espirituales.*
- **Nivel 51 - 60 (Tier 6):** Cuentas secretas en Suiza (`ACC-CH-XXXX`) y desgrabaciones de cintas donde el testigo balbucea aterrorizado que *"el hombre del traje negro no tiene sombra"*.
- **Nivel 61 - 70 (Tier 7):** Cuantificadores perezosos (`.*?`) para desencriptar cintas judiciales secretas. Vance allana el archivo privado de la Dra. Cross y halla contratos sellados en pergamino antiguo con sangre humana.
- **Nivel 71 - 75 (Tier 8 - Lookaheads):** Inspección de contenedores de alta seguridad con explosivos y póliza de seguros. Vance descubre el pacto: la clínica recibe órganos de compatibilidad perfecta porque el demonio selecciona a personas que firmaron pactos previos por éxito y riqueza juvenil que ahora están vencidos.

---

### 🟣 ACTO V: El Exorcismo Forense (Niveles 76 a 100)
*Redada en el santuario subterráneo de la Clínica Renacer. La entidad demoníaca se manifiesta para reclamar la ciudad entera.*
- **Nivel 76 - 85 (Tier 9):** Auditoría antiterrorista para neutralizar los sabotajes de los servidores de la clínica (`ReDoS`, `Backtracking`, detonadores `TNT`). Vance descubre que Falcone planea detonar el hospital para borrar las pruebas.
- **Nivel 86 - 95 (Tier 10):** La fuga contrarreloj de los camiones frigoríficos (`TRUCK-\d{3}-[A-Z]`) y descifrado de las runas y espejos empañados (`^#.+_\d{2}$`).
- **El Regreso del Tratado Olvidado:** Al verse acorralado frente a sombras que devuelven los disparos y desafían las leyes físicas, Vance recuerda el libro confiscado en el Acto I. Al releerlo, comprende su verdadero secreto: **el libro es un manual de ingeniería lingüística**. No da las palabras del conjuro porque cada demonio se ata con palabras distintas según los crímenes cometidos; el libro solo enseña los **patrones estructurales (las expresiones regulares)** y el **orden cronológico exacto** en que deben encajar.
- **Nivel 96 - 100:** El enfrentamiento final en la Bóveda Secreta de la Clínica (`MASTER_KEY_[A-Z0-9]{8}`). Vance debe inspeccionar sus notas de casos pasados para hallar los términos que satisfacen cada regla del grimorio.

---

## 🔮 4. LA MECÁNICA FINAL: EL GRIMORIO DE LOS PATRONES Y EL CONJURO FORENSE

Para derrotar a **Malphas**, las balas y las esposas son inútiles. El demonio solo puede ser obligado a retirarse y anular el pacto si el detective resuelve el gran enigma lingüístico:

```mermaid
graph TD
    subgraph "1. EL GRIMORIO (Reglas / Sintaxis Regex)"
        P1["Patrón 1: ^[A-Z]{6} (El Deudor Primigenio)"]
        P2["Patrón 2: \\[FIN\\]$ (El Cierre Terrenal)"]
        P3["Patrón 3: (?:CARNE|COR) (El Vínculo Robado)"]
        P4["Patrón 4: (?<!DEMON)VERITAS (La Verdad Inmune)"]
        P5["Patrón 5: MASTER_KEY_[A-Z0-9]{8} (El Sello del Creador)"]
    end

    subgraph "2. EL ARCHIVO FORENSE (Evidencias del Pasado)"
        E1["Caso 05/10: Manifiesto del Banco Central"]
        E2["Caso 23: Telegrama Cifrado del Espía"]
        E3["Caso 34: Registro de Frascos Quirúrgicos"]
        E4["Caso 48: Espejo Empañado de la Habitación"]
        E5["Caso 50/100: Bóveda de la Clínica Renacer"]
    end

    E1 -->|Valida con P1| K1["Palabra 1: PACTUM"]
    E2 -->|Valida con P2| K2["Palabra 2: [FIN]"]
    E3 -->|Valida con P3| K3["Palabra 3: COR"]
    E4 -->|Valida con P4| K4["Palabra 4: VERITAS"]
    E5 -->|Valida con P5| K5["Palabra 5: MASTER_KEY_AB8899ZZ"]

    K1 & K2 & K3 & K4 & K5 --> CONJURO["FÓRMULA SAGRADA ENSAMBLADA EN ORDEN EXACTO"]
    CONJURO --> DESTIERRO["Colapso del Pacto: Malphas es Arrastrado al Abismo"]
```

### ¿Cómo funciona el rompecabezas para el jugador?
1. **El Grimorio define el patrón y el orden:** El libro confiscado en el Acto I enumera 5 estrofas. Cada estrofa describe una regla Regex matemática (por ejemplo: *"Una palabra de 6 mayúsculas que selle un trato al inicio"*, *"Un ancla que corte la frase al final del renglón"*, *"Una alternativa sagrada entre los órganos hurtados"*).
2. **El Jugador rastrea sus evidencias pasadas:** El jugador no inventa las palabras de la nada. Abre su cuaderno de archivo y revisa los casos que ya superó. En los documentos de esos casos se encuentran las palabras auténticas que encajan a la perfección con cada patrón del grimorio.
3. **El Ensamblaje Final:** En la consola de la bóveda del demonio, el jugador teclea la expresión regular compuesta en el orden prescrito por el libro para ejecutar el conjuro.

---

## 🎭 5. EPÍLOGO: EL PRECIO DE LA VERDAD

Cuando Vance introduce la regex definitiva en la terminal de la bóveda:
- El contrato demoníaco arde en llamas azules espontáneas.
- Los pacientes millonarios de la clínica sufren un rechazo inmunológico fulminante e instantáneo, envejeciendo décadas en segundos al romperse el pacto sobrenatural.
- Falcone es hallado catatónico en su celda, mientras que la Dra. Cross desaparece en la noche, dejando atrás solo su diario médico y una nota dirigida a Vance.
- Vance cierra su libreta de notas, enciende un cigarrillo bajo la lluvia de New Haven y guarda su lupa forense. El caso está cerrado... pero la ciudad nunca volverá a parecerle normal.
