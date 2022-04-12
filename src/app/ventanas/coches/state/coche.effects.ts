import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { CocheService } from 'src/app/shared/services/coche.service';
import { of } from 'rxjs';

import { Action as cocheActions } from './coche.actions';
import { mergeMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { Coche } from 'src/app/shared/models/coche.model';
import { Page } from 'src/app/shared/models/page';

@Injectable()
export class CocheEffect {

    constructor(
        private actions$: Actions,
        private cocheSrv: CocheService
    ) { }


    loadCoches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cocheActions.loadAll),
            map(action => action.payload),
            exhaustMap((requestFilter) =>
                this.cocheSrv.getAll(requestFilter).pipe(
                    map((page: Page<Coche>) => cocheActions.loadAllSuccess({ payload: page })),
                    catchError(err => of(cocheActions.loadAllFail({ error: err })))
                )
            )
        )
    );


    loadCoche$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cocheActions.loadOne),
            mergeMap((action) =>
                this.cocheSrv.getOne(action.id).pipe(
                    map((coche: Coche) => cocheActions.loadOneSuccess({ payload: coche })),
                    catchError(err => of(cocheActions.loadOneFail({ error: err })))
                )
            )
        )
    );


    createCoche$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cocheActions.create),
            mergeMap((action) =>
                this.cocheSrv.create(action.payload).pipe(
                    map((coche: Coche) => cocheActions.createSuccess({ payload: coche })),
                    catchError(err => of(cocheActions.createFail({ error: err })))
                )
            )
        )
    );


    updateCoche$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cocheActions.update),
            mergeMap((action) =>
                this.cocheSrv.update(action.payload).pipe(
                    map((coche: Coche) => cocheActions.updateSuccess({ payload: { id: coche.id, changes: coche } })),
                    catchError(err => of(cocheActions.updateFail({ error: err })))
                )
            )
        )
    );



    deleteCoche$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cocheActions.delete),
            mergeMap((action) =>
                this.cocheSrv.delete(action.id).pipe(
                    map(() => cocheActions.deleteSuccess({ id: action.id })),
                    catchError(err => of(cocheActions.deleteFail({ error: err })))
                )
            )
        )
    );



    countCoches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(cocheActions.count),
            mergeMap((action) =>
                this.cocheSrv.count().pipe(
                    map((count: number) => cocheActions.countSuccess({ payload: count })),
                    catchError(err => of(cocheActions.countFail({ error: err })))
                )
            )
        )
    );

}