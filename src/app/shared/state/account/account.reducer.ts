import { Permiso } from 'src/app/shared/models/permiso.model';
import { Usuario } from 'src/app/shared/models/usuario.model';

import * as fromRoot from 'src/app/app-state';
import { Action as accountActions } from './account.actions';
import { on, createReducer, createFeatureSelector, createSelector } from '@ngrx/store';



export interface AccountState {
    usuario: Usuario,
    permisos: Permiso[],
    loaded: boolean,
    loading: boolean,
    error: any
}

export interface AppState extends fromRoot.AppState {
    account: AccountState
}

export const initialState: AccountState = {
    usuario: null,
    permisos: [],
    loading: false,
    loaded: false,
    error: null
}

export const accountReducer = createReducer(
    initialState,
    
    on(accountActions.loadPermisos, (state) => ({
        ...state,
        loading: true,
        loaded: false
    })),
    on(accountActions.loadPermisosSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        permisos: payload
    })),
    on(accountActions.loadPermisosFail, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        permisos: [],
        error: error
    })),


    on(accountActions.loadUsuario, (state) => ({
        ...state,
        loading: true,
        loaded: false
    })),
    on(accountActions.loadUsuarioSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        usuario: payload
    })),
    on(accountActions.loadUsuarioFail, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        usuario: null,
        error: error
    }))
);

const getAccountFetureState = createFeatureSelector<AccountState>("account");

export const getUsuario = createSelector(
    getAccountFetureState,
    (state: AccountState) => state.usuario
);

export const getPermisos = createSelector(
    getAccountFetureState,
    (state: AccountState) => state.permisos
);

export const isLoaded = createSelector(
    getAccountFetureState,
    (state: AccountState) => state.loaded
);

export const isLoading = createSelector(
    getAccountFetureState,
    (state: AccountState) => state.loading
);

export const getError = createSelector(
    getAccountFetureState,
    (state: AccountState) => state.error
);