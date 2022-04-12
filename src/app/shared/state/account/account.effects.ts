import { Injectable } from "@angular/core";
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from 'src/app/shared/services/account.service';
import { Action as accountActions } from './account.actions';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Permiso } from 'src/app/shared/models/permiso.model';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Injectable()
export class AccountEffect {

    constructor(
        private actions$: Actions,
        private accountSrv: AccountService
    ){ }

    
    loadPermisos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(accountActions.loadPermisos),
            mergeMap(() => 
                this.accountSrv.getPermisos().pipe(
                    map((permisos: Permiso[]) => accountActions.loadPermisosSuccess({payload: permisos})),
                    catchError(err => of(accountActions.loadPermisosFail({error: err})))
                )
            )
        )
    );


    
    loadUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(accountActions.loadUsuario),
            mergeMap(() => 
                this.accountSrv.getUsuario().pipe(
                    map((usuario: Usuario) => accountActions.loadUsuarioSuccess({payload: usuario})),
                    catchError(err => of(accountActions.loadUsuarioFail({error: err})))
                )
            )
        )
    );

}