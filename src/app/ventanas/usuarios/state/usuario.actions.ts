import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { RequestFilter } from 'src/app/shared/models/request-filter';
import { Page } from 'src/app/shared/models/page';
import { Usuario } from 'src/app/shared/models/usuario.model';

export class Action {
    static entityName = 'Usuario';

    //LOAD ALL
    static loadAll = createAction(
        '['+Action.entityName+'] Load All',
        props<{payload: RequestFilter}>(),
    );

    static loadAllSuccess = createAction(
        '['+Action.entityName+'] Load All Success',
        props<{payload: Page<Usuario>}>(),
    );

    static loadAllFail = createAction(
        '['+Action.entityName+'] Load All Fail',
        props<{error: any}>(),
    );


    //LOAD ONE
    static loadOne = createAction(
        '['+Action.entityName+'] Load One',
        props<{id: number}>(),
    );

    static loadOneSuccess = createAction(
        '['+Action.entityName+'] Load One Success',
        props<{payload: any}>(),
    );

    static loadOneFail = createAction(
        '['+Action.entityName+'] Load One Fail',
        props<{error: any}>(),
    );


    //CREATE
    static create = createAction(
        '['+Action.entityName+'] Create',
        props<{payload: any}>(),
    );

    static createSuccess = createAction(
        '['+Action.entityName+'] Create Success',
        props<{payload: any}>(),
    );

    static createFail = createAction(
        '['+Action.entityName+'] Create Fail',
        props<{error: any}>(),
    );


    //UPDATE
    static update = createAction(
        '['+Action.entityName+'] Update',
        props<{payload: any}>(),
    );

    static updateSuccess = createAction(
        '['+Action.entityName+'] Update Success',
        props<{payload: Update<any>}>(),
    );

    static updateFail = createAction(
        '['+Action.entityName+'] Update Fail',
        props<{error: any}>(),
    );


    //DELETE
    static delete = createAction(
        '['+Action.entityName+'] Delete',
        props<{id: number}>(),
    );

    static deleteSuccess = createAction(
        '['+Action.entityName+'] Delete Success',
        props<{id: number}>(),
    );

    static deleteFail = createAction(
        '['+Action.entityName+'] Delete Fail',
        props<{error: any}>(),
    );


    //COUNT
    static count = createAction(
        '['+Action.entityName+'] Count'
    );

    static countSuccess = createAction(
        '['+Action.entityName+'] Count Success',
        props<{payload: number}>(),
    );

    static countFail = createAction(
        '['+Action.entityName+'] Count Fail',
        props<{error: any}>(),
    );


    //CUSTOM
    static unload = createAction(
        '['+Action.entityName+'] Unload'
    );
}
