export interface ImagenPlanta {
  id: number;
  orden: number;
  url: string;
}

export interface PlantaDetalle {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagenes: ImagenPlanta[];
}
