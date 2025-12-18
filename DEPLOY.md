# Comandos para Desplegar

## Paso 1: Crear repositorio en GitHub

1. Ir a https://github.com/new
2. Nombre del repositorio: `meulen`
3. Descripción: "Sitio web Proyecto Meulen - Investigación socioecológica"
4. Público o Privado (tu elección)
5. NO marcar "Add a README file"
6. Click "Create repository"

## Paso 2: Subir código a GitHub

Copiar y pegar estos comandos uno por uno en la terminal:

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Crear el primer commit
git commit -m "Initial commit - Proyecto Meulen MVP"

# Renombrar rama a main
git branch -M main

# Agregar el repositorio remoto (REEMPLAZAR con tu URL de GitHub)
git remote add origin https://github.com/TU-USUARIO/meulen.git

# Subir a GitHub
git push -u origin main
```

## Paso 3: Desplegar en Netlify

1. Ir a https://app.netlify.com (crear cuenta si es necesario)
2. Click en "Add new site" → "Import an existing project"
3. Seleccionar "Deploy with GitHub"
4. Autorizar Netlify a acceder a tu GitHub
5. Seleccionar el repositorio "meulen"
6. Netlify detectará automáticamente:
   - Build command: `npm run build`
   - Publish directory: `out`
7. Click "Deploy site"
8. ¡Esperar 2-3 minutos!

## Paso 4: Configurar el CMS para Angie

Después de que el sitio esté desplegado:

1. En el dashboard de Netlify, ir a "Site configuration" → "Identity"
2. Click "Enable Identity"
3. En "Registration" → Seleccionar "Invite only"
4. Scroll down → "Services" → Click "Enable Git Gateway"
5. Ir a "Identity" → "Invite users"
6. Agregar el email de Angie
7. Ella recibirá un email de invitación
8. Al aceptar, podrá ir a `https://TU-SITIO.netlify.app/admin/`
9. Crear su contraseña
10. ¡Ya puede empezar a agregar contenido!

## 🎉 Listo!

Tu sitio estará en: `https://NOMBRE-ALEATORIO.netlify.app`

Puedes cambiar el nombre en: Site configuration → Domain management → Edit site name

Ejemplo: `proyecto-meulen.netlify.app`

## Actualizaciones Futuras

Cada vez que quieras actualizar el sitio:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Netlify automáticamente desplegará los cambios en 2-3 minutos.
