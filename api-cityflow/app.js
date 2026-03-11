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

// Servir la carpeta de frontend (CITYFLOW)
app.use(express.static(path.join(__dirname, '../CITYFLOW')));

// Cualquier otra ruta que no sea de API, devuelve el index.html del frontend
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '../CITYFLOW/index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor CityFlow corriendo en http://localhost:${PORT}`);
});