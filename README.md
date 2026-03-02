# 🚀 Portafolio Personal - Deibyd Castillo

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-v1.0-6366f1?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![EmailJS](https://img.shields.io/badge/EmailJS-Ready-10b981?style=for-the-badge)

**Portafolio profesional interactivo con animaciones avanzadas y sistema de contacto funcional**

[Demo en Vivo](#) • [Reportar Bug](mailto:Dealcag07@gmail.com) • [Solicitar Función](mailto:Dealcag07@gmail.com)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#️-tecnologías-utilizadas)
- [Instalación](#-instalación)
- [Configuración del Email](#-configuración-del-sistema-de-emails)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Personalización](#-personalización)
- [Despliegue](#-despliegue)
- [Navegadores Soportados](#-navegadores-soportados)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## ✨ Características

### 🎨 **Diseño y UX**
- ✅ Diseño moderno con glassmorphism y gradientes vibrantes
- ✅ Modo claro/oscuro con transiciones suaves
- ✅ Cursor personalizado con efectos de seguimiento
- ✅ Animaciones fluidas en scroll (Intersection Observer)
- ✅ Partículas interactivas en canvas
- ✅ Diseño 100% responsive (móvil, tablet, desktop)

### 🛠️ **Funcionalidades**
- ✅ Navegación suave con detección de sección activa
- ✅ Efecto de escritura animado (typing effect)
- ✅ Contador animado de estadísticas
- ✅ Barras de progreso de habilidades
- ✅ Carrusel de testimonios
- ✅ Galería de proyectos con filtros
- ✅ Preloader personalizado
- ✅ Formulario de contacto funcional con EmailJS

### 📧 **Sistema de Contacto**
- ✅ Envío real de emails sin backend
- ✅ Validación de campos en tiempo real
- ✅ Notificaciones elegantes de éxito/error
- ✅ Estados visuales del botón (loading, success, error)
- ✅ Plantilla de email HTML profesional
- ✅ Protección anti-spam integrada

### ⚡ **Rendimiento**
- ✅ Optimización de animaciones con requestAnimationFrame
- ✅ Lazy loading de recursos
- ✅ Código modular y mantenible
- ✅ Sin dependencias externas (excepto EmailJS)
- ✅ Carga rápida y rendimiento optimizado

---

## 🛠️ Tecnologías Utilizadas

<table>
<tr>
<td align="center" width="33%">

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</td>
<td align="center" width="33%">

### Servicios
![EmailJS](https://img.shields.io/badge/EmailJS-Ready-10b981?style=flat-square)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat-square&logo=google&logoColor=white)

</td>
<td align="center" width="33%">

### Herramientas
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white)

</td>
</tr>
</table>

### 📦 Librerías y APIs
- **EmailJS** - Envío de emails desde JavaScript
- **Google Fonts** - Tipografías (Inter, Space Grotesk)
- **Canvas API** - Sistema de partículas interactivas
- **Intersection Observer API** - Animaciones en scroll

---

## 🚀 Instalación

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Cuenta de EmailJS (gratuita)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/portafolio.git
cd portafolio
```

2. **Abrir con Live Server** (Recomendado)
```bash
# Si usas VS Code con Live Server extension
# Click derecho en index.html → Open with Live Server
```

3. **O abrir directamente**
```bash
# Simplemente abre index.html en tu navegador
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

4. **Configurar EmailJS** (Ver siguiente sección)

---

## 📧 Configuración del Sistema de Emails

El portafolio incluye un formulario de contacto totalmente funcional que envía emails directamente a tu Gmail usando EmailJS.

### Configuración Rápida (5 minutos)

#### 1. Crear cuenta en EmailJS
- Ve a [EmailJS.com](https://www.emailjs.com/)
- Regístrate gratis (200 emails/mes)

#### 2. Conectar Gmail
- Dashboard → **Email Services** → **Add New Service**
- Selecciona **Gmail** y conecta tu cuenta
- Copia tu **Service ID** (ej: `service_qfrrsxq`)

#### 3. Crear plantilla
- Dashboard → **Email Templates** → **Create New Template**
- Usa la plantilla HTML proporcionada en el archivo
- Copia tu **Template ID** (ej: `template_m7dwjts`)

#### 4. Obtener Public Key
- Dashboard → **Account** → **General**
- Copia tu **Public Key** (ej: `H7vLF1h12CqZ2qYN-`)

#### 5. Actualizar el código
Las credenciales ya están configuradas en `script.js`:
```javascript
// Línea ~288
emailjs.init('H7vLF1h12CqZ2qYN-');

// Línea ~335-336
const response = await emailjs.send(
    'service_qfrrsxq',    // Tu Service ID
    'template_m7dwjts',   // Tu Template ID
    formData
);
```

### Documentación Completa
- 📖 [Guía Completa de Configuración](CONFIGURACION_EMAIL.md)
- 🚀 [Inicio Rápido](INICIO_RAPIDO.md)

---

## 📁 Estructura del Proyecto

```
portafolio/
│
├── 📄 index.html                 # Página principal
├── 🎨 styles.css                 # Estilos CSS (3970 líneas)
├── ⚡ script.js                  # JavaScript (1347 líneas)
│
├── 📚 Documentación
│   ├── README.md                 # Este archivo
│   ├── CONFIGURACION_EMAIL.md    # Guía detallada de EmailJS
│   └── INICIO_RAPIDO.md         # Guía rápida de configuración
│
└── 🖼️ assets/ (opcional)
    ├── images/                   # Imágenes del proyecto
    ├── icons/                    # Iconos personalizados
    └── fonts/                    # Fuentes locales (si hay)
```

### Componentes Principales

#### `index.html`
- Estructura HTML semántica
- Meta tags optimizados para SEO
- Secciones: Hero, About, Projects, Skills, Experience, Testimonials, Contact

#### `styles.css`
- Sistema de diseño con variables CSS
- Modo claro/oscuro
- Animaciones y transiciones
- Media queries para responsive design
- Glassmorphism y efectos modernos

#### `script.js`
- Módulos independientes y reutilizables
- Sistema de cursor personalizado
- Navegación inteligente
- Animaciones en scroll
- Formulario de contacto con EmailJS
- Sistema de notificaciones

---

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css` (línea 6-20):

```css
:root {
    /* Colores principales */
    --accent-primary: #6366f1;      /* Azul */
    --accent-secondary: #8b5cf6;    /* Morado */
    --accent-tertiary: #ec4899;     /* Rosa */
    
    /* Personaliza tu gradiente */
    --accent-gradient: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
}
```

### Cambiar Tipografías

Modifica las fuentes en `index.html` (línea 14-17):

```html
<link href="https://fonts.googleapis.com/css2?family=TU_FUENTE:wght@300;400;600&display=swap" rel="stylesheet">
```

Y actualiza en `styles.css`:

```css
:root {
    --font-primary: 'TU_FUENTE', sans-serif;
}
```

### Personalizar Contenido

1. **Información Personal**: Edita `index.html`
   - Línea 105-140: Sección Hero
   - Línea 225-280: About Me
   - Línea 877-887: Información de contacto

2. **Proyectos**: Línea 310-680 en `index.html`
3. **Skills**: Línea 435-560 en `index.html`
4. **Testimonios**: Línea 780-850 en `index.html`

### Email de Destino

Cambia el email en `script.js` (línea ~304):

```javascript
to_email: 'TU_EMAIL@gmail.com'
```

---

## 🌐 Despliegue

### Opción 1: GitHub Pages (Gratis)

1. **Sube tu código a GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tuusuario/portafolio.git
git push -u origin main
```

2. **Activa GitHub Pages**
   - Ve a Settings → Pages
   - Source: Deploy from branch → `main` → `/root`
   - Guarda y espera 2-3 minutos

3. **Tu sitio estará en:** `https://tuusuario.github.io/portafolio`

### Opción 2: Netlify (Gratis)

1. Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. ¡Listo! Tu sitio está publicado

### Opción 3: Vercel (Gratis)

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Despliega:
```bash
vercel
```

### Opción 4: Hosting Tradicional

1. Sube todos los archivos vía FTP
2. Asegúrate de que `index.html` esté en la raíz
3. Configura el dominio

---

## 🌍 Navegadores Soportados

| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome    | 90+            |
| Firefox   | 88+            |
| Safari    | 14+            |
| Edge      | 90+            |
| Opera     | 76+            |

---

## 📊 Características del Código

- ✅ **Sin dependencias pesadas** - Solo EmailJS
- ✅ **Vanilla JavaScript** - No frameworks
- ✅ **CSS Puro** - Sin preprocessadores
- ✅ **Modular** - Funciones independientes
- ✅ **Comentado** - Código bien documentado
- ✅ **Responsive** - Mobile-first approach
- ✅ **Accesible** - Etiquetas ARIA
- ✅ **SEO Optimizado** - Meta tags apropiados

---

## 🐛 Troubleshooting

### El formulario no envía emails

1. Verifica que las credenciales de EmailJS estén correctas
2. Revisa la consola del navegador (F12)
3. Confirma que el servicio de EmailJS esté activo
4. Revisa tu carpeta de SPAM

### Las animaciones no funcionan

1. Asegúrate de tener JavaScript habilitado
2. Usa un navegador moderno
3. Revisa si hay errores en la consola

### El sitio no se ve bien en móvil

1. Verifica el viewport meta tag
2. Asegúrate de no haber modificado las media queries
3. Prueba en diferentes dispositivos

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2026 Deibyd Castillo

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados (el "Software"), para 
utilizar el Software sin restricciones...
```

---

## 👤 Autor

<div align="center">

### **Deibyd Castillo**

Desarrollador Full-Stack | Creando experiencias digitales excepcionales

[![Email](https://img.shields.io/badge/Email-Dealcag07%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:Dealcag07@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tuusuario)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tuusuario)

📍 **Obando, Valle, Colombia**

</div>

---

## 🙏 Agradecimientos

- Inspiración de diseño de varios portafolios modernos
- [EmailJS](https://www.emailjs.com/) por su excelente servicio
- [Google Fonts](https://fonts.google.com/) por las tipografías
- La comunidad de desarrolladores por feedback y sugerencias

---

## 📈 Próximas Funcionalidades

- [ ] Blog integrado
- [ ] Modo de alto contraste
- [ ] Múltiples idiomas (ES/EN)
- [ ] Integración con CMS
- [ ] Analytics dashboard
- [ ] Versión PWA

---

<div align="center">

### ⭐ Si te gustó este proyecto, dale una estrella en GitHub

**Hecho con ❤️ por Deibyd Castillo**

[⬆ Volver arriba](#-portafolio-personal---deibyd-castillo)

</div>
