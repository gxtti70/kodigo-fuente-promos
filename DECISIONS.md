# Decisiones Arquitectónicas (DECISIONS.md)

## Stack Tecnológico Elegido
- **Frontend:** React + Vite + TailwindCSS. Elegido por su velocidad de desarrollo extrema, ecosistema robusto y facilidad para maquetar interfaces limpias y responsivas.
- **Backend:** Node.js con Express y TypeScript. Permite tipado estricto compartido, desarrollo ágil de endpoints REST y una integración nativa muy ligera con Docker.
- **Base de Datos:** PostgreSQL con Prisma ORM. PostgreSQL garantiza integridad relacional estricta (clave para fechas y validaciones financieras de descuentos), y Prisma acelera la creación de migraciones y consultas seguras tipadas.
- **Contenedorización:** Docker & Docker Compose con multi-stage builds para mantener imágenes ligeras y seguras (especialmente en Nginx para el frontend).
- **CI/CD:** GitHub Actions ejecutando linter, compilación y un *Smoke Test* automatizado haciendo peticiones directas al endpoint `/health` levantando el stack completo con Docker Compose.
