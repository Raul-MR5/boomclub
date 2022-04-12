import { createFeatureSelector, createSelector, createReducer, on } from '@ngrx/store';

import { Usuario } from 'src/app/shared/models/usuario.model';
import { Action  as usuarioActions } from './usuario.actions';
import * as fromRoot from 'src/app/app-state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface UsuarioState extends EntityState<Usuario> {
    selectedId: number,
    count: number,
    totalRecords: number,
    loading: boolean,
    loaded: boolean,
    updated: boolean,
    created: boolean,
    deleted: boolean,
    error: any
}

export interface AppState extends fromRoot.AppState {
    usuarios: UsuarioState
}

export const usuarioAdapter: EntityAdapter<Usuario> = createEntityAdapter<Usuario>();

export const defaultUsuario: UsuarioState = {
    ids: [],
    entities: {},
    count: 0,
    totalRecords: 0,
    selectedId: null,
    loading: false,
    loaded: true,
    updated: false,
    created: false,
    deleted: false,
    error: null
}

export const initialState = usuarioAdapter.getInitialState(defaultUsuario);

export const usuarioReducer = createReducer(
    initialState,
    //LOAD ALL
    on(usuarioActions.loadAll, (state) => ({
        ...state,
        loading: true,
        loaded: false
    })),
    on(usuarioActions.loadAllSuccess, (state, { payload }) => usuarioAdapter.setAll(payload.content, {
        ...state,
        totalRecords: payload.totalElements,
        loading: false,
        loaded: true,
    })),
    on(usuarioActions.loadAllFail, (state, { error }) => ({
        ...state,
        entities: {},
        totalRecords: 0,
        loading: false,
        loaded: false,
        error: error
    })),


    //LOAD ONE
    on(usuarioActions.loadOne, (state) => ({
        ...state,
        loading: true,
        loaded: false
    })),
    on(usuarioActions.loadOneSuccess, (state, { payload }) => usuarioAdapter.addOne(payload, {
        ...state,
        selectedId: payload.id,
        loading: false,
        loaded: true
    })),
    on(usuarioActions.loadOneFail, (state, { error }) => ({
        ...state,
        selectedId: null,
        loading: false,
        loaded: false,
        error: error
    })),


    //CREATE
    on(usuarioActions.create, (state) => ({
        ...state,
        loading: true,
        created: false
    })),
    on(usuarioActions.createSuccess, (state, { payload }) => usuarioAdapter.addOne(payload, {
        ...state,
        loading: false,
        created: true
    })),
    on(usuarioActions.createFail, (state, { error }) => ({
        ...state,
        loading: false,
        created: false,
        error: error
    })),


    //UPDATE
    on(usuarioActions.update, (state) => ({
        ...state,
        loading: true,
        updated: false
    })),
    on(usuarioActions.updateSuccess, (state, { payload }) => usuarioAdapter.updateOne(payload, {
        ...state,
        loading: false,
        updated: true
    })),
    on(usuarioActions.updateFail, (state, { error }) => ({
        ...state,
        loading: false,
        updated: false,
        error: error
    })),


    //DELETE
    on(usuarioActions.delete, (state) => ({
        ...state,
        loading: true,
        deleted: false
    })),
    on(usuarioActions.deleteSuccess, (state, { id }) => usuarioAdapter.removeOne(id, {
        ...state,
        loading: false,
        deleted: true
    })),
    on(usuarioActions.deleteFail, (state, { error }) => ({
        ...state,
        loading: false,
        deleted: false,
        error: error
    })),


    //COUNT
    on(usuarioActions.count, (state) => ({
        ...state,
        loading: true,
        loaded: false
    })),
    on(usuarioActions.countSuccess, (state, { payload }) => ({
        ...state,
        count: payload,
        loading: false,
        loaded: true
    })),
    on(usuarioActions.countFail, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: error
    })),


    //CUSTOM
    on(usuarioActions.unload, (state) => ({
        ...state,
        selectedId: null
    }))
);

const getUsuarioFetureState = createFeatureSelector<UsuarioState>("usuarios");

export const getAll = createSelector(
    getUsuarioFetureState,
    usuarioAdapter.getSelectors().selectAll
);

export const getSelectedId = createSelector(
    getUsuarioFetureState,
    (state: UsuarioState) => state.selectedId
);

export const getSelected = createSelector(
    getUsuarioFetureState,
    getSelectedId,
    state => state.entities[state.selectedId]
);

export const getLoading = createSelector(
    getUsuarioFetureState,
    (state: UsuarioState) => state.loading
);

export const getLoaded = createSelector(
    getUsuarioFetureState,
    (state: UsuarioState) => state.loaded
);

export const getUpdated = createSelector(
    getUsuarioFetureState,
    (state: UsuarioState) => state.updated
);

export const getDeleted = createSelector(
    getUsuarioFetureState,
    (state: UsuarioState) => state.deleted
);

export const getCreated = createSelector(
    getUsuarioFetureState,
    (state: UsuarioState) => state.created
);

export const getCount = createSelector(
    getUsuarioFetureState,
    (state: UsuarioState) => state.count
);

export const getTotalRecords = createSelector(
    getUsuarioFetureState,
    (state: UsuarioState) => state.totalRecords
);

export const getError = createSelector(
    getUsuarioFetureState,
    (state: UsuarioState) => state.error
);

