import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes';

/* const getAll = () => {
    return axios.get(baseUrl)
} */
const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

/* const create = newObject => {
    return axios.post(baseUrl, newObject)
} */

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

/* const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
} */

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

export default { getAll, create, update }