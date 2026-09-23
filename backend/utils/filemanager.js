const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Asegura que la carpeta uploads exista
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

// Guardar archivo en disco
function saveFile(filename, buffer) {
    const filePath = path.join(UPLOADS_DIR, filename);

    try {
        fs.writeFileSync(filePath, buffer);
        return filePath;
    } catch (err) {
        console.error('Error guardando archivo:', err);
        return null;
    }
}

// Eliminar archivo
function deleteFile(filename) {
    const filePath = path.join(UPLOADS_DIR, filename);

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    } catch (err) {
        console.error('Error eliminando archivo:', err);
        return false;
    }
}

// Obtener ruta completa del archivo
function getFilePath(filename) {
    return path.join(UPLOADS_DIR, filename);
}

module.exports = {
    saveFile,
    deleteFile,
    getFilePath
};
