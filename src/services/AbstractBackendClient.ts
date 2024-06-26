// Clase abstracta que define métodos para operaciones CRUD en un servicio genérico
export abstract class AbstractBackendClient<T> {
  // Método abstracto para obtener un elemento por su ID
  abstract get(url: string, id: string): Promise<T>;

  abstract getById(url: string, getAccessTokenSilently: any): Promise<T>;

  // Método abstracto para obtener todos los elementos
  abstract getAll(url: string, getAccessTokenSilently: any): Promise<T[]>;

  // Método abstracto para crear un nuevo elemento
  abstract post(url: string, data: T, getAccessTokenSilently: any): Promise<T>;

  // Método abstracto para actualizar un elemento existente por su ID
  abstract put(url: string, data: T, getAccessTokenSilently: any): Promise<T>;

  // Método abstracto para eliminar un elemento por su ID
  abstract delete(url: string, id: string, getAccessTokenSilently:any): Promise<void>;
}