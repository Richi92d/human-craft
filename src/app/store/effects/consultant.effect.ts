import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { EsnListService } from "../../service/esn-list.service";
import * as DataActions from '../actions/consultant.action';

@Injectable()
export class ConsultantEffects {

    private action$ = inject(Actions);
    private consultantListService$ = inject(EsnListService);

    loadConsultantData$ = createEffect(() => this.action$.pipe(
        ofType(DataActions.loadData),
        mergeMap(() => this.consultantListService$.getConsultantInfo()
            .pipe(
                map(data => DataActions.loadDataSuccess({ payload: data })),
                catchError(error => {
                    return of(DataActions.loadDataFailure({ error }))
                })
            ))
    )
    );
}
