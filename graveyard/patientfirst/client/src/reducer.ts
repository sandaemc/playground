import * as types from './types';

const initialState = {
    network: {
        request: {
            succeeded: undefined,
            message: ''
        }
    },
    patients: [],
    patient: {}
};

export default function (state: any = initialState, action: { type: string, payload: any }): any {
    console.log(action.payload);
    switch (action.type) {
        case types.PATIENTS_FETCH_SUCCEEDED:
            return { ...state, patients: action.payload };
        case types.PATIENT_FETCH_SUCCEEDED:
            return { ...state, patient: action.payload };
        case types.PATIENT_POST_SUCCEEDED:
            return { ... state, patients: [...state.patients, action.payload] };
        case types.PATIENT_FETCH_FAILED:
            return { ...state, network: { request: { succeeded: false, message: action.payload }}}
        case types.PATIENTS_DELETE_SUCCEEDED:
            return { ... state, patients: state.patients.filter((patients:any) => patients.id !== action.payload ) };
        case types.PATIENT_LOADED_CLEARED:
            return { ...state, patient: {}};
        default:
            return state;
    }
}
