export const API_URL = process.env.RAZZLE_API_URL || 'http://0.0.0.0:9000'

export const getAuthHeader = token => {
  return {
    headers: { 'Authorization': `Bearer ${token}` }
  }
}
