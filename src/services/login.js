import axios from 'axios'
const baseUrl = '/api/login'
/*
production = '/api/login'
dev = 'http://localhost:3001/api/login'
*/

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
