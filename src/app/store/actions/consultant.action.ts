import { createAction, props } from "@ngrx/store";
import { Esn } from "../../interfaces/esn.model";

export const loadData = createAction(
    '[Data] Load Data',
);

export const loadDataSuccess = createAction(
    '[Data] Load Data Success',
    props<{ payload: Esn[] }>()
);

export const loadDataFailure = createAction(
    '[Data] Load Data Failure',
    props<{ error: string }>()
);