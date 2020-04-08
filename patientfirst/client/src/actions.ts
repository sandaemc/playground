import * as types from './types';
import { IApi } from './api';

interface IReduxExtraArgument {
    api: IApi;
}

export function clearLoadedPatient() {
    return async (dispatch: any) => {
        return dispatch({ 
            type: types.PATIENT_LOADED_CLEARED
        });
    };
};

export function fetchPatients() {
    return async (dispatch: any, getState: any, { api }: IReduxExtraArgument) => {
        const result = await api.getPatients();

        return dispatch({
          type: types.PATIENTS_FETCH_SUCCEEDED,
          payload: result.data
        });
    }; 
}
export function fetchPatient(id: number) {
    return async (dispatch: any, getState: any, { api }: IReduxExtraArgument) => {
        const result = await api.getPatient(id);

        return dispatch({
          type: types.PATIENT_FETCH_SUCCEEDED,
          payload: result.data
        });
    };
}

export function patchPatient(data: any) {
    return async (dispatch: any, getState: any, { api }: IReduxExtraArgument) => {
        try {
            const result = await api.patchPatient(data);

            return dispatch({
                type: types.PATIENT_PUT_SUCCEEDED,
                payload: result.data
            });
        } catch (err) {
            return dispatch({
                type: types.PATIENT_PUT_FAILED,
                payload: err.message
            });
        }

    }; 
}

export function postPatient(data: any) {
    return async (dispatch: any, getState: any, { api }: IReduxExtraArgument) => {
        try {
            const result = await api.postPatient(data);
            return dispatch({
                type: types.PATIENT_POST_SUCCEEDED,
                payload: result.data
            });
        } catch (err) {
            return dispatch({
                type: types.PATIENT_POST_FAILED,
                payload: err.message
            });
        }

    }; 
}

export function deletePatient(id: number) {
    return async (dispatch: any, getState: any, { api }: IReduxExtraArgument) => {
        await api.deletePatient(id);

        return dispatch({
          type: types.PATIENTS_DELETE_SUCCEEDED,
          payload: id
        });
    }; 
}
