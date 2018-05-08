import axios from 'axios'

import { API_URL, API_URL_VER } from '../_constants'

const URL = `${API_URL}/${API_URL_VER}/matches`

export class TournamentService {
  static count () {
    return axios
      .get(`${URL}/count`)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static countGames () {
    return axios
      .get(`${URL}/count/games`)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }
}
