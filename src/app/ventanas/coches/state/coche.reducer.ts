import { createFeatureSelector, createSelector, createReducer, on } from '@ngrx/store';

import { Coche } from 'src/app/shared/models/coche.model';
import { Action  as cocheActions } from './coche.actions';
import * as fromRoot from 'src/app/app-state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface CocheState extends EntityState<Coche> {
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
    coches: CocheState
}

export const cocheAdapter: EntityAdapter<Coche> = createEntityAdapter<Coche>();

export const defaultCoche: CocheState = {
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

export const initialState = cocheAdapter.getInitialState(defaultCoche);

export const cocheReducer = createReducer(
    initialState,
    //LOAD ALL
    on(cocheActions.loadAll, (state) => ({
        ...state,
        loading: true,
        loaded: false
    })),
    on(cocheActions.loadAllSuccess, (state, { payload }) => cocheAdapter.setAll(payload.content, {
        ...state,
        totalRecords: payload.totalElements,
        loading: false,
        loaded: true,
    })),
    on(cocheActions.loadAllFail, (state, { error }) => ({
        ...state,
        entities: {},
        totalRecords: 0,
        loading: false,
        loaded: false,
        error: error
    })),


    //LOAD ONE
    on(cocheActions.loadOne, (state) => ({
        ...state,
        loading: true,
        loaded: false
    })),
    on(cocheActions.loadOneSuccess, (state, { payload }) => cocheAdapter.addOne(payload, {
        ...state,
        selectedId: payload.id,
        loading: false,
        loaded: true
    })),
    on(cocheActions.loadOneFail, (state, { error }) => ({
        ...state,
        selectedId: null,
        loading: false,
        loaded: false,
        error: error
    })),


    //CREATE
    on(cocheActions.create, (state) => ({
        ...state,
        loading: true,
        created: false
    })),
    on(cocheActions.createSuccess, (state, { payload }) => cocheAdapter.addOne(payload, {
        ...state,
        loading: false,
        created: true
    })),
    on(cocheActions.createFail, (state, { error }) => ({
        ...state,
        loading: false,
        created: false,
        error: error
    })),


    //UPDATE
    on(cocheActions.update, (state) => ({
        ...state,
        loading: true,
        updated: false
    })),
    on(cocheActions.updateSuccess, (state, { payload }) => cocheAdapter.updateOne(payload, {
        ...state,
        loading: false,
        updated: true
    })),
    on(cocheActions.updateFail, (state, { error }) => ({
        ...state,
        loading: false,
        updated: false,
        error: error
    })),


    //DELETE
    on(cocheActions.delete, (state) => ({
        ...state,
        loading: true,
        deleted: false
    })),
    on(cocheActions.deleteSuccess, (state, { id }) => cocheAdapter.removeOne(id, {
        ...state,
        loading: false,
        deleted: true
    })),
    on(cocheActions.deleteFail, (state, { error }) => ({
        ...state,
        loading: false,
        deleted: false,
        error: error
    })),


    //COUNT
    on(cocheActions.count, (state) => ({
        ...state,
        loading: true,
        loaded: false
    })),
    on(cocheActions.countSuccess, (state, { payload }) => ({
        ...state,
        count: payload,
        loading: false,
        loaded: true
    })),
    on(cocheActions.countFail, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: error
    })),


    //CUSTOM
    on(cocheActions.unload, (state) => ({
        ...state,
        selectedId: null
    }))
);

const getCocheFetureState = createFeatureSelector<CocheState>("coches");

export const getAll = createSelector(
    getCocheFetureState,
    cocheAdapter.getSelectors().selectAll
);

export const getSelectedId = createSelector(
    getCocheFetureState,
    (state: CocheState) => state.selectedId
);

export const getSelected = createSelector(
    getCocheFetureState,
    getSelectedId,
    state => state.entities[state.selectedId]
);

export const getLoading = createSelector(
    getCocheFetureState,
    (state: CocheState) => state.loading
);

export const getLoaded = createSelector(
    getCocheFetureState,
    (state: CocheState) => state.loaded
);

export const getUpdated = createSelector(
    getCocheFetureState,
    (state: CocheState) => state.updated
);

export const getDeleted = createSelector(
    getCocheFetureState,
    (state: CocheState) => state.deleted
);

export const getCreated = createSelector(
    getCocheFetureState,
    (state: CocheState) => state.created
);

export const getCount = createSelector(
    getCocheFetureState,
    (state: CocheState) => state.count
);

export const getTotalRecords = createSelector(
    getCocheFetureState,
    (state: CocheState) => state.totalRecords
);

export const getError = createSelector(
    getCocheFetureState,
    (state: CocheState) => state.error
);

