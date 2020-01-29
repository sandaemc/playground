import Axios, { AxiosPromise } from 'axios';
import snakeCaseKeys from 'snakecase-keys';
import camelCaseKeys from 'camelcase-keys';

const axios = Axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicGF0aWVudF91c2VyIn0.SfWVw-ke4GYowt0sMf0QpdfKCzkSa5fqTKp9XXkyHQE'
    }
});

export async function getPatients() {
    return await axios.get('/patients');
}

export async function getPatient(id: number) {
    return axios.get(`/patients?id=eq.${id}`)
        .then(result => {
            result.data = camelCaseKeys(result.data[0]);
            return result;
        }); // postgrest returns array
}

interface IPatientDTO {
    id?: number;
    last_name: string;
    first_name: string;
    middle_name?: string;
    birth_date: Date;
    gender: 'm' | 'f';
    address?: string;
    phone_number?: string;
}

export async function postPatient(data: IPatientDTO) {
    return await axios.post('/patients', snakeCaseKeys(data));
}

export async function patchPatient(data: IPatientDTO) {
    return await axios.patch(`/patients?id=eq.${data.id}`, snakeCaseKeys(data));
}

export async function deletePatient(id: number) {
  return await axios.delete(`/patients?id=eq.${id}`);
}

export interface IApi {
    getPatients(): AxiosPromise<any>;
    getPatient(id: number): AxiosPromise<any>;
    patchPatient(data: IPatientDTO): AxiosPromise<any>;
    postPatient(data: IPatientDTO): AxiosPromise<any>;
    deletePatient(id: number): AxiosPromise<any>;
}
