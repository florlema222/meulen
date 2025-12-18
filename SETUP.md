# Guía de Configuración - MVP Proyecto Meulen

## ✅ Lo que está listo para mostrar

### 1. Sitio Web Principal
- **URL local**: http://localhost:3000
- Página de inicio con branding de Meulen (colores, tipografías)
- Sección de publicaciones mostrando contenido de ejemplo
- Navegación, footer con redes sociales
- Diseño responsive

### 2. Panel de Administración (CMS)
- **Ubicación**: `public/admin/index.html`
- **Acceso en producción**: `https://tu-sitio.com/admin/`
- Configurado para gestionar:
  - ✅ Publicaciones (artículos, libros, papers)
  - ✅ Eventos (seminarios, talleres, conferencias)
  - ✅ Noticias
  - ✅ Equipo (miembros del equipo de investigación)

### 3. Contenido de Ejemplo
- Una publicación de ejemplo en `content/publications/`
- Muestra cómo se verá el contenido en el sitio

## 🚀 Pasos para Probar el MVP

### Opción A: Mostrar Localmente
```bash
npm run dev
```
Abrir http://localhost:3000

### Opción B: Desplegar en Netlify (Recomendado)

1. **Crear repositorio en GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Proyecto Meulen MVP"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/meulen.git
   git push -u origin main
   ```

2. **Conectar con Netlify**
   - Ir a https://app.netlify.com
   - Click en "Add new site" → "Import an existing project"
   - Conectar con GitHub y seleccionar el repositorio
   - Netlify detectará automáticamente la configuración
   - Click en "Deploy"

3. **Configurar el CMS (importante para que Angie pueda editar)**
   - En Netlify, ir a "Site configuration" → "Identity"
   - Click "Enable Identity"
   - En "Registration preferences" → "Invite only"
   - En "Services" → "Git Gateway" → "Enable Git Gateway"
   - En "Identity" → "Invite users" → agregar el email de Angie

4. **Angie podrá acceder al CMS**
   - Ir a `https://tu-sitio.netlify.app/admin/`
   - Aceptar la invitación que llegó por email
   - Crear contraseña
   - ¡Ya puede agregar/editar contenido!

## 📋 Para mostrar al equipo

### Qué pueden ver ahora:
1. **Diseño visual**: Colores, tipografías, estructura
2. **Navegación**: Menú superior con todas las secciones
3. **Publicaciones**: Cómo se verá una publicación
4. **Admin panel**: Cómo Angie agregará contenido (muy importante mostrar esto)

### Preguntas para hacer al equipo:
1. ¿Les gusta el diseño visual (colores, tipografías)?
2. ¿Les parece intuitivo el panel de administración?
3. ¿Falta alguna sección importante?
4. ¿Quieren cambios en la estructura?

## 🎨 Personalización Fácil

### Cambiar colores
Editar `tailwind.config.js` → sección `colors.meulen`

### Agregar logo
Reemplazar el círculo con "M" en `app/page.tsx` línea 45 con:
```tsx
<Image src="/images/logo.png" alt="Meulen" width={128} height={128} />
```

### Agregar más contenido
Usar el panel `/admin/` o agregar archivos `.md` en carpetas `content/`

## ⚠️ Importante

- El CMS solo funcionará correctamente en producción (Netlify/Vercel)
- En desarrollo local, pueden ver el contenido pero no editarlo desde el panel
- Después de recibir feedback del equipo, implementaremos las demás secciones

## 🔧 Tecnologías Usadas

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Estilos**: Tailwind CSS
- **CMS**: Decap CMS (headless, gratis)
- **Hosting**: Netlify (gratis)
- **Costo total**: $0

## 📞 Próximos Pasos

Después del feedback:
1. Implementar sección "Nosotros" con fotos del equipo
2. Implementar sección "Qué Hacemos"
3. Agregar páginas de Eventos y Noticias
4. Soporte bilingüe (Español/Inglés)
5. Migrar contenido existente (Instagram, Drive)
