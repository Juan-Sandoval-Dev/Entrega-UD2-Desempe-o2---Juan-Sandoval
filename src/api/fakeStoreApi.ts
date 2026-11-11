import axios from 'axios';
import { ApiProduct, Product } from '../types/product';
import { mapApiProductsToProducts } from '../mappers/productMapper';

const FAKE_STORE_BASE_URL = 'https://fakestoreapi.com';

const apiClient = axios.create({
  baseURL: FAKE_STORE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Consulta la lista de productos disponibles en Fake Store API utilizando Axios,
 * y aplica el mapper para devolver los productos en el formato propio de la aplicación.
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<ApiProduct[]>('/products');
    // Aplicamos el mapper a la colección antes de retornar
    return mapApiProductsToProducts(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Error del servidor (${error.response.status}): No se pudo obtener el catálogo.`);
      } else if (error.request) {
        throw new Error('No se pudo establecer conexión con Fake Store API. Revisa tu acceso a internet.');
      }
    }
    throw new Error('Ocurrió un error inesperado al consultar los productos.');
  }
};
