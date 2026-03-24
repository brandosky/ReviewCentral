/**
 * esta interfaz va definir la estructura de un usuario (creo)
 */
export interface Usuario {
  _id?: string;             // Opcional (?) porque MongoDB lo genera automáticamente al crear el registro
  nombre: string;           // Nombre del usuario 
  apellido: string;         // Apellido del usuario 
  email: string;            // correo electrónico del usuario que vaser unico
  password?: string;        // Contraseña opcional para no tenerla en front 
  rol: 'visitante' | 'registrado' | 'administrador'; 
}