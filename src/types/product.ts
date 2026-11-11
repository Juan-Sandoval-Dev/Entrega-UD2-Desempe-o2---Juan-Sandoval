/**
 * Definición de tipos para la evaluación UD2 - Programación de Aplicaciones Móviles
 * Requerimiento 3:
 * - Un tipo o interfaz para la respuesta de la API (ApiProduct)
 * - Otro para el producto utilizado por la App (Product)
 */

/**
 * Estructura cruda recibida desde la Fake Store API (https://fakestoreapi.com/products)
 */
export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

/**
 * Modelo de datos propio de la aplicación móvil.
 * Exige transformar al menos:
 * - 'title' -> 'name'
 * - 'image' -> 'imageUrl'
 */
export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  description: string;
}
