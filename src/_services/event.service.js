import axios from 'axios'

import { API_URL, API_URL_VER, getAuthHeader } from '../_constants'

const URL = `${API_URL}/${API_URL_VER}/events`

export class EventService {
  static getAll (limit) {
    return axios
      .get(limit ? `${URL}?limit=${limit}` : URL)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static count () {
    return axios
      .get(`${URL}/count`)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static get (id) {
    return axios
      .get(`${URL}/${id}`)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static create (token, body) {
    return axios
      .post(URL, body, getAuthHeader(token))
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static update (token, id, body) {
    return axios
      .put(`${URL}/${id}`, body, getAuthHeader(token))
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static delete (token, id) {
    return axios
      .delete(`${URL}/${id}`, getAuthHeader(token))
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static getTournaments (id) {
    return axios
      .get(`${URL}/${id}/tournaments`)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }
}
