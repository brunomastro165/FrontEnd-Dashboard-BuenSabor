// Importación de la clase abstracta AbstractBackendClient
import { useAuth0 } from "@auth0/auth0-react";
import { IArticuloManufacturado } from "../types/ArticuloManufacturado";
import { AbstractBackendClient } from "./AbstractBackendClient";

// Clase abstracta que proporciona métodos genéricos para interactuar con una API
export abstract class BackendClient<T> extends AbstractBackendClient<T> {
  // Método protegido para realizar una solicitud genérica
  protected async request(path: string, options: RequestInit): Promise<T> {
    try {
      // Realiza una solicitud fetch con la ruta y las opciones proporcionadas
      const response = await fetch(path, options);
      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        // Obtiene el cuerpo de la respuesta en caso de error
        const errorData = await response.json().catch(() => null);
        // Lanza un error detallado con el código de estado y el cuerpo de la respuesta
        throw {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        };
      }
      // Retorna los datos de la respuesta en formato JSON
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  // Método protegido para realizar una solicitud genérica para obtener todos los elementos
  protected async requestAll(path: string, options: RequestInit): Promise<T[]> {
    try {
      const response = await fetch(path, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Implementación de los métodos de la interfaz AbstractCrudService

  // Método para obtener un elemento por su ID
  async get(url: string, id: string): Promise<T> {
    const path = `${url}/${id}`;
    const options: RequestInit = {
      method: "GET",
    };
    return this.request(path, options);
  }

  async getById(url: string, getAccessTokenSilently: any): Promise<T> {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });

    const path = url;
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.request(path, options);
  }

  // Método para obtener todos los elementos
  async getAll(url: string, getAccessTokenSilently: any): Promise<T[]> {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });

    const path = url;
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.requestAll(path, options);
  }

  // Método para crear un nuevo elemento
  async post(url: string, data: T, getAccessTokenSilently: any): Promise<T> {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });

    const path = url;
    const options: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    return this.request(path, options);
  }

  async postConImagen(
    url: string,
    entity: T,
    files: File[],
    getAccessTokenSilently: any
  ) {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });

    const formData = new FormData();
    const blob = new Blob([JSON.stringify(entity)], {
      type: "application/json",
    });
    formData.append("entity", blob);

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async postConImagenIndividual(
    url: string,
    entity: T,
    file: File,
    getAccessTokenSilently: any
  ) {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });

    const formData = new FormData();
    const blob = new Blob([JSON.stringify(entity)], {
      type: "application/json",
    });
    formData.append("entity", blob);
    formData.append("file", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async putConImagen(
    url: string,
    entity: T,
    files: File[],
    getAccessTokenSilently: any
  ) {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });

    const formData = new FormData();
    const blob = new Blob([JSON.stringify(entity)], {
      type: "application/json",
    });
    formData.append("entity", blob);

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw error;
      console.error(error);
    }
  }
  // Método para actualizar un elemento existente por su ID
  async put(url: string, data: T, getAccessTokenSilently: any): Promise<T> {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });

    const path = `${url}`;
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    return this.request(path, options);
  }

  async putNoData(url: string, getAccessTokenSilently: any): Promise<T> {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });

    const path = `${url}`;
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return this.request(path, options);
  }

  // Método para eliminar un elemento por su ID
  async delete(url: string, getAccessTokenSilently: any): Promise<void> {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });
    const path = `${url}`;
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await this.request(path, options);
    } catch (error) {
      throw error;
    }
  }
}

export class BackendMethods<T> extends BackendClient<T> {}
