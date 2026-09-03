# 🎓 ACADEMIA DE DETECTIVES — GUÍA DE REGEX "PARA DUMMIES" (Estilo W3Schools)

> *"Regex no es magia negra. Es simplemente la barra de búsqueda (Ctrl + F) de tu navegador, pero con comodines inteligentes."*

Esta guía está diseñada para que cualquier persona, sin importar su nivel de programación, aprenda Expresiones Regulares paso a paso con explicaciones sencillas, tablas visuales claras y ejemplos interactivos.

---

## 📖 1. ¿Qué es una Expresión Regular?

Una **Expresión Regular** (o *RegExp*) es una secuencia de caracteres que forma un **patrón de búsqueda**.

Cuando buscas un texto en un documento, usas este patrón para describir lo que estás buscando:
* Puede ser tan simple como un solo carácter o palabra (ej: `asesino`).
* O puede ser un patrón complejo (ej: buscar cualquier correo electrónico, número de teléfono o matrícula de auto).

### 🔍 La Sintaxis Básica:
```
/patrón/modificadores
```
* **Ejemplo:** `/detective/i`
* `/detective/` es el **patrón** que quieres buscar.
* `i` es un **modificador** (hace que la búsqueda ignore mayúsculas y minúsculas).

---

## 📊 2. Tabla Periódica de Regex (Referencia Rápida)

### 🔤 Modificadores (Banderas / Flags)
| Modificador | ¿Para qué sirve? | Ejemplo simple |
| :--- | :--- | :--- |
| `i` | Ignora mayúsculas y minúsculas (*case-insensitive*) | `/hola/i` encuentra `"HOLA"`, `"Hola"`, `"hola"` |
| `g` | Búsqueda global (encuentra todas las apariciones, no solo la primera) | `/gato/g` encuentra todos los gatos en el texto |
| `m` | Multilínea (hace que `^` y `$` funcionen por cada renglón) | Útil para listas y tablas |

---

### 📦 Corchetes (Para elegir opciones)
| Patrón | ¿Qué significa en lenguaje humano? | Ejemplo |
| :--- | :--- | :--- |
| `[abc]` | Encuentra **cualquiera** de los caracteres dentro del corchete | `c[ao]sa` encuentra `"casa"` o `"cosa"` |
| `[0-9]` | Encuentra **cualquier dígito** del 0 al 9 | `Agente [0-9]` encuentra `"Agente 7"` |
| `[a-z]` | Cualquier letra minúscula de la 'a' a la 'z' | `[a-z]` |
| `[A-Z]` | Cualquier letra mayúscula de la 'A' a la 'Z' | `[A-Z]` |
| `[^abc]` | Encuentra cualquier cosa que **NO** sea 'a', 'b' ni 'c' | `[^0-9]` encuentra letras y símbolos, no números |
| `(x\|y)` | Encuentra **x** o encuentra **y** (Alternativa OR) | `(perro\|gato)` |

---

### ⚡ Metacaracteres (Atajos rápidos)
| Metarácter | Significado Fácil | Equivalente |
| :--- | :--- | :--- |
| `.` | **Cualquier carácter** (excepto saltos de línea) | Como un comodín en los naipes |
| `\d` | Encuentra un **dígito** (número) | `[0-9]` |
| `\s` | Encuentra un **espacio en blanco** (o tabulador) | `" "` |
| `\w` | Encuentra una **palabra/letra/número** | `[a-zA-Z0-9_]` |
| `\b` | Encuentra un **límite de palabra** (inicio o fin de palabra) | `\bRob\b` no coincide con `"Roberto"` |
| `\D` | Cualquier cosa que **NO** sea un dígito | `[^0-9]` |
| `\S` | Cualquier cosa que **NO** sea un espacio | `[^\s]` |
| `\W` | Cualquier cosa que **NO** sea una letra/número | `[^\w]` |

---

### 🔢 Cuantificadores (¿Cuántas veces se repite?)
| Cuantificador | ¿Cuántas veces? | Ejemplo | Coincide con... |
| :--- | :--- | :--- | :--- |
| `+` | **1 o más veces** (al menos una) | `\d+` | `"5"`, `"120"`, `"99999"` |
| `*` | **0 o más veces** (opcional, muchas veces) | `bo*m` | `"bm"`, `"bom"`, `"booooom"` |
| `?` | **0 o 1 vez** (es opcional) | `colou?r` | `"color"`, `"colour"` |
| `{4}` | **Exactamente 4 veces** | `\d{4}` | `"1984"`, `"2025"` |
| `{2,4}` | **Entre 2 y 4 veces** | `\d{2,4}` | `"55"`, `"555"`, `"5555"` |
| `^` | **Al principio del renglón** | `^Hola` | Si la línea empieza con "Hola" |
| `$` | **Al final del renglón** | `fin$` | Si la línea termina con "fin" |

---

## 🏫 3. El Plan de Lecciones de la Academia (Paso a Paso)

```
Nivel 1: Tu primera búsqueda (Ctrl + F con texto exacto)
   ↓
Nivel 2: Las banderas mágicas (/i para ignorar mayúsculas y /g para encontrar todas)
   ↓
Nivel 3: Elegir entre opciones con corchetes [1-9] y [A-Z]
   ↓
Nivel 4: Atajos de teclado (\d para números y \s para espacios)
   ↓
Nivel 5: Uno o más números con el signo más (\d+)
   ↓
Nivel 6: Caracteres con superpoderes y cómo neutralizarlos (\. y \$)
   ↓
Nivel 7: Contar repeticiones exactas con llaves (\d{4})
   ↓
Nivel 8: El límite de palabra (\b para no confundir Rob con Roberto)
   ↓
Nivel 9: Uno u otro con la barra vertical (Sedan|Taxi)
   ↓
Nivel 10: Lectura y Deconstrucción de una Regex (Aprender a leerla como un profesional)
```

---

## 🛠️ 4. Filosofía "Try it Yourself" en el Juego

Para evitar cualquier frustración en el aprendizaje:
1. **Explicación en 3 viñetas cortas.**
2. **Tabla visual** mostrando el símbolo y qué hace.
3. **Botón "💡 Ver Ejemplo / Probar"**: Llena el input con el patrón sugerido para que el jugador vea inmediatamente el texto iluminado y pueda experimentar cambiándole letras.
4. **Validación interactiva al instante.**
