# 🌼 Tu Pequeño Jardín Amarillo

Una experiencia web interactiva, íntima y artesanal diseñada como un cuento ilustrado interactivo para regalar flores amarillas.

Diseñada mobile-first con estética de papel cálido, ilustraciones SVG botánicas artesanales, microanimaciones orgánicas, secretos escondidos y generación de postales de recuerdo.

---

## 🌟 Características de la Experiencia

- **Intro Íntima:** Pantalla tenue con papel oscuro cálido, revelación pausada y la primera flor esperando a ser tocada para despertar la luz.
- **Capítulo I — Una flor por cada pequeña cosa:** Jardín interactivo con 6 flores amarillas botánicas. Al tocarlas, florecen y revelan notas manuscritas con referencias personales (dulzura, Tigger y Luneta, Mikey, Minecraft, haciendas y exploración).
- **Capítulo II — Pequeños Secretos:** Objetos escondidos entre las hojas:
  - *Mikey (Tokyo Revengers):* Silueta de motocicleta con modo oscuro y destello dorado.
  - *Tigger:* Huellita que activa a un gatito corriendo a toda prisa (*zoomies*).
  - *Luneta de Yogurt:* Aparición tímida entre las flores.
  - *Dark Romance:* Pequeño libro negro encuadernado.
  - *Chocolate:* Dulce debilidad escondida.
- **Capítulo III — Un mundo que todavía no conoces:** Interpretación original isométrica en pixel-art / voxel con flor amarilla estilizada que al tocarse abre una promesa de jugar Minecraft juntos.
- **Capítulo IV — El Ramo:** Las flores florecidas se reúnen físicamente en un ramo envuelto en papel kraft con lazo de hilo rústico. Conclusión narrativa emotiva, dedicatoria de Diego y epílogo interactivo ("Antes de irte...").
- **Postal de Recuerdo:** Generador en alta resolución (HTML5 Canvas) que permite guardar la postal con dedicatoria en la galería del celular o compartirla.
- **Microinteracciones y Sonido:** Chimes pentatónicos cálidos sintetizados con Web Audio API (sin dependencias de archivos externos que puedan fallar en móviles) y vibración háptica suave.

---

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS con paleta cálida (girasol, crema, papel kraft, verde oliva, carbón)
- **Tipografías:** Lora (serif para narrativa de libro) y Caveat (manuscrita para notas personales)
- **Animaciones:** Framer Motion y Canvas Confetti
- **Ilustraciones:** SVG procedurales artesanales

---

## 🚀 Cómo Ejecutar en Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir en el navegador:
   - Experiencia de Kiyomi: `http://localhost:3000` o `http://localhost:3000/kiyomi`

4. Verificar build de producción:
   ```bash
   npm run build
   ```

---

## ☁️ Cómo Desplegar en Vercel (En 2 Minutos)

El proyecto está 100% optimizado para Vercel (Next.js App Router, SSG, cero backend ni variables de entorno requeridas).

### Opción A: Desde la Terminal (Vercel CLI)
1. Abre tu terminal en esta carpeta y ejecuta:
   ```bash
   npx vercel
   ```
2. Inicia sesión en tu cuenta de Vercel cuando te lo solicite en el navegador.
3. Presiona Enter para aceptar la configuración automática detectada.
4. Para desplegar en producción directamente:
   ```bash
   npx vercel --prod
   ```
5. ¡Listo! Vercel te entregará la URL final (por ejemplo: `https://tu-pequeno-jardin.vercel.app`).

### Opción B: Mediante GitHub
1. Crea un repositorio en GitHub y sube esta carpeta:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/tu-pequeno-jardin.git
   git push -u origin main
   ```
2. Entra a [vercel.com/new](https://vercel.com/new).
3. Importa tu repositorio `tu-pequeno-jardin`.
4. Haz clic en **Deploy** (Vercel detectará Next.js automáticamente).

---

## 🌻 Reutilización para Dani o Van

El motor está completamente desacoplado de los datos. Para agregar una nueva destinataria (por ejemplo Dani o Van):

1. Abre `src/config/recipients.ts`.
2. Agrega una nueva clave con su configuración personalizada:
   ```ts
   export const RECIPIENTS: Record<string, RecipientConfig> = {
     kiyomi: { ... },
     dani: {
       slug: 'dani',
       name: 'Dani',
       metaTitle: 'Un pequeño jardín para Dani 💛',
       // Sus flores, notas, easter eggs y mensajes...
     },
     van: {
       slug: 'van',
       name: 'Van',
       metaTitle: 'Un pequeño jardín para Van 💛',
       // Sus flores, notas, easter eggs y mensajes...
     }
   };
   ```
3. Estará disponible automáticamente en la ruta `/dani` o `/van`.