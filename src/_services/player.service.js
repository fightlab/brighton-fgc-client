import axios from 'axios'

import { API_URL, API_URL_VER, getAuthHeader } from '../_constants'

const URL = `${API_URL}/${API_URL_VER}/players`

export class PlayerService {
  static all () {
    return axios
      .get(`${URL}`)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static getAll (all, limit) {
    return axios
      .get(`${URL}/index?${all && 'all=true&'}${limit && `limit=${limit}`}`)
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

  static getStatistics (id) {
    return axios
      .get(`${URL}/${id}/statistics`)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static getOpponents (id, all) {
    return axios
      .get(`${URL}/${id}/opponents${all ? '?all=true' : ''}`)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static getHeadToHead (p1id, p2id) {
    return axios
      .get(`${URL}/${p1id}/statistics/${p2id}`)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static me (token) {
    return axios
      .get(`${URL}/me`, getAuthHeader(token))
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static meUpdate (token, body) {
    return axios
      .put(`${URL}/me`, body, getAuthHeader(token))
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }

  static getElo (id) {
    return axios
      .get(`${URL}/${id}/elo`)
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err.response))
  }
}
