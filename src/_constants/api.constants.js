export const API_URL = process.env.REACT_APP_API_URL || 'http://0.0.0.0:9000'

export const API_URL_VER = process.env.REACT_APP_API_URL_VER || 'v1'

export const getAuthHeader = token => ({ headers: { 'Authorization': `Bearer ${token}` } })
