# ADIA

Este repositorio ahora está organizado en dos módulos:

- **frontend/**: aplicación React con Vite.
- **backend/**: servidor Express en Node.js.

## Instalación

```bash
npm install --prefix frontend
npm install --prefix backend
```

## Desarrollo

- Iniciar el frontend: `npm run dev`
- Iniciar el backend: `npm run backend:start`

El frontend consumirá el backend utilizando la variable de entorno `VITE_API_URL`. Por defecto se utiliza `http://localhost:3000`.

## Construcción

- Compilar el frontend: `npm run build`
- Compilar el backend: `npm run backend:build`

## Lint

- Lint del frontend: `npm run lint`
- Lint del backend: `npm run backend:lint`
