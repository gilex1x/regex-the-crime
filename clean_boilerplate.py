import re

file_path = "c:/Users/GILEXX/Desktop/dev/regex-the-crime/src/data/FullLevelsData.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

boilerplates = [
    " Documentos chamuscados hallados en una bóveda secreta hacen alusión al infame 'Tratado de los Ecos', confirmando que el aspecto ritual no era solo una fachada.",
    " La tensión en la comisaría aumenta; asuntos internos ha comenzado a confiscar evidencias clave, obligando a Vance a guardar una copia de estos archivos en su maletín personal.",
    " Cada nueva pista consolida la teoría de que el colapso de las líneas telefónicas no fue un accidente, sino una maniobra orquestada para silenciar testigos clave esa noche.",
    " Investigaciones posteriores revelaron que el sindicato de Falcone había establecido puntos ciegos en esta zona específica para eludir las patrullas policiales.",
    " Además, el detective Vance notó un patrón recurrente en los registros telefónicos interceptados cerca de la escena, vinculando a figuras públicas de alto perfil.",
    " La Dra. Cross parece estar involucrada directamente; los archivos recuperados del sanatorio coinciden con el modus operandi documentado en estos reportes.",
    " Las piezas del rompecabezas comienzan a formar una imagen aterradora sobre la red de trasplantes clandestinos y la impunidad en las altas esferas de New Haven.",
    " Restos biológicos anómalos fueron detectados por los peritos forenses, sugiriendo técnicas quirúrgicas demasiado avanzadas para simples criminales callejeros.",
    " Un confidente anónimo filtró que las sumas de dinero manejadas en estas transacciones superan con creces el presupuesto de toda la comisaría del distrito.",
    " Las sombras del Hotel Noir y los callejones industriales esconden más que contrabando; ocultan el precio de la inmortalidad comprada con sangre."
]

original_length = len(content)
for b in boilerplates:
    count = content.count(b)
    print(f"Found '{b[:30]}...' {count} times.")
    content = content.replace(b, "")

# Some might not have leading space
for b in boilerplates:
    b_no_space = b.strip()
    count = content.count(b_no_space)
    if count > 0:
        print(f"Found '{b_no_space[:30]}...' {count} times (no space).")
        content = content.replace(b_no_space, "")

if len(content) < original_length:
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("File cleaned successfully.")
else:
    print("No changes made.")
