import { Rol } from './rol.model';

export interface Usuario {
    id?: number;
    username: string;
    password?: string;
    nombre: string;
    apellidos: string;
    email: string;
    activo: boolean;
    fecAlta: Date;
    fecBaja?: Date;
    rol?: Rol;
    token?: string;
}