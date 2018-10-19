const routes = require('next-routes')

module.exports = routes()
    .add('index', '/', 'index')
    .add('users', '/:username', 'users')