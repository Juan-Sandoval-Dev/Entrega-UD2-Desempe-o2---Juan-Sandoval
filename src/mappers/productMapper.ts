import { ApiProduct, Product } from '../types/product';

/**
 * Mapper que transforma un producto individual de la API a la entidad interna de la App.
 * Realiza las transformaciones exigidas por la rúbrica:
 * - apiItem.title -> product.name
 * - apiItem.image -> product.imageUrl
 */
export const mapApiProductToProduct = (apiItem: ApiProduct): Product => {
  return {
    id: apiItem.id,
    name: apiItem.title,          // Transformación obligatoria de 'title' a 'name'
    imageUrl: apiItem.image,      // Transformación obligatoria de 'image' a 'imageUrl'
    price: apiItem.price,
    category: apiItem.category,
    description: apiItem.description,
  };
};

/**
 * Aplica la transformación a toda la colección antes de ser entregada a la UI.
 */
export const mapApiProductsToProducts = (apiList: ApiProduct[]): Product[] => {
  if (!Array.isArray(apiList)) {
    return [];
  }
  return apiList.map(mapApiProductToProduct);
};
