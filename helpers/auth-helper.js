const getUserRole = req => {
  return req.user.role || null
}
const ensureAuthenticated = req => {
  return req.isAuthenticated()
}

module.exports = {
  getUserRole,
  ensureAuthenticated
}
