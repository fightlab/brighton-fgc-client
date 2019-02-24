import axios from 'axios'

import { API_URL, API_URL_VER, getAuthHeader } from '../_constants'

const URL = `${API_URL}/${API_URL_VER}/characters`

export class CharacterService {
  static getAll () {
    return axios
      .get(URL)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err))
  }

  static update (token, id, body) {
    return axios
      .put(`${URL}/${id}`, body, getAuthHeader(token))
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static merge (token, correct, wrong) {
    return axios
      .put(`${URL}/${correct}/merge/${wrong}`, {}, getAuthHeader(token))
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }
}
