import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { of } from 'rxjs';

import { Action as usuarioActions } from './usuario.actions';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { Page } from 'src/app/shared/models/page';

@Injectable()
export class UsuarioEffect {

    constructor(
        private actions$: Actions,
        private usuarioSrv: UsuarioService
    ) { }


    loadUsuarios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.loadAll),
            map(action => action.payload),
            exhaustMap((requestFilter) =>
                this.usuarioSrv.getAll(requestFilter).pipe(
                    map((page: Page<Usuario>) => usuarioActions.loadAllSuccess({ payload: page })),
                    catchError(err => of(usuarioActions.loadAllFail({ error: err })))
                )
            )
        )
    );


    loadUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.loadOne),
            mergeMap((action) =>
                this.usuarioSrv.getOne(action.id).pipe(
                    map((usuario: Usuario) => usuarioActions.loadOneSuccess({ payload: usuario })),
                    catchError(err => of(usuarioActions.loadOneFail({ error: err })))
                )
            )
        )
    );


    createUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.create),
            mergeMap((action) =>
                this.usuarioSrv.create(action.payload).pipe(
                    map((usuario: Usuario) => usuarioActions.createSuccess({ payload: usuario })),
                    catchError(err => of(usuarioActions.createFail({ error: err })))
                )
            )
        )
    );


    updateUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.update),
            mergeMap((action) =>
                this.usuarioSrv.update(action.payload).pipe(
                    map((usuario: Usuario) => usuarioActions.updateSuccess({ payload: { id: usuario.id, changes: usuario } })),
                    catchError(err => of(usuarioActions.updateFail({ error: err })))
                )
            )
        )
    );



    deleteUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.delete),
            mergeMap((action) =>
                this.usuarioSrv.delete(action.id).pipe(
                    map(() => usuarioActions.deleteSuccess({ id: action.id })),
                    catchError(err => of(usuarioActions.deleteFail({ error: err })))
                )
            )
        )
    );



    countUsuarios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(usuarioActions.count),
            mergeMap((action) =>
                this.usuarioSrv.count().pipe(
                    map((count: number) => usuarioActions.countSuccess({ payload: count })),
                    catchError(err => of(usuarioActions.countFail({ error: err })))
                )
            )
        )
    );

}