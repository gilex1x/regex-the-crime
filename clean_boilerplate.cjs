const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'FullLevelsData.js');
let content = fs.readFileSync(filePath, 'utf-8');

const boilerplates = [
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
];

const originalLength = content.length;

boilerplates.forEach(b => {
    let count = content.split(b).length - 1;
    console.log(`Found '${b.substring(0, 30)}...' ${count} times.`);
    content = content.split(b).join('');
    
    // Also remove without leading space
    const bNoSpace = b.trim();
    let count2 = content.split(bNoSpace).length - 1;
    if (count2 > 0) {
        console.log(`Found '${bNoSpace.substring(0, 30)}...' ${count2} times (no space).`);
        content = content.split(bNoSpace).join('');
    }
});

if (content.length < originalLength) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('File cleaned successfully.');
} else {
    console.log('No changes made.');
}
