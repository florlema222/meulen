# Proyecto Meulen - Sitio Web

Sitio web del Proyecto Meulen, investigación sobre justicias e injusticias socioecológicas con perspectiva latinoamericana e interdisciplinar.

## 🚀 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 📝 Panel de Administración

El panel de administración está disponible en `/admin` y permite gestionar:

- **Publicaciones**: Artículos, libros, papers, etc.
- **Eventos**: Seminarios, talleres, conferencias
- **Noticias**: Novedades del proyecto
- **Equipo**: Miembros del equipo de investigación

### Acceso al Panel

Durante el desarrollo, el CMS usa un repositorio de prueba local. Para producción, se requiere configurar:

1. Conectar con un repositorio de GitHub
2. Habilitar Netlify Identity o GitHub OAuth
3. Actualizar `public/admin/config.yml` con la configuración de producción

## 🎨 Diseño

- **Colores**: Paleta de tierras (marrones, beige, crema) con acento rosa
- **Tipografías**: Cormorant Garamond y Playfair Display
- **Framework**: Next.js 15 con React 19
- **Estilos**: Tailwind CSS
- **CMS**: Decap CMS (headless)

## 📦 Despliegue

### Netlify (Recomendado para este proyecto)

1. Conectar el repositorio con Netlify
2. Netlify detectará automáticamente la configuración
3. Habilitar Netlify Identity para autenticación del CMS
4. Habilitar Git Gateway en Netlify Identity

### Vercel

1. Conectar el repositorio con Vercel
2. Vercel detectará automáticamente la configuración Next.js
3. Para el CMS, se requiere configurar autenticación externa (GitHub OAuth)

## 🏗️ Estructura del Proyecto

```
meulen/
├── app/                  # Páginas Next.js (App Router)
├── components/           # Componentes React reutilizables
├── content/             # Contenido en Markdown
│   ├── publications/    # Publicaciones
│   ├── events/         # Eventos
│   ├── news/           # Noticias
│   └── team/           # Equipo
├── lib/                # Utilidades y helpers
├── public/             # Archivos estáticos
│   └── admin/         # Panel de administración CMS
└── tailwind.config.js # Configuración de Tailwind
```

## 🔧 Tecnologías

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Decap CMS](https://decapcms.org/)

## 📄 Licencia

© 2025 Proyecto Meulen - FCJS, Universidad Nacional del Litoral
