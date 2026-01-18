# Tienda React - Carrito de Compras

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"/>
</div>

## Descripción

Proyecto desarrollado en **React** que simula una tienda en línea.

Permite visualizar productos almacenados en **Firebase Firestore**, agregar productos a un carrito de compras, actualizar el stock automáticamente y eliminar productos del carrito.

Incluye autenticación de usuarios con **Firebase Auth**, reglas de seguridad en Firestore, y componentes reutilizables en React.

## Tecnologías utilizadas

- **React 18** (Hooks, componentes funcionales).
- **Vite** (Build tool y dev server).
- **Firebase** (Auth para usuarios y Firestore para almacenamiento).
- **JavaScript ES6+**.
- **CSS** (Bootstrap 5 para estilos responsivos).

## Requisitos

- Node.js >= 22.18.0.
- npm.
- Cuenta de Firebase con Firestore habilitado.

## Instalación

1. **Clonar el repositorio:**
```bash
git clone <URL_DEL_REPOSITORIO>
cd tienda-react
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar Firebase:**
   - Crear un proyecto en [Firebase Console](https://console.firebase.google.com/).
   - Habilitar Firestore y Authentication (Email/Password).
   - Copiar la configuración al archivo `src/firebase.js`.

4. **Ejecutar la aplicación en modo desarrollo:**
```bash
npm run dev
```

## Estructura del proyecto
```
tienda-react/
│
├── src/
│   ├── components/
│   │   ├── auth/            # Login.jsx, Register.jsx
│   │   ├── Cart.jsx         # Carrito de compras
│   │   ├── ProductItem.jsx  # Card de cada producto
│   │   ├── ProductList.jsx  # Lista de productos y manejo de carrito
│   │   └── Toolbar.jsx      # Barra superior con logout
│   │
│   ├── firebase.js          # Configuración e inicialización de Firebase
│   └── App.jsx              # Componente principal con rutas y estado de usuario
│
├── public/                  # Archivos estáticos
├── package.json
└── README.md
```

## Funcionamiento de la aplicación

### Autenticación

- El usuario debe iniciar sesión para acceder a la tienda.
- Registro de nuevos usuarios mediante email y contraseña.
- El estado de sesión se mantiene con Firebase Auth.

### Tienda y Carrito

- Visualiza productos desde Firestore (colección `productos`).
- Cada producto muestra: imagen, nombre, descripción, precio y stock disponible.
- **Agregar productos al carrito:**
  - El stock en Firestore se actualiza automáticamente.
  - Si el producto ya está en el carrito, se incrementa su cantidad.
- **Eliminar productos del carrito:**
  - El stock en Firestore se restaura automáticamente.
- El carrito muestra total acumulado y permite eliminar productos individualmente.

### Integración con Firebase

- **Firestore** almacena los productos y sus datos: `nombre`, `descripcion`, `precio`, `stock`, `imagenUrl`.
- **Reglas de seguridad aplicadas:**
  - Lectura y actualización solo para usuarios autenticados.
  - Creación y borrado deshabilitado desde el frontend.
  - Bloqueo por defecto de cualquier otra colección existente.
- **Firebase Auth** controla los accesos de los usuarios a la tienda.

## Despliegue en Netlify

1. **Ejecutar el build de producción:**
```bash
npm run build
```

2. **Subir la carpeta `dist` a Netlify:**
   - Crear una cuenta en [Netlify](https://www.netlify.com/).
   - **Opción A - Deploy automático:** Conectar el repositorio de GitHub para despliegue continuo.
   - **Opción B - Deploy manual:** Arrastrar la carpeta `dist` directamente al dashboard de Netlify.
   - Si usas la Opción A, configurar:
     - **Build command:** `npm run build`.
     - **Publish directory:** `dist`.

3. Acceder al sitio publicado mediante la URL que Netlify proporciona.

## Generación de APK (Android)

### Requisitos
- **Android Studio**
- **Gradle**
- **Java JDK** (versión 1.8 (versión mínima recomendable) - versión 17 (Usada en este proyecto))
- **Cordova**

Para generar y probar la versión móvil de la tienda:

1. **Compilar la aplicación React para producción:**
```bash
npm run build
```

2. **Crear la estructura de Cordova en el proyecto:**
```bash
mkdir cordova
cd cordova
cordova create .
cordova platform add android
```

3. **Copiar los archivos compilados de React al proyecto Cordova:**
```bash
xcopy ..\dist\* www /E /I   # En Windows

cp -r ../dist/* www/ # En Linux/Mac
```

4. **Construir el APK de depuración:**
```bash
cordova build android
```

5. **Ubicación del APK generado:**
   - El APK se generará en: `cordova/platforms/android/app/build/outputs/apk/debug/app-debug.apk`.
   - El APK ya está firmado automáticamente para pruebas.

6. **Probar la aplicación:**
   - Abrir Android Studio y crear un emulador, o usar un dispositivo físico con depuración USB activada.
   - Instalar y ejecutar el APK desde el emulador o dispositivo físico.

### Notas adicionales

- Asegurarse de tener instalado [Apache Cordova](https://cordova.apache.org/) globalmente: `npm install -g cordova`.
- Para dispositivos físicos, activa las "Opciones de desarrollador" y la "Depuración USB" en Android.

## Ejecución de pruebas

1. Ejecutar la aplicación local con `npm run dev`.
2. Iniciar sesión con un usuario registrado o crear uno nuevo.
3. Confirmar que los productos se muestran correctamente.
4. Agregar productos al carrito y verificar que el stock se actualiza.
5. Quitar productos del carrito y verificar que el stock se restaura.
6. Probar cierre de sesión y asegurar que la tienda no es accesible sin login.

## Futuras mejoras

- Implementar roles de usuario (admin y cliente) para gestionar productos.
- Permitir filtrado por categorías de productos y búsqueda avanzada.
- Implementar react-router-dom para un mejor manejo de rutas dentro de la aplicación.


