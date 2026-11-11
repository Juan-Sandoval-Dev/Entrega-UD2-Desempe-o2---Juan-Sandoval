import { ProductoApi, Producto } from "../types/producto";

export const mapearProducto = (item: ProductoApi): Producto => {
  return {
    id: item.id,
    nombre: item.title,
    precio: item.price,
    categoria: item.category,
    descripcion: item.description,
    imagen: item.image,
  };
};

export const mapearProductos = (lista: ProductoApi[]): Producto[] => {
  if (!Array.isArray(lista)) {
    return [];
  }
  return lista.map(mapearProducto);
};
