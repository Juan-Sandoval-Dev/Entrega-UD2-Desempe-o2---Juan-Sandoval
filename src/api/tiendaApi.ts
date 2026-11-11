import axios from "axios";
import { ProductoApi, Producto } from "../types/producto";
import { mapearProductos } from "../mappers/mapeadorProducto";

const urlBase = "https://fakestoreapi.com";

export const obtenerProductos = async (): Promise<Producto[]> => {
  try {
    const respuesta = await axios.get<ProductoApi[]>(`${urlBase}/products`);
    return mapearProductos(respuesta.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Error en el servidor: ${error.response.status}`);
      } else if (error.request) {
        throw new Error("No hay conexión con el servidor. Revisa tu internet.");
      }
    }
    throw new Error("Ocurrió un error al consultar los productos.");
  }
};
