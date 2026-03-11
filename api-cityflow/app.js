import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import usersRoutes from './src/routes/users.routes.js';
import linesRoutes from './src/routes/lines.routes.js';
import incidentsRoutes from './src/routes/incidents.routes.js';
import vehiclesRoutes from './src/routes/vehicles.routes.js';
import { openDB } from './src/db/db.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

openDB();

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Registro de rutas corregido
app.use('/api/users', usersRoutes);
app.use('/api/lines', linesRoutes);
app.use('/api/incidents', incidentsRoutes); // Ruta para la tabla del admin
app.use('/api/vehicles', vehiclesRoutes);

// Servir la carpeta de frontend (CITYFLOW). En Azure, el app.js podría estar ejecutándose desde diferentes niveles de directorio.
// Resolvemos la ruta correcta usando __dirname (que para 'fileURLToPath(import.meta.url)' en /api-cityflow será ese directorio o la raíz en Azure)
// Si app.js está en la raíz en Azure, CITYFLOW estará junto a él. Si está en api-cityflow, estará un nivel arriba.
const possiblePath1 = path.join(__dirname, 'CITYFLOW');
const possiblePath2 = path.join(__dirname, '../CITYFLOW');
const frontendPath = require('fs').existsSync(possiblePath1) ? possiblePath1 : possiblePath2;

app.use(express.static(frontendPath));

// Cualquier otra ruta que no sea de API, devuelve el index.html del frontend
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor CityFlow corriendo en el puerto ${PORT}`);
});