import { Usuario } from './usuario.model';

export interface Coche {
    id?: number;
    modelo: string;
    fecProd?: string;
    fecVenta?: string;
    bastidor: string;
    usuario?: Usuario;
}