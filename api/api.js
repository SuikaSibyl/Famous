import axios from 'axios'

let host = 'http://10.110.8.238:8000';

export const queryPeople = params => { return axios.get(`${host}/peoples/`) }

export const accuratePeople = params => {
    if ('id' in params) {
        return axios.get(`${host}/accuratepeople/` + params.id + '/');
    }
}

export const askworks = params => {
    if ('id' in params) {
        console.log(`${host}/works/?author=` + params.id + '/')
        return axios.get(`${host}/works/?author=` + params.id);
    }
}