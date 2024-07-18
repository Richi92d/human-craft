import { Action, createReducer, on } from '@ngrx/store';
import { Esn } from '../../interfaces/esn.model';
import * as ConsultantActions from '../actions/consultant.action';

export interface ConsultantState {
    data: Esn[];
    loading: boolean;
    error: string | null;
}

const initialState: ConsultantState = {
    data: [],
    loading: false,
    error: null
};

export const consultantReducer = createReducer(
    initialState,

    on(ConsultantActions.loadData, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(ConsultantActions.loadDataSuccess, (state, { payload }) => ({
        ...state,
        data: payload,
        loading: false
    })),

    on(ConsultantActions.loadDataFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    }))
);

export function reducer(state: ConsultantState | undefined, action: Action) {
    return consultantReducer(state, action);
}
