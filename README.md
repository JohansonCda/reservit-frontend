# Frontend de Reservit

Aplicación frontend desarrollada con **Angular** y **Angular Material** para la gestión de espacios y reservas. Consume una API construida con Symfony + API Platform con autenticación JWT.

# Requisitos

- Node.js >= 18
- Angular CLI
- npm o yarn

# Instalación

```bash
# Clonar el repositorio
git clone https://github.com/johansoncda/reservit-frontend.git
cd reservit-frontend

# Instalar dependencias
npm install

#Iniciar el proyecto, debe ser npm ya que se inicia el servidor con el proxy.conf.json
npm start

```

# Funcionalidades implementadas
- Autenticación
- Login con JWT
- Manejo de roles: admin y usuario
- Protección de rutas según permisos
- Gestión de espacios

Listado de espacios con filtros por:
- Capacidad
- Tipo de espacio
- Disponibilidad por fecha

- Vista de detalle
- ABM solo accesible para administradores
- Sistema de reservas
- Crear reserva seleccionando espacio y fecha/hora
- Validación de superposición de reservas

#  Vista "Mis reservas":
- Ver reservas propias
- Editar fechas y nombre
- Cancelar/Eliminar reserva (admin) o solicitar cancelación (usuarios)

# UI/UX
- Angular Material
- Feedback con MatSnackBar
- Validaciones reactivas con ReactiveFormsModule

# Tests
- Se implementó un test básico para el componente MyReservationsPageComponent:
  - Verifica que se crea correctamente la reserva
  - Asegura que se llama al servicio de reservas del usuario al iniciar
  
```bash
  Ejecuta ng test

```
# Seguridad y buenas prácticas
- Manejo centralizado del token en AuthService
- Guard para rutas protegidas
- Validaciones en formularios

# Estructura principal

src/
├── app/
│   ├── core/                # Servicios como Auth, Reservation, Space. Guards e Interceptores
│   ├── models/              # Clases referentes a los atributos en la api (Se usaron interfaces entonces omití los modelos)
│   ├── pages/               # Componentes de páginas (login, reservas, etc.)
│   ├── layouts/             # Componente contenedor donde se llama cada componente por ruta
│   ├── shared/              # Componentes reutilizables como nav, footer,etc. (En éste caso no se crearon)
│   └── app.routes.ts        # Rutas protegidas por roles
│   └── app.component        # Componente principal, con él se ejecuta toda al aplicación


# Conexión con el backend
- El backend está en: https://github.com/johansoncda/reservit-backend
- Se espera que el backend esté ejecutándose en http://localhost:8000
