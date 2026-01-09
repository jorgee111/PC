# CityFlow - Sistema de Predicción de Tráfico (A6)

Este proyecto es una aplicación web diseñada para monitorizar y predecir el estado del tráfico en la autovía A6. Combina un backend en Node.js para la gestión de usuarios e incidencias, con un microservicio de Inteligencia Artificial en Python que realiza predicciones en tiempo real basadas en datos históricos y meteorológicos.

## 🚀 Instalación y Puesta en Marcha

El sistema se compone de tres partes: el Servicio de IA, la API Backend y el Frontend. Para que la aplicación funcione correctamente, debes inicializar los servicios en el siguiente orden.

Inicializar el Servicio de IA (Python)

Este servicio carga el modelo predictivo (`GradientBoosting`) y espera peticiones.

Asegúrate de tener las librerías necesarias instaladas (FastAPI, Uvicorn, Scikit-learn, Pandas, Joblib). Si no las tienes, instálalas:

pip install fastapi uvicorn scikit-learn pandas joblib

1. Abre una terminal y navega a la carpeta del servicio:
   cd ai-service

2. Ejecuta el servidor:
python main.py

Deberás ver un mensaje indicando que el servicio está corriendo (usualmente en el puerto 8000).

Inicializar el Backend (Node.js)
Esta API gestiona la base de datos, el login de usuarios y las incidencias.

3. Abre una nueva terminal (sin cerrar la anterior) y navega a la carpeta de la API:
cd api-cityflow

4. Instala las dependencias del proyecto:
npm install

5. Ejecuta el servidor:
node app.js
