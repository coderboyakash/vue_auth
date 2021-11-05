const base_url = process.env.MIX_BASE_URL
const login = `${base_url}/login`
const register = `${base_url}/register`
const getUser = `${base_url}/user`
const getMyPosts = `${base_url}/get/my/posts`
const getNewPost = `${base_url}/get/new/post`

export { login, register, getUser, getMyPosts, getNewPost }