import { Permiso } from './permiso.model';

export interface Rol {
    id?: number;
    codigo: string;
    descipcion: string;
    permisos: Permiso[];
}