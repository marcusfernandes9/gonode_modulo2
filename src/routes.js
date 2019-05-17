const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

routes.get('/', SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.use('/app', authMiddleware)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', (req, res) => {
  console.log('vai doido')
  return res.render('dashboard')
})

module.exports = routes
