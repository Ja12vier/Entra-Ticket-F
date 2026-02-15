# React + Vite

Entra Ticket - Sistema Integral de Gestión de Eventos
Entra Ticket es una plataforma de última generación diseñada para la gestión, venta y reventa de boletos electrónicos. La aplicación se enfoca en la seguridad, la sincronización en tiempo real y la facilidad de uso tanto para organizadores como para asistentes.

Características Principales
Tiempo Real y Sincronización
WebSockets Integration: Implementación de comunicación bidireccional para evitar la selección duplicada de asientos o tickets en tiempo real. Si un usuario selecciona un lugar, se bloquea instantáneamente para los demás.

Seguridad y Validación
Validación de Tickets QR: Sistema integrado para el escaneo y validación de códigos QR únicos, garantizando que cada entrada sea utilizada una sola vez.

Notificaciones Automáticas: Envío de confirmaciones y boletos digitales vía correo electrónico al completar una compra.

Mercado de Tickets
Compra y Reventa: Los usuarios pueden adquirir tickets de primera mano o poner sus boletos en un mercado de reventa seguro dentro de la misma plataforma.

Herramientas para Organizadores (Panel Administrativo)
Gestión de Eventos: Creación, edición y monitoreo de eventos.

Mapa de Asientos: Herramienta interactiva para agregar mapas de ubicación y seleccionar secciones específicas.

Sistema de Cupones: Creación de códigos de descuento dinámicos para campañas de marketing.

Gestión de Secciones: Configuración de diferentes áreas (VIP, General, etc.) con precios diferenciados.

tack Tecnológico
Frontend
React.js: Biblioteca principal para la interfaz de usuario.

Redux Toolkit: Gestión del estado global de la aplicación.

Tailwind CSS: Framework de diseño para una interfaz moderna y responsiva.

Flowbite: Componentes de UI interactivos y accesibles.

Socket.io-client: Conexión en tiempo real con el servidor.

Backend
Node.js & nestjs: Entorno de ejecución y framework para la API REST.

PostgreSQL : Base de datos para almacenamiento persistente de eventos y transacciones.

Socket.io: Manejo de eventos de WebSockets.

Nodemailer: Motor para el envío de correos electrónicos.

JWT (JSON Web Tokens): Autenticación y autorización segura.
