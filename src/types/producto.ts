export interface ProductoApi {
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

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  imagen: string;
}
