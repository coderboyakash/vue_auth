const base_url = process.env.MIX_BASE_URL
const login = `${base_url}/api/login`
const register = `${base_url}/api/register`
const getUser = `${base_url}/api/user`

export { login, register, getUser }